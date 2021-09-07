import React, { useEffect, useState } from 'react';
import DrawingCard from './DrawingCard';
import { getAllDrawingsByArtistId } from '../fetch/fetchFunctions';
import { Drawing } from '../Interfaces/drawing';
import styles from '../styles/drawingBoard.module.css';
import { CircularProgress } from '@material-ui/core';


function DrawingBoard() {

    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState<Drawing[]>([]);

    // Remarque : le tableau vide de dépendances [] indique
    // que useEffect ne s’exécutera qu’une fois, un peu comme
    // componentDidMount()
    useEffect(() => {
        const artist_id = 0;
        const url = "http://www.lesminimoys.fr/presentation_dessins/PHP/";

        fetch(url + 'getDrawingsByArtistId.php',
            {
                method: 'POST',
                headers: {
                    'Accept': 'application/json; charset="utf-8',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    artist_id: artist_id
                })
            })

            .then(res => res.json())
            .then(
                (result) => {
                    setIsLoaded(true);
                    setItems(result);
                    console.log(result);
                    if (result.error !== undefined) {
                        setError(result.error);
                    }
                    else {
                        items.map(item => (console.log(item.id)))
                    }
                },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            )
    }, [])

    console.log(items);
    // let json_drawings = getAllDrawingsByArtistId(0);
    // console.log(json_drawings);
    if (error) {
        return <div>{error}</div>;
    } else if (!isLoaded) {
        return <CircularProgress disableShrink />;
    } else {
        return (
            <div className={styles.drawingBoard}>

                {items.map(item => (
                    <div key={item.id} className={styles.Board}>
                        <DrawingCard title={item.title} url={item.url}></DrawingCard>
                    </div>
                ))}

            </div>
        );
    };
}

export default DrawingBoard;