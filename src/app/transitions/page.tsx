'use client'
import React, { useState, useTransition } from "react";
import Search from "../common/Search";
import Gallery from "../common/Gallery";
import { GalleryType } from "../common/types";

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

    return (
        <div>
            <Search onSearch={handleInputChange} text={text} />
            {Array.from({ length: 11 }).map((_, i) => {
                return i ? <Gallery filterText={filter} albumId={i} galleryType={GalleryType.Grid} /> : null
            })}
        </div>
    );
}
