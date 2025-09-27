import React from 'react';
import Document, { Html, Head, Main, NextScript } from 'next/document';
import { IconContext } from 'react-icons';

export default class MyDocument extends Document {
    render() {
        return (
            <IconContext.Provider
                value={{ style: { verticalAlign: 'middle' } }}
            >
                <Html lang='en'>
                    <Head>
                        <link rel='shortcut icon' href='/favicon.ico' />

                        {/* Preload common Google Fonts to prevent FOIT/FOUT */}
                        <link rel="preconnect" href="https://fonts.googleapis.com" />
                        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

                        {/* Combined Google Fonts request - only fonts actually used in FontChooser */}
                        <link
                            rel="preload"
                            as="style"
                            href="https://fonts.googleapis.com/css2?family=Mali:ital,wght@0,200..700;1,200..700&family=Poppins:ital,wght@0,200..700;1,200..700&family=Roboto:ital,wght@0,200..700;1,200..700&family=Space+Grotesk:wght@300..700&family=Source+Code+Pro:ital,wght@0,200..900;1,200..900&display=swap"
                        />

                        <link
                            rel="stylesheet"
                            href="https://fonts.googleapis.com/css2?family=Mali:ital,wght@0,200..700;1,200..700&family=Poppins:ital,wght@0,200..700;1,200..700&family=Roboto:ital,wght@0,200..700;1,200..700&family=Space+Grotesk:wght@300..700&family=Source+Code+Pro:ital,wght@0,200..900;1,200..900&display=swap"
                        />

                        <link
                            rel='apple-touch-icon'
                            sizes='180x180'
                            href='/apple-touch-icon.png'
                        />
                        <link
                            rel='icon'
                            type='image/png'
                            sizes='96x96'
                            href='/favicon-96x96.png'
                        />
                        <link
                            rel='icon'
                            type='image/png'
                            sizes='32x32'
                            href='/favicon-32x32.png'
                        />
                        <link
                            rel='icon'
                            type='image/png'
                            sizes='16x16'
                            href='/favicon-16x16.png'
                        />

                        <link rel='manifest' href='/manifest.json' />
                        <link
                            href='https://assets.calendly.com/assets/external/widget.css'
                            rel='stylesheet'
                        />
                    </Head>

                    <body>
                        <script src='noflash.js' />

                        <Main />

                        <NextScript />
                    </body>
                </Html>
            </IconContext.Provider>
        );
    }
}
