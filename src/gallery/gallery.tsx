import React, { useState, useCallback, useEffect } from 'react';
import ReactDOM from 'react-dom';
import Gallery from 'react-photo-gallery';
import Carousel, { Modal, ModalGateway } from 'react-images';
import { photos } from "./photos";
import { Drawing } from '../Interfaces/drawing';
import { url } from '../fetch/fetchFunctions';
import { hoverImg } from '../utils/hoverImg'


function getTabDrawings(tab: Drawing[]) {
  let final_tab: { alt: string | undefined; height: number; width: number; src: string; srcSet: string[]; key: string; title: string | undefined; date: Date | undefined }[] = [];
  const first_url_orig = "http://www.lesminimoys.fr/presentation_dessins/IMG/resize_drawings_ludo/"
  const first_url = "http://www.lesminimoys.fr/presentation_dessins/IMG/drawings_ludo/"

  tab.forEach(element => {
    return final_tab.push({
      alt: element.title,
      height: element.height || 1,
      width: element.width || 1,
      src: first_url + element.url,
      srcSet: [first_url_orig + element.url + " 500w"],
      key: 'drawing_' + element.id,
      title: element.title,
      date: element.date_creation,
    });
  });
  console.log(final_tab)
  return final_tab;
}

function getMapIndexSrc(tab: Drawing[]) {
  let final_map = new Map();
  tab.forEach(element => {
    const id = element.id;
    const url = element.url;
    final_map.set(url, id);
  });
  return final_map;
}

function GalleryComp({ }) {
  const [currentImage, setCurrentImage] = useState(0);
  const [viewerIsOpen, setViewerIsOpen] = useState(false);

  const openLightbox = useCallback((event, { photo, index }) => {
    setCurrentImage(index);
    setViewerIsOpen(true);
  }, []);

  const closeLightbox = () => {
    setCurrentImage(0);
    setViewerIsOpen(false);
  };
  // console.log(TabDrawings)
  const first_url = "http://www.lesminimoys.fr/presentation_dessins/IMG/resize_drawings_ludo/"
  //const { height, width, nb_col } = useWindowDimensions();

  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState<Drawing[]>([]);


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
  const final_items = getTabDrawings(items);
  console.log(final_items);
  const map_url_id = getMapIndexSrc(items);
  console.log(map_url_id);
  hoverImg(items, map_url_id);

  return (
    <div className={"board"} style={{position:"relative"}}>
      <h2>Using with a Lightbox component</h2>
      <Gallery photos={final_items} onClick={openLightbox} />
      <ModalGateway>
        {viewerIsOpen ? (
          <Modal onClose={closeLightbox}>
            <Carousel
              currentIndex={currentImage}
              views={final_items.map(x => ({
                ...x,
                srcset: x.srcSet,
                caption: x.alt || "",
              }))}
            />
          </Modal>
        ) : null}
      </ModalGateway>
    </div>
  );
}

export default GalleryComp;
