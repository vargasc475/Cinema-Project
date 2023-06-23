const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mongodb = require('./db/connection');

const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })).use((req, res, next) => {
    res.setHeader('Acces-Control-Allow-Origin', '*');
    next();
}).use('/', require('./routes'));

process.on('uncaughtException', (err, origin) => {
    console.log(process.stderr.fd, `Caught exception: ${err}\n` + `Exception origin: ${origin}`);
});

mongodb.databaseConnecting((err) => {
    if (err) {
        console.log(err);
    } else {
        app.listen(port);
        console.log(`Web service is listening at port ${port}`);
    }
});