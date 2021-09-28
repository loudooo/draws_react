import { useState, useEffect } from 'react';
import useWindowDimensions from './getWindowDimensions';

function getNbCols() {
    
    const { innerWidth: width, innerHeight: height } = window;
    return {
        width,
        height
    };
}

export default function calculateNbCols() {
    const { height, width } = useWindowDimensions();

    useEffect(() => {
        getNbCols();
    }, []);

    return 5;
}