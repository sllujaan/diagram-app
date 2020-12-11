import { readPath } from './diagOperations.js';
import { path } from './util/vars.js';

//first get d attribute from dom path element.
const _path_attr = path.getAttribute("d");
//now read path segments from the d attribute.
const _path_segs = readPath(_path_attr); 



console.log(_path_segs);


const scaleX = 2;
const scaleY = 2;



const isOdd = (n) => {
    return Math.abs(n % 2) == 1;
}






/**
 * groups segments such that each group's first segment has "m" or "M" data name.
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






const generateNewSegs = (segments, scaleX, scaleY) => {
    var newPathArr = [];
    var newPathStr = "";
    var tempArr = [];
    //===============Alogrithm to generate new path=========================
    //1. get grouped segments.
    //2. create json object that contains: 
            //  i. first segments copy of the group that contains "m" data.
            // ii. difference X
            // iv. difference Y
            //ii. second is full original segments array.
    //3. push that object in tempArr.
    //4. get each group from temp Array and generate new segments with scaleX and scaleY.
    //5. check the difference between new m values and new m values.
    //6. subtract that values from all segments.
    //7. lastly push all segments to newPathArr.
    //8. join newPathArr to newPathStr string.
    //9. return that string which is the new generated path.
    //======================================================================




    //1. get grouped segments.
    const groupedSegs = groupSegments(segments);
    //2. create json object that contains: 
            //  i. first segments copy of the group that contains "m" data.
            // ii. difference X
            // iv. difference Y
            //ii. second is full original segments array.

    groupedSegs.forEach(_group => {

        const dataObj = {
            mData: _group[0],   //make sure that _group[0] has only m data points
            diffX: 0,//((_group[0][1] * scaleX) - (_group[0][1])), //_group[0][1])
            diffY: 0,//((_group[0][2] * scaleY) - (_group[0][2])), //_group[0][2])
            originalGroup: _group
        }
        console.log(dataObj);
        //3. push that object in tempArr.
        tempArr.push(dataObj);
    });

    console.log(tempArr);

    //4. get each group from temp Array and generate new segments with scaleX and scaleY.
    tempArr.forEach((dataObj, tempArrIndex) => {
        dataObj.originalGroup.forEach(_segment => {
            //5. check the difference between new m values and new m values.
            //6. subtract that values from all segments.
            for (let i = 1; i < _segment.length; i++) {

                //if loop index is odd it is X point otherwise it is Y point.
                if(isOdd(i)){
                    //it is the X point block. now generate new values with scaleX
                    _segment[i] = (_segment[i] * scaleX) - tempArr[tempArrIndex].diffX;
                }
                else {
                    //it is the Y point block. now generate new values with scaleY
                    _segment[i] = (_segment[i] * scaleY) - tempArr[tempArrIndex].diffY;
                }
                
            }

            //7. lastly push all segments to newPathArr.
            newPathArr.push(_segment);
            console.log(_segment);
        })
        console.log("================================");
    });

    //8. join newPathArr to string.
    newPathStr = newPathArr.join(" ");
    //replace commas with space from the newPathStr if axisted any.
    newPathStr = newPathStr.replace(/,/gi, " ");

    console.log(newPathStr);
    //9. return that string which is the new generated path.
    return newPathStr;
    



}

generateNewSegs(_path_segs, 3, 3);





const oldPath = `M 10 10 L 10 30 L 30 30 L 30 10 L 10 10 Z`;
//const newPath = `M 20 20 L 20 60 L 60 60 L 60 20 L 20 20 Z`;
const newPath = `M 10 10 L 10 50 L 50 50 L 50 10 L 10 10 Z`;

const linePath = `M 10 10 L 30 10 L 30 30 L 10 30 L 10 10 Z`;
const linePathSegs = readPath(linePath);
const newlinePath =  generateNewSegs(linePathSegs, 2, 2); //`M 10 10 L 30 10 M 20 20 L 40 20`;

const testPath1 = `M 5 1 L 10 1 L 13 3 L 10 6 L 5 6 L 5 1 Z`;
const testPath1Segs = readPath(testPath1);
const newPath_testPath1 = `M 5 1 L 10 1 L 13 3 L 10 6 L 5 6 L 5 1 Z`; //generateNewSegs(testPath1Segs, 2, 2); //`M 20 20 C 0 20 0 0 0 0 z`

setTimeout(() => {
    path.setAttribute("d", testPath1);
}, 1000);

setTimeout(() => {
    path.setAttribute("d", newPath_testPath1);
}, 2000);


//test1
`M 10 10 C 20 10 20 20 10 20`;
`M 10 10 C 30 10 30 30 10 30`;
//status = pass


//test2
`M 15 10 C 20 10 20 20 10 20`;
`M 15 10 C 25 10 25 30 5 30`;
//status = pass


