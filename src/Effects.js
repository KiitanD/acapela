// import {QuestionCompressor, UserCompressor, UCompControls} from "./Compressor"
// import {QuestionReverb, UserReverb, URevControls} from "./Reverb"
import {QuestionReverb, ReverbControl} from "./Reverb"
//QuestionReverb, ReverbControl
// import {QuestionDelay, UserDelay, UDelControls} from "./Delay"  
import {QuestionDelay, DelayControl} from "./Delay"
//QuestionDelay, DelayControl 
import {QuestionCompressor, CompressorControl} from "./Compressor"
import {QuestionPanner, PannerControl} from "./Pan"
import {QuestionDistortion, DistortionControl} from "./Distortion"


export function QEffect (props) {
    //fx, beta, sample
    // comp: 150, rev: 140, delay: 30, eq: 120, dist: 150, pan: 10
    let fx = props.fx;
    let bbsample = props.bbsample;
    console.log(fx, bbsample)
    switch (fx) {
        case "compression":
            return QuestionCompressor(bbsample)
            break
        case "reverb":
            return QuestionReverb(bbsample)
            break
        case "delay":
            return QuestionDelay(bbsample)
            break
        case "eq":
            // return QuestionEQ(props.sample)
            break
        case "distortion":
            return QuestionDistortion(bbsample)
            break
        case "pan":
            return QuestionPanner(props.sample)
            break
        default:
            // return QuestionReverb({bbsample:props.bbsample})
    }
}

export function UEffect (props) {
    //fx, beta, sample
    // comp: 150, rev: 140, delay: 30, eq: 120, dist: 150, pan: 10
    let fx = props.fx
    let bbsample = props.bbsample
    switch (fx) {
        case "compression":
            // return UserCompressor({bbsample:props.bbsample})
            break
        case "reverb":
            // return UserReverb({bbsample:bbsample})
            break
        case "delay":
            // return UserDelay({bbsample:bbsample})
            break
        case "eq":
            // return UserEQ(props.sample)
            break
        case "distortion":
            // return UserDistortion(props.sample)
            break
        case "pan":
            // return UserPanner(props.sample)
            break
        default:
            // return UserCompressor({bbsample: props.sample})
            break
    }
}

export function UControls(props) {
    let bbsample = props.bbsample
    let fx = props.fx
    // console.log("FXType is", fx)
    switch (fx) {
        case "compression":
            console.log("Calling UCC with sample", bbsample)
            return CompressorControl({bbsample: bbsample})
            break
        case "reverb":
            // console.log("Calling URC with sample", bbsample)
            return ReverbControl({bbsample: bbsample})
            break
        case "delay":
            // console.log("Calling UDC with sample", bbsample)
            return DelayControl({bbsample: bbsample})
            break
        case "eq":
            // return UserEQ(props.sample)
            break
        case "distortion":
            // return UserDistortion(props.sample)
            console.log("Calling UDiC with sample", bbsample)
            return DistortionControl({bbsample: bbsample})
            break
        case "pan":
            console.log("Calling UPC with sample", bbsample)
            return PannerControl({bbsample: bbsample})
            break
        default:
            // return UCompControls({userChange: props.userChange, bbsample: props.bbsample})
            break
    }

}

