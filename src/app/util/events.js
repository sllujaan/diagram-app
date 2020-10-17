import { path } from './vars.js';
import { handleDiagramMovements, handleDiagramNewPath } from './core.js';

var diagramSelected = false;
var diagramMoving = false;

document.addEventListener('mousedown', e => {
    diagramSelected = true;
    _eventParams.startedClientX = e.clientX;
    _eventParams.startedClientY = e.clientY;
})
document.addEventListener('mouseup', e => {
    diagramSelected = false;
    handleDiagramNewPath(e, _eventParams);
})

document.addEventListener('mousemove', e => {
    if(diagramSelected) {
        diagramMoving = true;
        handleDiagramMovements(e, _eventParams);
    }
    else {diagramMoving = true;}

})

/**
 * this class is used to pass events variables.
 */
class EventParams {
    constructor() {}
    startedClientX = 0;
    startedClientY = 0;
}
const _eventParams = new EventParams();