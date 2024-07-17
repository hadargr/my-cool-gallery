'use client'
import React from 'react';
import { StyledGalleryProps } from '../common/types';
import Image from './Image';

export default function StackedGalleryComponent({ images }: StyledGalleryProps) {
    return (
        <div>
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                {images.map((image) => (
                    <Image title={image.title} key={image.url} src={image.url} style={{ width: '100%', margin: 10, height: 100 }} />
                ))}
            </div>
        </div>
    );
}
