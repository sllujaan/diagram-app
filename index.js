import { _mouseDirection } from "./MouseDirections.js"





    var svg = document.querySelector("svg");
    var circle = document.getElementsByTagName('circle')[0];
    var paper = document.querySelector(".paper");
    var diagram = document.querySelector(".diagram");
    console.log(svg);

    var mouseDown = false;
    var mouseMove = false;
    var _mouseDown_leftResize = false;
    var diffX = 0;
    var diffY = 0;
    var oldX = 0;
    var oldY = 0;

    var targetedDiagram = null;


    document.addEventListener('mousedown', e => {
        diffX = e.clientX - diagram.offsetLeft;
        diffY = e.clientY - diagram.offsetTop;

        if(e.target.id === "diagram") {
            mouseDown = true;
        }

        if(e.target.id === "move-right") {
            _mouseDown_leftResize = true;
        }

        console.log(e.target.id);
    })

    document.addEventListener('mousemove', e => {
        mouseMove = true;

        if(mouseDown) {
            
            if(e.target == circle) targetedDiagram = circle;

            if(isMovingRight(e) && !canMoveDiagramRight() ) return;

            const _clientX = e.clientX - diffX;
            const _clientY = e.clientY - diffY;
            diagram.style.setProperty("left", `${_clientX}px`);
            diagram.style.setProperty("top", `${_clientY}px`);
        }



        const direction = getMouseMoveDirection(e);

        if(_mouseDown_leftResize) handleIncreaseResizeLeft(e);

        // if(_mouseDown_leftResize && direction === "right") {
        //     handleIncreaseResizeLeft(e);
        // }
        // else if(_mouseDown_leftResize && direction === "left") {
        //     console.log('decrease it.');
        //     handleDecreaseResizeLeft();
        // }


        //console.log(oldX, e.clientX);
        //console.log(getMouseMoveDirection(e));
        //if(isMovingRight(e)) console.log("right");
        //if(isMovingTop(e)) console.log("Top");
        //if(isMovingLeft(e)) console.log("Left");
        //if(isMovingDown(e)) console.log("Down");

        //if(e.target == diagram) console.log("target is daigram");

        if(_mouseDirection.isMovingTop(e)) console.log("top");
        if(_mouseDirection.isMovingDown(e)) console.log("down");
        if(_mouseDirection.isMovingLeft(e)) console.log("left");
        if(_mouseDirection.isMovingRight(e)) console.log("right");
        

    })

    document.addEventListener('mouseup', e => {
        mouseDown = false;
        mouseMove = false;
        _mouseDown_leftResize = false;
        diffX = 0;
        diffY = 0;

        console.log(targetedDiagram);
    })

    function getComputedProperty(element, property) {
        const compStyles = window.getComputedStyle(element);
        return compStyles.getPropertyValue(property);
    }

    function getElmentWidth(element) {
        return parseFloat(getComputedProperty(element, "width").split("px")[0]);
    }
    function getElmentHeight(element) {
        return parseFloat(getComputedProperty(element, "height").split("px")[0]);
    }

    function handleIncreaseResizeLeft(e) {
        handleResizeLeft(e, true);
    }

    function handleDecreaseResizeLeft() {
        handleResizeLeft(false);
    }

    function handleResizeLeft(e, increment) {
        const radius = parseFloat(circle.getAttribute("r"));
        var newRadius = '';

        newRadius = `` + generateNewRadiusOfCircle(e);
        
        // if(increment) {newRadius = `${radius+.5}`;}
        // else {newRadius = `${radius-.5}`;}
        
        circle.setAttribute("r", newRadius);

        const newSvgWidth_height = (newRadius*2) + 4;

        svg.setAttribute("width", `${newSvgWidth_height}`);
        svg.setAttribute("height", `${newSvgWidth_height}`);

        //center the radius
        circle.setAttribute("cx", `${Math.floor(newRadius) + 2}`);
        circle.setAttribute("cy", `${Math.floor(newRadius) + 2}`);
    }



    function getMouseMoveDirection(e) {

        var direction = "";

        if(oldX < e.clientX) {
            direction = "right";
            oldX = e.clientX - 1;
        }
        else {
            oldX = e.clientX;
        }

        // else if (oldX > e.pageX) {
        //     direction = "left";
        // }

        

        return direction;
    }

    oldX = 0;
    function isMovingRight(e) {
        if(oldX < e.clientX) {
            //direction = "right";
            oldX = e.clientX - 1;
            return true;
        }
        else {
            oldX = e.clientX;
            return false;
        }
    }

    function isMovingLeft(e) {

        if(e.clientX < oldX) {
            oldX = e.clientX;
            return true;
        }
        else {
            oldX = e.clientX - 1;
            return false;
        }
    }

    oldY = 0;
    function isMovingTop(e) {
        if(oldY > e.clientY) {
            //direction = "right";
            oldY = e.clientY - 1;
            return true;
        }
        else {
            oldY = e.clientY;
            return false;
        }
    }

    function isMovingDown(e) {
        if(oldY < e.clientY) {
            //direction = "right";
            oldY = e.clientY - 1;
            return true;
        }
        else {
            oldY = e.clientY;
            return false;
        }
    }

    function canMoveDiagramRight() {
        const paper_offsetRight = getOffsetRight(paper);
        const diagram_offsetRight = getOffsetRight(diagram);

        if(diagram_offsetRight >= paper_offsetRight) return false;
        
        return true;
        
    }


    
    function generateNewRadiusOfCircle(e) {
        console.log(diagram.offsetLeft);
        //console.log(e.clientX)

        const newRadius = (e.clientX - diagram.offsetLeft) / 2;
        
        console.log(e.clientX, newRadius);

        if( (!newRadius || newRadius < 5) || !canResizeDiagram()) return parseFloat(circle.getAttribute("r"));
        return newRadius;
    }

    function getOffsetRight(element) {
        return element.offsetLeft + getElmentWidth(element);
    }

    function getOffsetBottom(element) {
        return element.offsetTop + getElmentHeight(element);
    }


    function canResizeDiagram() {
        // console.log( paper.offsetLeft, getElmentWidth(paper));
        // console.log( paper.offsetTop, getElmentHeight(paper));

        const paper_offsetRight = getOffsetRight(paper);
        const paper_offsetBottom = getOffsetBottom(paper);

        console.log(paper_offsetRight, paper_offsetBottom);

        const diagram_offsetRight = getOffsetRight(diagram);
        const diagram_offsetBottom = getOffsetBottom(diagram);
        console.log(diagram_offsetRight, diagram_offsetBottom);

        if( (diagram_offsetRight+10 >= paper_offsetRight) || (diagram_offsetBottom+10 >= paper_offsetBottom) )
        {
            return false;
        }

        return true;
    }



    function canMoveDiagramLeft() {

    }








    /* function canMove() {
        console.log(parseInt(diagram.getBoundingClientRect().right));
        console.log(parseInt(getElmentWidth(paper)));

        const _diagram_right = parseInt(diagram.getBoundingClientRect().right);
        const _paper_width = parseInt(getElmentWidth(paper));
        if(_diagram_right + 10 < _paper_width) return true;
        return false;
    } */
