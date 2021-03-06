var express = require('express');
let User = require('../models/users');
let sd = require('silly-datetime');

var router = express.Router();

//find all users
router.findAll = (req, res) => {
    // Return a JSON representation of tracings list
    res.setHeader('Content-Type', 'application/json');

    User.find(function (err, users) {
        if (err)
            return res.send(JSON.stringify(err, null, 5));
        return res.send(JSON.stringify(users, null, 5));
    });
};

//find one user
router.findOne = (req, res) => {
    res.setHeader('Content-Type', 'application/json');

    User.findById(req.params.userID, function (err, user) {
        if (err)
            return res.send(JSON.stringify(err, null, 5));
        else {
            if (user == null) {
                return res.json({message: "user NOT Found!"});
            } else {
                user.age = getAge(user.dateOfBirth);

                user.save(function (err) {
                    if (err)
                        return res.json({message: "User age NOT Successfully updated!", errmsg: err});
                    // return a suitable error message
                    else
                        return res.send(JSON.stringify(user, null, 5));
                    // return a suitable success message
                });

            }
        }
    });
};

//add user
router.addUser = (req, res) => {

    res.setHeader('Content-Type', 'application/json');

    let user = new User();

    // the requested value
    user.userName = req.body.userName;
    user.userPassword = req.body.userPassword;
    user.email = req.body.email;
    user.mobilePhone = req.body.mobilePhone;
    user.gender = req.body.gender;
    user.dateOfBirth = req.body.dateOfBirth;


    user.fax = req.body.userName + "'s fax";
    user.telephone = req.body.userName + "'s telephone";
    user.adderss = req.body.userName + "'s address";

    user.age = getAge(user.dateOfBirth);

    user.entryDate = sd.format(new Date(), 'YYYY-MM-DD');
    user.yearsOfWork = getAge(user.entryDate);
    user.lastModifiedTime = sd.format(new Date(), 'YYYY-MM-DD HH:mm:ss');

    user.save(function (err) {
        if (err)
            return res.json({message: "User NOT Successfully Added!", errmsg: err});
        // return a suitable error message
        else {
            User.findById(user._id, function (err, user) {
                if (err)
                    return res.json({message: "User NOT Successfully Added after saved!", errmsg: err});
                else
                    return res.json({message: 'User Successfully Added!', data: user});
            });
        }
    });
};

//update User Name
router.updateUserName = (req, res) => {
    res.setHeader('Content-Type', 'application/json');

    User.findById(req.params.userID, function (err, user) {
        if (err)
            return res.send(JSON.stringify(err, null, 5));
        else {
            user.userName = req.body.userName;

            user.age = getAge(user.dateOfBirth);
            //update last modified time
            user.yearsOfWork = getAge(user.entryDate);

            user.lastModifiedTime = sd.format(new Date(), 'YYYY-MM-DD HH:mm:ss');

            user.save(function (err) {
                if (err)
                    return res.json({message: "user name NOT Successfully Updated!", errmsg: err});
                // return a error message
                else
                    return res.json({message: 'user name Successfully Updated!', data: user});
                // return a success message
            })
        }
    });
};

//update User Password
router.updateUserPassword = (req, res) => {
    res.setHeader('Content-Type', 'application/json');

    User.findById(req.params.userID, function (err, user) {
        if (err)
            return res.send(JSON.stringify(err, null, 5));
        else {
            user.userPassword = req.body.userPassword;

            user.age = getAge(user.dateOfBirth);
            //update last modified time
            user.lastModifiedTime = sd.format(new Date(), 'YYYY-MM-DD HH:mm:ss');

            user.yearsOfWork = getAge(user.entryDate);

            user.save(function (err) {
                if (err)
                    return res.json({message: "user Password NOT Successfully Updated!", errmsg: err});
                else {
                    User.findById(user._id, function (err, user) {
                        if (err)
                            return res.json({
                                message: "User password NOT Successfully Updated after saved!",
                                errmsg: err
                            });
                        else
                            return res.json({message: 'User password Successfully Updated!', data: user});
                    });
                }
            })
        }
    });
};

