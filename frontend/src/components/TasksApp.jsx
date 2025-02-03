import React, { useState, useEffect } from "react";
import axios from "axios";
import TasksList from "./TasksList";
import "./styles/TasksApp.css";

const TasksApp = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [showInput, setShowInput] = useState(false);

  // Fetch tasks from backend
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const [unfinishedTasksResponse, finishedTasksResponse] =
          await Promise.all([
            axios.get("http://localhost:5000/api/v1/tasks?finish=false"),
            // axios.get("http://localhost:5000/api/v1/tasks?finish=true"),
          ]);

        const unfinishedTasks = unfinishedTasksResponse.data.data;
        // const finishedTasks = finishedTasksResponse.data.data;

        // setTasks([...unfinishedTasks, ...finishedTasks]);

        setTasks([...unfinishedTasks]);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchTasks();
  }, []);

  // Add a new task
  const addTask = () => {
    const task = { description: newTask };
    axios
      .post("http://localhost:5000/api/v1/tasks", task)
      .then((response) => setTasks([response.data.data, ...tasks]))
      .catch((error) => console.error("Error adding task:", error));
    setNewTask("");
    setShowInput(false);
  };

  return (
    <div className="task-app">
      {!showInput && (
        <div className="button-container">
          <button id="add-button" onClick={() => setShowInput(true)}>
            + Add Item
          </button>
        </div>
      )}

      {showInput && (
        <div className="task-input">
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Enter a task..."
          />
          <div className="task-buttons">
            <button id="taskadd-button" onClick={addTask}>
              Add
            </button>
            <button id="cancel-button" onClick={() => setShowInput(false)}>
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Task Container */}
      {tasks.length > 0 && (
        <div className="task-container">
          <TasksList tasks={tasks} setTasks={setTasks} />
        </div>
      )}
    </div>
  );
};

export default TasksApp;
