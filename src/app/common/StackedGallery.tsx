'use client'
import React from 'react';
import { StyledGalleryProps } from './types';
import Image from './Image';

export default function StackedGalleryComponent({ images }: StyledGalleryProps) {
    return (
        <div>
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                {images.map((image) => (
                    <Image key={image.url} title={image.title} src={image.url} style={{ width: '100%', margin: 10, height: 100 }} />
                ))}
            </div>
        </div>
    );
}
