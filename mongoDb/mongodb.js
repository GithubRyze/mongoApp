const mongoose = require('mongoose');
const logger = require('../common/logger');
var options = {
    useMongoClient: true,
    reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
    reconnectInterval: 500, // Reconnect every 500ms
    poolSize: 10, // Maintain up to 10 socket connections
    // If not connected, return errors immediately rather than waiting for reconnect
    bufferMaxEntries: 0
  };
mongoose.Promise = global.Promise;
module.exports = mongoose.connect('mongodb://localhost/piot',options,err => {
    if(err){
        logger.error('connect to %s error: ', config.db, err.message);
        throw new Error(err);
    }
});
