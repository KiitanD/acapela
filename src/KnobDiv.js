import { Knob, Pointer, Value, Scale } from "rc-knob";
import {ReactComponent as KnobSVG} from './knob.svg';
export default function KnobDiv(props) {
    let steps = props.paramlength
    let paramclass = props.paramclass
    let paramval = props.paramval
    let handler = props.handler
    return(
    <div className = "pb-4 grid gap-y-2 justify-items-center ">
            <Knob
              className="knob"
              size={150}
              angleOffset={270}
              angleRange={180}
              steps={steps}
              snap={true}
              min={0}
              max={steps}
              defaultValue = {0}
              onChange={() => {
                let val = document.getElementsByClassName(paramclass)[0].innerHTML;
                handler(val);
              }}
            >
              <KnobSVG x = "23" y = "23"/>,
              <Value className={paramclass} decimalPlace={0} />
              <Scale tickWidth={2} tickHeight={4} radius={64} color="white" />
              <Pointer
                width={5}
                height={25}
                radius={15}
                type="circle"
                color="#000000"
              />
            </Knob>
            <p className="ValueLabel text-center">{props.paramname ? props.paramname: paramclass}<br></br>{paramval}</p>
          </div>
    )
}