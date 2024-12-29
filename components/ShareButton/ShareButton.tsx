import React from 'react';
import {
    FacebookShareButton,
    FacebookIcon,
    TwitterShareButton,
    TwitterIcon,
    EmailShareButton,
    EmailIcon
} from 'react-share';

import classes from './shareButton.module.css';

type Props = {
    url?: string;
    title: string;
};

const ShareButton = ({ url, title }: Props) => {
    return (
        <section className={classes.root}>
            <p className={classes.heading}>Interesting? Let's share it!</p>
            <div className={classes.content}>
                <FacebookShareButton
                    url={url}
                    quote={title}
                    className={classes.facebookShareButton}
                >
                    <FacebookIcon size={32} round iconFillColor='#fff' />
                </FacebookShareButton>

                <TwitterShareButton
                    url={url}
                    title={title}
                    className={classes.twitterShareButton}
                >
                    <TwitterIcon size={32} round iconFillColor='#fff' />
                </TwitterShareButton>

                <EmailShareButton
                    url={url}
                    subject={title}
                    body='body'
                    className={classes.emailShareButton}
                >
                    <EmailIcon size={32} round iconFillColor='#fff' />
                </EmailShareButton>
            </div>
        </section>
    );
};

export default ShareButton;
