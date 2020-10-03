
import { _commCtrls } from "./commCtrls.js";

/**
 * includes paddings--
 * @param {dom} element 
 * @param {string} diamension 
 */
export function getElementDiamension(element, diamension) {
    var padding1, padding2;
    if(diamension === "width") {padding1 = "padding-left"; padding2 = "padding-right";}
    else {padding1 = "padding-top"; padding2 = "padding-bottom";}

    const element_height = _commCtrls.removeUnit(_commCtrls.getComputedProperty(element, diamension))
    const element_padd1 = _commCtrls.removeUnit(_commCtrls.getComputedProperty(element, padding1));
    const element_padd2 = _commCtrls.removeUnit(_commCtrls.getComputedProperty(element, padding2));
    return element_height + element_padd1 + element_padd2;
}



export { }