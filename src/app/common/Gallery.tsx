'use client'
import React, { useState, useEffect } from 'react';
import { GalleryType, ImageData } from './types';
import GridGalley from './GridGallery'
import CollageGallery from './CollageGallery'
import StackedGallery from './StackedGallery'
import SkeletonGallery from './SkeletonGallery';
import { emulateSlowCode } from './utils';

interface GalleryProps {
    filterText: string;
    albumId: number;
    galleryType?: GalleryType;
}

export default function Gallery({ filterText, albumId, galleryType = GalleryType.Grid }: GalleryProps) {
    const [images, setImages] = useState<ImageData[]>([]);
    const [filteredImages, setFilteredImages] = useState<ImageData[]>([]);
    const [albumTitle, setAlbumTitle] = useState<string>('');
    const Galleries = {
        [GalleryType.Grid]: GridGalley,
        [GalleryType.Collage]: CollageGallery,
        [GalleryType.Stacked]: StackedGallery,
    }
    const GalleryComp = Galleries[galleryType];

    useEffect(() => {
        async function fetchData() {
            try {
                const [imagesData, albumData] = await Promise.all([`https://jsonplaceholder.typicode.com/albums/${albumId}/photos`, `https://jsonplaceholder.typicode.com/albums/${albumId}`]
                    .map(async (url) => {
                        const response = await fetch(url)
                        if (!response.ok) {
                            throw new Error('Failed to fetch data');
                        }
                        return response.json()
                    }))
                setImages(imagesData);
                setFilteredImages(imagesData);
                setAlbumTitle(albumData.title);
            } catch (error) {
                console.error(error)
            }
        }
        fetchData();
    }, [albumId]);

    useEffect(() => {
        if (!images || (images.length === filteredImages.length && !filterText)) {
            return;
        }
        emulateSlowCode();
        console.log('filtering images', filterText)
        setFilteredImages(albumTitle.includes(filterText) ? images : images.filter(image => image.title.includes(filterText)))
    }, [albumTitle, filterText, images])
    return (
        <div>
            {(images && albumTitle) ?
                <>
                    <h2>{albumTitle}</h2>
                    {filteredImages.length ? <GalleryComp images={filteredImages} /> : <p>No images found</p>}
                </> : <SkeletonGallery />}
        </div>
    );
}
