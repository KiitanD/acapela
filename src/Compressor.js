

import * as Pizzicato from 'pizzicato';
import React, {useEffect, useState, useContext} from 'react';

import EffectContext from './EffectContext';
const defaultOptions = {
  ratio: [10, 20],
  attack: [0.001, 0.01, 0.1, 1],
  release: [0.001, 0.01, 0.1, 1],
  threshold: [-36, -24, -12, 0]

};


Array.prototype.random = function () {
    return this[Math.floor((Math.random()*this.length))];
}

function getOptions(bbsample) {
    let options
    if (bbsample <= 1) {
        options = {...defaultOptions };
    } else {
        options = {
        ...defaultOptions,
        ratio: [5, 10, 15, 20]
        };
    }
    return options
}


export function QuestionCompressor(bbsample) {
    // const [options, setOptions] = useState(defaultOptions)
    let options = getOptions(bbsample)
    
    let ratio = options.ratio.random()
    let attack = options.attack.random()
    let release = options.release.random()
    let threshold = options.threshold.random()
    return new Pizzicato.Effects.Compressor({
        ratio: ratio,
        attack: attack,
        release: release,
        threshold: threshold
    })
}

export function CompressorControl(props) {
//   const { delayProps, bbsample } = props;
    let bbsample = props.bbsample
    const { fxProps, setFXProps } = useContext(EffectContext);
    const [options, setOptions] = useState(getOptions(bbsample));
    
    useEffect(() => {
        setOptions(getOptions(bbsample))}, [bbsample]);

  function handleRatioChange(event) {
    setFXProps({ ...fxProps, ratio: options.ratio[event.target.value]});
  }

  function handleAttackChange(event) {
    setFXProps({ ...fxProps, attack: options.attack[event.target.value] });
  }

  function handleReleaseChange(event) {
    setFXProps({ ...fxProps, release: options.release[event.target.value] });
  }
  
  function handleThresholdChange(event) {
    setFXProps({ ...fxProps, threshold: options.threshold[event.target.value] })


  return (
    <div>
      <label>Ratio:</label>
      <input
        type="range"
        min="0"
        max={options.ratio.length - 1}
        defaultValue = {1}
        onChange={handleDecayChange}
      />
      <br />
      <label>Attack:</label>
      <input
        type="range"
        min="0"
        max={options.attack.length - 1}
        defaultValue = {1}
        onChange={handleAttackChange}
      />
      <br />
      <label>Release:</label>
      <input
        type="range"
        min="0"
        max={options.release.length - 1}
        defaultValue = {1}
        onChange={handleReleaseChange}
      />
      <br />
      <label>Threshold:</label>
      <input
        type="range"
        min="0"
        max={options.threshold.length - 1}
        defaultValue = {1}
        onChange={handleThresholdChange}
      />
      <div>
        
      </div>
    </div>
  );
}
