import Config from './config';
import { User, Product } from './models';

console.log(`App name: ${Config.name}`);

const user = new User();
const product = new Product();
