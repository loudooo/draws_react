import { Typography } from "@material-ui/core";
import React, { useState, useEffect } from "react";

// const imgStyle = {
//   transition: "transform .135s cubic-bezier(0.0,0.0,0.2,1),opacity linear .15s"
// };
// const selectedImgStyle = {
//   transform: "translateZ(0px) scale3d(0.9, 0.9, 1)",
//   transition: "transform .135s cubic-bezier(0.0,0.0,0.2,1),opacity linear .15s"
// };
const cont = {
  backgroundColor: "#eee",
  cursor: "pointer",
  overflow: "hidden",
  position: "relative",
  left: 0,
  right: 0,
  top: 0,
  height: 0,
  width: 0
};

const SelectedImage: React.FC<{ index: number, photo: any, margin: number, direction: string, top: any, left: any, selected: any }> = ({
  index,
  photo,
  margin,
  direction,
  top,
  left,
  selected
}) => {
  const [isSelected, setIsSelected] = useState(selected);
  //calculate x,y scale
  const sx = (100 - (30 / photo.width) * 100) / 100;
  const sy = (100 - (30 / photo.height) * 100) / 100;
  // selectedImgStyle.transform = `translateZ(0px) scale3d(${sx}, ${sy}, 1)`;

  if (direction === "column") {
    cont['position'] = "absolute";
    cont['left'] = left;
    cont['top'] = top;
  }

  //   const handleOnClick = (e:any) => {
  //     setIsSelected(!isSelected);
  //   };

  useEffect(() => {
    setIsSelected(selected);
  }, [selected]);

  const handleMouseEnter = (index: number) => {
    setIsSelected(!isSelected);
    console.log('enter', index)
  };

  const handleMouseLeave = (index: number) => {
    setIsSelected(!isSelected);
    console.log('leave', index)
  };
  return (
    <div
      //   style={{ margin, height:photo.height, width:photo.width, ...cont }}
      className={!isSelected ? "not-selected" : ""}
    >
      {/* <Checkmark selected={isSelected ? true : false} /> */}
      {isSelected ? <div style={{ position: "relative" }}>
        <span style={{ color: "white", backgroundColor: "blue", bottom: "3vh", left: "4vw", zIndex: 500, position: "absolute" }}>{photo.title}</span>
        <img
          title={photo.title}
          alt={photo.title}
          // style={
          //   isSelected ? { ...imgStyle, ...selectedImgStyle } : { ...imgStyle }
          // }
          {...photo}
          onMouseLeave={handleMouseLeave}
          onMouseEnter={handleMouseEnter}

        />

      </div>
        : <div style={{ position: "relative" }}>
          <img
            title={photo.title}
            alt={photo.title}
            // style={
            //   isSelected ? { ...imgStyle, ...selectedImgStyle } : { ...imgStyle }
            // }
            {...photo}
            onMouseLeave={handleMouseLeave}
            onMouseEnter={handleMouseEnter}

          />

        </div>}
    </div>
  );
};

export default SelectedImage;