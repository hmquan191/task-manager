import React, { useState } from "react";
import axios from "axios";
import "./styles/TasksItem.css";

const TasksItem = ({ task, tasks, setTasks }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editTask, setEditTask] = useState({ ...task });

  const deleteTask = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/v1/tasks/${task._id}`);
      setTasks(tasks.filter((t) => t._id !== task._id));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const toggleCompletion = async () => {
    try {
      await axios.put(`http://localhost:5000/api/v1/tasks/${task._id}`, {
        finish: !task.finish,
      });
      setTasks(
        tasks.map((t) => (t._id === task._id ? { ...t, finish: !t.finish } : t))
      );
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const saveEdit = async () => {
    try {
      await axios.put(
        `http://localhost:5000/api/v1/tasks/${task._id}`,
        editTask
      );
      setTasks(tasks.map((t) => (t._id === task._id ? editTask : t)));
      setIsEditing(false);
    } catch (error) {
      console.error("Error editing task:", error);
    }
  };

  const formatDate = (date) => {
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, "0");
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const year = d.getFullYear();
    return `${day}-${month}-${year}`;
  };
  return (
    <li className="task-item">
      <span onClick={toggleCompletion} style={{ cursor: "pointer" }}>
        {task.finish ? "✅" : "⬜"}
      </span>

      <div className="task-content">
        {!isEditing ? (
          <span onClick={() => setIsEditing(true)} className="task-name">
            {task.description}
          </span>
        ) : (
          <div className="edit-task-container">
            <input
              type="text"
              value={editTask.description}
              onChange={(e) =>
                setEditTask({ ...editTask, description: e.target.value })
              }
              className="edit-input"
            />
            <input
              type="date"
              className="date-input"
              value={editTask.due_date}
              onChange={(e) =>
                setEditTask({ ...editTask, due_date: e.target.value })
              }
            />
            <select
              className="priority-input"
              value={editTask.priority}
              onChange={(e) =>
                setEditTask({ ...editTask, priority: e.target.value })
              }
            >
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
            <button className="save-button" onClick={saveEdit}>
              Save
            </button>
            <button
              className="cancel-button"
              onClick={() => setIsEditing(false)}
            >
              Cancel
            </button>
          </div>
        )}

        <div className="task-meta">
          <span>Due: {formatDate(task.due_date)}</span>
          <span>Priority: {task.priority}</span>
        </div>
      </div>

      <button onClick={deleteTask} className="delete-button">
        🗑
      </button>
    </li>
  );
};

export default TasksItem;
