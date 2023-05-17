import * as Pizzicato from "pizzicato";
import React, { useEffect, useState, useContext } from "react";
import EffectContext from "./EffectContext";
import "./App.css";
import KnobDiv from "./KnobDiv";

Array.prototype.random = function () {
  return this[Math.floor(Math.random() * this.length)];
};

const defaultOptions = {
  feedback: [0.3, 0.5, 0.7],
  time: [0.3, 0.5, 0.7],
  mix: [0.3, 0.5, 0.7],
};
function getOptions(bbsample) {
  let options;
  if (bbsample <= 1) {
    options = { ...defaultOptions };
  } else if (bbsample > 1 && bbsample <= 5) {
    options = {
      ...defaultOptions,
      feedback: [0.1, 0.3, 0.5, 0.7, 0.9],
    };
  } else {
    options = {
      ...defaultOptions,
      feedback: [0.1, 0.3, 0.5, 0.7, 0.9],
      time: [0.1, 0.3, 0.5, 0.7, 0.9],
    };
  }
  return options;
}
export function QuestionDelay(bbsample) {
  let options = getOptions(bbsample);
  let feedback = options.feedback.random();
  let time = options.time.random();
  let mix = options.mix.random();
  return new Pizzicato.Effects.Delay({
    feedback: feedback,
    time: time,
    mix: mix,
  });
}

export function DelayControl(props) {
  let ret;
  let bbsample = props.bbsample;
  const { fxProps, setFXProps } = useContext(EffectContext);
  const [options, setOptions] = useState(getOptions(bbsample));
  let o = getOptions(bbsample);
  let f = o.feedback;
  let t = o.time;
  let m = o.mix;
  // const [timedout, setTimedOut] = useState(false);
  // const [p, setP] = useState(<p></p>)
  // useEffect(() => {
  //   setOptions(getOptions(bbsample));
  // }, [bbsample]);
  function handleFeedbackChange(value) {
    setFXProps({ ...fxProps, feedback: f[value] });
  }

  function handleTimeChange(value) {
    setFXProps({ ...fxProps, time: t[value] });
  }

  function handleMixChange(value) {
    setFXProps({ ...fxProps, mix: m[value] });
  }

// setTimeout(() => {
// setTimedOut(true); 
// setP(<div>
// </div>)}, 2000)
// if (!timedout) {
//   return <p></p>
// }
  return (<div className = "bg-blue-800 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 mx-auto">  
  <div className = "col-span-full grid">
    <p className = "justify-self-center text-lg py-2"> Delay</p>
  </div>
  <KnobDiv paramlength = {f.length-1} paramclass="Feedback" paramval = {fxProps.feedback} handler = {handleFeedbackChange}/>
  <KnobDiv paramlength = {t.length-1} paramclass="Time" paramval = {fxProps.time} handler = {handleTimeChange}/>
  <KnobDiv paramlength = {m.length-1} paramclass="Mix" paramval = {fxProps.mix} handler = {handleMixChange}/>
  
</div>)
}

  
