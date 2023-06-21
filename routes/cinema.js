const routes = require('express').Router();
const cinema = require('../controllers/updater');


routes.get('/movies', cinema.getAllMovies);
routes.post('/movies/post', cinema.newMovie);
routes.get('/tickets', cinema.getAllTickets);
routes.post('/tickets/post', cinema.newTicket);

module.exports = routes;