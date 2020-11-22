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

const linePath = `M 10 10 L 20 10 M 20 20 L 30 20`;
const newlinePath = `M 10 10 L 30 10 M 20 20 L 40 20`;

setTimeout(() => {
    path.setAttribute("d", linePath);
}, 1000);

setTimeout(() => {
    path.setAttribute("d", newlinePath);
}, 2000);



/**
 * groups segments such that ech group's first segment has "m" or "M" data name.
 * @param {array} segments 
 */
const groupSegments = (segments) => {
    var groupedSegs = [];
    var tempArr = [];

    //===============Alogrithm to groups segments==================
    //1. find segment that has "M" or "m" data name.
    //2. push that segment in tempArr.
    //3. if segment's dataName is other than "m" or "M" push that segment in tempArr also;
    //4. if next segment found is "m" or "M" then push tempArr to groupedSegs array.
    //5. reset tempArr.
    //6. got to step:1 and repeat the process until segments are found.
    //7. lastly check if tempArr is not empty then push this array to groupedSegs array.
    //8. return the groupedSegs array.
    //=============================================================

    segments.forEach(_segment => {
        //1. find segment that has "M" or "m" data name.
        if(_segment[0].toLowerCase() == 'm') {

            //4. if next segment found is "m" or "M" then push tempArr to groupedSegs array.
            if(tempArr.length > 0) {
                groupedSegs.push(tempArr);
                //5. reset tempArr.
                tempArr = [];
            }

            //2. push that segment in tempArr.
            tempArr.push(_segment);
        }
        else {
            //3. if segment's dataName is other than "m" or "M" push that segment in tempArr also;
            tempArr.push(_segment);
        }
        //console.log(_segment);
        //6. got to step:1 and repeat the process until segments are found.
    });

    //7. lastly check if tempArr is not empty then push this array to groupedSegs array.
    if(tempArr.length > 0) {
        groupedSegs.push(tempArr);
        //5. reset tempArr.
        tempArr = [];
    }

    //8. return the groupedSegs array.
    return groupedSegs;

}

groupSegments(_path_segs);