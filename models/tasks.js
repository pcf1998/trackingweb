let mongoose = require('../routes/db');
const Schema = require("mongoose");

let TaskSchema = new mongoose.Schema({
        taskName: {type: String, default: 'task name'},
        taskContent: {type: String, default: 'task content'},
        status: {type: String, default: 'processing'},

        createdTime: String,
        lastModifiedTime: String,

        projectID: {type: Schema.Types.ObjectId, ref: 'Tracing'},

        membersID: {type: Schema.Types.ObjectId, ref: 'User'},
    },
    {collection: 'tasks'});

module.exports = mongoose.model('Task', TaskSchema);