//update Status
router.updateStatus = (req, res) => {
    res.setHeader('Content-Type', 'application/json');

    User.findById(req.params.userID, function (err, user) {
        if (err)
            return res.send(JSON.stringify(err, null, 5));
        else {
            user.status = req.body.status;

            user.age = getAge(user.dateOfBirth);
            //update last modified time
            user.lastModifiedTime = sd.format(new Date(), 'YYYY-MM-DD HH:mm:ss');

            user.yearsOfWork = getAge(user.entryDate);

            user.save(function (err) {
                if (err)
                    return res.json({message: "user status NOT Successfully Updated!", errmsg: err});
                // return a error message
                else
                    return res.json({message: 'user status Successfully Updated!', data: user});
                // return a success message
            })
        }
    });
};

//update Department
router.updateDepartment = (req, res) => {
    res.setHeader('Content-Type', 'application/json');

    User.findById(req.params.userID, function (err, user) {
        if (err)
            return res.send(JSON.stringify(err, null, 5));
        else {
            user.department = req.body.department;

            user.age = getAge(user.dateOfBirth);
            //update last modified time
            user.lastModifiedTime = sd.format(new Date(), 'YYYY-MM-DD HH:mm:ss');

            user.yearsOfWork = getAge(user.entryDate);

            user.save(function (err) {
                if (err)
                    return res.json({message: "user department NOT Successfully Updated!", errmsg: err});
                // return a error message
                else
                    return res.json({message: 'user department Successfully Updated!', data: user});
                // return a success message
            })
        }
    });
};

//update Position
router.updatePosition = (req, res) => {
    res.setHeader('Content-Type', 'application/json');

    User.findById(req.params.userID, function (err, user) {
        if (err)
            return res.send(JSON.stringify(err, null, 5));
        else {
            user.position = req.body.position;

            user.age = getAge(user.dateOfBirth);
            //update last modified time
            user.lastModifiedTime = sd.format(new Date(), 'YYYY-MM-DD HH:mm:ss');

            user.yearsOfWork = getAge(user.entryDate);

            user.save(function (err) {
                if (err)
                    return res.json({message: "user position NOT Successfully Updated!", errmsg: err});
                // return a error message
                else
                    return res.json({message: 'user position Successfully Updated!', data: user});
                // return a success message
            })
        }
    });
};

//update Email
router.updateEmail = (req, res) => {
    res.setHeader('Content-Type', 'application/json');

    User.findById(req.params.userID, function (err, user) {
        if (err)
            return res.send(JSON.stringify(err, null, 5));
        else {
            user.email = req.body.email;

            user.age = getAge(user.dateOfBirth);
            //update last modified time
            user.lastModifiedTime = sd.format(new Date(), 'YYYY-MM-DD HH:mm:ss');

            user.yearsOfWork = getAge(user.entryDate);

            user.save(function (err) {
                if (err)
                    return res.json({message: "user email NOT Successfully Updated!", errmsg: err});
                // return a error message
                else
                    return res.json({message: 'user email Successfully Updated!', data: user});
                // return a success message
            })
        }
    });
};

//update Mobile Phone
router.updateMobilePhone = (req, res) => {
    res.setHeader('Content-Type', 'application/json');

    User.findById(req.params.userID, function (err, user) {
        if (err)
            return res.send(JSON.stringify(err, null, 5));
        else {
            user.mobilePhone = req.body.mobilePhone;

            user.age = getAge(user.dateOfBirth);
            //update last modified time
            user.lastModifiedTime = sd.format(new Date(), 'YYYY-MM-DD HH:mm:ss');

            user.yearsOfWork = getAge(user.entryDate);

            user.save(function (err) {
                if (err)
                    return res.json({message: "user mobilePhone NOT Successfully Updated!", errmsg: err});
                // return a error message
                else
                    return res.json({message: 'user mobilePhone Successfully Updated!', data: user});
                // return a success message
            })
        }
    });
};

//update Fax
router.updateFax = (req, res) => {
    res.setHeader('Content-Type', 'application/json');

    User.findById(req.params.userID, function (err, user) {
        if (err)
            return res.send(JSON.stringify(err, null, 5));
        else {
            user.fax = req.body.fax;

            user.age = getAge(user.dateOfBirth);
            //update last modified time
            user.lastModifiedTime = sd.format(new Date(), 'YYYY-MM-DD HH:mm:ss');

            user.yearsOfWork = getAge(user.entryDate);

            user.save(function (err) {
                if (err)
                    return res.json({message: "user fax NOT Successfully Updated!", errmsg: err});
                // return a error message
                else
                    return res.json({message: 'user fax Successfully Updated!', data: user});
                // return a success message
            })
        }
    });
};

