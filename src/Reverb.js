

import * as Pizzicato from 'pizzicato';
import React, {useEffect, useState, useContext} from 'react';
import KnobDiv from "./KnobDiv";
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

// export function UserReverb(props) {
//   let bbsample = props.bbsample
//   const { fxProps, setFXProps } = useContext(EffectContext);
//   // const [options, setOptions] = useState(defaultOptions)
//   let options = getOptions(bbsample)
  
//   // let decay = fxProps.decay
//   // let time = options.time[0]
//   // let mix = options.mix[0]
//   return new Pizzicato.Effects.Reverb({
//       time: fxProps.time,
//       decay: fxProps.decay,
//       reverse: false,
//       mix: fxProps.mix
//   })
// }


export function ReverbControl(props) {
//   const { delayProps, bbsample } = props;
    let bbsample = props.bbsample
    let d = getOptions(bbsample).decay.length - 1;
    let t = getOptions(bbsample).time.length - 1;
    let m = getOptions(bbsample).mix.length - 1;
    const { fxProps, setFXProps } = useContext(EffectContext);
    const [options, setOptions] = useState(getOptions(bbsample));
    const [timedout, setTimedOut] = useState(false)
    const [p, setP] = useState(<p></p>)

    // useEffect(() => {
    //     setOptions(getOptions(bbsample))}, [bbsample]);

  function handleDecayChange(value) {
    setFXProps({ ...fxProps, decay: options.decay[value]});
  }

  function handleTimeChange(value) {
    setFXProps({ ...fxProps, time: options.time[value] });
  }

  function handleMixChange(value) {
    setFXProps({ ...fxProps, mix: options.mix[value] });
  }

  // setTimeout(() => {
  //   setTimedOut(true);
  //   setP(<div>
    return (
      <div className = "bg-purple-800 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 mx-auto">
        <div className = "col-span-full grid">
          <p className = "justify-self-center text-lg py-2"> Reverb</p>
        </div>
        <KnobDiv paramlength = {2} paramclass="Decay" paramval = {fxProps.decay} handler = {handleDecayChange}/>
    <KnobDiv paramlength = {t} paramclass = "Time" paramval = {fxProps.time} handler = {handleTimeChange}/>
    <KnobDiv paramlength = {m} paramclass="Mix" paramval = {fxProps.mix} handler = {handleMixChange}/>

      </div>
    );
  }



