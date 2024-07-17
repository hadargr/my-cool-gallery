'use client'
import React, { useState, useEffect, Suspense } from 'react';
import { GalleryType, ImageData } from '../common/types';
import SkeletonGallery from '../common/SkeletonGallery';
import { emulateSlowCode } from '../common/utils';

interface GalleryProps {
    filterText: string;
    albumId: number;
    galleryType?: GalleryType;
}
const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))
// const GridGalley = React.lazy(() => wait(1000).then(() => import('../common/GridGallery')))
const GridGalley = React.lazy(() => import('../common/GridGallery'))
const CollageGallery = React.lazy(() => import('../common/CollageGallery'))
const StackedGallery = React.lazy(() => import('../common/StackedGallery'))

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
        console.log(`Gallery ${albumId} mounted`)
    }, [])

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
            <h2>{albumTitle}</h2>
            <Suspense fallback={<>Loading...<SkeletonGallery /></>}>
                {filteredImages.length || !images.length ? <GalleryComp images={filteredImages} /> : <p>No images found</p>}
            </Suspense>
        </div>
    );
}
