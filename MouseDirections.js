


class MouseDirection {

    #oldPositionX = 0;
    #oldPositionY = 0;

    property = 10;

    constructor(){}

    /**
     * 
     * @param {event} e 
     */
    isMovingLeft(e) {
        if( this.#getDirection_horizontal(e) === "left") return true;
        return false;
    }

    /**
     * 
     * @param {event} e 
     */
    isMovingRight(e) {
        if( this.#getDirection_horizontal(e) === "right") return true;
        return false;
    }

    /**
     * 
     * @param {event} e 
     */
    isMovingTop(e) {
        if( this.#getDirection_vertical(e) === "top") return true;
        return false;
    }

    /**
     * 
     * @param {event} e 
     */
    isMovingDown(e) {
        if( this.#getDirection_vertical(e) === "down") return true;
        return false;
    }



    #getDirection_horizontal(e) {
        var direction = "";
        
        if(e.clientX < this.#oldPositionX) {
            direction = "left";
        }
        else if(e.clientX > this.#oldPositionX) {
            direction = "right";
        }

        this.#oldPositionX = e.clientX;
        return direction;
    }

    #getDirection_vertical(e) {
        var direction = "";
        
        if(e.clientY < this.#oldPositionY) {
            direction = "top";
        }
        else if(e.clientY > this.#oldPositionY) {
            direction = "down";
        }

        this.#oldPositionY = e.clientY;
        return direction;
    }


    

}


const _mouseDirection = new MouseDirection();

export {_mouseDirection};