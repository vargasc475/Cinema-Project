const MongoClient = require('mongodb').MongoClient;
const dotenv = require('dotenv').config();

let _db;

const databaseConnecting = (callback) => {
    if (_db) {
        console.log('Db is already initialized!');
        return callback(null, _db);
    }
    MongoClient.connect(process.env.MONGO_URI)
        .then((client) => {
            _db = client;
            callback(null, _db);
            console.log('CONNECTED TO DATABASE');
        })
        .catch((err) => {
            callback(err);
        });
};

const databaseConnected = () => {
    if (!_db) {
        throw Error('Db not initialized');
    }
    return _db;
};

module.exports = {
    databaseConnected,
    databaseConnecting
} 