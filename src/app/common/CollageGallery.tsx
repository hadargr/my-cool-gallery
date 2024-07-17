'use client'
import React from 'react';
import { StyledGalleryProps } from './types';
import Image from './Image';

const getRandomNumber = (min: number, max: number) => {
    return Math.random() * (max - min) + min
}

export default function CollageGalleryComponent({ images }: StyledGalleryProps) {
    return (
        <div>
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                {images.map((image) => (
                    <Image title={image.title} key={image.url} src={image.url} style={{ width: getRandomNumber(200, 500), margin: 10, maxHeight: 300 }} />
                ))}
            </div>
        </div>
    );
}
