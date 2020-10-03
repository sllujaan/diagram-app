

class EventHandler {
    constructor() {}

    initEventHandler() {
        this.registerEvents();
    }

    registerEvents() {
        window.addEventListener("resize", e => {
            //console.log(e);
        })
    }


}

const _eHandler = new EventHandler();

export { _eHandler }