'use client'
import React, { useState } from "react";
import Search from "../common/Search";
import Gallery from "../common/Gallery";
import { GalleryType } from "../common/types";

export default function App() {
    const [filter, setFilter] = useState('');

    return (
        <div>
            <Search onSearch={setFilter} text={filter} />
            {Array.from({ length: 11 }).map((_, i) => {
                return i ? <Gallery filterText={filter} albumId={i} galleryType={GalleryType.Grid} /> : null
            })}
        </div>
    );
}
