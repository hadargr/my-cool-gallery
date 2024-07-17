'use client'
import React, { useState, useTransition } from "react";
import Search from "../common/Search";
import { GalleryType } from "../common/types";
import dynamic from "next/dynamic";
import SkeletonGallery from "../common/SkeletonGallery";

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export default function App() {
    const [filter, setFilter] = useState('');
    const [text, setText] = useState('');
    const [_, startTransition] = useTransition();

    const handleInputChange = (newFilter: string) => {
        setText(newFilter)
        startTransition(() => {
            setFilter(newFilter)
        })
    }

    const createDynamicGallery = (timeout: number) => dynamic(() => wait(timeout).then(() => import('./Gallery')), { loading: () => <>Loading in server...<SkeletonGallery /></> })
    return (
        <div>
            <Search onSearch={handleInputChange} text={text} />
            {Array.from({ length: 4 }).map((_, i) => {
                const GalleyDynamic = createDynamicGallery(i * 500)
                return i ? <GalleyDynamic filterText={filter} albumId={i} galleryType={GalleryType.Grid} /> : null
            })}
            {Array.from({ length: 4 }).map((_, i) => {
                const GalleyDynamic = createDynamicGallery((i + 4) * 500)
                return i ? <GalleyDynamic filterText={filter} albumId={i} galleryType={GalleryType.Stacked} /> : null
            })}
            {Array.from({ length: 4 }).map((_, i) => {
                const GalleyDynamic = createDynamicGallery((i + 8) * 500)
                return i ? <GalleyDynamic filterText={filter} albumId={i} galleryType={GalleryType.Collage} /> : null
            })}
        </div>
    );
}
