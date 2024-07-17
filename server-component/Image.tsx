'use client'
import React, { useId } from 'react';
import styles from '../common/styles.module.css'

interface ImageProps {
    src: string;
    title: string;
    style?: object;
}

export default function Image({ src, title, style = {} }: ImageProps) {
    const key = useId();
    return (
        <div>
            <span className={styles.albumTitle}>{title}</span>
            <div style={{ ...style, ...{ border: 'red solid 1px', width: 'min-content' } }}>
                <img
                    key={key}
                    src={src}
                    alt={`Gallery item ${src}`}
                    style={style}
                />
            </div>
        </div>
    );
}
