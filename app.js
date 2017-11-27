import Config from './config';
import { User, Product } from './models';
import DirWatcher from './modules/dirwatcher';

console.log(`App name: ${Config.name}`);

const user = new User();
const product = new Product();

const dirWatcher = new DirWatcher();
dirWatcher.watch(Config.pathToDirectory, Config.delay);
