import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState('');
  const [search, setSearch] = useState('');
  const [darkMode, setDarkMode] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  // Load tasks and dark mode from localStorage
  useEffect(() => {
    const savedTasks = localStorage.getItem('tasks');
    const savedDarkMode = localStorage.getItem('darkMode');

    if (savedTasks) setTasks(JSON.parse(savedTasks));
    if (savedDarkMode === 'true') setDarkMode(true);
  }, []);

  // Apply/remove 'dark' class to <body> tag
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }, [darkMode]);

  // Save to localStorage on any change
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
    localStorage.setItem('darkMode', darkMode);
  }, [tasks, darkMode]);

  const addTask = () => {
    const trimmed = input.trim();
    if (!trimmed) return;

    const exists = tasks.some(task => task.text.toLowerCase() === trimmed.toLowerCase());
    if (exists && editIndex === null) {
      alert('Task already exists!');
      return;
    }

    if (editIndex !== null) {
      const updated = [...tasks];
      updated[editIndex].text = trimmed;
      setTasks(updated);
      setEditIndex(null);
    } else {
      setTasks([...tasks, { text: trimmed, completed: false }]);
    }

    setInput('');
    setSearch('');
  };

  const deleteTask = (index) => {
    const updated = [...tasks];
    updated.splice(index, 1);
    setTasks(updated);
  };

  const toggleTask = (index) => {
    const updated = [...tasks];
    updated[index].completed = !updated[index].completed;
    setTasks(updated);
  };

  const editTask = (index) => {
    setInput(tasks[index].text);
    setEditIndex(index);
  };

  const filteredTasks = tasks.filter(task =>
    task.text.toLowerCase().includes(search.toLowerCase())
  );

  const toggleMode = () => {
    setDarkMode(prev => !prev);
  };

  return (
    <div className="app">
      <div className="container">
        <h1>Task Manager</h1>
        <button onClick={toggleMode} className="toggle-btn">
          {darkMode ? '🌞 Light Mode' : '🌙 Dark Mode'}
        </button>
        <div className="input-container">
          <input
            type="text"
            placeholder="Enter a task..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && addTask()}
          />
          <button onClick={addTask} className="add-btn">
            {editIndex !== null ? 'Update' : 'Add'}
          </button>
        </div>
        <input
          type="text"
          placeholder="Search tasks..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-input"
        />
        <ul className="task-list">
          {filteredTasks.map((task, index) => (
            <li key={index} className={`task ${task.completed ? 'completed' : ''}`}>
              <span>{task.text}</span>
              <div className="buttons">
                <button onClick={() => toggleTask(index)} title="Mark Complete">✔️</button>
                <button onClick={() => editTask(index)} title="Edit">✏️</button>
                <button onClick={() => deleteTask(index)} title="Delete">🗑️</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;