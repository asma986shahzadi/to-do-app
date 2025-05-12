import React from 'react';
import TaskItem from './TaskItem';

const TaskList = ({ tasks, title, onUpdate, onDelete }) => (
  <>
    <h2>{title}</h2>
    {tasks.length === 0 ? (
      <p>No tasks</p>
    ) : (
      tasks.map((task) => (
        <TaskItem key={task._id} task={task} onUpdate={onUpdate} onDelete={onDelete} />
      ))
    )}
  </>
);

export default TaskList;