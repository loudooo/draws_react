import React, { useEffect, useState } from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { Drawing } from '../Interfaces/drawing';
// import useWindowDimensions from '../utils/getWindowDimensions';
import { Card,CardContent, CardMedia,Typography} from '@mui/material';

import { url } from '../fetch/fetchFunctions';
import { getWindowDimensions} from '../utils/getWindowDimensions';


function srcset(image: string, size: number, rows = 1, cols = 1) {
  return {
    src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
    srcSet: `${image}?w=${size * cols}&h=${size * rows
      }&fit=crop&auto=format&dpr=2 2x`,
  };
}


const QuiltedImageList : React.FC<{width:number,height:number}> = ({width,height}) =>{

  const first_url = "http://www.lesminimoys.fr/presentation_dessins/IMG/resize_drawings_ludo/"
  //const { height, width, nb_col } = useWindowDimensions();

  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState<Drawing[]>([]);
  const nb_col : number = getWindowDimensions(width);

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
          if (result.error !== undefined) {
            setError(result.error);
          }
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
  }, [])

  // const style_title = {
  //   bottom: 0,
  //   left: 0,
  //   right: 0,
  //   top: 0,
  //   color: "black",
  //   width: '100%',
  //   fontSize: "200%"

  // };
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

  return (
    <ImageList
      style={{backgroundColor:"black", maxWidth:"98vw",marginLeft:'auto',marginRight:'auto'}}
      sx={{ width: width, height: height }}
      variant="quilted"
      cols={nb_col}
      rowHeight={'auto'}
    >
      {items.map((item: Drawing, index: number) => {
        console.log(item)
        return (
          <>
            {!item.isHovering && 
            <ImageListItem
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={() => handleMouseLeave(index)}
               key={item.id} 
               cols={item.col || 1} 
               rows={item.row || 1}>
              <Card style={{ height: item.row }}>
                <CardMedia
                  component="img"
                  style={{ objectFit: 'cover'}}
                  {...srcset(first_url + item.url, 350, item.col, item.row)}
                  title={item.title}
                />
              </Card>
            </ImageListItem>}
            {item.isHovering &&
             <ImageListItem
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={() => handleMouseLeave(index)} 
              key={item.id} 
              cols={item.col || 1} 
              rows={item.row || 1}>
              <Card style={{ height: item.row }}>
                <CardMedia
                  component="img"
                  style={{ opacity: 0.4, objectFit: 'cover'}}
                  {...srcset(first_url + item.url, 350, item.col, item.row)}
                  title={item.title}
                />
                <CardContent style={{ zIndex: 3, position: "absolute", bottom: '5%', left: 0, right: 0, top: 0 }}>
                  <Typography gutterBottom component="label" style= {{fontWeight:'bold'}}>
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
export default QuiltedImageList;
