// LoadProvider.jsx
import React, { createContext, use, useContext, useEffect, useState } from 'react';

const LoadContext = createContext();

export function LoadProvider({ children }) {
    const [firstLoad, setFirstLoad] = useState(true);
    const [ slideLoad , setSlideLoad ] = useState(true);
    
    // Define the value object that will be provided to consumers
    const value = {
        firstLoad,
        setFirstLoad,
        slideLoad,
        setSlideLoad
    };

    useEffect(() => {
        const time = setTimeout(() => {
            setFirstLoad(false);
        }, 4000);
        return () => clearTimeout(time);
    }, []);

    useEffect(() => {
        const time = setTimeout(() => {
            setSlideLoad(false);
        }, 7000);
        return () => clearTimeout(time);
    }, []);
    
    return (
        <LoadContext.Provider value={value}>
            {children}
        </LoadContext.Provider>
    );
}

export function useGlobalContext() {
    const context = useContext(LoadContext);
    if (context === undefined) {
        throw new Error('useGlobalContext must be used within a LoadProvider');
    }
    const { firstLoad, setFirstLoad, slideLoad, setSlideLoad } = context;
    return { firstLoad, setFirstLoad, slideLoad, setSlideLoad };
}