//update Telephone
router.updateTelephone = (req, res) => {
    res.setHeader('Content-Type', 'application/json');

    User.findById(req.params.userID, function (err, user) {
        if (err)
            return res.send(JSON.stringify(err, null, 5));
        else {
            user.telephone = req.body.telephone;

            user.age = getAge(user.dateOfBirth);
            //update last modified time
            user.lastModifiedTime = sd.format(new Date(), 'YYYY-MM-DD HH:mm:ss');

            user.yearsOfWork = getAge(user.entryDate);

            user.save(function (err) {
                if (err)
                    return res.json({message: "user telephone NOT Successfully Updated!", errmsg: err});
                // return a error message
                else
                    return res.json({message: 'user telephone Successfully Updated!', data: user});
                // return a success message
            })
        }
    });
};

//update Address
router.updateAddress = (req, res) => {
    res.setHeader('Content-Type', 'application/json');

    User.findById(req.params.userID, function (err, user) {
        if (err)
            return res.send(JSON.stringify(err, null, 5));
        else {
            user.address = req.body.address;

            user.age = getAge(user.dateOfBirth);
            //update last modified time
            user.lastModifiedTime = sd.format(new Date(), 'YYYY-MM-DD HH:mm:ss');

            user.yearsOfWork = getAge(user.entryDate);

            user.save(function (err) {
                if (err)
                    return res.json({message: "user address NOT Successfully Updated!", errmsg: err});
                // return a error message
                else
                    return res.json({message: 'user address Successfully Updated!', data: user});
                // return a success message
            })
        }
    });
};

//update Gender
router.updateGender = (req, res) => {
    res.setHeader('Content-Type', 'application/json');

    User.findById(req.params.userID, function (err, user) {
        if (err)
            return res.send(JSON.stringify(err, null, 5));
        else {
            user.gender = req.body.gender;

            user.age = getAge(user.dateOfBirth);
            //update last modified time
            user.lastModifiedTime = sd.format(new Date(), 'YYYY-MM-DD HH:mm:ss');

            user.yearsOfWork = getAge(user.entryDate);

            user.save(function (err) {
                if (err)
                    return res.json({message: "user gender NOT Successfully Updated!", errmsg: err});
                // return a error message
                else
                    return res.json({message: 'user gender Successfully Updated!', data: user});
                // return a success message
            })
        }
    });
};

//update Date Of Birth
router.updateDateOfBirth = (req, res) => {
    res.setHeader('Content-Type', 'application/json');

    User.findById(req.params.userID, function (err, user) {
        if (err)
            return res.send(JSON.stringify(err, null, 5));
        else {
            user.dateOfBirth = req.body.dateOfBirth;

            user.age = getAge(user.dateOfBirth);
            //update last modified time
            user.lastModifiedTime = sd.format(new Date(), 'YYYY-MM-DD HH:mm:ss');

            user.yearsOfWork = getAge(user.entryDate);

            user.save(function (err) {
                if (err)
                    return res.json({message: "user date Of Birth NOT Successfully Updated!", errmsg: err});
                // return a error message
                else
                    return res.json({message: 'user date Of Birth Successfully Updated!', data: user});
                // return a success message
            })
        }
    });
};

//update Educational Degree
router.updateEducationalDegree = (req, res) => {
    res.setHeader('Content-Type', 'application/json');

    User.findById(req.params.userID, function (err, user) {
        if (err)
            return res.send(JSON.stringify(err, null, 5));
        else {
            user.educationalDegree = req.body.educationalDegree;

            user.age = getAge(user.dateOfBirth);
            //update last modified time
            user.lastModifiedTime = sd.format(new Date(), 'YYYY-MM-DD HH:mm:ss');

            user.yearsOfWork = getAge(user.entryDate);

            user.save(function (err) {
                if (err)
                    return res.json({message: "user educational Degree NOT Successfully Updated!", errmsg: err});
                // return a error message
                else
                    return res.json({message: 'user educational Degree Successfully Updated!', data: user});
                // return a success message
            })
        }
    });
};

