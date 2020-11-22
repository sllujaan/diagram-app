

const readPath = (path) => {
    const dataStack = [];
    var _path = path;

    //1. read first data points.
    //2. push in the array.
    //3. remove data segment from the path.
    //4. repeat until data points are found.

    
    //1. read first data points.
    var firstData = getFirstDataPoints(_path);
    
    //const MAX_LOOP = 10;
    //var count = 0;// && count <= MAX_LOOP

    while (firstData) {
        //count++;
        //console.log("while");
        //2. push in the array.
        dataStack.push(firstData.data);
        //3. remove data segment from the path.
        //console.log(firstData.dataSegment);
        _path = _path.replace(firstData.dataSegment, "");
        //4. repeat until data points are found.
        firstData = getFirstDataPoints(_path);
    }

    return dataStack;


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
    const _dataSegment = match1[0] + remainedSubStr;

    //console.log(_path);
    const _newPath = _path.replace(remainedSubStr, "");

    const _dataArr = parseDataPoints(_dataSegment);

    return {data: _dataArr, dataSegment: _dataSegment, newPath: _newPath};

}

const parseDataPoints = (dataSegment) => {
    var _dataSegment = dataSegment;
    const regEx = /[A-za-z]/i;
    const _match = regEx.exec(_dataSegment);
    const dataName = _match[0];

    //console.log(dataName);
    //get data points length--
    const dataLen = getDataPointsLength(dataName);

    if(dataLen < 0) return [];

    //console.warn("reading data points...");
    // now read data points from the segment
    const dataArr = readDataPoints(dataSegment, dataLen);

    return dataArr;


}

const readDataPoints = (segment, len) => {
    var dataArr = [];
    var _segment = segment;
    //_segment = _segment.replace(/[A-za-z]/i, "");
    //console.log(_segment);

    //1. push dataName in array.
    //2. now find digit using regex.
    //3. push that digit in array.
    //4. replace that digit in the segment.
    //5. go to step:2 until next digit is found...
    //6. validate array with length.

    //1. push dataName in array.
    dataArr.push(_segment[0]);


    //2. now find digit using regex.
    const digitRegex = /(\-?\+?)(\d+((\.)(\d+))?)/i
    var digitFound = parseFloat(_segment.match(digitRegex));
    var isDigit = (digitFound || digitFound === 0 || digitFound === -0) ? (true) : (false);
    //console.log(digitFound);

    

    while ((isDigit) && (dataArr.length <= len)) {
        //3. push that digit in array.
        dataArr.push(digitFound);
        //4. replace that digit in the segment.
        _segment = _segment.replace(digitFound.toString(), "");

        //5. go to step:2 until next digit is found...
        digitFound = parseFloat(_segment.match(digitRegex));
        isDigit = (digitFound || digitFound === 0 || digitFound === -0) ? (true) : (false);
    }

    //6. validate array with length.
    if(dataArr.length != len+1) { console.log(`invalid data points [${dataArr.join(" ")}]`); return generateValidData(dataArr, len);}
    return dataArr;
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
            console.log(`invalid data Name: [${_dataName}]`);
            return -1;
    }
}


const generateValidData = (dataArr, len) => {
    for (let i = dataArr.length; i <= len; i++) {
        dataArr[i] = 0;
    }

    if(dataArr.length != len+1) {
        //remove all elements from the array except firt.
        //make sure that array has only one element that is a letter [i.e. dataName].
        dataArr.splice(1);
        
        //console.log("final....");
        for (let i = 1; i <= len; i++) {
            dataArr[i] = 0;
        }
    }
    return dataArr;
}



const getFirstData = (path) => {
    return getFirstDataPoints(path);
}

module.exports = {getFirstData};