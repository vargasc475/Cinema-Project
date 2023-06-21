const mongodb = require('../db/connection');

const getAllMovies = async (req, res) => {
    const result = await mongodb.databaseConnected().db('cinema').collection('movies').find();
    result.toArray().then((lists) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lists);
    });
}

const newMovie = async (req, res) => {

    const newDoc = {
        id: req.body.id,
        name: req.body.name,
        rating: req.body.rating,
        time: req.body.time,
        gender: req.body.gender,
        releaseDate: req.body.releaseDate,
        language: req.body.language,
        subtitles:req.body.subtitles
    };

    const result = await mongodb.databaseConnected().db('cinema').collection('movies').insertOne(newDoc);
    if (result.acknowledged) {
        res.status(201).json(result);
    } else {
        res.status(500).json(result.error || 'It seems to be an error creating a new movie.');
    }
};

const getAllTickets = async (req, res) => {
    const result = await mongodb.databaseConnected().db('cinema').collection('tickets').find();
    result.toArray().then((lists) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lists);
    });
};

const newTicket = async (req, res) => {

    const newDoc = {
        id: req.body.id,
        cinemaName: req.body.cinemaName,
        movieName: req.body.movieName,
        date: req.body.date,
        time: req.body.time,
        hall: req.body.hall,
        seat: req.body.seat
    };

    const result = await mongodb.databaseConnected().db('cinema').collection('tickets').insertOne(newDoc);
    if (result.acknowledged) {
        res.status(201).json(result);
    } else {
        res.status(500).json(result.error || 'It seems to be an error creating a new movie.');
    }
};

module.exports = {
    getAllMovies,
    newMovie,
    getAllTickets,
    newTicket
}