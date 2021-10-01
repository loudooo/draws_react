import React, { useEffect, useState } from 'react';
import DrawingCard from './DrawingCard';
import { getAllDrawingsByArtistId, url } from '../fetch/fetchFunctions';
import { Drawing } from '../Interfaces/drawing';
import styles from '../styles/drawingBoard.module.css';
import { CircularProgress } from '@material-ui/core';

export type DrawingCardContextType = {
    items: Drawing[],
    setItems: (drawingCard: Drawing[]) => void
  }
  export const DrawingCardContext = React.createContext<DrawingCardContextType | null>(null);

function DrawingBoard() {

    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState<Drawing[]>([]);
    // const [drawingCard, setDrawingCard] = useState<Drawing>({
    //     id: 0,
    //     arist_id: 0,
    //     date_creation: undefined,
    //     url: "",
    //     title: undefined,
    //     medium: undefined,
    //     category: undefined
    //   })
    // Remarque : le tableau vide de dépendances [] indique
    // que useEffect ne s’exécutera qu’une fois, un peu comme
    // componentDidMount()
    useEffect(() => {
        const artist_id = 0;
        

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
                    // else {
                    //     items.map(item => (console.log(item.id)))
                    // }
                },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            )
    }, [])

    const renderMap = ()=> {
        let map=items.map((item : Drawing, index : number) => {
        return(
            <DrawingCard  key={item.id} index={index}/>
        )
        }
    )
    return map
    }
    // let json_drawings = getAllDrawingsByArtistId(0);
    // console.log(json_drawings);
    if (error) {
        return <div>{error}</div>;
    } else if (!isLoaded) {
        return <CircularProgress disableShrink />;
    } else {
        
      return(
            <DrawingCardContext.Provider value={{ items, setItems }}>
                   <div>
               {renderMap()}
               </div>
            </DrawingCardContext.Provider>
      )
    };
}

export default DrawingBoard;