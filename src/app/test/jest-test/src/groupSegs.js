
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
        if(_segment[0].toLowerCase() === 'm') {

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


module.exports = {groupSegments};