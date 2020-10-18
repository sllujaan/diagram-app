import { path } from './vars.js';

export function getSegmentsArr(path) {
    var segments_arr = [];
    //const regEx = /(M|L)((\r\n|\r|\n)+| |,)?(\d+((\.)(\d+))?)((\r\n|\r|\n)+| |,)+(\d+((\.)(\d+))?)/i
    const regEx = /(M|L)((\r\n|\r|\n)+| )?(\-?\+?)(\d+((\.)(\d+))?)((\r\n|\r|\n)+| |,)+(\-?\+?)(\d+((\.)(\d+))?)/i
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

export function handleDiagramMovements(e, _eventParams) {
    //console.log(_eventParams.startedClientX, _eventParams.startedClientY);
    path.setAttribute("transform", `translate(${e.clientX-_eventParams.startedClientX}, ${e.clientY-_eventParams.startedClientY})`);

}

export function handleDiagramNewPath(e, _eventParams) {
    //const compStyles = window.getComputedStyle(path);
    const regex = /\-?\+?(\d)+(\.\d+)?/i;
    var transform = path.getAttribute("transform");
    
    const translateX = transform.match(regex);
    transform = transform.replace(regex, "");
    const translateY = transform.match(regex);

    console.log(translateX[0], translateY[0]);

    //console.log(parseFloat(translateX[0]), parseFloat(translateY[0]));
    var newPathArr = [];
    const segArr = getSegmentsArr(path.getAttribute("d"));
    segArr.forEach(seg => {
        //console.log(seg);
        
        var parsedArr = parseSegment(seg);

        parsedArr[1] = parseFloat(parsedArr[1]) + parseFloat(translateX);
        parsedArr[2] = parseFloat(parsedArr[2]) + parseFloat(translateY);

        newPathArr.push(parsedArr.join(" "));
    })
    console.log(segArr);
    console.log(newPathArr.join(" "));

    //for pop function is for testing pupose.
    //newPathArr.pop();


    path.removeAttribute("transform");
    console.log(segArr.length, newPathArr.length);
    if(segArr.length != newPathArr.length) {console.log("not equal"); return;}

    path.setAttribute("d", newPathArr.join(" ") + " Z" );
    

}