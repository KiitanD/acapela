import { useRef, useEffect, useState } from "react";
import {QEffect, UControls, UEffect} from "./Effects";
import EffectContext from "./EffectContext";
import Player from "./Player";
import isEqual from 'lodash.isequal'
import * as Pizzicato from 'pizzicato'
import * as Tuna from "tunajs";
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

var context = Pizzicato.context
var tuna = new Tuna(context)
export default function Level(props) {

    let tries = 0 
    let fx = props.fx
    let bbsample = props.bbsample
    let qe, ue, defaults, fxc
    qe = new QEffect({fx: fx, bbsample: bbsample});
    // ue = <UEffect fx = {fx} bbsample= {bbsample}></UEffect>
    // console.log("UE is: ", ue)
    fxc = <UControls fx = {fx} bbsample ={bbsample}></UControls>
    console.log(fx)
    switch (fx) {
        case 'delay':
            defaults = defaultParams.delay
            break
        case 'reverb':
            defaults = defaultParams.reverb
            break
        case 'pan':
            defaults = defaultParams.pan
            break
        case 'eq':
            defaults = defaultParams.eq
            break
        case 'distortion':
            defaults = defaultParams.distortion
            break
        case 'compression':
            defaults = defaultParams.compressor
            break
        default:
            break
    }
// let usound
//   const [params, setParams] = useState(defaultParams);
// let u = () => new Pizzicato.Sound({source: 'file', options: {path: "./Alfama.mp3"}})
const [usound, setUSound] = useState(() =>{
  if (fx == "distortion") {
    return new Pizzicato.Sound({source: 'file', options: {path: "./p4-3.mp3", detached: true}})
  }
  else {
    return new Pizzicato.Sound({source: 'file', options: {path: "./r4-3.mp3"}})
  }
})
const [qeffect, setQeffect] = useState(() => qe)
// console.log(qeffect)
// console.log("line82")
const [qsound, setQSound] = useState(() => {
    let q
    if (fx == 'distortion') {
      q = new Pizzicato.Sound({source: 'file', options: {path: "./p4-3.mp3", detached: true}})
      // q.detached = true
      console.log("Q is", q)
      // console.log("line 87")
      q.connect(qeffect)
      // console.log("line 89")
      qeffect.connect(context.destination)
      // console.log("line 91")
      // console.log(q)
      console.log("QEffect params are: ", qeffect)
    }

    else {
      q = new Pizzicato.Sound({source: 'file', options: {path: "./r4-3.mp3"}})
      q.addEffect(qeffect)}
    // console.log(context)
    return q
  }
)

// const [ueffect, setUEffect] = useState(() => ue)

// console.log(usound)
let ustart =  <polygon points="820,90 820,210 920,150" fillRule="evenodd" fill="white"
onClick = {() => startstop("u")}></polygon>

let ustop = <polygon points="790,90 790,210 910,210 910,90 " fillRule="evenodd" fill="white"
onClick = {() => startstop("u")}></polygon>

let qstart = <polygon points="420,90 420,210 520,150" fillRule="evenodd" fill="white"
onClick = {() => startstop("q")}></polygon>

let qstop = <polygon points="390,90 390,210 510,210 510,90 " fillRule="evenodd" fill="white"
onClick = {() => startstop("q")}></polygon>
const [fxProps, setFXProps] = useState(defaults)
const [uPlaying, setUPlaying] = useState(false)
const [qPlaying, setQPlaying] = useState(false)
const [effectControls, setEffectControls] = useState(false)
const [uIcon, setUIcon] = useState(ustop)
const [qIcon, setQIcon] = useState(qstop)
// const [tries, setTries] = useState(0)

//handle changes
useEffect(() => {
    setQeffect(() => qe)
    setEffectControls(fxc)
    setFXProps(defaults)
    
}, [props])

useEffect(() => {
    while (qsound.effects.length > 0) {
        qsound.removeEffect(qsound.effects[0])
    }
    if (fx == "distortion") {
      qsound.disconnect();
      qsound.connect(qeffect)
      qeffect.connect(context.destination)
    }
    else {qsound.addEffect(qeffect)}
}, [qeffect])

useEffect(() => {
    uPlaying ? usound.play() : usound.stop()
}, [uPlaying])

useEffect(() => {
    qPlaying ? qsound.play() : qsound.stop()
}, [qPlaying])

// useEffect(() => {
//   console.log(ueffect.options)
//   console.log("Effect is", ueffect)
//   console.log(usound)
// }, [ueffect])


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
      usound.addEffect(new Pizzicato.Effects.StereoPanner(
          {pan: fxProps.pan}))
  }
  else if (fx == "compression") {
      usound.addEffect(new Pizzicato.Effects.Compressor(
          {ratio: fxProps.ratio, attack: fxProps.attack, release: fxProps.release, 
              threshold: fxProps.threshold, knee: fxProps.knee, mix: fxProps.mix}))
  }
  else if (fx == "distortion") {
    usound.disconnect();
    let dist = new tuna.Overdrive({
      outputGain: -10,        
      drive: fxProps.drive,              
      curveAmount: fxProps.curveAmount,         
      algorithmIndex: fxProps.algorithmIndex,       
      bypass: 0
    })
    usound.connect(dist)
    // console.log(dist.drive.value)
    dist.connect(context.destination)
  }

  console.log(fxProps)
  console.log(qeffect)


  }, [usound, fxProps])

  
  function checkAnswer(fx, onComplete) {
    tries += 1
    qsound.stop();
    usound.stop();
    console.log(qeffect.options)
    console.log(fxProps)
    if (fx == 'distortion') {
      let qoptions = {
        algorithmIndex: qeffect.algorithmIndex,
        curveAmount: qeffect.curveAmount,
        drive: Math.round(qeffect.drive.value*10)
      }
      let uoptions = {
        algorithmIndex: fxProps.algorithmIndex,
        curveAmount: fxProps.curveAmount,
        drive: fxProps.drive*10
      }
      console.log(qoptions)
      console.log(uoptions)
      if (isEqual(qoptions, uoptions)) {
        console.log("Samesies!")
        console.log(tries)
        onComplete(tries,fx)
      }
    }
    else if (fx == "compression") {
      let qoptions = {
        ratio: qeffect.ratio,
        attack: Math.round(qeffect.attack * 1000),
        release: Math.round(qeffect.release * 1000),
        threshold: qeffect.threshold
      }
      let uoptions = {
        ratio: fxProps.ratio,
        attack: Math.round(fxProps.attack * 1000),
        release: Math.round(fxProps.release * 1000),
        threshold: fxProps.threshold
    }
    console.log(qoptions)
    console.log(uoptions)
    if (isEqual(qoptions, uoptions)) {
      console.log("Samesies!")
      console.log(tries)
      onComplete(tries,fx)
    }
  }
    
    else if (isEqual(qeffect.options, fxProps)) {
        console.log("Samesies!")
        //call new level
        console.log(tries)
        onComplete(tries, fx)
        
    
  }
} 

  
//     getNew('delay')
      {/* <Player group = {ugroup}></Player>  */}
      {/* <Player></Player> */}
      {/* {effectComponent} */}


    useEffect(() => {
      setUIcon(uPlaying? ustop : ustart)
      setQIcon(qPlaying? qstop : qstart)
    }, [uPlaying, qPlaying]) 

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
    <svg height="300" width="1000" >
  <circle cx="450" cy="150" r="100" stroke="#1E1E24" stroke-width="3" fill="#1E1E24" fillRule="evenodd" 
  onClick = {() => startstop("q")}/>
  {qIcon}
  <circle cx="850" cy="150" r="100" stroke="#1E1E24" stroke-width="3" fill="#1E1E24" fillRule="evenodd" 
  onClick = {() => startstop("u")}/>
  {/* <polygon points="790,90 790,210 910,210 910,90 " fillRule="evenodd" fill="white"
  onClick = {() => startstop("u")}></polygon> */}
  {uIcon}
</svg>
    {/* </Player> */}
    {/* <Player> */}
    <div className="grid col-span-full py-2">
    <button className = "pb-2 px-4 text-white bg-black rounded-full justify-self-center" onClick = {() => checkAnswer(fx, props.onComplete)}>Submit</button>
    </div>
    {/* </Player> */}
    {/* <button onClick = {() => {qsound.play(); console.log(qsound.effects[0].options)}}>Play again</button> */}
    {/* <button onClick = {() => qsound.stop()}>Stop</button> */}
    <EffectContext.Provider value={{ fxProps, setFXProps }}>
      <div>
        {effectControls}
        {/* <DelayControl bbsample = {bbsample}/> */}
      </div>
    </EffectContext.Provider>


      
    </div>
  );
}
