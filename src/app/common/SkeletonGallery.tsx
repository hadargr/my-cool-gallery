'use client'
import React, { useId } from 'react';

export default function SkeletonGallery() {
    return (
        <div>
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                {Array.from({ length: 4 }).map(() => (
                    <img key={useId()} src={'/placeholder.svg'} style={{ width: 200, margin: 10 }} />
                ))}
            </div>
        </div>
    );
}
