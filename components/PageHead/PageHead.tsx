import Head from 'next/head';
import * as React from 'react';
import * as types from 'lib/types';
import * as config from 'lib/config';
import Script from 'next/script'

interface Props extends types.PageProps {
    title?: string;
    socialImage?: string;
    socialDescription?: string;
    canonicalPageUrl?: string;
    isBlogPost?: boolean;
}

const PageHead: React.FC<Props> = ({
    site,
    title,
    socialImage,
    socialDescription,
    canonicalPageUrl,
    isBlogPost
}) => {
    return (
        <Head>
            <meta charSet='utf-8' />
            <meta httpEquiv='Content-Type' content='text/html; charset=utf-8' />
            <meta
                name='viewport'
                content='width=device-width, initial-scale=1, shrink-to-fit=no'
            />
            {config.facebook && (
                <meta name='facebook:creator' content={`@${config.facebook}`} />
            )}

            {site?.name && <meta property='og:site_name' content={site.name} />}

            {/* Use socialDescription if available, otherwise fallback to site.description */}
            {(socialDescription || site?.description) && (
                <>
                    <meta name='description' content={socialDescription || site.description} />
                    <meta
                        property='og:description'
                        content={socialDescription || site.description}
                    />
                    <meta
                        name='twitter:description'
                        content={socialDescription || site.description}
                    />
                </>
            )}
            {socialImage ? (
                <>
                    <meta name='twitter:card' content='summary_large_image' />
                    <meta name='twitter:image' content={socialImage} />
                    <meta property='og:image' content="https://www.notion.so/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F671f6c40-9bd7-4faf-b2cc-493a64aca848%2F131266225_763814284344382_3700534037825427011_o.jpg?table=block&id=16dc2d2f-dc8c-46ee-96f5-81afde5a0c0c&cache=v2" />
                </>
            ) : (
                <meta name='twitter:card' content='summary' />
            )}
            {canonicalPageUrl && (
                <>
                    <link rel='canonical' href={canonicalPageUrl} />
                    <meta property='og:url' content={canonicalPageUrl} />
                    <meta property='twitter:url' content={canonicalPageUrl} />
                </>
            )}

            <title>{title}</title>
            {title && <meta property='og:title' content={title} />}

            <meta property='og:type' content={isBlogPost ? 'article' : 'website'} />

            <Script
                defer
                src='https://cloud.umami.is/script.js'
                data-website-id='3580f550-d3be-4d55-ba73-12593758e87b'
            ></Script>

            <Script
                defer
                type='text/javascript'
                src='https://assets.calendly.com/assets/external/widget.js'
                async
            ></Script>

        </Head>
    );
};

export default PageHead;
