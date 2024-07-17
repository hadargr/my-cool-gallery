'use client'
import React from 'react';
import { StyledGalleryProps } from './types';
import Image from './Image';

export default function GridGalleryComponent({ images }: StyledGalleryProps) {
    return (
        <div>
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                {images.map((image) => (
                    <Image title={image.title} key={image.url} src={image.url} style={{ width: 200, margin: 10 }} />
                ))}
            </div>
        </div>
    );
}
