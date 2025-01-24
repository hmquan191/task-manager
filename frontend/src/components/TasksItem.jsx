import React, { useState } from "react";
import axios from "axios";

const TasksItem = ({ task, tasks, setTasks }) => {
  const [notification, setNotification] = useState(""); // For notification message

  // Format date and time
  const formatDateTime = (date) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false, // 24-hour format
    };

    // Format the date and time
    const formattedDateTime = new Date(date).toLocaleString("vi-VN", options);

    // Remove "lúc" if it appears in the formatted string
    return formattedDateTime.replace("lúc ", "");
  };

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

      {/* Display formatted dates and times */}
      <div>
        <span>Ngày tạo: {formatDateTime(task.createdAt)}</span>
        <br />
      </div>

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
