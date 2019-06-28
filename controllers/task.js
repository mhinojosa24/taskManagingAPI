const Task = require('../models/task');
const User = require('../models/user');
const router = require('express').Router();
const checkAuth = require('../middleware/checkAuth');


// gets all tasks from user
router.get('/user/:userid/tasks', (req, res) => {
  var currentUser = req.params.userid;
  console.log(currentUser);
  User.findById(currentUser).populate('tasks')
    .then(user => {
      return res.status(200).json(user)
    }).catch(err => {
      console.log(err.message)
    });
});

// creates a new task
router.post('/user/:id/task/new', checkAuth, (req, res) => {
  const task = new Task(req.body);
  console.log('task:', task);

  task.save().then((task) => {
    console.log('req.user:', req.user);
    req.user.tasks.unshift(task);
    req.user.save();

    return res.status(200).send({message: 'Successfully added task'});
  }).catch(console.err);
});

// show a task
router.get('/user/:userid/task/:taskid', (req, res) => {
    // console.log(req.para);
  if (req.params.taskid in req.user.tasks) {
    Task.findById(req.params.taskid).then((task) => {
      return res.status(200).send(task);
    }).catch((err) => {
      console.log('here comes the error');
      console.log(err.message);
    });
  } else {
    res.status(401).send({message: 'Wrong one'});
  }
});


// edit and updates a task
router.put('/user/:userid/task/:taskid/edit', (req, res) => {
  let taskId = req.params.taskid;
  Task.findByIdAndUpdate(taskId, {$set: req.body}).then(task => {
    return res.status(200).send(task);
  }).catch(err => {
    res.status(404).send({message: 'Did not find task'});
    console.log('Error => ', err);
  });
});



module.exports = router;
