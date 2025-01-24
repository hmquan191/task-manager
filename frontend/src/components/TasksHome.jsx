import React, { useState, useEffect } from "react";
import axios from "axios";
import TasksList from "./TasksList"; // Import your TasksList component

const TasksHome = () => {
  const [finishedTasks, setFinishedTasks] = useState([]);

  useEffect(() => {
    // Fetch finished tasks from the backend
    axios
      .get("http://localhost:5000/api/v1/tasks?finish=true&order=des")
      .then((response) => setFinishedTasks(response.data.data)) // Set finished tasks into state
      .catch((error) => {
        console.error("Error fetching finished tasks:", error); // Handle errors
      });
  }, []); // Empty dependency array means this runs once after component mounts

  return (
    <div className="finished-tasks">
      <h2>Finished Tasks</h2>
      {/* Pass finished tasks to the TasksList, but no need for setTasks as we don't need to modify them here */}
      <TasksList tasks={finishedTasks} />
    </div>
  );
};

export default TasksHome;
