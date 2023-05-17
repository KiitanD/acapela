import * as tf from '@tensorflow/tfjs';
import {loadGraphModel} from '@tensorflow/tfjs-converter';

// nst cat = document.getElementById('cat');
// model.execute(tf.browser.fromPixels(cat));
export default function App() {
        async function getModel(){
            const MODEL_URL = 'http://localhost:8080/jscheckpoint/weights_manifest.json';

            const model = await loadGraphModel(MODEL_URL);
console.log(model)

            return model
        }

    getModel()


}