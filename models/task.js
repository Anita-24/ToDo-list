const mongoose = require('mongoose');

const taskSchema = mongoose.Schema({
    name : {
        type : "String",
        required : true
    },
    serial : {
        type : "String",
        required : true
    }
});

//what do we want to name our collection in db

const Task = mongoose.model('task' , taskSchema);

module.exports = Task;