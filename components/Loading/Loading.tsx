import React from 'react';

import classes from './loading.module.css';

const Loading = () => {
    return (
        <div className={classes.container}>
            <div className={classes.loader}>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
            </div>

            <svg className={classes.svg}>
                <filter id='gooey'>
                    <feGaussianBlur
                        in='SourceGraphic'
                        stdDeviation='10'
                    ></feGaussianBlur>
                    <feColorMatrix
                        values='
                    1 0 0 0 0
                    0 1 0 0 0
                    0 0 1 0 0
                    0 0 0 20 -10
                '
                    ></feColorMatrix>
                </filter>
            </svg>
        </div>
    );
};

export default Loading;
