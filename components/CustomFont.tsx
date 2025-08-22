import Head from 'next/head';
import * as React from 'react';
import * as types from '../lib/types';

interface CustomFontProps {
    site: types.Site;
    fontFamily?: string; // Allow overriding the site's font family
}

// Define Google Fonts (fonts that need to be loaded from Google Fonts)
const GOOGLE_FONTS = [
    'Inter',
    'Mali',
    'Poppins',
    'Source Sans Pro',
    'Roboto',
    'Open Sans',
    'Nunito',
    'Lato',
    'Montserrat'
];

// Keep track of loaded fonts to prevent reloading
const loadedFonts = new Set<string>();

// Preload font function
const preloadGoogleFont = (fontFamily: string) => {
    if (loadedFonts.has(fontFamily) || typeof window === 'undefined') return;

    const fontUrl = `https://fonts.googleapis.com/css2?family=${fontFamily.replace(/ /g, '+')}:ital,wght@0,200..700;1,200..700&display=swap`;

    // Check if the font link already exists
    const existingLink = document.querySelector(`link[href="${fontUrl}"]`);
    if (existingLink) {
        loadedFonts.add(fontFamily);
        return;
    }

    // Create preload link for faster loading
    const preloadLink = document.createElement('link');
    preloadLink.rel = 'preload';
    preloadLink.as = 'style';
    preloadLink.href = fontUrl;
    document.head.appendChild(preloadLink);

    // Create the actual stylesheet link
    const styleLink = document.createElement('link');
    styleLink.rel = 'stylesheet';
    styleLink.href = fontUrl;
    styleLink.onload = () => {
        loadedFonts.add(fontFamily);
        // Remove preload link after font is loaded
        document.head.removeChild(preloadLink);
    };
    document.head.appendChild(styleLink);
};

export const CustomFont: React.FC<CustomFontProps> = ({ site, fontFamily }) => {
    // Use provided fontFamily prop, fallback to site config, then to default
    const effectiveFontFamily = fontFamily || site.fontFamily;

    // Preload Google Fonts immediately when component mounts or font changes
    React.useEffect(() => {
        if (!effectiveFontFamily) return;

        const isGoogleFont = GOOGLE_FONTS.includes(effectiveFontFamily);
        if (isGoogleFont && !loadedFonts.has(effectiveFontFamily)) {
            preloadGoogleFont(effectiveFontFamily);
        }
    }, [effectiveFontFamily]);

    // Apply font styles with smooth transition
    React.useEffect(() => {
        if (!effectiveFontFamily) return;

        // Create or update the dynamic font style
        const styleId = 'dynamic-font-style';
        let styleElement = document.getElementById(styleId) as HTMLStyleElement;

        if (!styleElement) {
            styleElement = document.createElement('style');
            styleElement.id = styleId;
            document.head.appendChild(styleElement);
        }

        const cssFontFamily = `"${effectiveFontFamily}"`;
        styleElement.textContent = `
            .notion.notion-app {
                font-family: ${cssFontFamily}, -apple-system, BlinkMacSystemFont,
                  'Segoe UI', Helvetica, 'Apple Color Emoji', Arial, sans-serif,
                  'Segoe UI Emoji', 'Segoe UI Symbol' !important;
                transition: font-family 0.2s ease-in-out;
            }
        `;
    }, [effectiveFontFamily]);

    // Don't render anything in Head since we're handling font loading manually
    return null;
};
