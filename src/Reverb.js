

import * as Pizzicato from 'pizzicato';
import React, {useEffect, useState, useContext} from 'react';

import EffectContext from './EffectContext';
const defaultOptions = {
  time: [0.1, 1, 3],
  decay: [0.1, 1, 3],
  mix: [0.3, 0.5, 0.7]

};


Array.prototype.random = function () {
    return this[Math.floor((Math.random()*this.length))];
}

function getOptions(bbsample) {
    let options
    if (bbsample <= 1) {
        options = {...defaultOptions };
    } else if (bbsample > 1 && bbsample <= 5) {
        options = {
        ...defaultOptions,
        time: [0.01, 0.1,0.5, 1, 3]
        };
    } else {
        options ={
        ...defaultOptions,
        time: [0.01, 0.1,0.5, 1, 3],
        mix: [0.1, 0.3, 0.5, 0.7, 0.9]
        };
    }
    return options
}


export function QuestionReverb(bbsample) {
    // const [options, setOptions] = useState(defaultOptions)
    let options = getOptions(bbsample)
    
    let decay = options.decay.random()
    let time = options.time.random()
    let mix = options.mix.random()
    return new Pizzicato.Effects.Reverb({
        time: time,
        decay: decay,
        reverse: false,
        mix: mix
    })
}

export function ReverbControl(props) {
//   const { delayProps, bbsample } = props;
    let bbsample = props.bbsample
    const { fxProps, setFXProps } = useContext(EffectContext);
    const [options, setOptions] = useState(getOptions(bbsample));
    
    useEffect(() => {
        setOptions(getOptions(bbsample))}, [bbsample]);

  function handleDecayChange(event) {
    setFXProps({ ...fxProps, decay: options.decay[event.target.value]});
  }

  function handleTimeChange(event) {
    setFXProps({ ...fxProps, time: options.time[event.target.value] });
  }

  function handleMixChange(event) {
    setFXProps({ ...fxProps, mix: options.mix[event.target.value] });
  }


  return (
    <div>
      <label>Decay:</label>
      <input
        type="range"
        min="0"
        max={options.decay.length - 1}
        defaultValue = {1}
        onChange={handleDecayChange}
      />
      <br />
      <label>Time:</label>
      <input
        type="range"
        min="0"
        max={options.time.length - 1}
        defaultValue = {1}
        onChange={handleTimeChange}
      />
      <br />
      <label>Mix:</label>
      <input
        type="range"
        min="0"
        max={options.mix.length - 1}
        defaultValue = {1}
        onChange={handleMixChange}
      />
      <div>
        
      </div>
    </div>
  );
}
