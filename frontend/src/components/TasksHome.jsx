import React, { useState, useEffect } from "react";
import axios from "axios";
import TasksList from "./TasksList";
import "./styles/TasksHome.css";

const TasksHome = () => {
  const [finishedTasks, setFinishedTasks] = useState([]);

  // Fetch finished tasks from backend
  const fetchFinishedTasks = () => {
    axios
      .get("http://localhost:5000/api/v1/tasks?finish=true&order=des")
      .then((response) => setFinishedTasks(response.data.data))
      .catch((error) => {
        console.error("Error fetching finished tasks:", error);
      });
  };

  useEffect(() => {
    fetchFinishedTasks();
  }, []);

  return (
    <div className="finished-tasks-container">
      {/* Task Container */}
      <div className="task-container">
        <TasksList
          tasks={finishedTasks}
          setTasks={setFinishedTasks}
          fetchTasks={fetchFinishedTasks}
        />
      </div>
    </div>
  );
};

export default TasksHome;
