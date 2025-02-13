// import React, { useState } from "react";
// import axios from "axios";
// import "./styles/TasksItem.css";

// const TasksItem = ({ task, tasks, setTasks }) => {
//   const [notification, setNotification] = useState("");
//   const [showEditHint, setShowEditHint] = useState(false);
//   const [isHoveringToggle, setIsHoveringToggle] = useState(false);
//   const [isHoveringDelete, setIsHoveringDelete] = useState(false);
//   const [isEditing, setIsEditing] = useState(false); // Track if we are editing
//   const [editText, setEditText] = useState(task.description); // Store the new task description

//   // Format date and time
//   const formatDateTime = (date) => {
//     const options = {
//       year: "numeric",
//       month: "long",
//       day: "numeric",
//       hour: "2-digit",
//       minute: "2-digit",
//       second: "2-digit",
//       hour12: false,
//     };
//     const formattedDate = new Date(date).toLocaleDateString("vi-VN", {
//       day: "2-digit",
//       month: "2-digit",
//       year: "numeric",
//     });
//     const formattedTime = new Date(date).toLocaleTimeString("vi-VN", {
//       hour12: false,
//     });
//     return `${formattedTime} ${formattedDate}`;
//   };

//   // Delete task
//   const deleteTask = () => {
//     axios
//       .delete(`http://localhost:5000/api/v1/tasks/${task._id}`)
//       .then(() => {
//         setTasks(tasks.filter((t) => t._id !== task._id));
//         setNotification("Task deleted successfully!");
//         setTimeout(() => setNotification(""), 3000);
//       })
//       .catch((error) => console.error("Error deleting task:", error));
//   };

//   // Toggle task completion
//   const toggleCompletion = () => {
//     setTasks(tasks.filter((t) => t._id !== task._id)); // Cập nhật UI ngay lập tức

//     axios
//       .put(`http://localhost:5000/api/v1/tasks/${task._id}`, {
//         ...task,
//         finish: !task.finish,
//       })
//       .catch((error) => console.error("Error updating task:", error));
//   };

//   // Start editing the task
//   const startEditing = () => {
//     setIsEditing(true);
//   };

//   // Save the edited task
//   const saveEdit = () => {
//     if (editText !== task.description) {
//       axios
//         .put(`http://localhost:5000/api/v1/tasks/${task._id}`, {
//           description: editText,
//           finish: task.finish,
//         })
//         .then(() => {
//           setTasks(
//             tasks.map((t) =>
//               t._id === task._id ? { ...t, description: editText } : t
//             )
//           );
//           setIsEditing(false); // Exit edit mode after saving
//         })
//         .catch((error) => console.error("Error editing task:", error));
//     } else {
//       setIsEditing(false); // Exit edit mode if no change
//     }
//   };

//   // Cancel editing
//   const cancelEdit = () => {
//     setIsEditing(false); // Simply exit edit mode without saving
//   };

//   return (
//     <li className="task-item">
//       <span
//         className="task-toggle"
//         onClick={toggleCompletion}
//         onMouseEnter={() => setIsHoveringToggle(true)}
//         onMouseLeave={() => setIsHoveringToggle(false)}
//       >
//         <i
//           className={`fas ${task.finish ? "fa-check-circle" : "fa-circle"}`}
//           style={{
//             color: task.finish ? "green" : "grey",
//             marginRight: "10px",
//             cursor: "pointer",
//           }}
//         ></i>
//         {isHoveringToggle && <span className="hover-tooltip">Finish</span>}
//       </span>

//       {/* Task Name */}
//       {!isEditing ? (
//         <span
//           className="task-name"
//           onMouseEnter={() => setShowEditHint(true)}
//           onMouseLeave={() => setShowEditHint(false)}
//           onClick={startEditing}
//         >
//           {task.description}
//           {showEditHint && <span className="edit-hint"> (Click to edit)</span>}
//         </span>
//       ) : (
//         <div className="edit-task-container">
//           <input
//             type="text"
//             value={editText}
//             onChange={(e) => setEditText(e.target.value)}
//             className="edit-input"
//           />
//           <button id="saveEditButton" onClick={saveEdit}>
//             Save
//           </button>
//           <button id="cancelEditButtonn" onClick={cancelEdit}>
//             Cancel
//           </button>
//         </div>
//       )}

