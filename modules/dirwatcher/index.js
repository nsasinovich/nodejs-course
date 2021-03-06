import fs from 'fs';
import DirWatcherEventEmitter from './DirWatcher.EventEmitter';
import { DirWatcherEvents } from './DirWatcher.Constants';


function dirChangeListener(delay) {
    let listenerPauseTimeout = null;

    return function(eventType, fileName) {
        if(!listenerPauseTimeout) {
            listenerPauseTimeout = setTimeout(() => {
                if(eventType === 'change') {
                    DirWatcherEventEmitter.emit(DirWatcherEvents.CHANGED, fileName);
                }

                listenerPauseTimeout = null;
            }, delay);
        }
    }
}

class DirWatcher {
    watch(path, delay) {
        fs.watch(path, { recursive: true }, dirChangeListener(delay));
    }
}

export default DirWatcher;
