

import * as Pizzicato from 'pizzicato';
import React, {useEffect, useState, useContext} from 'react';
import KnobDiv from "./KnobDiv";
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
        threshold: threshold,
        knee: 30
    })
}

export function CompressorControl(props) {
    let bbsample = props.bbsample
    const { fxProps, setFXProps } = useContext(EffectContext);
    const [options, setOptions] = useState(getOptions(bbsample));
    let o = getOptions(bbsample);
    let ra = o.ratio;
    let at = o.attack;
    let re = o.release;
    let th = o.threshold;
   
  function handleRatioChange(value) {
    setFXProps({ ...fxProps, ratio: ra[value]});
  }

  function handleAttackChange(value) {
    setFXProps({ ...fxProps, attack: at[value] });
  }

  function handleReleaseChange(value) {
    setFXProps({ ...fxProps, release: re[value] });
  }
  
  function handleThresholdChange(value) {
    setFXProps({ ...fxProps, threshold: th[value] });
  }

  return (
  <div className = "bg-red-800 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 mx-auto">
    <div className = "col-span-full grid">
      <p className = "justify-self-center text-lg py-2"> Compressor</p>
    </div>
    <KnobDiv paramlength = {ra.length - 1} paramclass="Ratio" paramval = {fxProps.ratio} handler = {handleRatioChange}/>
    <KnobDiv paramlength = {at.length - 1} paramclass="Attack" paramval = {fxProps.attack} handler = {handleAttackChange}/>
    <KnobDiv paramlength = {re.length - 1} paramclass="Release" paramval = {fxProps.release} handler = {handleReleaseChange}/>
    <KnobDiv paramlength = {th.length - 1} paramclass="Threshold" paramval = {fxProps.threshold} handler = {handleThresholdChange}/>
  </div>
  );
}
