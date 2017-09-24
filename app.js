'use strict';

const Config = require('./config');
const { User, Product } = require('./models');

console.log(`App name: ${Config.name}`);

const user = new User();
const product = new Product();
