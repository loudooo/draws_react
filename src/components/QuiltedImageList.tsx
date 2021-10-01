import React, { useEffect, useState } from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { Drawing } from '../Interfaces/drawing';
import useWindowDimensions from '../utils/getWindowDimensions';
import { Tooltip } from '@mui/material';
import { withStyles } from "@material-ui/core/styles";

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
    display: "block",
    margin: 20,
    color: "red",
    border: "1px"
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

  const LightTooltip = withStyles(theme => ({
    tooltip: {
      backgroundColor: theme.palette.common.white,
      color: "green",
      boxShadow: theme.shadows[1],
      fontSize: 25
    }
  }))(Tooltip);
  
  return (
    <ImageList style={{ maxWidth: '1300px'}}
      sx={{ width: window.innerWidth, height: window.innerHeight }}
      variant="quilted"
      cols={nb_col}
      rowHeight={160}
    >
      {items.map((item: Drawing, index: number) => {
  
          return (

            <ImageListItem className="yo" key={item.id} cols={item.col || 1} rows={item.row || 1}>
              {!item.isHovering &&<img
                //style={{transform: `${item.isHovering ? 'scale(1.5,1.5)' : null}`}}
                onMouseEnter={() => handleMouseEnter(index)}
                onMouseLeave={() => handleMouseLeave(index)}
                {...srcset(first_url + item.url, 160, item.col, item.row)}
                alt={item.title}
                loading="lazy"
              />}
              {/* {item.isHovering &&<p style={style_title}>{item.title} </p>}
              {item.isHovering &&<img 
                style={{opacity:0.1,display:"block"}}
                onMouseEnter={() => handleMouseEnter(index)}
                onMouseLeave={() => handleMouseLeave(index)}
                {...srcset(first_url + item.url, 160, item.col, item.row)}
                alt={item.title}
                loading="lazy"
              />} */}
              {item.isHovering &&<LightTooltip arrow placement='top-end'title={item.title ?  <React.Fragment>
              <div>{item.title}</div></React.Fragment> : <React.Fragment>
              <div>{""}</div></React.Fragment>}><img 
                style={{opacity:0.1,display:"block"}}
                onMouseEnter={() => handleMouseEnter(index)}
                onMouseLeave={() => handleMouseLeave(index)}
                {...srcset(first_url + item.url, 160, item.col, item.row)}
                alt={item.title}
                loading="lazy"
              /></LightTooltip>}
              
              
            </ImageListItem>
          )
       
    
      })}
    </ImageList>
  );

}

