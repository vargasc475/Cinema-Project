const routes = require('express').Router();

routes.use('/', require('./swagger'));
routes.use('/', require('./cinema'));

module.exports = routes;
