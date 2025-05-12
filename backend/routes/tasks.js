const express = require('express');
const router = express.Router();
const Task = require('../models/task');

// Get all tasks
router.get('/', async (req, res) => {
  const tasks = await Task.find();
  res.json(tasks);
});

// Add new task
router.post('/', async (req, res) => {
  const { description } = req.body;
  const task = new Task({ description });
  await task.save();
  res.json(task);
});

// Update task (description or mark complete)
router.put('/:id', async (req, res) => {
  const { description, isCompleted } = req.body;
  const updateData = {
    ...(description && { description }),
    ...(typeof isCompleted === 'boolean' && {
      isCompleted,
      completedAt: isCompleted ? new Date() : null,
    }),
  };
  const task = await Task.findByIdAndUpdate(req.params.id, updateData, { new: true });
  res.json(task);
});

// Delete task
router.delete('/:id', async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.json({ message: 'Task deleted' });
});

module.exports = router;