import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import SliderContent from "./SliderContent";
import Slide from "./Slide";
import Arrow from "./Arrow";
import Dots from "./Dots";

function Slider({ slides, height, width, objectFit }) {
  const [state, setState] = useState({
    activeIndex: 0,
    translate: 0,
    transition: 0.45,
  });
  const getWidth = () => {
    // return 500;
    return window.innerWidth;
    
  }

  const { translate, transition, activeIndex } = state;

  const nextSlide = () => {
    console.log(state)
    if (activeIndex === slides.length - 1) {
      return setState({
        ...state,
        translate: 0,
        activeIndex: 0,
      });
    }
    
    setState({
      ...state,
      activeIndex: activeIndex + 1,
      translate: (activeIndex + 1) * getWidth(),
      
    });
  };
  
  const prevSlide = () => {
    console.log(state)
    if (activeIndex === 0) {
      return setState({
        ...state,
        translate: (slides.length - 1) * getWidth(),
        activeIndex: slides.length - 1,
      });
    }

    setState({
      ...state,
      activeIndex: activeIndex - 1,
      translate: (activeIndex - 1) * getWidth(),
    });
  };

  console.log('getWidth = ')
  console.log(getWidth())



  return (
    <Box
      sx={{
        position: "relative",
        height: height ? height : '500px',
        width: width ? width : "100%",
        // margin: "0 auto",
        overflow: "hidden",
        // objectFit: objectFit ? objectFit : 'fill',
      }}
    >
      <SliderContent
        translate={translate}
        transition={transition}
        width={getWidth() * slides.length}
      >
        {slides.map((slide, i) => (
          <Slide key={slide + i} content={slide} />
        ))}
      </SliderContent >
      <Arrow direction="left" handleClick={prevSlide} />
      <Arrow direction="right" handleClick={nextSlide} />
      <Dots slides={slides} activeIndex={activeIndex} /> 
    </Box>
  );
}

export default Slider;
