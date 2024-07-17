'use client'
import React, { useId, useState } from 'react';
import styles from './styles.module.css'

interface ImageProps {
    src: string;
    title: string;
    style?: object;
}

export default function Image({ src, title, style = {} }: ImageProps) {
    const [isReady, setIsReady] = useState<boolean>(false);
    const key = useId();
    return (
        <div style={{ ...style, ... { height: 'max-content' } }}>
            <span className={styles.albumTitle}>{title}</span>
            <div style={{ ...{ border: 'red solid 1px', width: 'min-content' }, ...style }}>
                <img
                    key={key}
                    src={isReady ? src : '/placeholder.svg'}
                    alt={`Gallery item ${src}`}
                    style={{ width: '100%', height: '100%' }}
                    onLoad={() => setIsReady(true)}
                />
            </div>
        </div>
    );
}
