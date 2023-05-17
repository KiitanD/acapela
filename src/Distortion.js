import * as Pizzicato from "pizzicato";
import React, { useEffect, useState, useContext } from "react";
import EffectContext from "./EffectContext";
import KnobDiv from "./KnobDiv";
import "./App.css";
import * as Tuna from "tunajs";

Array.prototype.random = function() {
    return this[Math.floor(Math.random() * this.length)];
}
var context = Pizzicato.context;
var tuna = new Tuna(context);
const defaultOptions = {
    outputGain: -10,
    drive: [0.3, 0.5, 0.7],
    curveAmount: [0.3, 0.5, 0.7],
    algorithmIndex: [0, 1, 2, 3, 4, 5],
    // bypass: 0
}

function getOptions(bbsample) {
    let options;
    if (bbsample <=1) {
        options = {...defaultOptions};
    } else if (bbsample > 1 && bbsample <= 5) {
        options = {...defaultOptions,
            drive: [0.1, 0.3, 0.5, 0.7, 0.9]};
    }
    else {
        options = {...defaultOptions,
            drive: [0.1, 0.3, 0.5, 0.7, 0.9],
            curveAmount: [0.1, 0.3, 0.5, 0.7, 0.9]};
    }
    return options;
}

export function QuestionDistortion(bbsample) {
    let options = getOptions(bbsample)
    let drive = options.drive.random()
    let curveAmount = options.curveAmount.random()
    let algorithmIndex = options.algorithmIndex.random()
    return new tuna.Overdrive({
        outputGain: -10,
        drive: drive,
        curveAmount: curveAmount,
        algorithmIndex: algorithmIndex,
        bypass: 0
    });
}

export function DistortionControl(props) {
    let bbsample = props.bbsample
    let o = getOptions(bbsample)
    let d = o.drive
    let c = o.curveAmount
    let a = o.algorithmIndex
    const { fxProps, setFXProps } = useContext(EffectContext);
    const [options, setOptions] = useState(getOptions(bbsample));

    // useEffect(() => {
    //     setOptions(getOptions(bbsample));
    // }, [bbsample]);

    function handleDriveChange(value) {
        setFXProps({ ...fxProps, drive: d[value] });
    }

    function handleCurveAmountChange(value) {
        setFXProps({ ...fxProps, curveAmount: c[value] });
    }

    function handlealgorithmIndexChange(value) {
        setFXProps({ ...fxProps, algorithmIndex: a[value] });
    }

    return (
        <div className = "bg-green-800 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 mx-auto">
      <div className = "col-span-full grid">
        <p className = "justify-self-center text-lg py-2"> Distortion</p>
      </div>
      <KnobDiv paramlength = {d.length-1} paramclass="Drive" paramval = {fxProps.drive} handler = {handleDriveChange}/>
      <KnobDiv paramlength = {c.length-1} paramclass="curveAmount" paramval = {fxProps.curveAmount} handler = {handleCurveAmountChange}/>
      <KnobDiv paramlength = {a.length-1} paramclass="algorithmIndex" paramval = {fxProps.algorithmIndex} handler = {handlealgorithmIndexChange}/>
    </div>
        
    )
}