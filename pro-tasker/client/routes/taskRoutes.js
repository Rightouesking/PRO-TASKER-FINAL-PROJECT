const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const {
  createTask, getTasks, updateTask, deleteTask
} = require('../pro-tasker/client/controllers/taskController');

const router = express.Router({ mergeParams: true });

router.route('/')
  .post(protect, createTask)
  .get(protect, getTasks);

router.route('/:taskId')
  .put(protect, updateTask)
  .delete(protect, deleteTask);

module.exports = router;
