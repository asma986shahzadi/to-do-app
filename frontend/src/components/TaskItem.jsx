import React, { useState } from 'react';

const TaskItem = ({ task, onDelete, onUpdate }) => {
  const [editText, setEditText] = useState(task.description);
  const [isEditing, setIsEditing] = useState(false);

  const handleComplete = () => {
    onUpdate(task._id, { isCompleted: !task.isCompleted });
  };

  const handleEdit = () => {
    if (isEditing) {
      onUpdate(task._id, { description: editText });
    }
    setIsEditing(!isEditing);
  };

  return (
    <div style={styles.card}>
      <input type="checkbox" checked={task.isCompleted} onChange={handleComplete} />
      {isEditing ? (
        <input value={editText} onChange={(e) => setEditText(e.target.value)} style={styles.input} />
      ) : (
        <span style={{ textDecoration: task.isCompleted ? 'line-through' : 'none' }}>{task.description}</span>
      )}
      <div>
        <button onClick={handleEdit} style={styles.smallBtn}>{isEditing ? 'Save' : 'Edit'}</button>
        <button onClick={() => onDelete(task._id)} style={styles.delBtn}>Delete</button>
      </div>
    </div>
  );
};

const styles = {
  card: {
    background: '#f9f9f9',
    margin: '8px 0',
    padding: '10px',
    borderRadius: '5px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  input: {
    padding: '5px',
    marginRight: '10px'
  },
  smallBtn: {
    marginRight: '5px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    padding: '5px 10px',
    borderRadius: '4px'
  },
  delBtn: {
    backgroundColor: '#dc3545',
    color: 'white',
    border: 'none',
    padding: '5px 10px',
    borderRadius: '4px'
  }
};

export default TaskItem;