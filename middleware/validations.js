const validator = require('../helper/validate');

const saveMovie = (req, res, next) => {
  const validationRule = {
    id: "required|string",
    name: "required|string",
    rating: "required|string",
    time: "required|string",
    gender: "required|string",
    releaseDate: "required|string",
    language: "required|string",
    subtitles: "required|string"
  };
  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: 'Validation failed',
        data: err
      });
    } else {
      next();
    }
  });
};

const saveTicket = (req, res, next) => {
    const validationRule = {
      id: "required|string",
      cinemaName: "required|string",
      movieName: "required|string",
      date: "required|string",
      time: "required|string",
      hall: "required|string",
      seat: "required|string"
    };
    validator(req.body, validationRule, {}, (err, status) => {
      if (!status) {
        res.status(412).send({
          success: false,
          message: 'Validation failed',
          data: err
        });
      } else {
        next();
      }
    });
  };



module.exports = {
  saveMovie,
  saveTicket
};