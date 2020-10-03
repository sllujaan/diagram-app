

class CommCtrls {
    constructor() {}

    /**
     * 
     * @param {DOM element} element 
     * @param {string} property 
     */
    getComputedProperty(element, property) {
        const compStyles = window.getComputedStyle(element);
        return compStyles.getPropertyValue(property);
    }

    /**
     * 
     * @param {string} str 
     */
    removeUnit(str) {
        return parseFloat(str.split("px")[0]);
    }
}

const _commCtrls = new CommCtrls();

export { _commCtrls };