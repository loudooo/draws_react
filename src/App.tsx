import { Container } from '@material-ui/core';
import { useEffect, useState } from 'react';
import './App.css';
import ButtonAppBar from './components/ButtonAppBar';
import DrawingBoard from './components/DrawingBoard';
import QuiltedImageList from './components/QuiltedImageList';
import GalleryComp from './gallery/gallery';

interface PropsWindow {
  width: number | undefined,
  height: number | undefined,
}

function App() {

  const isClient: boolean = typeof window === "object";

  function getSize(): PropsWindow {
    return {
      width: isClient ? window.innerWidth : undefined,
      height: isClient ? window.innerHeight : undefined
    };
  }

  const [windowSize, setWindowSize] = useState<PropsWindow>(getSize);

  //effet de bord pour readapter la height en fonction de l'ecran
  useEffect(() => {
    if (!isClient) {
      return;

    }

    function handleResize(): void {
      setWindowSize(getSize());
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Empty array ensures that effect is only run on mount and unmount
  return (
    <Container className="App" style={{backgroundColor:"black"}}>
      <ButtonAppBar/>
      <GalleryComp/>
      {/* <QuiltedImageList width={windowSize.width ? windowSize.width : 0 } height={windowSize.height ? windowSize.height : 0 }/> */}
    </Container>
  );
}
export default App;
