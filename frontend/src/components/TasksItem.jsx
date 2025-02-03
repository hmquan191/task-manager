import React, { useState } from "react";
import axios from "axios";
import "./styles/TasksItem.css";

const TasksItem = ({ task, tasks, setTasks }) => {
  const [notification, setNotification] = useState("");
  const [showEditHint, setShowEditHint] = useState(false);
  const [isHoveringToggle, setIsHoveringToggle] = useState(false);
  const [isHoveringDelete, setIsHoveringDelete] = useState(false);
  const [isEditing, setIsEditing] = useState(false); // Track if we are editing
  const [editText, setEditText] = useState(task.description); // Store the new task description

  // Format date and time
  const formatDateTime = (date) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    };
    const formattedDate = new Date(date).toLocaleDateString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
    const formattedTime = new Date(date).toLocaleTimeString("vi-VN", {
      hour12: false,
    });
    return `${formattedTime} ${formattedDate}`;
  };

  // Delete task
  const deleteTask = () => {
    axios
      .delete(`http://localhost:5000/api/v1/tasks/${task._id}`)
      .then(() => {
        setTasks(tasks.filter((t) => t._id !== task._id));
        setNotification("Task deleted successfully!");
        setTimeout(() => setNotification(""), 3000);
      })
      .catch((error) => console.error("Error deleting task:", error));
  };

  // Toggle task completion
  const toggleCompletion = () => {
    setTasks(tasks.filter((t) => t._id !== task._id)); // Cập nhật UI ngay lập tức

    axios
      .put(`http://localhost:5000/api/v1/tasks/${task._id}`, {
        ...task,
        finish: !task.finish,
      })
      .catch((error) => console.error("Error updating task:", error));
  };

  // Start editing the task
  const startEditing = () => {
    setIsEditing(true);
  };

  // Save the edited task
  const saveEdit = () => {
    if (editText !== task.description) {
      axios
        .put(`http://localhost:5000/api/v1/tasks/${task._id}`, {
          description: editText,
          finish: task.finish,
        })
        .then(() => {
          setTasks(
            tasks.map((t) =>
              t._id === task._id ? { ...t, description: editText } : t
            )
          );
          setIsEditing(false); // Exit edit mode after saving
        })
        .catch((error) => console.error("Error editing task:", error));
    } else {
      setIsEditing(false); // Exit edit mode if no change
    }
  };

  // Cancel editing
  const cancelEdit = () => {
    setIsEditing(false); // Simply exit edit mode without saving
  };

  return (
    <li className="task-item">
      <span
        className="task-toggle"
        onClick={toggleCompletion}
        onMouseEnter={() => setIsHoveringToggle(true)}
        onMouseLeave={() => setIsHoveringToggle(false)}
      >
        <i
          className={`fas ${task.finish ? "fa-check-circle" : "fa-circle"}`}
          style={{
            color: task.finish ? "green" : "grey",
            marginRight: "10px",
            cursor: "pointer",
          }}
        ></i>
        {isHoveringToggle && <span className="hover-tooltip">Finish</span>}
      </span>

      {/* Task Name */}
      {!isEditing ? (
        <span
          className="task-name"
          onMouseEnter={() => setShowEditHint(true)}
          onMouseLeave={() => setShowEditHint(false)}
          onClick={startEditing}
        >
          {task.description}
          {showEditHint && <span className="edit-hint"> (Click to edit)</span>}
        </span>
      ) : (
        <div className="edit-task-container">
          <input
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            className="edit-input"
          />
          <button id="saveEditButton" onClick={saveEdit}>
            Save
          </button>
          <button id="cancelEditButtonn" onClick={cancelEdit}>
            Cancel
          </button>
        </div>
      )}

      {/* Delete Button */}
      {!task.finish && (
        <button
          className="delete-button"
          onClick={deleteTask}
          onMouseEnter={() => setIsHoveringDelete(true)}
          onMouseLeave={() => setIsHoveringDelete(false)}
        >
          <i className="fas fa-times"></i>
          {isHoveringDelete && (
            <span className="hover-tooltip">Delete task</span>
          )}
        </button>
      )}

      {/* Task Created Date */}
      <div>
        <span>{formatDateTime(task.createdAt)}</span>
      </div>

      {/* Notification */}
      {notification && <div className="notification">{notification}</div>}
    </li>
  );
};

export default TasksItem;
