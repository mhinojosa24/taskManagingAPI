const router = require('express').Router();
const Comment = require('../models/comment');
const Task = require('../models/task');



// create a comment to a task
router.post('/task/:taskid/comments', (req, res) => {
  const comment = new Comment(req.body);
  console.log('this is the user id => ', req.user);
  comment.userId = req.user._id;

  comment.save().then(comment => {
    let task = req.params.taskid;
    return Task.findById(task);
  }).then(task => {
    task.comments.unshift(comment);
    task.save();
    return res.status(200).send({message: 'Successfully created comment for task.'});
  }).catch(err => {
    console.log(err.message);
  });
});


module.exports = router;
