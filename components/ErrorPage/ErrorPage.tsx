import React from 'react';
import Head from 'next/head';
import Link from 'next/link';

import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

import PageHead from '../PageHead';

import classes from './errorPage.module.css';

import { PageProps } from 'lib/types';

interface Props extends PageProps {
    statusCode?: number;
}

const ErrorPage = ({ statusCode, error, pageId }: Props) => {
    const title = 'Error';

    return (
        <React.Fragment>
            <PageHead />
            <Head>
                <meta property='og:site_name' content={title} />
                <meta property='og:title' content={title} />
                <title>{title}</title>
            </Head>

            <div className={classes.container}>
                <main className={classes.main}>
                    <h1>Error Loading Page</h1>

                    {error ? (
                        <p>{error.message}</p>
                    ) : (
                        pageId && (
                            <p>
                                Make sure that Notion page "{pageId}" is
                                publicly accessible.
                            </p>
                        )
                    )}

                    {(statusCode && <p>Error code: {statusCode}</p>) || (
                        <p>
                            The page you're looking for is not available or
                            removed. Please try again later.
                        </p>
                    )}

                    <Link href='/' className={classes.link}>
                        <FaArrowRight /> Back to Home <FaArrowLeft />
                    </Link>

                    <img
                        src='/404.png'
                        alt='Error'
                        className={classes.errorImage}
                    />
                </main>
            </div>
        </React.Fragment>
    );
};

export default ErrorPage;
