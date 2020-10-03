//import { _commCtrls } from "../common-controls/commCtrls.js";
import { getElementDiamension } from "../common-controls/myQuery.js";

var appTitle = document.querySelector(".app-title");
var diagrams_container = document.querySelector(".diagrams-container");




function updateDiagramsContianerPosition() {
    const appTitle_totalHeight = getElementDiamension(appTitle, "height")
    diagrams_container.style.setProperty("top", `${appTitle_totalHeight}px`)
}

updateDiagramsContianerPosition();