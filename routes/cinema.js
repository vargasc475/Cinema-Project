const routes = require('express').Router();
const cinema = require('../controllers/updater');
const validation = require('../middleware/validations');

const { isAuthenticated } = require('../middleware/authenticate');


routes.get('/movies', cinema.getAllMovies);
routes.post('/movies/post', isAuthenticated, validation.saveMovie, cinema.newMovie);
routes.put('/movies/put/:id', isAuthenticated, validation.saveMovie, cinema.updateMovie);
routes.delete('/movies/delete/:id', isAuthenticated, cinema.deleteMovie);
routes.get('/tickets', cinema.getAllTickets);
routes.post('/tickets/post', isAuthenticated, validation.saveTicket, cinema.newTicket);
routes.put('/tickets/put/:id', isAuthenticated, validation.saveTicket, cinema.updateTicket);
routes.delete('/tickets/delete/:id', isAuthenticated, cinema.deleteTicket);

module.exports = routes;