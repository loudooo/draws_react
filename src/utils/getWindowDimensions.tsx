import { useState, useEffect } from 'react';

function getWindowDimensions() {
  console.log("getWindowDimensions")
  let nb_col = 4;
  const a = -1;
  const { innerWidth: width, innerHeight: height } = window;
  if (width < 451) nb_col = 2;
  if (width > 450 && width < 600) nb_col = 3 + a;
  if (width > 600 && width < 800) nb_col = 4 + a;
  if (width > 800 && width < 900) nb_col = 5 + a;
  if (width > 900 && width < 1000) nb_col = 6 + a;
  if (width > 1000 && width < 1100) nb_col = 7 + a;
  if (width > 1000 && width < 1200) nb_col = 8 + a;
  if (width > 1200) nb_col = 10;
  return {
    width,
    height,
    nb_col
  };
}

export default function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowDimensions;
}