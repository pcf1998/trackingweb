let mongoose = require('mongoose');

let TrackingSchema = new mongoose.Schema({
        teamID: {type: String, default: 'team ID'},
        teamLeader: {type: String, default: 'team leader'},
        teamMembers: {type: Array, default: ['member A', 'member B', 'member C', 'member D']},
        memberNum: {type: Number, default: 5},

        createdTime: String,
        lastModifiedTime: Array,
        projectID: {type: String, default: 'project ID'},
        projectName: {type: String, default: 'project name'},
        content: Array,
        status: {type: String, default: 'processing'},
        attachments: Array,
        operationsNum: {type: Number, default: 0}
    },
    {collection: 'tracings'});

module.exports = mongoose.model('Tracing', TrackingSchema);