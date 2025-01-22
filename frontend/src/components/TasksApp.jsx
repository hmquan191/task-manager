import React, { useState, useEffect } from "react";
import axios from "axios";
import TasksList from "./TasksList";

const TasksApp = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  // Fetch tasks from backend
  useEffect(() => {
    axios
      .get("http://localhost:5000/tasks")
      .then((response) => setTasks(response.data))
      .catch((error) => console.error("Error fetching tasks:", error));
  }, []);

  // Add a new task
  const addTask = () => {
    const task = { title: newTask, completed: false };
    axios
      .post("http://localhost:5000/tasks", task)
      .then((response) => setTasks([...tasks, response.data]));
    setNewTask("");
  };

  return (
    <div className="task-app">
      <h1>Todo App</h1>
      <div className="task-input">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Enter a task..."
        />
        <button onClick={addTask}>Add Task</button>
      </div>
      <TasksList tasks={tasks} setTasks={setTasks} />
    </div>
  );
};

export default TasksApp;
