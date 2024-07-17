'use client'
import React from 'react';

interface SearchProps {
    onSearch: (text: string) => void;
    text: string
}

export default function Search({ onSearch, text }: SearchProps) {

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        onSearch(event.target.value);
    };

    return (
        <div>
            <input
                type="text"
                placeholder="Search images..."
                value={text}
                onChange={handleInputChange}
                style={{ fontSize: '25px', margin: '10px 0px' }}
            />
        </div>
    );
}
