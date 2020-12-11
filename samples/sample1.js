
var svg = document.getElementsByTagName("svg")[0];


document.addEventListener("click", e => {
    
    if(isDiagram(e)) {
        initDiagramResizers(e);
    }
})

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
    var g_box = g_diag.getBBox();
    var g_resizer_global = document.createElementNS("http://www.w3.org/2000/svg", "g");
    
    //north east resizer---
    var g_resizer = generateResizer(g_box.x, g_box.y);
    g_resizer_global.append(g_resizer);

    //north east resizer---
    var g_resizer = generateResizer(g_box.x+g_box.width, g_box.y+g_box.height);
    g_resizer_global.append(g_resizer);

    //north east resizer---
    var g_resizer = generateResizer(g_box.x+g_box.width, g_box.y+g_box.height);
    g_resizer_global.append(g_resizer);



    return g_resizer_global;
}


function generateResizer(x, y) {
    var g_resizer = document.createElementNS("http://www.w3.org/2000/svg", "g");
    var image = `<image x="${x}" y="${y}" width="5" height="5" xlink:href="data:image/svg+xml;base64,PCFET0NUWVBFIHN2ZyBQVUJMSUMgIi0vL1czQy8vRFREIFNWRyAxLjEvL0VOIiAiaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkIj48c3ZnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHdpZHRoPSIxOHB4IiBoZWlnaHQ9IjE4cHgiIHZlcnNpb249IjEuMSI+PGNpcmNsZSBjeD0iOSIgY3k9IjkiIHI9IjUiIHN0cm9rZT0iI2ZmZiIgZmlsbD0iIzI5YjZmMiIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9zdmc+" preserveAspectRatio="none"></image>`;
    g_resizer.innerHTML = image;
    return g_resizer;
}
