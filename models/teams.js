let mongoose = require('../routes/db');
const Schema = mongoose.Schema;

let TeamSchema = new mongoose.Schema({
        teamName: {type: String, default: 'team name'},
        teamMembersID: [{type: Schema.Types.ObjectId, ref: 'User'}],
        memberNum: {type: Number},

        projectID: {type: Schema.Types.ObjectId, ref: 'Tracing'},

        createdTime: String,
        lastModifiedTime: String,
    },
    {collection: 'teams'});

module.exports = mongoose.model('Team', TeamSchema);