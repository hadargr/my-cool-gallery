import React from 'react';
import Gallery from './Gallery';
import { GalleryType } from '../common/types';

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))
async function fetchAlbumData(albumId: number) {
    const [imagesData, albumData] = await Promise.all([
        `https://jsonplaceholder.typicode.com/albums/${albumId}/photos`,
        `https://jsonplaceholder.typicode.com/albums/${albumId}`
    ].map(async (url) => {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }
        return response.json();
    }));

    return { images: imagesData, albumTitle: albumData.title };
}

export default async function GalleryWrapper({ albumId, galleryType }: { albumId: number, galleryType: GalleryType }) {
    const albumData = await fetchAlbumData(albumId);
    // await wait(3000);

    console.log('Rendering GalleryWrapper');
    return (
        <Gallery albumTitle={albumData.albumTitle} galleryType={galleryType} images={albumData.images} />
    );
}