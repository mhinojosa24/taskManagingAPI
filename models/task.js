const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const TaskSchema = new Schema({
  taskName: {type: String},
  description: {type: String},
  date: {type: Date},
  userId: [{type: Schema.Types.ObjectId, ref: 'User', default: [""]}],
  comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
  
}, {
  timestamps: true,
});


module.exports = mongoose.model('Task', TaskSchema);
