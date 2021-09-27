import React, { useEffect, useState } from 'react';
import DrawingCard from './DrawingCard';
import { getAllDrawingsByArtistId } from '../fetch/fetchFunctions';
import { Drawing } from '../Interfaces/drawing';
import styles from '../styles/drawingBoard.module.css';
import { CircularProgress} from '@material-ui/core';
import Image from 'material-ui-image'
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';

export type DrawingCardContextType = {
    items: Drawing[],
    setItems: (drawingCard: Drawing[]) => void
  }
  export const DrawingCardContext = React.createContext<DrawingCardContextType | null>(null);

function DrawingBoard() {

    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState<Drawing[]>([]);
    const first_url = "http://www.lesminimoys.fr/presentation_dessins/IMG/resize_drawings_ludo/"
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

    function srcset(image : any, size : number, rows = 1, cols = 1) {
        return {
          src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
          srcSet: `${image}?w=${size * cols}&h=${
            size * rows
          }&fit=crop&auto=format&dpr=2 2x`,
        };
      }

    const renderMap = ()=> {
        let map=items.map((item : Drawing, index : number) => {
        return(
            <ImageListItem key={item.id} cols={1} rows={1}>
            <Image   {...srcset(first_url + item.url, 121, 1, 1)} imageStyle={{height:'200px',width:'200px'}} style={{display:'flex',float:'left'}}   src={first_url + item.url} alt={item.title} loading="lazy" />
            </ImageListItem>
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
        <ImageList
            variant="quilted"
            style={{ width: '100%', height: '90vh' }}
            cols={4}
            rowHeight={121}
          >
               
               {renderMap()}
               
               </ImageList>
            </DrawingCardContext.Provider>
      )
    };
}

export default DrawingBoard;