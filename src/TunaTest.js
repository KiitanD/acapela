import React, { useRef, useEffect, useState } from "react";
import Pizzicato from "pizzicato";
import * as Tuna from "tunajs";

var context = Pizzicato.context;
var tuna = new Tuna(context);
var p = new Pizzicato.Sound({source: 'wave', options: {type: 'sine', frequency: 440, detached: true}});
var q = new Pizzicato.Sound({source: 'wave', options: {type: 'sine', frequency: 440}});
var overdrive = new tuna.Overdrive({
    outputGain: -9.154,           //-42 to 0 in dB
    drive: 0.8,                 //0 to 1
    curveAmount: 0.1,          //0 to 1
    algorithmIndex: 1,            //0 to 5, selects one of the drive algorithms
    bypass: 0
});

p.connect(overdrive)
overdrive.connect(context.destination)
export default function App() {
return(
    <div>
        <button onClick = {() => p.play()}>  play here</button>
        <button onClick = {() => p.stop()}>  stop here</button>

        <button onClick = {() => q.play()}>  play (oscillator only) here</button>
        <button onClick = {() => q.stop()}>  stop (oscillator only) here</button>
    </div>
)
}