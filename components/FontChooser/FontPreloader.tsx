import Head from 'next/head';
import * as React from 'react';

const GOOGLE_FONTS_TO_PRELOAD = [
    'Inter',
    'Mali',
    'Poppins',
    'Source+Sans+Pro',
    'Roboto',
    'Open+Sans'
];

export const FontPreloader: React.FC = () => {
    return (
        <Head>
            {GOOGLE_FONTS_TO_PRELOAD.map((font) => (
                <link
                    key={font}
                    rel="preload"
                    as="style"
                    href={`https://fonts.googleapis.com/css2?family=${font}:ital,wght@0,200..700;1,200..700&display=swap`}
                />
            ))}
            {GOOGLE_FONTS_TO_PRELOAD.map((font) => (
                <link
                    key={`${font}-stylesheet`}
                    rel="stylesheet"
                    href={`https://fonts.googleapis.com/css2?family=${font}:ital,wght@0,200..700;1,200..700&display=swap`}
                    media="print"
                    onLoad={(e) => {
                        const target = e.target as HTMLLinkElement;
                        target.media = 'all';
                    }}
                />
            ))}
        </Head>
    );
};
