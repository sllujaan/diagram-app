

const getFirstData = (path) => {
    const regex = /(\ |\t|\r|\n)*[A-Za-z]/i;
    const match = path.match(regex);
    if(!match) return null;

    const dataName = match[0][match[0].length-1];
    return getPathData(path, dataName);
    //return firstDataArr;
}




const getDataPoints_M_L = (path, dataName) => {
    const regexStr = `${dataName}((\\r\\n|\\r|\\n)+| )?(\\-?\\+?)(\\d+((\\.)(\\d+))?)((\\r\\n|\\r|\\n)+| |,)+(\\-?\\+?)(\\d+((\.)(\\d+))?)`;
    const regex = new RegExp(regexStr, "i");
    //const regex = /(M|L)((\r\n|\r|\n)+| )?(\-?\+?)(\d+((\.)(\d+))?)((\r\n|\r|\n)+| |,)+(\-?\+?)(\d+((\.)(\d+))?)/i;
    const _match = path.match(regex);
    if(!_match) return null;


    const _newPath = removeSegment(path, _match[0]);

    const obj = {data: parseSegmentEx(_match[0], 2), newPath: _newPath}

    return obj;

}

const getDataPoints_Z = (path, dataName) => {
    const _newPath = removeSegment(path, dataName);
    const obj = {data: [dataName], newPath: _newPath}
    return obj;
}

const getDataPoints_H_V = (path, dataName) => {
    const regexStr = `${dataName}((\\r\\n|\\r|\\n)+| )?(\\-?\\+?)(\\d+((\\.)(\\d+))?)`;
    const regex = new RegExp(regexStr, "i");
    //const regex = /(M|L)((\r\n|\r|\n)+| )?(\-?\+?)(\d+((\.)(\d+))?)((\r\n|\r|\n)+| |,)+(\-?\+?)(\d+((\.)(\d+))?)/i;
    const _match = path.match(regex);
    if(!_match) return null;

    const _newPath = removeSegment(path, _match[0]);

    const obj = {data: parseSegmentEx(_match[0], 1), newPath: _newPath}

    return obj;
}


const removeSegment = (path, segment) => {
    const regex = new RegExp(segment, "i");
    const newPath =  path.replace(regex, "");
    return newPath;
}


const parseSegment = (segment) => {
    var parsedItems_arr = [];
    var regEx = /(M|L|H|V)/i;

    var _segment = segment;

    var item = _segment.match(regEx);
    console.log(item);
    while(item) {
        var digit = parseFloat(item[0]);
        
        if(digit) parsedItems_arr.push(digit);
        else parsedItems_arr.push(item[0]);
        
        _segment = _segment.replace(regEx, "");
        //regEx = /(\d+((\.)(\d+))?)/i
        regEx = /(\-?\+?)(\d+((\.)(\d+))?)/i
        item = _segment.match(regEx);
    }
    return parsedItems_arr;
}


const parseSegmentEx = (segment, segLen) => {
    const regExDigit = /(\-?\+?)(\d+((\.)(\d+))?)/i
    var parsedItems_arr = [];
   
    var _segment = segment;
    //push path data name to array as first element
    parsedItems_arr.push(_segment[0]);
    _segment = _segment.replace(_segment[0], "");


    for (let i = 1; i <= segLen; i++) {
        const digit = _segment.match(regExDigit);
        //console.log(digit);
        if(digit) {
            parsedItems_arr.push(parseFloat(digit[0]));
            _segment = _segment.replace(digit[0], "");
            //console.log(_segment);
        }
        
    }

    return parsedItems_arr;
}



/**
 * finds the given data from the given path.
 * @param {string} path 
 * @param {string} dataName 
 */
const getPathData = (path, dataName) => {
    const _data = dataName.toLowerCase();
    
    switch (_data) {
        case "m":
            return getDataPoints_M_L(path, dataName);
            //break;
        case "l":
            return getDataPoints_M_L(path, dataName);
        case "h":
            return getDataPoints_H_V(path, dataName);
            //break;
        case "v":
            return getDataPoints_H_V(path, dataName);
            //break;
        case "c":
            return [`{${dataName}} feature currently not available!`]
            //break;
        case "s":
            return [`{${dataName}} feature currently not available!`]
            //break;
        case "q":
            return [`{${dataName}} feature currently not available!`]
            //break;
        case "t":
            return [`{${dataName}} feature currently not available!`]
            //break;
        case "a":
            return [`{${dataName}} feature currently not available!`]
            //break;
        case "z":
            return getDataPoints_Z(path, dataName);
            //break;  
    
        default:
            return [`unknown path data`];
            //break;
    }
}



const getFirstDataPoints = (path) => {
    if(!path) return null;

    var _path = path;
    var match1Index = 0;
    var match2Index = 0;
    const regEx = /[A-za-z]/i;
    const match1 = regEx.exec(_path);

    if(!match1) return null;

    match1Index = match1.index;
    _path = _path.replace(match1[0], "");

    const match2 = regEx.exec(_path);
    match2Index = (match2) ? (match2.index) : (_path.length);

    const remainedSubStr = _path.substring(match1Index, match2Index);
    const finalStr = match1[0] + remainedSubStr;

    console.log(_path);
    const _newPath = _path.replace(remainedSubStr, "");

    const _dataArr = parseDataPoints(finalStr);

    return {data: _dataArr, newPath: _newPath};

}

const parseDataPoints = (dataSegment) => {
    var _dataSegment = dataSegment;
    var dataArr = [];
    const regEx = /[A-za-z]/i;
    const _match = regEx.exec(_dataSegment);
    const dataName = _match[0];

    console.log(dataName);
    //get data points length--
    const dataLen = getDataPointsLength(dataName);

    if(dataLen < 0) return [];

    // now read data points from the segment
    dataArr = readDataPoints(dataSegment);

    return dataArr;


}

const readDataPoints = (segment, len) => {
    var _segment = segment;
    _segment = _segment.replace(/[A-za-z]/i, "");
    console.log(_segment);

    //1. now find digit using regex
    //2. replace that digit
    //3. loop until next digit is found...


    //1. now find digit using regex
    //const digitFound = _segment.match(//i)

    return [];
}

const getDataPointsLength = (dataName) => {
    const _dataName = dataName.toLowerCase();
    switch (_dataName) {
        case "m":
            return 2;
            //break;
        case "l":
            return 2;
        case "h":
            return 1;
            //break;
        case "v":
            return 1;
            //break;
        case "c":
            return 6;
            //break;
        case "s":
            return 4;
            //break;
        case "q":
            return 2;
            //break;
        case "t":
            return 2;
            //break;
        case "a":
            return 7;
            //break;
        case "z":
            return 0; 
    
        default:
            console.error(`invalid data Point: [${_dataName}]`);
            return -1;
    }
}