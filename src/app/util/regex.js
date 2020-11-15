

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

    const obj = {data: parseSegment(_match[0]), newPath: _newPath}

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

    const obj = {data: parseSegment(_match[0]), newPath: _newPath}

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
