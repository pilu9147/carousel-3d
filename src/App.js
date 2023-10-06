
import React, { useState } from 'react';
import './App.css';
import Carousel3D from './Carousal3D';

function App() {
  const [modalIndex, setModalIndex] = useState(0);

  const handleNext = () => {
    setModalIndex((prevIndex) => (prevIndex === 2 ? 0 : prevIndex + 1));
  };

  const handlePrev = () => {
    setModalIndex((prevIndex) => (prevIndex === 0 ? 2 : prevIndex - 1));
  };

  return (
    <div className="App">
      <Carousel3D modelIndex={modalIndex} />
     <div className="btns" style={{display:'flex'}}>
     <button onClick={handlePrev} style={{padding:'10px 20px',backgroundColor:'pink',borderRadius:'5px'}}  disabled={modalIndex === 0}>Prev</button>
      <button onClick={handleNext} style={{padding:'10px 20px',backgroundColor:'pink',borderRadius:'5px'}} disabled={modalIndex === 2}>Next</button>
     </div>
    </div>
  );
}

export default App;

