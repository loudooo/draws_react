import React, { useEffect, useState } from 'react';
import { url } from '../fetch/fetchFunctions';
import { Drawing } from '../Interfaces/drawing';

function getTabDrawings(tab: Drawing[]) {
  let final_tab: { alt: string | undefined; height: number; width: number; src: string; srcSet: string[]; key: string; }[] = [];
  const first_url = "http://www.lesminimoys.fr/presentation_dessins/IMG/resize_drawings_ludo/"
  console.log(tab)
  // artist_id: "0"
  // category: "free"
  // col: "2"
  // date_creation: "2021-09-27"
  // id: "93"
  // medium: "digi"
  // row: "1"
  // title: "Paysage 2h"
  // url: "essai_paysage.jpg"

  // alt: "DSC02576",
  // height: 52,
  // key: "40673436833",
  // sizes: "(min-width: 480px) 50vw, (min-width: 1024px) 33.3vw, 100vw",
  // src: "https://live.staticflickr.com/65535/40673436833_5fc1ab52fe_b.jpg",
  // srcSet: ['https://live.staticflickr.com/65535/40673436833_5fc1ab52fe.jpg 500w', 'https://live.staticflickr.com/65535/40673436833_5fc1ab52fe_c.jpg 800w', 'https://live.staticflickr.com/65535/40673436833_5fc1ab52fe_b.jpg 1024w', 'https://live.staticflickr.com/65535/40673436833_6f245db6aa_h.jpg 1600w'],
  // title: "DSC02576",
  // width:

  tab.forEach(element => {
    final_tab.push({
      alt: element.title,
      height: 9,
      width: 9,
      src: first_url + element.url,
      srcSet: [first_url + element.url + " 500w"],
      key: 'drawing_' + element.id
    });
  });
  console.log(final_tab)
  return final_tab;
}
export default getTabDrawings;