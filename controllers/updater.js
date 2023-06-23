const mongodb = require('../db/connection');
const ObjectId = require('mongodb').ObjectId;

const getAllMovies = (req, res) => {
    try {
        mongodb.databaseConnected().db('cinema').collection('movies').find()
        .toArray().then((data) => {
          res.status(200).send(data);
        })
        .catch((err) => {
          res.status(500).send({
            message: err.message || 'Some error occurred while retrieving users.'
          });
        });
    } catch (err) {
      res.status(500).json(err);
    }
  };
  

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

const updateMovie = async (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid movie id to find a movie.');
      }
    const userId = new ObjectId(req.params.id);

    const newData = {
        id: req.body.id,
        name: req.body.name,
        rating: req.body.rating,
        time: req.body.time,
        gender: req.body.gender,
        releaseDate: req.body.releaseDate,
        language: req.body.language,
        subtitles:req.body.subtitles
    };
    const result = await mongodb.databaseConnected().db('cinema').collection('movies').replaceOne({ _id: userId }, newData);
    console.log(result);
    if (result.modifiedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(result.error || 'It seems to be an error creating a new collection.');
    }

}

const deleteMovie = async (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid movie id to find a movie.');
      }
    const userId = new ObjectId(req.params.id);

    const result = await mongodb.databaseConnected().db('cinema').collection('movies').deleteOne({ _id: userId });
    console.log(result);
    if (result.deletedCount > 0) {
        res.status(200).send();
    } else {
        res.status(500).json(result.error || 'The data could not be deleted.');
    }
}

const getAllTickets = async (req, res) => {
    try {
        mongodb.databaseConnected().db('cinema').collection('tickets').find()
        .toArray().then((data) => {
          res.status(200).send(data);
        })
        .catch((err) => {
          res.status(500).send({
            message: err.message || 'Some error occurred while retrieving users.'
          });
        });
    } catch (err) {
      res.status(500).json(err);
    }
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

const updateTicket = async (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid ticket id to find a ticket.');
      }
    const userId = new ObjectId(req.params.id);

    const newData = {
        id: req.body.id,
        cinemaName: req.body.cinemaName,
        movieName: req.body.movieName,
        date: req.body.date,
        time: req.body.time,
        hall: req.body.hall,
        seat: req.body.seat
    };
    const result = await mongodb.databaseConnected().db('cinema').collection('tickets').replaceOne({ _id: userId }, newData);
    console.log(result);
    if (result.modifiedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(result.error || 'It seems to be an error creating a new collection.');
    }

}

const deleteTicket = async (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid ticket id to find a ticket.');
      }
    const userId = new ObjectId(req.params.id);

    const result = await mongodb.databaseConnected().db('cinema').collection('tickets').deleteOne({ _id: userId });
    console.log(result);
    if (result.deletedCount > 0) {
        res.status(200).send();
    } else {
        res.status(500).json(result.error || 'The data could not be deleted.');
    }
}

module.exports = {
    getAllMovies,
    newMovie,
    updateMovie,
    deleteMovie,
    getAllTickets,
    newTicket,
    updateTicket,
    deleteTicket
}