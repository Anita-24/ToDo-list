const mongoose = require('mongoose');

//connect to the databse
mongoose.connect('mongodb://localhost/todo_list_db');


//acquire the connection to check if it was successful 
const db = mongoose.connection;

//print error 
db.on('error', console.error.bind(console,'error connecting to db'));

//if it is running and up then print the message
db.once('open', function(){
    console.log('successfully connected to the database');
});