//update Marital Status
router.updateMaritalStatus = (req, res) => {
    res.setHeader('Content-Type', 'application/json');

    User.findById(req.params.userID, function (err, user) {
        if (err)
            return res.send(JSON.stringify(err, null, 5));
        else {
            user.maritalStatus = req.body.maritalStatus;

            user.age = getAge(user.dateOfBirth);
            //update last modified time
            user.lastModifiedTime = sd.format(new Date(), 'YYYY-MM-DD HH:mm:ss');

            user.yearsOfWork = getAge(user.entryDate);

            user.save(function (err) {
                if (err)
                    return res.json({message: "user marital Status NOT Successfully Updated!", errmsg: err});
                // return a error message
                else
                    return res.json({message: 'user marital Status Successfully Updated!', data: user});
                // return a success message
            })
        }
    });
};

//update Entry Date
router.updateEntryDate = (req, res) => {
    res.setHeader('Content-Type', 'application/json');

    User.findById(req.params.userID, function (err, user) {
        if (err)
            return res.send(JSON.stringify(err, null, 5));
        else {
            user.entryDate = req.body.entryDate;

            user.age = getAge(user.dateOfBirth);
            //update last modified time
            user.yearsOfWork = getAge(user.entryDate);

            user.lastModifiedTime = sd.format(new Date(), 'YYYY-MM-DD HH:mm:ss');

            user.save(function (err) {
                if (err)
                    return res.json({message: "user entry Date NOT Successfully Updated!", errmsg: err});
                // return a error message
                else
                    return res.json({message: 'user entry Date Successfully Updated!', data: user});
                // return a success message
            })
        }
    });
};

//update Leave
router.updateLeave = (req, res) => {
    res.setHeader('Content-Type', 'application/json');

    User.findById(req.params.userID, function (err, user) {
        if (err)
            return res.send(JSON.stringify(err, null, 5));
        else {
            user.leaveDate = sd.format(new Date(), 'YYYY-MM-DD');

            user.status = 'resign';
            user.yearsOfWork = getAge(user.entryDate);

            user.age = getAge(user.dateOfBirth);
            //update last modified time
            user.lastModifiedTime = sd.format(new Date(), 'YYYY-MM-DD HH:mm:ss');

            user.save(function (err) {
                if (err)
                    return res.json({message: "user leave NOT Successfully!", errmsg: err});
                // return a error message
                else
                    return res.json({message: 'user leave Successfully!', data: user});
                // return a success message
            })
        }
    });
};

//delete user
router.deleteUser = (req, res) => {

    User.findByIdAndRemove(req.params.userID, function (err) {
        if (err)
            return res.json({message: "user NOT Successfully Deleted!", errmsg: err});
        else
            return res.json({message: 'user Successfully Deleted!'});
        // return a success message
    });
};

function getAge(strBirthday) {
    var returnAge;
    var strBirthdayArr = (strBirthday || '').split("-");
    var birthYear = strBirthdayArr[0];
    var birthMonth = strBirthdayArr[1];
    var birthDay = strBirthdayArr[2];

    var nowDate = sd.format(new Date(), 'YYYY-MM-DD');
    var strNowDateArr = nowDate.split("-");
    var nowYear = strNowDateArr[0];
    var nowMonth = strNowDateArr[1];
    var nowDay = strNowDateArr[2];

    if (nowYear === birthYear) {
        returnAge = 0;
        //同年 则为0岁
    } else {
        var ageDiff = nowYear - birthYear;
        //年之差
        if (ageDiff > 0) {
            if (nowMonth === birthMonth) {
                var dayDiff = nowDay - birthDay;
                //日之差
                if (dayDiff < 0) {
                    returnAge = ageDiff - 1;
                } else {
                    returnAge = ageDiff;
                }
            } else {
                var monthDiff = nowMonth - birthMonth;
                //月之差
                if (monthDiff < 0) {
                    returnAge = ageDiff - 1;
                } else {
                    returnAge = ageDiff;
                }
            }
        } else {
            returnAge = -1;
            //返回-1 表示出生日期输入错误 晚于今天
        }
    }

    return returnAge;
    //返回周岁年龄

}


module.exports = router;
