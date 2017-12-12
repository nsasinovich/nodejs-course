import Config from 'config';
import { User, Product } from 'models';
import DirWatcher from 'modules/dirwatcher';
import Importer from 'modules/importer';
import { DirWatcherEvents } from 'modules/dirwatcher/DirWatcher.Constants';
import DirWatcherEventEmitter from 'modules/dirwatcher/DirWatcher.EventEmitter';

console.log(`App name: ${Config.name}`);

const user = new User();
const product = new Product();

const dirWatcher = new DirWatcher();
const importer = new Importer();

importer.subscribeToUpdate(DirWatcherEventEmitter, DirWatcherEvents.CHANGED, false)
dirWatcher.watch(Config.pathToDirectory, Config.delay);
