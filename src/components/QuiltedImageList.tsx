import React, { useEffect, useState } from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { Drawing } from '../Interfaces/drawing';
import useWindowDimensions from '../utils/getWindowDimensions';

function srcset(image: string, size: number, rows = 1, cols = 1) {
  return {
    src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
    srcSet: `${image}?w=${size * cols}&h=${size * rows
      }&fit=crop&auto=format&dpr=2 2x`,
  };
}

function windowCalculate(col: number) {
  if (window.innerWidth < 400) return 4;
  if (window.innerWidth > 400) return 6;
  return 2;
}

export default function QuiltedImageList() {

  const first_url = "http://www.lesminimoys.fr/presentation_dessins/IMG/resize_drawings_ludo/"
  const { height, width, nb_col } = useWindowDimensions();

  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState<Drawing[]>([]);

  useEffect(() => {
    windowCalculate(4);
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
  const mystyle = {
    // color: "white",
    // backgroundColor: "DodgerBlue",
    // padding: "2px",
    // fontFamily: "Arial",
    
  };
  const handleMouseEnter = (index:number) => {
    let obj:Drawing[]=[...items];
    obj[index].isHovering=true;
    setItems(obj);
  };

  const handleMouseLeave = (index : number) => {
    let obj:Drawing[]=[...items];
    obj[index].isHovering=false;
    setItems(obj);
  };
 
  return (
    <ImageList style={{ maxWidth: '1300px' }}
      sx={{ width: window.innerWidth, height: window.innerHeight }}
      variant="quilted"
      cols={nb_col}
      rowHeight={160}
    >
      {items.map((item : Drawing, index : number) => {
      
        return(
        <ImageListItem key={item.id} cols={item.col || 1} rows={item.row || 1}>
          <img
              style={{transform: `${item.isHovering ? 'scale(1.5,1.5)' : null}`}}
             onMouseEnter={()=>handleMouseEnter(index)}
             onMouseLeave={()=>handleMouseLeave(index)}
            {...srcset(first_url + item.url, 160, item.col, item.row)}
            alt={item.title}
            loading="lazy"
          />
        </ImageListItem>
      )})}
    </ImageList>
  );
}

