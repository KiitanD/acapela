// import Pizzicato from 'pizzicato';
// const defaultOptions = {
//     feedback: [0.3, 0.5, 0.7],
//     time: [0.3, 0.5, 0.7],
//     mix: [0.3, 0.5, 0.7]
// }

// //mix, time, feedback, bbsample
// export function Delay( props) {
//     const {mix, time, feedback, bbsample} = props
//     const [dtime, setTime] = useState(time)
//     const [dmix, setMix] = useState(mix)
//     const [dfeedback, setFeedback] = useState(feedback)
//     const [delay, setDelay] = useState(null)
//     const [options, setOptions] = useState(defaultOptions)
//     useEffect(() => {
//     if (bbsample <= 1){

//     }
//     else if (bbsample > 1 && bbsample <=5) {
//         setOptions({...defaultOptions,
//             feedback: [0.1, 0.3, 0.5, 0.7, 0.9]})
//     }
//     else {
//         setOptions({...defaultOptions,
//             feedback: [0.1, 0.3, 0.5, 0.7, 0.9],
//             time: [0.1, 0.3, 0.5, 0.7, 0.9]})
//     }
//     }, [bbsample])

//     useEffect(() => {
//         // delay = new Pizzicato.Effects.Delay({feedback: dfeedback, time: dtime, mix:dmix})
//       setDelay(new Pizzicato.Effects.Delay({feedback: dfeedback, time: dtime, mix: dmix}))

//       console.log(dtime)
//     }, [dtime, dmix, dfeedback]);

//     function handleFeedbackChange(event) {
//       setFeedback(options.feedback[event.target.value])
//     };

//     const handleTimeChange = (event) => {
//       setTime(options.time[event.target.value])
//     };

//     const handleMixChange = (event) => {
//       setMix(options.mix[event.target.value])
//     };
//     return delay? delay : new Pizzicato.Effects.Delay({feedback:dfeedback, time:dtime, mix:dmix});

// };

// export function DelayControl(delayProps, bbsample) {
//     const [options, setOptions] = useState(defaultOptions)
//     useEffect(() => {
//     if (bbsample <= 1){

//     }
//     else if (bbsample > 1 && bbsample <=5) {
//         setOptions({...defaultOptions,
//             feedback: [0.1, 0.3, 0.5, 0.7, 0.9]})
//     }
//     else {
//         setOptions({...defaultOptions,
//             feedback: [0.1, 0.3, 0.5, 0.7, 0.9],
//             time: [0.1, 0.3, 0.5, 0.7, 0.9]})
//     }
// }, [bbsample])
//     function handleFeedbackChange(event) {
//         setFeedback(options.feedback[event.target.value])
//     }

// return (
//     <div>
//       <label>Feedback:</label>
//       <input type="range" min="0" max={options.feedback.length-1} onChange={handleFeedbackChange}/>
//       <br></br>
//       <label>Time:</label>
//       <input type="range" min="0" max={options.time.length-1} onChange={handleTimeChange} />
//       <br></br>
//       <label>Mix:</label>
//       <input type="range" min="0" max={options.mix.length-1} onChange={handleMixChange} />
//     </div>
//   );
// }

// import { useState, useEffect } from 'react';
// import Pizzicato from 'pizzicato';
import * as Pizzicato from "pizzicato";
import React, { useEffect, useState, useContext } from "react";
import EffectContext from "./EffectContext";
import { Knob, Pointer, Value, Scale } from "rc-knob";
import "./App.css";

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

//     // let sound = props.sound
//     // let bbsample = props.bbsample
//     const delay = null
//     useEffect(() => {
//       delay = new Pizzicato.Effects.Delay({
//         feedback: fxProps.feedback,
//         time: fxProps.time,
//         mix: fxProps.mix,
//       });
//     console.log(fxProps)
//       // Assuming you have an audio source called 'source'
//     }, [fxProps]);

//     return delay? delay : new Pizzicato.Effects.Delay({ feedback: fxProps.feedback, time: fxProps.time, mix:fxProps.mix});
//   }

export function DelayControl(props) {
  let bbsample = props.bbsample;
  const { fxProps, setFXProps } = useContext(EffectContext);
  const [options, setOptions] = useState(getOptions(bbsample));

  useEffect(() => {
    setOptions(getOptions(bbsample));
  }, [bbsample]);

  function handleFeedbackChange(value) {
    setFXProps({ ...fxProps, feedback: options.feedback[value] });
  }

  function handleTimeChange(value) {
    setFXProps({ ...fxProps, time: options.time[value] });
  }

  function handleMixChange(value) {
    setFXProps({ ...fxProps, mix: options.mix[value] });
  }

  return (
    <div>
      <div style={{backgroundColor: "black", paddingTop: "10px", marginTop: "30px"}}>
        <span>
        {/* <label>Feedback</label> */}
        <Knob className = "knob"
          size={150}
          angleOffset={270}
          angleRange={180}
          steps={options.feedback.length - 1}
          min={0}
          max={options.feedback.length - 1}
          snap={true}
          onChange={() => {
            let val = document.getElementsByClassName("V1")[0].innerHTML;
            handleFeedbackChange(val);
          }}
        >
          <Scale tickWidth={4} tickHeight={4} radius={64} color="white"/>
          <circle r="50" cx="75" cy="75" fill="#FC5A96" />,
          <Pointer
            width={5}
            height={48}
            radius={15}
            type="circle"
            color="#FC5A96"
          />
          <Value className="V1" />
        </Knob>
        {/* <span> */}
        {/* <label htmlFor = "k1">Time:</label> */}
        <Knob className = "knob"
          size={150}
          angleOffset={270}
          angleRange={180}
          steps={options.time.length - 1}
          min={0}
          max={options.time.length - 1}
          snap={true}
          onChange={() => {
            let val = document.getElementsByClassName("V2")[0].innerHTML;
            handleFeedbackChange(val);
          }}
        >
          <Scale tickWidth={4} tickHeight={4} radius={64} color="white"/>
          <circle r="50" cx="75" cy="75" fill="#FC5A96" />,
          <Pointer
            width={5}
            height={48}
            radius={15}
            type="circle"
            color="#FC5A96"
          />
          <Value className="V2" />
        </Knob>
        {/* </span> */}
        {/* <label>Mix:</label> */}
        <Knob className="knob"
          size={150}
          angleOffset={270}
          angleRange={180}
          steps={options.mix.length - 1}
          min={0}
          max={options.mix.length - 1}
          snap={true}
          onChange={() => {
            let val = document.getElementsByClassName("V3")[0].innerHTML;
            handleFeedbackChange(val);
          }}
        >
          <Scale tickWidth={4} tickHeight={4} radius={64} color="white" />
          <circle r="50" cx="75" cy="75" fill="#FC5A96" />,
          <Pointer
            width={5}
            height={48}
            radius={15}
            type="circle"
            color="#FC5A96"
          />
          <Value className="V3" />
        </Knob>
        </span>
        <p style={{color: "white", paddingBottom: "10px", marginTop: "-10px"}}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Feedback&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Time
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      &nbsp;&nbsp;
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Mix</p>
      </div>
      
    </div>
  );
}