//       {/* Delete Button */}
//       {!task.finish && (
//         <button
//           className="delete-button"
//           onClick={deleteTask}
//           onMouseEnter={() => setIsHoveringDelete(true)}
//           onMouseLeave={() => setIsHoveringDelete(false)}
//         >
//           <i className="fas fa-times"></i>
//           {isHoveringDelete && (
//             <span className="hover-tooltip">Delete task</span>
//           )}
//         </button>
//       )}

//       {/* Task Created Date */}
//       <div>
//         <span>{formatDateTime(task.createdAt)}</span>
//       </div>

//       {/* Notification */}
//       {notification && <div className="notification">{notification}</div>}
//     </li>
//   );
// };

// export default TasksItem;

// import React, { useState } from "react";
// import axios from "axios";
// import "./styles/TasksItem.css";

// const TasksItem = ({ task, tasks, setTasks }) => {
//   const [isEditing, setIsEditing] = useState(false);
//   const [editTask, setEditTask] = useState({ ...task });

//   const deleteTask = async () => {
//     try {
//       await axios.delete(`http://localhost:5000/api/v1/tasks/${task._id}`);
//       setTasks(tasks.filter((t) => t._id !== task._id));
//     } catch (error) {
//       console.error("Error deleting task:", error);
//     }
//   };

//   const toggleCompletion = async () => {
//     try {
//       await axios.put(`http://localhost:5000/api/v1/tasks/${task._id}`, {
//         finish: !task.finish,
//       });
//       setTasks(
//         tasks.map((t) => (t._id === task._id ? { ...t, finish: !t.finish } : t))
//       );
//     } catch (error) {
//       console.error("Error updating task:", error);
//     }
//   };

//   const saveEdit = async () => {
//     try {
//       await axios.put(
//         `http://localhost:5000/api/v1/tasks/${task._id}`,
//         editTask
//       );
//       setTasks(tasks.map((t) => (t._id === task._id ? editTask : t)));
//       setIsEditing(false);
//     } catch (error) {
//       console.error("Error editing task:", error);
//     }
//   };

//   const formatDate = (date) => {
//     const d = new Date(date);
//     const day = String(d.getDate()).padStart(2, "0");
//     const month = String(d.getMonth() + 1).padStart(2, "0");
//     const year = d.getFullYear();
//     return `${day}-${month}-${year}`;
//   };

//   return (
//     <li className="task-item">
//       <span onClick={toggleCompletion} style={{ cursor: "pointer" }}>
//         {task.finish ? "✅" : "⬜"}
//       </span>

//       {!isEditing ? (
//         <span onClick={() => setIsEditing(true)}>{task.description}</span>
//       ) : (
//         <div>
//           <input
//             type="text"
//             value={editTask.description}
//             onChange={(e) =>
//               setEditTask({ ...editTask, description: e.target.value })
//             }
//           />
//           <input
//             type="date"
//             value={editTask.due_date}
//             onChange={(e) =>
//               setEditTask({ ...editTask, due_date: e.target.value })
//             }
//           />
//           <select
//             value={editTask.priority}
//             onChange={(e) =>
//               setEditTask({ ...editTask, priority: e.target.value })
//             }
//           >
//             <option value="high">High</option>
//             <option value="medium">Medium</option>
//             <option value="low">Low</option>
//           </select>
//           <button onClick={saveEdit}>Save</button>
//           <button onClick={() => setIsEditing(false)}>Cancel</button>
//         </div>
//       )}

//       <span>Due: {formatDate(task.due_date)}</span>
//       <span>Priority: {task.priority}</span>
//       <button onClick={deleteTask}>🗑</button>
//     </li>
//   );
// };

// export default TasksItem;

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
              value={editTask.due_date}
              onChange={(e) =>
                setEditTask({ ...editTask, due_date: e.target.value })
              }
            />
            <select
              value={editTask.priority}
              onChange={(e) =>
                setEditTask({ ...editTask, priority: e.target.value })
              }
            >
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
            <button onClick={saveEdit}>Save</button>
            <button onClick={() => setIsEditing(false)}>Cancel</button>
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
