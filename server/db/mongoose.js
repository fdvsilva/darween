const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost:27017/DarweenDB');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log("MongoDB successfully opened!")
});

module.exports = mongoose;

/*
// Connecting to DB though mongoDB package.
const MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017/Test', (err,db) => {
if (err) return console.log('Error connecting to DB');

console.log('Connected to DB');

db.collection("testCollection").insertOne({
name: "FDS",
age: 31
}, (err, res) => {
if (err) return console.log('Error inserting one');

return console.log(res);
})

})
*/
