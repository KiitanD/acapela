import * as Pizzicato from 'pizzicato';
import React, {useEffect, useState, useContext} from 'react';
import KnobDiv from "./KnobDiv";
import EffectContext from './EffectContext';
import {until} from 'lit-html/directives/until.js';
import {html} from 'lit-html';
Array.prototype.random = function () {
    return this[Math.floor(Math.random() * this.length)];
}
const defaultOptions = {
    pan: [-1, -0.5,  0, 0.5, 1]
}

function getOptions(bbsample) {
    let options
    console.log("bbsample is", bbsample)
    
    if (bbsample <=3) {
        options = defaultOptions;
    }
    else if (bbsample <= 7) {
        options = {
            pan: [-1, -0.7, -0.5, -0.3, 0, 0.3, 0.5, 0.7, 1]
        }
    }
    else {
        options = {
            pan: [-1,-0.9, -0.8, -0.7, -0.6,-0.5, -0.4,-0.3, -0.2, 
                -0.1, 0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1]
        }
    }
    console.log("Options are", options)
    return options;
}

export function QuestionPanner(bbsample) {
    // const [options, setOptions] = useState(defaultOptions)
    let options = getOptions(bbsample)
    let p1 = options.pan.random()
    console.log("options are", options, "p1 is", p1)
    return new Pizzicato.Effects.StereoPanner({
        pan: 0.5
    })
}

export function PannerControl(props) {
   let bbsample = props.bsample
//    let p = getOptions(bbsample).pan.length - 1;
   const { fxProps, setFXProps } = useContext(EffectContext);
   const [options, setOptions] =  useState(getOptions(props.bbsample));
    const [varlengths, setVarLengths] = useState(options.pan.length-1)
    // useEffect(() => {
    //     setOptions(getOptions(bbsample))
    // }, [bbsample])
    
   function handlePanChange(value) {
        console.log("The options for this change are", options)
        setFXProps({...fxProps, pan: options.pan[value]})

   }

   return (
    <div className = "bg-blue-800 grid grid-cols-1 mx-auto">
      <div className = "col-span-full grid">
        <p className = "justify-self-center text-lg py-2"> Pan</p>
      </div>
      <KnobDiv paramlength = {4} paramclass="Pan" paramval = {fxProps.pan} handler = {handlePanChange}/>
    </div>
   )
}