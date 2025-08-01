const Project = require('../models/Project');

const createProject = async (req, res) => {
  const { name, description } = req.body;
  const project = await Project.create({ name, description, owner: req.user._id });
  res.status(201).json(project);
};

const getProjects = async (req, res) => {
  const projects = await Project.find({ owner: req.user._id });
  res.json(projects);
};

const getProjectById = async (req, res) => {
  const project = await Project.findOne({ _id: req.params.id, owner: req.user._id });
  if (!project) return res.status(404).json({ message: 'Project not found' });
  res.json(project);
};

const updateProject = async (req, res) => {
  const project = await Project.findOneAndUpdate(
    { _id: req.params.id, owner: req.user._id },
    req.body, { new: true }
  );
  if (!project) return res.status(404).json({ message: 'Not found or unauthorized' });
  res.json(project);
};

const deleteProject = async (req, res) => {
  const project = await Project.findOneAndDelete({ _id: req.params.id, owner: req.user._id });
  if (!project) return res.status(404).json({ message: 'Not found or unauthorized' });
  res.json({ message: 'Project deleted' });
};

module.exports = { createProject, getProjects, getProjectById, updateProject, deleteProject };
