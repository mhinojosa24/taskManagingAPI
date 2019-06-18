const Task = require('../models/task');
const User = require('../models/user');
const router = require('express').Router();
const checkAuth = require('../middleware/checkAuth');

// creates a new task
router.post('/user/:id/task/new', checkAuth, (req, res) => {
  console.log('here in task route');
  const task = new Task(req.body);
  console.log('task:', task);
  task.save().then((task) => {
    console.log('req.user:', req.user);
    req.user.tasks.unshift(task);
    req.user.save();
    return res.status(200)
        .send({message: 'Successfully added task'});
  }).catch(console.err);
});

// show a task
router.get('/user/:userid/task/:taskid', (req, res) => {
    console.log(req.para);
  if (req.params.taskid in req.user.tasks) {
    Task.findById(req.params.taskid).then((taskID) => {
      return res.status(200).send(taskID);
    }).catch((err) => {
      console.log('here comes the error');
      console.log(err.message);
    });
  } else {
    res.status(401).send({message: 'Wrong one'});
  }
});


module.exports = router;
