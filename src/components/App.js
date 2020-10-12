import React, { useRef, useState } from 'react';
import '../styles/App.css';
import Bingo from './Bingo/Bingo';
import goomba from "../styles/images/goomba.webp";
import useContainerDimensions from "../hooks/useContainerDimensions";
import AnimationControls from './AnimationControls/AnimationControls';
console.disableYellowBox = true;

function App() {
  const [paused, setPaused] = useState(false);

  const goombaXPosition = useRef();

  const goombaStyle = {
    bottom: `${useContainerDimensions(goombaXPosition).height / 9.33333}px`
  }

  return (
    <div className="App" ref={goombaXPosition}>
      <AnimationControls paused={paused} setpaused={setPaused} />
      <Bingo />

      <img src={goomba} alt="goomba" className={`${paused ? "paused" : ""} goomba`} style={goombaStyle} />
    </div>
  );
}

export default App;
