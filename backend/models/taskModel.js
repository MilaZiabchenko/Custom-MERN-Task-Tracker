import { Schema, model } from 'mongoose';

const taskSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      minlength: [8, 'Task name must be at least 8 characters'],
      required: [true, 'Please, provide a name of the task!']
    },
    time: {
      type: String,
      trim: true,
      minlength: [3, 'Time must be at least 3 characters'],
      maxlength: [25, 'Time can not be more than 25 characters'],
      required: [true, 'Please, provide time scheduled for the task!']
    },
    priority: {
      type: Number,
      min: 1,
      max: 10,
      default: 10
    },
    completed: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);

const Task = model('Task', taskSchema);

export default Task;
