const Task = require('../models/Task');
const Project = require('../models/Project');

const createTask = async (req, res) => {
  const { title, description, status } = req.body;
  const project = await Project.findOne({ _id: req.params.projectId, owner: req.user._id });
  if (!project) return res.status(403).json({ message: 'Unauthorized' });

  const task = await Task.create({ title, description, status, project: project._id });
  res.status(201).json(task);
};

const getTasks = async (req, res) => {
  const project = await Project.findOne({ _id: req.params.projectId, owner: req.user._id });
  if (!project) return res.status(403).json({ message: 'Unauthorized' });

  const tasks = await Task.find({ project: project._id });
  res.json(tasks);
};

const updateTask = async (req, res) => {
  const project = await Project.findOne({ _id: req.params.projectId, owner: req.user._id });
  if (!project) return res.status(403).json({ message: 'Unauthorized' });

  const task = await Task.findOneAndUpdate(
    { _id: req.params.taskId, project: project._id },
    req.body, { new: true }
  );
  if (!task) return res.status(404).json({ message: 'Task not found' });
  res.json(task);
};

const deleteTask = async (req, res) => {
  const project = await Project.findOne({ _id: req.params.projectId, owner: req.user._id });
  if (!project) return res.status(403).json({ message: 'Unauthorized' });

  const task = await Task.findOneAndDelete({ _id: req.params.taskId, project: project._id });
  if (!task) return res.status(404).json({ message: 'Task not found' });
  res.json({ message: 'Task deleted' });
};

module.exports = { createTask, getTasks, updateTask, deleteTask };
