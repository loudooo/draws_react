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
  return (
    <ImageList style={{ maxWidth: '1300px' }}
      sx={{ width: window.innerWidth, height: window.innerHeight }}
      variant="quilted"
      cols={nb_col}
      rowHeight={160}
    >
      {items.map((item) => (
        <ImageListItem key={item.id} cols={item.col || 1} rows={item.row || 1}>
          <img
            {...srcset(first_url + item.url, 221, item.col, item.row)}
            alt={item.title}
            loading="lazy"
          />
        </ImageListItem>
      ))}
    </ImageList>
  );
}

const itemData = [
  {
    img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
    title: 'Breakfast',
    rows: 2,
    cols: 2,
  },
  {
    img: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
    title: 'Burger',
  },
  {
    img: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45',
    title: 'Camera',
  },
  {
    img: 'https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c',
    title: 'Coffee',
    cols: 2,
  },
  {
    img: 'https://images.unsplash.com/photo-1533827432537-70133748f5c8',
    title: 'Hats',
    cols: 2,
  },
  {
    img: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62',
    title: 'Honey',
    author: '@arwinneil',
    rows: 2,
    cols: 2,
  },
  {
    img: 'https://images.unsplash.com/photo-1516802273409-68526ee1bdd6',
    title: 'Basketball',
  },
  {
    img: 'https://images.unsplash.com/photo-1518756131217-31eb79b20e8f',
    title: 'Fern',
  },
  {
    img: 'https://images.unsplash.com/photo-1597645587822-e99fa5d45d25',
    title: 'Mushrooms',
    rows: 2,
    cols: 2,
  },
  {
    img: 'https://images.unsplash.com/photo-1567306301408-9b74779a11af',
    title: 'Tomato basil',
  },
  {
    img: 'https://images.unsplash.com/photo-1471357674240-e1a485acb3e1',
    title: 'Sea star',
  },
  {
    img: 'https://images.unsplash.com/photo-1589118949245-7d38baf380d6',
    title: 'Bike',
    cols: 2,
  },
];
