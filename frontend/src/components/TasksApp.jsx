import React, { useState, useEffect } from "react";
import axios from "axios";
import TasksList from "./TasksList";

const TasksApp = () => {
  const [tasks, setTasks] = useState([]); // Initialize tasks as an empty array
  const [newTask, setNewTask] = useState(""); // State for new task input

  // Fetch tasks from backend (all tasks + finished tasks)
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/v1/tasks?finish=false") // Get only tasks where finished is false
      .then((response) => {
        setTasks(response.data.data); // Assuming response contains a 'data' field with an array of tasks
      })
      .catch((error) => console.error("Error fetching tasks:", error));
  }, []); // Empty dependency array ensures this effect runs only once when component mounts

  // Add a new task
  const addTask = () => {
    const task = { description: newTask };
    axios
      .post("http://localhost:5000/api/v1/tasks", task)
      .then((response) => setTasks([...tasks, response.data.data])) // Add the new task to the state
      .catch((error) => console.error("Error adding task:", error));
    setNewTask(""); // Clear the input field after adding the task
  };

  return (
    <div className="task-app">
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
