import { path } from './vars.js';

export function getSegmentsArr(path) {
    var segments_arr = [];
    const regEx = /(M|L)((\r\n|\r|\n)+| |,)?(\d+((\.)(\d+))?)((\r\n|\r|\n)+| |,)+(\d+((\.)(\d+))?)/i
    var _path = path;

    //operations
    var seg = _path.match(regEx);
    while(seg) {
        segments_arr.push(seg[0]);
        _path = _path.replace(regEx, "");
        seg = _path.match(regEx);
    }
    return segments_arr;
}


export function parseSegment(segment) {
    var parsedItems_arr = []
    var regEx = /(M|L)/i;

    var _segment = segment;

    var item = _segment.match(regEx);
    while(item) {
        var digit = parseFloat(item[0]);
        
        if(digit) parsedItems_arr.push(digit);
        else parsedItems_arr.push(item[0]);
        
        _segment = _segment.replace(regEx, "");
        regEx = /(\d+((\.)(\d+))?)/i
        item = _segment.match(regEx);
    }
    return parsedItems_arr;
}

export function handleDiagramMovements(e, _eventParams) {
    console.log(_eventParams.startedClientX, _eventParams.startedClientY);
    //console.log(e.clientX, e.clientY);
    path.setAttribute("transform", `translate(${e.clientX-_eventParams.startedClientX}, ${e.clientY-_eventParams.startedClientY})`);

}