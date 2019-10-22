let express = require('express');
let mongoose = require('mongoose');
let Tracing = require('../models/tracings');
let sd = require('silly-datetime');

let router = express.Router();

let username = 'leopan';
let password = 'leo123456';
let mongodburl = 'mongodb+srv://' + username + ':' + password + '@wit-tracking-system-cluster-t9uwg.mongodb.net/tracingsdb'
mongoose.connect(mongodburl, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false});

let db = mongoose.connection;

db.on('error', function (err) {
    console.log('Unable to Connect to [ ' + db.name + ' ]', err);
});

db.once('open', function () {
    console.log('Successfully Connected to [ ' + db.name + ' ]');
});

router.findAll = (req, res) => {
    // Return a JSON representation of tracings list
    res.setHeader('Content-Type', 'application/json');

    Tracing.find(function (err, tracings) {
        if (err)
            res.send(JSON.stringify(err, null, 5));
        res.send(JSON.stringify(tracings, null, 5));
    });
}

// function getByValue(array, id) {
//     var result = array.filter(function (obj) {
//         return obj.id == id;
//     });
//     return result ? result[0] : null; // or undefined
// }

router.findOne = (req, res) => {

    res.setHeader('Content-Type', 'application/json');

    Tracing.find({"_id": req.params.id}, function (err, tracing) {
        if (err)
            res.json({message: "Tracing NOT Found!", errmsg: err});
        // return a suitable error message
        else
            res.send(JSON.stringify(tracing, null, 5));
        // return the tracing
    });
}

router.addTracing = (req, res) => {

    res.setHeader('Content-Type', 'application/json');

    var tracing = new Tracing();

    // the requested value
    tracing.teamID = req.body.teamID;
    tracing.teamLeader = req.body.teamLeader;
    tracing.teamMembers = req.body.teamMembers;
    tracing.memberNum = tracing.teamMembers.length + 1;

    tracing.projectID = req.body.projectID;
    tracing.projectName = req.body.projectName;
    tracing.content = req.body.content;
    tracing.status = req.body.status;

    var nowTime = sd.format(new Date(), 'YYYY-MM-DD HH:mm:ss');
    tracing.createdTime = new Date();
    tracing.lastModifiedTime.push(nowTime);

    tracing.save(function (err) {
        if (err)
            res.json({message: "Tracing NOT Successfully Added!", errmsg: err});
        // return a suitable error message
        else
            res.json({message: 'Tracing Successfully Added!', data: tracing});
        // return a suitable success message
    });
}

router.incrementOperationsNum = (req, res) => {

    Tracing.findById(req.params.id, function (err, tracing) {
        if (err)
            res.send(JSON.stringify(err, null, 5));
        // return a suitable error message
        else {
            tracing.operationsNum += 1;
            tracing.save(function (err) {
                if (err)
                    res.send(JSON.stringify(err, null, 5));
                // return a suitable error message
                else
                    res.json({message: "Operations Number Updated!", data: tracing});
                // return a suitable success message
            });
        }
    });
}

router.deleteTracing = (req, res) => {

    Tracing.findByIdAndRemove(req.params.id, function (err) {
        if (err)
            res.json({message: "Tracing NOT Successfully Deleted!", errmsg: err});
        else
            res.json({message: 'Tracing Successfully Deleted!'});
    });
}

function getTotalOperationsNum(array) {
    let totalOperationsNum = 0;
    array.forEach(function (obj) {
        totalOperationsNum += obj.operationsNum;
    });
    return totalOperationsNum;
}

router.findTotalOperationsNum = (req, res) => {

    Tracing.find(function (err, tracings) {
        if (err)
            res.json({message: "Something Went Wrong!", errmsg: err});
        // return a suitable error message
        else {
            let operationsNum = getTotalOperationsNum(tracings);
            res.json({totalOperationsNum: operationsNum});
            // return the total operations number
        }
    });
}

module.exports = router;