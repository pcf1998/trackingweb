let mongoose = require('../routes/db');

let UserSchema = new mongoose.Schema({
        userName: {type: String, default: 'username'},
        userPassword: String,
        status: {type: String, default: 'on'},

        department: {type: String, default: 'Marketing'},
        position: {type: String, default: 'staff'},

        email: String,
        mobilePhone: String,
        fax: String,
        telephone: String,
        address: String,

        gender: {type: String, default: 'male'},
        dateOfBirth: String,
        age: Number,
        educationalDegree: {type: String, default: 'bachelor'},
        maritalStatus: {type: String, default: 'single'},

        lastModifiedTime: String,
        entryDate: String,
        yearsOfWork: Number,
        leaveDate: {type: String, default: 'xxxx-xx-xx'}
    },
    {collection: 'users'});

module.exports = mongoose.model('User', UserSchema);