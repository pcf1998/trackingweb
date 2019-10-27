var express = require('express');
let Task = require('../models/tasks');
let Tracing = require('../models/tracings');
let sd = require('silly-datetime');

var router = express.Router();

//find all tasks in the project
router.findAllInProject = (req, res) => {
    res.setHeader('Content-Type', 'application/json');

    Tracing.findById(req.params.projectID, function (err, tracing) {
        if (err)
            return res.send(JSON.stringify(err, null, 5));
        else {
            if (tracing == null) {
                return res.json({message: "project NOT Found!"});
            } else {
                return res.send(JSON.stringify(tracing.tasksID, null, 5));
            }
        }
    });
};

//find one task in the project
router.findOneInProject = (req, res) => {

    res.setHeader('Content-Type', 'application/json');

    Tracing.findById(req.params.projectID, function (err, tracing) {
        if (err)
            return res.json({message: "Project NOT Found!", errmsg: err});
        // return a suitable error message
        else {
            if (tracing == null) {
                return res.json({message: "project NOT Found!"});
            } else {
                Task.findById(req.params.taskID, function (err, task) {
                    if (err)
                        return res.send(JSON.stringify(err, null, 5));
                    else {
                        if (task == null) {
                            return res.json({message: "task NOT Found!"});
                        } else
                            return res.send(JSON.stringify(task, null, 5));
                    }
                });
            }
        }
    });
};

//add task
router.addTask = (req, res) => {

    res.setHeader('Content-Type', 'application/json');

    Tracing.findById(req.params.projectID, function (err, tracing) {
        if (err)
            return res.json({message: "Project NOT Found!", errmsg: err});
        // return a suitable error message
        else {
            if (tracing == null) {
                return res.json({message: "project NOT Found!"});
            } else {
                let task = new Task();

                task.taskName = req.body.taskName;

                task.projectID = tracing._id;

                task.membersID = req.body.membersID;

                let nowTime = sd.format(new Date(), 'YYYY-MM-DD HH:mm:ss');
                task.createdTime = nowTime;
                task.lastModifiedTime = nowTime;

                task.save(function (err) {
                    if (err)
                        return res.json({message: "task NOT Successfully Added!", errmsg: err});
                    // return a suitable error message
                    else {
                        tracing.tasksID.push(task._id);
                        tracing.tasksNum = tracing.tasksNum + 1;
                        tracing.lastModifiedTime = sd.format(new Date(), 'YYYY-MM-DD HH:mm:ss');

                        tracing.save(function (err) {
                            if (err)
                                return res.json({message: "task Added BUT NOT added to project!", errmsg: err});
                            else
                                return res.json({message: 'task Successfully Added!', data: task});// return a suitable success message
                        })
                    }

                });
            }
        }
    });
};

//update task content
router.updateTaskContent = (req, res) => {

    res.setHeader('Content-Type', 'application/json');

    Tracing.findById(req.params.projectID, function (err, tracing) {
        if (err)
            return res.json({message: "Project NOT Found!", errmsg: err});
        // return a suitable error message
        else {
            if (tracing == null) {
                return res.json({message: "project NOT Found!"});
            } else {
                Task.findById(req.params.taskID, function (err, task) {
                    if (err)
                        return res.json({message: "task NOT Found!", errmsg: err});
                    else {
                        if (task == null) {
                            return res.json({message: "task NOT Found!"});
                        } else {
                            //task.taskName = req.body.taskName;
                            task.taskContent = req.body.taskContent;
                            //task.status = req.body.status;

                            task.lastModifiedTime = sd.format(new Date(), 'YYYY-MM-DD HH:mm:ss');

                            task.save(function (err) {
                                if (err)
                                    return res.json({message: "task content NOT Successfully Update!", errmsg: err});
                                else
                                    return res.json({message: 'task content Successfully Update!', data: task});
                            })
                        }
                    }
                })
            }
        }
    });
};

//update task name
router.updateTaskName = (req, res) => {

    res.setHeader('Content-Type', 'application/json');

    Tracing.findById(req.params.projectID, function (err, tracing) {
        if (err)
            return res.json({message: "Project NOT Found!", errmsg: err});
        // return a suitable error message
        else {
            if (tracing == null) {
                return res.json({message: "project NOT Found!"});
            } else {
                Task.findById(req.params.taskID, function (err, task) {
                    if (err)
                        return res.json({message: "task NOT Found!", errmsg: err});
                    else {
                        if (task == null) {
                            return res.json({message: "task NOT Found!"});
                        } else {
                            task.taskName = req.body.taskName;
                            //task.taskContent = req.body.taskContent;
                            //task.status = req.body.status;

                            task.lastModifiedTime = sd.format(new Date(), 'YYYY-MM-DD HH:mm:ss');

                            task.save(function (err) {
                                if (err)
                                    return res.json({message: "task name NOT Successfully Update!", errmsg: err});
                                else
                                    return res.json({message: 'task name Successfully Update!', data: task});
                            })
                        }
                    }
                })
            }
        }
    });
};

//update task status
router.updateTaskStatus = (req, res) => {

    res.setHeader('Content-Type', 'application/json');

    Tracing.findById(req.params.projectID, function (err, tracing) {
        if (err)
            return res.json({message: "Project NOT Found!", errmsg: err});
        // return a suitable error message
        else {
            if (tracing == null) {
                return res.json({message: "project NOT Found!"});
            } else {
                Task.findById(req.params.taskID, function (err, task) {
                    if (err)
                        return res.json({message: "task NOT Found!", errmsg: err});
                    else {
                        if (task == null) {
                            return res.json({message: "task NOT Found!"});
                        } else {
                            //task.taskName = req.body.taskName;
                            //task.taskContent = req.body.taskContent;
                            task.status = req.body.status;

                            task.lastModifiedTime = sd.format(new Date(), 'YYYY-MM-DD HH:mm:ss');

                            task.save(function (err) {
                                if (err)
                                    return res.json({message: "task status NOT Successfully Update!", errmsg: err});
                                else
                                    return res.json({message: 'task status Successfully Update!', data: task});
                            })
                        }
                    }
                })
            }
        }
    });
};

//delete task
router.deleteTask = (req, res) => {

    res.setHeader('Content-Type', 'application/json');

    Tracing.findById(req.params.projectID, function (err, tracing) {
        if (err)
            return res.json({message: "Project NOT Found!", errmsg: err});
        // return a suitable error message
        else {
            if (tracing == null) {
                return res.json({message: "project NOT Found!"});
            } else {
                Task.findByIdAndRemove(req.params.taskID, function (err) {
                    if (err)
                        return res.json({message: "task NOT Successfully Deleted!", errmsg: err});
                    else {
                        tracing.tasksID.splice(tracing.tasksID.contains(req.params.taskID), 1);
                        tracing.tasksNum = tracing.tasksNum - 1;
                        if (tracing.tasksNum < 0) {
                            tracing.tasksNum = 0;
                        }
                        tracing.lastModifiedTime = sd.format(new Date(), 'YYYY-MM-DD HH:mm:ss');

                        tracing.save(function (err) {
                            if (err)
                                return res.json({
                                    message: "task delete BUT project did NOT delete the task ID!",
                                    errmsg: err
                                });
                            else {
                                return res.json({message: 'task Successfully Deleted!'});
                            }
                        })

                    }
                });
            }
        }
    });
};

Array.prototype.contains = function (obj) {
    var i = this.length;
    while (i--) {
        if (this[i] === obj) {
            return i;  // 返回的这个 i 就是元素的索引下标，
        }
    }
    return false;
};


module.exports = router;
