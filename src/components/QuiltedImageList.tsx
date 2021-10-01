import React, { useEffect, useState } from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { Drawing } from '../Interfaces/drawing';
import useWindowDimensions from '../utils/getWindowDimensions';
import { Button, Card, CardActions, CardContent, CardMedia, TextField, Tooltip, Typography } from '@mui/material';
import { withStyles } from "@material-ui/core/styles";
import { Label } from '@material-ui/icons';

function srcset(image: string, size: number, rows = 1, cols = 1) {
  return {
    src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
    srcSet: `${image}?w=${size * cols}&h=${size * rows
      }&fit=crop&auto=format&dpr=2 2x`,
  };
}


export default function QuiltedImageList() {

  const first_url = "http://www.lesminimoys.fr/presentation_dessins/IMG/resize_drawings_ludo/"
  const { height, width, nb_col } = useWindowDimensions();

  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState<Drawing[]>([]);

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
  const mystyle = {
    // color: "white",
    // backgroundColor: "DodgerBlue",
    // padding: "2px",
    // fontFamily: "Arial",
  };
  const style_title = {
    bottom: 0,
    left: 0,
    right: 0,
    top: 0,
    color: "black",
    width: '100%',
    fontSize: "200%"

  };
  const handleMouseEnter = (index: number) => {
    let obj: Drawing[] = [...items];
    obj[index].isHovering = true;
    setItems(obj);
    console.log('mouse enter', index)
  };

  const handleMouseLeave = (index: number) => {
    let obj: Drawing[] = [...items];
    obj[index].isHovering = false;
    setItems(obj);
    console.log('mouse leave', index)
  };
  // console.log(document.getElementsByClassName("yo"));


  return (
    <ImageList style={{ maxWidth: '1300px' }}
      sx={{ width: window.innerWidth, height: window.innerHeight }}
      variant="quilted"
      cols={nb_col}
      rowHeight={160}
    >
      {items.map((item: Drawing, index: number) => {

        const variable: any = item.row ? Math.round(item.row * 0.5) : 1

        return (
          <>
            {!item.isHovering && <ImageListItem
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={() => handleMouseLeave(index)} key={item.id} cols={item.col || 1} rows={item.row || 1}>
              <Card style={{ height: item.row }}>
                <CardMedia
                  component="img"
                  style={{ objectFit: 'cover', zIndex: 1 }}
                  {...srcset(first_url + item.url, 160, item.col, item.row)}
                  title={item.title}
                />
              </Card>

            </ImageListItem>}
            {item.isHovering && <ImageListItem
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={() => handleMouseLeave(index)} key={item.id} cols={item.col || 1} rows={item.row || 1}>
              <Card style={{ height: item.row }}>
                <CardMedia
                  component="img"
                  style={{ opacity: 0.4, objectFit: 'inherit', zIndex: 2 }}
                  {...srcset(first_url + item.url, 160, item.col, item.row)}
                  title={item.title}
                />
                <CardContent style={{ zIndex: 3, position: "absolute", bottom: '5%', left: 0, right: 0, top: 0 }}>
                  <Typography gutterBottom component="label">
                    {item.title}
                  </Typography>
                  <Typography component="p">
                    ta mère
                  </Typography>
                </CardContent>
              </Card>
            </ImageListItem>}
          </>
        )
      })}
    </ImageList>
  );

}

