import React, { Suspense } from "react";
import { GalleryType } from "../common/types";
import GalleryWrapper from "./GalleryWrapper";
import App from "./App";
import SkeletonGallery from "../common/SkeletonGallery";

export default function Page() {
    console.log('Rendering Page')
    return (
        <App>
            {Array.from({ length: 11 }).map((_, i) => {
                return i ?
                    <Suspense fallback={<>Loading in server...<SkeletonGallery /></>}>
                        <GalleryWrapper albumId={i} galleryType={GalleryType.Grid} />
                    </Suspense> : null
            })
            }</App>
    );
}
