import { useRef, useEffect, useState } from "react";
import { QuestionDelay, DelayControl } from "./Delay";
import {QuestionReverb, ReverbControl} from "./Reverb";
import EffectContext from "./EffectContext";
import Player from "./Player";
import isEqual from 'lodash.isequal'
import * as Pizzicato from 'pizzicato'
const defaultParams = {
  delay: {
    feedback: 0.5,
    time: 0.3,
    mix: 0.5,
  },
  compressor: {
    ratio: 10,
    attack: 0.01,
    release: 0.1,
    threshold: -36,
    knee: 30,
    mix: 0.5,
  },
  pan: {
    pan: 50,
  },
  reverb: {
    time: 0.01,
    decay: 0.01,
    reverse: false,
    mix: 0.5,
  },
  // not implemented in Pizzicato
  distortion: {
    gain: 0.5,
  },
  equalizer: {
    mix: 0.5,
  },
};


export default function Level(props) {

    let tries = 0 ///something is wrong here
    let fx = props.fx
    let bbsample = props.bbsample
    let qe, defaults, fxc
    switch (fx) {
        case 'delay':
            qe = new QuestionDelay(bbsample)
            defaults = defaultParams.delay
            fxc = <DelayControl bbsample = {bbsample}/>
            break
        case 'reverb':
            // qe = new QuestionReverb(bbsample)
            qe = new QuestionReverb(bbsample)
            defaults = defaultParams.reverb
            fxc = <ReverbControl bbsample = {bbsample}/>
            break
        case 'pan':
            // qe = new QuestionPan(bbsample)
            defaults = defaultParams.pan
        case 'eq':
            // qe = new QuestionEq(bbsample)
            defaults = defaultParams.eq
        case 'distortion':
            // qe = new QuestionDistortion(bbsample)
            defaults = defaultParams.distortion
        case 'compression':
            // qe = new QuestionCompression(bbsample)
            defaults = defaultParams.compressor
        default:
            qe = new QuestionDelay(bbsample)
            break
    }
// let usound
//   const [params, setParams] = useState(defaultParams);
const [usound, setUSound] = useState(() => new Pizzicato.Sound({source: 'file', options: {path: "./Alfama.mp3"}}))
const [qeffect, setQeffect] = useState(() => qe)
// console.log(qeffect)
const [qsound, setQSound] = useState(() => {
    let q = new Pizzicato.Sound({source: 'file', options: {path: "./Alfama.mp3"}})
    q.addEffect(qeffect)
    return q}
)
const [fxProps, setFXProps] = useState(defaults)
const [uPlaying, setUPlaying] = useState(false)
const [qPlaying, setQPlaying] = useState(false)
const [effectControls, setEffectControls] = useState(false)
// const [tries, setTries] = useState(0)

//handle changes
useEffect(() => {
    setQeffect(() => qe)
    setFXProps(defaults)
    setEffectControls(fxc)
}, [props])

useEffect(() => {
    while (qsound.effects.length > 0) {
        qsound.removeEffect(qsound.effects[0])
    }
        qsound.addEffect(qeffect)
}, [qeffect])

useEffect(() => {
    uPlaying ? usound.play() : usound.stop()
}, [uPlaying])

useEffect(() => {
    qPlaying ? qsound.play() : qsound.stop()
}, [qPlaying])
  
useEffect(() => {
    while (usound.effects.length > 0) {
        usound.removeEffect(usound.effects[0])
    }
    if (fx == "delay") {
        usound.addEffect(new Pizzicato.Effects.Delay(
            {time: fxProps.time, mix: fxProps.mix, feedback: fxProps.feedback}))
    }
    else if (fx == "reverb") {
        usound.addEffect(new Pizzicato.Effects.Reverb(
            {time: fxProps.time, decay: fxProps.decay, reverse: fxProps.decay, mix: fxProps.mix}))
    }
    else if (fx == "pan") {
        usound.addEffect(new Pizzicato.Effects.Pan(
            {pan: fxProps.pan}))
    }
    else if (fx == "compression") {
        usound.addEffect(new Pizzicato.Effects.Compressor(
            {ratio: fxProps.ratio, attack: fxProps.attack, release: fxProps.release, 
                threshold: fxProps.threshold, knee: fxProps.knee, mix: fxProps.mix}))
    }

    console.log(usound)
    console.log(fxProps)
    console.log(qeffect.options)


    }, [usound, fxProps])
    // console.log(fxProps)
    // const [usound, setUsound] = useState(new Delay() )
//   const [effectType, setEffectType] = useState("delay");


  
  function checkAnswer(fx, onComplete) {
    tries += 1
    if (isEqual(qeffect.options,fxProps)) {
        (console.log("Samesies!"))
        //call new level
        console.log(tries)
        onComplete(tries, fx)
        
    }
} 

  
//     getNew('delay')
      {/* <Player group = {ugroup}></Player>  */}
      {/* <Player></Player> */}
      {/* {effectComponent} */}
      

    function startstop(player) {
        if (player == "u") {
            setQPlaying(false)
            setUPlaying(!uPlaying)
        } else {
            setUPlaying(false)
            setQPlaying(!qPlaying)
        }
    }
    
    //useeffec



  return (
    <div>
    {/* <Player> */}
    {/* <button onClick={() => startstop("u")}>User</button> */}
    <svg height="300" width="1000">
  <circle cx="450" cy="150" r="100" stroke="#1E1E24" stroke-width="3" fill="#1E1E24" fillRule="evenodd" />
  <polygon points="420,90 420,210 520,150" fillRule="evenodd" fill="white"></polygon>
  <circle cx="850" cy="150" r="100" stroke="#1E1E24" stroke-width="3" fill="#1E1E24" fillRule="evenodd" />
  <polygon points="790,90 790,210 910,210 910,90 " fillRule="evenodd" fill="white"></polygon>
</svg>
    {/* </Player> */}
    {/* <Player> */}
    {/* <button onClick = {() =>startstop("q")}>Question</button> */}
    {/* </Player> */}
    {/* <button onClick = {() => {qsound.play(); console.log(qsound.effects[0].options)}}>Play again</button> */}
    {/* <button onClick = {() => qsound.stop()}>Stop</button> */}
    <EffectContext.Provider value={{ fxProps, setFXProps }}>
      <div>
        {effectControls}
        {/* <DelayControl bbsample = {bbsample}/> */}
      </div>
    </EffectContext.Provider>


      <button onClick = {() => checkAnswer(fx, props.onComplete)}>Submit</button>
    </div>
  );
}
