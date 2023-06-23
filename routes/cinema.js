const routes = require('express').Router();
const cinema = require('../controllers/updater');
const validation = require('../middleware/validations');


routes.get('/movies', cinema.getAllMovies);
routes.post('/movies/post', validation.saveMovie, cinema.newMovie);
routes.put('/movies/put/:id', validation.saveMovie, cinema.updateMovie);
routes.delete('/movies/delete/:id', cinema.deleteMovie);
routes.get('/tickets', cinema.getAllTickets);
routes.post('/tickets/post', validation.saveTicket, cinema.newTicket);
routes.put('/tickets/put/:id', validation.saveTicket, cinema.updateTicket);
routes.delete('/tickets/delete/:id', cinema.deleteTicket);

module.exports = routes;