import React, { useState } from "react";
import axios from "axios";

const TasksItem = ({ task, tasks, setTasks }) => {
  const [notification, setNotification] = useState(""); // For notification message

  // Delete task
  const deleteTask = () => {
    axios
      .delete(`http://localhost:5000/api/v1/tasks/${task._id}`)
      .then(() => {
        setTasks(tasks.filter((t) => t._id !== task._id)); // Remove task from UI
        console.log("Task deleted successfully!");
        setNotification("Task deleted successfully!"); // Show notification
        setTimeout(() => setNotification(""), 3000); // Hide notification after 3 seconds
      })
      .catch((error) => console.error("Error deleting task:", error));
  };

  // Toggle task completion (mark as finished)
  const toggleCompletion = () => {
    const updatedTask = { ...task, finish: true }; // Mark the task as completed
    axios
      .put(`http://localhost:5000/api/v1/tasks/${task._id}`, updatedTask)
      .then((response) => {
        setTasks(tasks.filter((t) => t._id !== task._id)); // Remove the task from the list (it should now appear in the finished tasks list)
        setNotification("Task completed and removed from the active list!");
        setTimeout(() => setNotification(""), 3000); // Hide notification after 3 seconds
      })
      .catch((error) => console.error("Error updating task:", error));
  };

  return (
    <li className={task.finish ? "completed" : ""}>
      <span onClick={toggleCompletion}>
        <i
          className={`${task.finish ? "fas fa-check-circle" : "far fa-circle"}`}
          style={{
            color: task.finish ? "green" : "black",
            marginRight: "10px",
            cursor: "pointer",
          }}
        ></i>
        {task.description}
      </span>
      {!task.finish && (
        <button
          onClick={deleteTask}
          style={{
            color: "red",
            border: "none",
            background: "none",
            cursor: "pointer",
          }}
        >
          <i className="fas fa-times"></i>
        </button>
      )}

      {/* Notification */}
      {notification && (
        <div style={{ color: "green", marginTop: "5px", fontSize: "12px" }}>
          {notification}
        </div>
      )}
    </li>
  );
};

export default TasksItem;
