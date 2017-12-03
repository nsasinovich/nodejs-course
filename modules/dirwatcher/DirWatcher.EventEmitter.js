import EventEmitter from 'events';

 let instance = null;

class DirWatcherEventEmitter extends EventEmitter {
    constructor() {
        super();
        if(!instance) {
            instance = this;
        }

        return instance;
    }
}

export default new DirWatcherEventEmitter();
