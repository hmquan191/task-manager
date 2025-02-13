// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import TasksList from "./TasksList";
// import "./styles/TasksApp.css";

// const TasksApp = () => {
//   const [tasks, setTasks] = useState([]);
//   const [newTask, setNewTask] = useState("");
//   const [showInput, setShowInput] = useState(false);

//   // Fetch tasks from backend
//   useEffect(() => {
//     const fetchTasks = async () => {
//       try {
//         const [unfinishedTasksResponse, finishedTasksResponse] =
//           await Promise.all([
//             axios.get("http://localhost:5000/api/v1/tasks?finish=false"),
//             // axios.get("http://localhost:5000/api/v1/tasks?finish=true"),
//           ]);

//         const unfinishedTasks = unfinishedTasksResponse.data.data;
//         // const finishedTasks = finishedTasksResponse.data.data;

//         // setTasks([...unfinishedTasks, ...finishedTasks]);

//         setTasks([...unfinishedTasks]);
//       } catch (error) {
//         console.error("Error fetching tasks:", error);
//       }
//     };

//     fetchTasks();
//   }, []);

//   // Add a new task
//   const addTask = () => {
//     const task = { description: newTask };
//     axios
//       .post("http://localhost:5000/api/v1/tasks", task)
//       .then((response) => setTasks([response.data.data, ...tasks]))
//       .catch((error) => console.error("Error adding task:", error));
//     setNewTask("");
//     setShowInput(false);
//   };

//   return (
//     <div className="task-app">
//       {!showInput && (
//         <div className="button-container">
//           <button id="add-button" onClick={() => setShowInput(true)}>
//             + Add Item
//           </button>
//         </div>
//       )}

//       {showInput && (
//         <div className="task-input">
//           <input
//             type="text"
//             value={newTask}
//             onChange={(e) => setNewTask(e.target.value)}
//             placeholder="Enter a task..."
//           />
//           <div className="task-buttons">
//             <button id="taskadd-button" onClick={addTask}>
//               Add
//             </button>
//             <button id="cancel-button" onClick={() => setShowInput(false)}>
//               Cancel
//             </button>
//           </div>
//         </div>
//       )}

//       {/* Task Container */}
//       {tasks.length > 0 && (
//         <div className="task-container">
//           <TasksList tasks={tasks} setTasks={setTasks} />
//         </div>
//       )}
//     </div>
//   );
// };

// export default TasksApp;
import React, { useState, useEffect } from "react";
import axios from "axios";
import TasksList from "./TasksList";
import "./styles/TasksApp.css";

const TasksApp = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({
    description: "",
    due_date: "",
    priority: "medium",
  });
  const [showInput, setShowInput] = useState(false);
  const [sortPriority, setSortPriority] = useState("");
  const [filterDueDate, setFilterDueDate] = useState("");

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/v1/tasks?order=asc"
        );
        setTasks(response.data.data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };
    fetchTasks();
  }, []);

  const addTask = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/v1/tasks",
        newTask
      );
      setTasks([response.data.data, ...tasks]);
      setNewTask({ description: "", due_date: "", priority: "medium" });
      setShowInput(false);
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  const filteredTasks = tasks
    .filter((task) => {
      if (!filterDueDate) return true;
      return task.due_date === filterDueDate;
    })
    .sort((a, b) => {
      if (!sortPriority) return 0;
      const priorities = { high: 3, medium: 2, low: 1 };
      return priorities[b.priority] - priorities[a.priority];
    });

  return (
    <div className="task-app">
      <div className="filters">
        <select
          value={sortPriority}
          onChange={(e) => setSortPriority(e.target.value)}
        >
          <option value="">Sort by Priority</option>
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>
        <input
          type="date"
          value={filterDueDate}
          onChange={(e) => setFilterDueDate(e.target.value)}
        />
      </div>

      {!showInput && (
        <button id="add-button" onClick={() => setShowInput(true)}>
          + Add Task
        </button>
      )}

      {showInput && (
        <div className="task-input">
          <input
            type="text"
            value={newTask.description}
            onChange={(e) =>
              setNewTask({ ...newTask, description: e.target.value })
            }
            placeholder="Enter a task..."
          />
          <input
            type="date"
            value={newTask.due_date}
            onChange={(e) =>
              setNewTask({ ...newTask, due_date: e.target.value })
            }
          />
          <select
            value={newTask.priority}
            onChange={(e) =>
              setNewTask({ ...newTask, priority: e.target.value })
            }
          >
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
          <button onClick={addTask}>Add</button>
          <button onClick={() => setShowInput(false)}>Cancel</button>
        </div>
      )}

      <TasksList tasks={filteredTasks} setTasks={setTasks} />
    </div>
  );
};

export default TasksApp;
