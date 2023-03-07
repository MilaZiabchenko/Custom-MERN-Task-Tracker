import mongoose from 'mongoose';
import Task from '../models/taskModel.js';
import asyncWrapper from '../middleware/asyncWrapper.js';
import { createCustomError } from '../errors/customError.js';

const getTasks = asyncWrapper(async (req, res) => {
  const tasks = await Task.find({}).sort({ updatedAt: -1 });

  res.status(200).json(tasks);
});

const getTask = asyncWrapper(async (req, res, next) => {
  const { id: taskId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(taskId)) {
    return next(createCustomError('Invalid task id', 400));
  }

  const task = await Task.findById(taskId);

  if (!task) {
    return next(createCustomError(`No task with id ${taskId}`, 404));
  }

  res.status(200).json(task);
});

const updateTask = asyncWrapper(async (req, res, next) => {
  const { id: taskId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(taskId)) {
    return next(createCustomError('Invalid task id', 400));
  }

  const task = await Task.findOneAndUpdate(
    { _id: taskId },
    { ...req.body },
    { new: true, runValidators: true }
  );

  if (!task) {
    return next(createCustomError(`No task with id ${taskId}`, 404));
  }

  res.status(200).json(task);
});

const deleteTask = asyncWrapper(async (req, res, next) => {
  const { id: taskId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(taskId)) {
    return next(createCustomError('Invalid task id', 400));
  }

  const task = await Task.findOneAndDelete({ _id: taskId });

  if (!task) {
    return next(createCustomError(`No task with id ${taskId}`, 404));
  }

  res.status(200).json(task);
});

const createTask = asyncWrapper(async (req, res) => {
  const task = await Task.create({ ...req.body });

  res.status(201).json(task);
});

export { getTasks, getTask, updateTask, deleteTask, createTask };
