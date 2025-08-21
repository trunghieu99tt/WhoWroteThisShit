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

export const CustomFont: React.FC<CustomFontProps> = ({ site, fontFamily }) => {
    // Use provided fontFamily prop, fallback to site config, then to default
    const effectiveFontFamily = fontFamily || site.fontFamily;

    // React to font changes by updating the style when fontFamily changes
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
            }
        `;
    }, [effectiveFontFamily]);

    if (!effectiveFontFamily) {
        return null;
    }

    const isGoogleFont = GOOGLE_FONTS.includes(effectiveFontFamily);

    // Only load Google Fonts for fonts that require it
    const googleFontsLink = isGoogleFont
        ? `https://fonts.googleapis.com/css2?family=${effectiveFontFamily.replace(/ /g, '+')}:ital,wght@0,200..700;1,200..700&display=swap`
        : null;

    return (
        <>
            <Head>
                {googleFontsLink && (
                    <link rel='stylesheet' href={googleFontsLink} />
                )}
            </Head>
        </>
    );
};
