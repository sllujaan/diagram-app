

const getFirstData = (path) => {
    const regex = /(\ |\t|\r|\n)*[A-Za-z]/i;
    const match = path.match(regex);
    if(!match) return null;

    const dataName = match[0][match[0].length-1];
    return getPathData(path, dataName);
    //return firstDataArr;
}




const getDataPoints_M_L = (path) => {
    const regex = /(M|L)((\r\n|\r|\n)+| )?(\-?\+?)(\d+((\.)(\d+))?)((\r\n|\r|\n)+| |,)+(\-?\+?)(\d+((\.)(\d+))?)/i;
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
    var regEx = /(M|L)/i;

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
 * @param {string} data 
 */
const getPathData = (path, data) => {
    const _data = data.toLowerCase();
    
    switch (_data) {
        case "m":
            return getDataPoints_M_L(path);
            //break;
        case "s":
            
            break;
        case "M":
            
            break;
        case "M":
            
            break;
        case "M":
            
            break;
        case "M":
            
            break;
        case "M":
            
            break;
        case "M":
            
            break;
        case "M":
            
            break;
        case "M":
            
            break;  
    
        default:
            break;
    }
}
