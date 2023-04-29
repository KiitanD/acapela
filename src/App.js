import logo from "./logo.svg";
import "./App.css";
import Level from "./Level";
import React, { useRef, useEffect, useState } from "react";
import { rbetaOne, rbinomOne } from "lib-r-math.js";
import EffectContext from "./EffectContext";
import Pizzicato from "pizzicato";

Array.prototype.random = function () {
  return this[Math.floor(Math.random() * this.length)];
};

export default function App() {
  const [level, setLevel] = useState(null)


  const [fxbetas, setFXBetas] = useState({
    compressor: 150,
    reverb: 150,
    delay: 150,
    eq: 150,
    distortion: 150,
    pan: 150,
  });

  function newLevel(fxbetas) {
    let fx = Object.keys(fxbetas).random();
    let beta = fxbetas[fx];
    let bbsample = rbinomOne(10, rbetaOne(15, beta));
    fx = ['delay', 'reverb'].random()
    return <Level fx= {fx} bbsample = {1} onComplete = {onComplete}></Level>;
  }

  function onComplete(tries, fx) {

    //update betas
    let nb;
    let ob = fxbetas[fx];
    if (tries == 1) {
      ob <= 15 ? (nb = ob - 1) : (nb = ob - 5);
      // beta -= 5
    } else if (tries == 2) {
      
    } else {
      ob < 150 ? (nb = ob + 5) : (nb = nb);
    }
    setFXBetas({ ...fxbetas, [fx]: nb });
    setLevel(newLevel(fxbetas))
  }


  // useEffect(() => {
  //   level =  newLevel(fxbetas)
  // }, [fxbetas])
  // let fxbetas = {'comp': compBeta, 'rev': revBeta, 'delay': delayBeta, 'eq': eqBeta, 'dist': distBeta, 'pan': panBeta}
  // const [levelParams, setLevelParams] = useState(newLevel(fxbetas))
  


  

  // useEffect(() => {
  //   setLevel(newLevel(fxbetas));
  // }, [fxbetas]);
  //update betas

  return <div>
    {level? level : newLevel(fxbetas)}
   
  </div>;
}

// export default App;
