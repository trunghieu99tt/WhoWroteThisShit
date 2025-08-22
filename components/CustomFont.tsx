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

// Check if font is ready using FontFace API
const isFontReady = async (fontFamily: string): Promise<boolean> => {
    if (typeof window === 'undefined' || !('fonts' in document)) return true;

    try {
        // Wait for font to be ready
        await document.fonts.ready;
        // Check if the specific font is loaded
        const fontFace = Array.from(document.fonts).find(
            font => font.family.includes(fontFamily)
        );
        return fontFace ? fontFace.status === 'loaded' : false;
    } catch {
        return true; // Fallback if FontFace API not supported
    }
};

// Preload font function with FontFace API support
const preloadGoogleFont = async (fontFamily: string): Promise<void> => {
    if (loadedFonts.has(fontFamily) || typeof window === 'undefined') return;

    const fontUrl = `https://fonts.googleapis.com/css2?family=${fontFamily.replace(/ /g, '+')}:ital,wght@0,200..700;1,200..700&display=swap`;

    // Check if the font link already exists
    const existingLink = document.querySelector(`link[href="${fontUrl}"]`);
    if (existingLink) {
        loadedFonts.add(fontFamily);
        return;
    }

    return new Promise((resolve) => {
        // Create the stylesheet link
        const styleLink = document.createElement('link');
        styleLink.rel = 'stylesheet';
        styleLink.href = fontUrl;
        styleLink.onload = async () => {
            // Wait for font to be ready before marking as loaded
            const ready = await isFontReady(fontFamily);
            if (ready) {
                loadedFonts.add(fontFamily);
            }
            resolve();
        };
        styleLink.onerror = () => {
            resolve(); // Continue even if font fails to load
        };
        document.head.appendChild(styleLink);
    });
};

export const CustomFont: React.FC<CustomFontProps> = ({ site, fontFamily }) => {
    // Use provided fontFamily prop, fallback to site config, then to default
    const effectiveFontFamily = fontFamily || site.fontFamily;
    const [fontLoaded, setFontLoaded] = React.useState(false);

    // Preload Google Fonts and wait for them to be ready
    React.useEffect(() => {
        if (!effectiveFontFamily) return;

        const isGoogleFont = GOOGLE_FONTS.includes(effectiveFontFamily);

        if (isGoogleFont) {
            // Check if font is already loaded
            if (loadedFonts.has(effectiveFontFamily)) {
                setFontLoaded(true);
                return;
            }

            // Load font and wait for it to be ready
            preloadGoogleFont(effectiveFontFamily).then(() => {
                setFontLoaded(true);
            });
        } else {
            // For non-Google fonts (system fonts), consider them immediately ready
            setFontLoaded(true);
        }
    }, [effectiveFontFamily]);

    // Apply font styles only when font is ready
    React.useEffect(() => {
        if (!effectiveFontFamily || !fontLoaded) return;

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
            }
        `;
    }, [effectiveFontFamily, fontLoaded]);

    // Don't render anything in Head since we're handling font loading manually
    return null;
};
