import { readPath } from './diagOperations.js';
import { path } from './util/vars.js';

//first get d attribute from dom path element.
const _path_attr = path.getAttribute("d");
//now read path segments from the d attribute.
const _path_segs = readPath(_path_attr); 



console.log(_path_segs);


const scaleX = 2;
const scaleY = 2;


const generateNewSegs = () => {

}


const oldPath = `M 10 10 L 10 30 L 30 30 L 30 10 L 10 10 Z`;
//const newPath = `M 20 20 L 20 60 L 60 60 L 60 20 L 20 20 Z`;
const newPath = `M 10 10 L 10 50 L 50 50 L 50 10 L 10 10 Z`;

setTimeout(() => {
    path.setAttribute("d", newPath);
}, 1000);
