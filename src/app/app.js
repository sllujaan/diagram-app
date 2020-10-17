import { parseSegment, getSegmentsArr } from './util/core.js';
import { path } from './util/vars.js';
import {  } from './util/events.js';




console.log(path);



console.log( getSegmentsArr(path.getAttribute("d")));
console.log( parseSegment("L10.1 10."));