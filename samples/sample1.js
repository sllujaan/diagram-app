
var svg = document.getElementsByTagName("svg")[0];


document.addEventListener("click", e => {
    
    if(isDiagram(e)) {
        initDiagramResizers(e);
    }
});

document.addEventListener("mousemove", e => {
    if(isDiagram(e)) {
        
    }
});



const isDiagram = (e) => {
    var g_diag = e.target.parentElement;
    return g_diag.classList.contains("diagram");
}

const initDiagramResizers = (e) => {
    var g_diag = e.target.parentElement;
    console.log(getResizers(g_diag));
    svg.appendChild(getResizers(g_diag));

}


const getResizers = (g_diag) => {
    //var g_box = g_diag.getBBox();
    var g_resizer_global = document.createElementNS("http://www.w3.org/2000/svg", "g");
    var coordinates = null;

    //generate resizers---

    for (let i = 0; i <= 7; i++) {
        var direction = getDirectionFromIndex(i);
        coordinates = getCoordinates(g_diag, direction.direction);
        var g_resizer = generateResizer(coordinates.x, coordinates.y, direction.cursor);
        g_resizer_global.append(g_resizer);
        
    }
    // coordinates = getCoordinates(g_diag, "nw");
    // var g_resizer = generateResizer(coordinates.x, coordinates.y);
    // g_resizer_global.append(g_resizer);

    // //north resizer---it shoud be at centerd between nw and ne coordinates.
    // coordinates = getCoordinates(g_diag, "n");
    // var g_resizer = generateResizer(coordinates.x, coordinates.y);
    // g_resizer_global.append(g_resizer);

    //north east resizer---
    //var g_resizer = generateResizer(g_box.x+g_box.width, g_box.y+g_box.height);
    g_resizer_global.append(g_resizer);



    return g_resizer_global;
}


const getDirectionFromIndex = (index) => {
    var direction = {direction: "", cursor: ""};

    switch (index) {
        case 0:
            return {direction: "nw", cursor: "nw-resize"};
        case 1:
            return {direction: "n", cursor: "n-resize"};
        case 2:
            return {direction: "ne", cursor: "ne-resize"}
        case 3:
            return {direction: "e", cursor: "e-resize"}
        case 4:
            return {direction: "se", cursor: "se-resize"}
        case 5:
            return {direction: "s", cursor: "s-resize"}
        case 6:
            return {direction: "sw", cursor: "sw-resize"}
        case 7:
            return {direction: "w", cursor: "w-resize"}
        default:
            return "";
    }
}


const getCoordinates = (g_diag, direction) => {
    var g_box = g_diag.getBBox();
    var coordinates = {x: 0, y: 0};
    
    switch (direction) {
        case "nw":
            coordinates.x = g_box.x - 9;    //becasue image icon size if 18 pixels with and height. Therefore, center is at 18/2 = 9; 
            coordinates.y = g_box.y - 9;    //becasue image icon size if 18 pixels with and height. Therefore, center is at 18/2 = 9; 
            return coordinates;
        case "n":
            coordinates.x = (g_box.x + (g_box.width / 2)) - 9;
            coordinates.y = g_box.y - 9;
            return coordinates;
        case "ne":
            coordinates.x = (g_box.x + g_box.width) - 9;
            coordinates.y = g_box.y - 9;
            return coordinates;
        case "e":
            coordinates.x = (g_box.x + g_box.width) - 9;
            coordinates.y = (g_box.y + (g_box.height / 2)) - 9;
            return coordinates;
        case "se":
            coordinates.x = (g_box.x + g_box.width) - 9;
            coordinates.y = (g_box.y + g_box.height) - 9;
            return coordinates;
        case "s":
            coordinates.x = (g_box.x + (g_box.width / 2)) - 9;
            coordinates.y = (g_box.y + g_box.height) - 9;
            return coordinates;
        case "sw":
            coordinates.x = g_box.x - 9;
            coordinates.y = (g_box.y + g_box.height) - 9;
            return coordinates;
        case "w":
            coordinates.x = g_box.x - 9;
            coordinates.y = (g_box.y + (g_box.height / 2)) - 9;
            return coordinates;
        default:
            return coordinates;
    }
}




function generateResizer(x, y, cursor) {
    var g_resizer = document.createElementNS("http://www.w3.org/2000/svg", "g");
    g_resizer.setAttribute("style", `visibility: visible; cursor: ${cursor};`);
    var image = `<image x="${x}" y="${y}" width="18" height="18" xlink:href="data:image/svg+xml;base64,PCFET0NUWVBFIHN2ZyBQVUJMSUMgIi0vL1czQy8vRFREIFNWRyAxLjEvL0VOIiAiaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkIj48c3ZnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHdpZHRoPSIxOHB4IiBoZWlnaHQ9IjE4cHgiIHZlcnNpb249IjEuMSI+PGNpcmNsZSBjeD0iOSIgY3k9IjkiIHI9IjUiIHN0cm9rZT0iI2ZmZiIgZmlsbD0iIzI5YjZmMiIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9zdmc+" preserveAspectRatio="none"></image>`;
    g_resizer.innerHTML = image;
    return g_resizer;
}



var sampObj = {x: 376, y: 805, width: 60, height: 80};