
import { _commCtrls } from "./commCtrls.js";



var body = document.body, html = document.documentElement;
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

/**
 * retrieves screen height--
 */
export function getScreenHeight() {
    var height = Math.max( body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight );
    return height;
}

/**
 * retrieves screen width--
 */
export function getScreenWidth() {
    var width = Math.max( body.scrollWidth, body.offsetWidth, html.clientWidth, html.scrollWidth, html.offsetWidth );
    return width;
}

/**
 * 
 * @param {number} value 
 * @param {number} percentage 
 */
export function getPercentage(value, percentage) {
    return (percentage / 100) * value;
}



export { }