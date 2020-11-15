

export const getFirstData = (path) => {
    const regex = /(\ |\t|\r|\n)*[A-Za-z]/i;
    const match = path.match(regex);
    if(!match) return null;

    const dataName = match[0][_match.length];
    const firstDataArr = getPathData(path, dataName);
    return firstDataArr;
}




const getDataPoints_M = (path, data) => {
    
}



/**
 * finds the given data from the given path.
 * @param {string} path 
 * @param {string} data 
 */
export const getPathData = (path, data) => {
    const _data = data.toLowerCase();
    
    switch (_data) {
        case "m":
            
            break;
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
