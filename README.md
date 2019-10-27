# trackingweb
##Student Name: Chengfeng Pan
##Student Number: 20086418
github project: https://github.com/pcf1998/trackingweb-1.0.git  
YouTube ：https://youtu.be/mDb9bpIo7l4

For now, there are four models with Schema and related to each other.  
In users table of the database, the password created by the user will be stored into the user table when it has been encrypted more than 10 times. It will be very safe to store the user data.  
###what can the API do ?  
All the functions will be displayed in the video with the automated testing tool  Postman.
####about GET function:  
######for users  
* '/users'  
* '/users/:userID'

######for tracings
* '/tracings'  
* '/tracings/:projectID' 

######for tasks  
* '/tracings/:projectID/tasks'  
* '/tracings/:projectID/tasks/:taskID'  
* '/tracings/:projectID/teams/:teamID/tasks/'  
* '/tracings/:projectID/teams/:teamID/tasks/:taskID'

######for teams  
* '/teams'  
* '/teams/:teamID'  
* '/tracings/:projectID/teams/'  
* '/tracings/:projectID/teams/:teamID'

####about POST function:  
######for users  
* '/users'  
must have userName, userPassword, email, mobilePhone, gender, dateOfBirth
######for tracings  
* '/tracings'  
must have projectName  

* '/tracings/:projectID/stages'  
must have req.body.stages(stages is an array[])
######for tasks  
* '/tracings/:projectID/teams/:teamID/tasks'  
must have taskName and membersID
######for teams
* '/tracings/:projectID/teams'  
must have teamName and teamMembersID(teamMembersID is an array[])
* '/tracings/:projectID/teams/:teamID/teamMembersID'

####about PUT function:  
######for users
* '/users/:userID/example'  
example(req.body.xxxx) can be userName, userPassword, status, department, position, email, mobilePhone, fax, telephone, address, gender, dateOfBirth, educationalDegree, maritalStatus, entryDate, leave  
dateOfBirth and entryDate must be the format of xxxx-xx-xx(year-month-date)  
when '/users/:userID/leave' the req.body must be none/empty/null
######for tracings
* '/tracings/:projectID/projectName'  
must have req.body.projectName
* '/tracings/:projectID/status'   
must have req.body.status
* '/tracings/:projectID/stages/:whichStageToModify'  
must have req.params.whichStageToModify and req.body.stages(NOT an array)
######for tasks  
* '/tracings/:projectID/teams/:teamID/tasks/:taskID/taskContent'  
must have req.body.taskContent
* '/tracings/:projectID/teams/:teamID/tasks/:taskID/taskName'   
must have req.body.taskName  
* '/tracings/:projectID/teams/:teamID/tasks/:taskID/taskStatus'  
must have req.body.status
######for teams
* '/tracings/:projectID/teams/:teamID/teamName'  
must have req.body.teamName
* '/tracings/:projectID/teams/:teamID/teamMembersID/:whichTeamMemberIDToUpdate'  
must have req.params.whichTeamMemberIDToUpdate and req.body.teamMembersID(NOT an array)

####about DELETE function:  
######for users
* '/users/:userID'  
######for tracings
* '/tracings/:projectID'  
* '/tracings/:projectID/stages/:whichStageToDelete'  
the req.params.whichStageToDelete must be a legal number
######for tasks 
* '/tracings/:projectID/teams/:teamID/tasks/:taskID'
######for teams
* '/tracings/:projectID/teams/:teamID'  
* '/tracings/:projectID/teams/:teamID/teamMembersID/:teamMemberID'


###reference
1. How to write automated tests for APIs using Postman - Part 1 - Postman Blog Postman Blog. (2014). How to write automated tests for APIs using Postman - Part 1 - Postman Blog. [online] Available at: https://blog.getpostman.com/2014/03/07/writing-automated-tests-for-apis-using-postman/ [Accessed 27 Oct. 2019].  
2. nodejs中使用bcrypt加密 - o_heart - CSDN博客 Blog.csdn.net. (2019). nodejs中使用bcrypt加密 - o_heart - CSDN博客. [online] Available at: https://blog.csdn.net/original_heart/article/details/78538908 [Accessed 27 Oct. 2019].
3. Error), M. and sharma, H. Error), M. and sharma, H. (2016). Mongoose: Remove object from array based on ID (Cast Error). [online] Stack Overflow. Available at: https://stackoverflow.com/questions/35973960/mongoose-remove-object-from-array-based-on-id-cast-error [Accessed 27 Oct. 2019].  
4. Connect via Compass — MongoDB Atlas Docs.atlas.mongodb.com. (2019). Connect via Compass — MongoDB Atlas. [online] Available at: https://docs.atlas.mongodb.com/compass-connection/ [Accessed 27 Oct. 2019].  
5. body, E. body, E. (2014). Empty response body. [online] Stack Overflow. Available at: https://stackoverflow.com/questions/26797196/empty-response-body [Accessed 27 Oct. 2019].  

