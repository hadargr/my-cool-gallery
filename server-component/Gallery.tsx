'use client'
import React, { useState, useEffect, useContext, Suspense } from 'react';
import { GalleryType, ImageData } from '../common/types';
import { AppContext } from './context';
import SkeletonGallery from '../common/SkeletonGallery';
import { emulateSlowCode } from '../common/utils';

interface GalleryProps {
    images: ImageData[];
    albumTitle: string;
    galleryType?: GalleryType;
}

const GridGalley = React.lazy(() => import('./GridGallery'))
const CollageGallery = React.lazy(() => import('./CollageGallery'))
const StackedGallery = React.lazy(() => import('./StackedGallery'))

export default function Gallery({ albumTitle, images, galleryType = GalleryType.Grid }: GalleryProps) {
    const [filteredImages, setFilteredImages] = useState<ImageData[]>(images);
    let { filter: filterText } = useContext(AppContext);
    const Galleries = {
        [GalleryType.Grid]: GridGalley,
        [GalleryType.Collage]: CollageGallery,
        [GalleryType.Stacked]: StackedGallery,
    }
    const GalleryComp = Galleries[galleryType];

    useEffect(() => {
        if (images.length === filteredImages.length && !filterText) {
            return;
        }
        emulateSlowCode();
        console.log('filtering images', filterText)
        setFilteredImages(albumTitle.includes(filterText) ? images : images.filter(image => image.title.includes(filterText)))

    }, [albumTitle, filterText, images])
    return (
        <div>
            <h2>{albumTitle}</h2>
            <Suspense fallback={<SkeletonGallery />}>
                {filteredImages.length || !images.length ? <GalleryComp images={filteredImages} /> : <p>No images found</p>}
            </Suspense>
        </div>
    );
}