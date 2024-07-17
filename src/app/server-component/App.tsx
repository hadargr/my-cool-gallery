'use client'
import React, { useState, useTransition } from "react";
import Search from "../common/Search";
import { AppContext } from "./context";

export default function App({ children }: any) {
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
            <AppContext.Provider value={{ filter }}>
                {children}
            </AppContext.Provider>
        </div>
    );
}
