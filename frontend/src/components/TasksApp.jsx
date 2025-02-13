import React, { useState, useEffect } from "react";
import axios from "axios";
import TasksList from "./TasksList";
import { parseISO, compareAsc, compareDesc } from "date-fns";
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
  const [sortDueDate, setSortDueDate] = useState(""); // "near" hoặc "far"

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
      if (!sortPriority) return true; // Không lọc nếu chưa chọn priority
      return task.priority === sortPriority;
    })
    .sort((a, b) => {
      // Kiểm tra nếu due_date bị null hoặc không hợp lệ
      const dateA = a.due_date ? parseISO(a.due_date) : null;
      const dateB = b.due_date ? parseISO(b.due_date) : null;

      if (sortDueDate === "near") {
        if (!dateA) return 1; // Nếu task A không có due_date, đưa xuống cuối
        if (!dateB) return -1;
        return compareAsc(dateA, dateB);
      }

      if (sortDueDate === "far") {
        if (!dateA) return 1;
        if (!dateB) return -1;
        return compareDesc(dateA, dateB);
      }

      return 0;
    });
  return (
    <div className="task-app">
      {/* Bộ lọc */}
      <div className="filters">
        <select
          className="filter-select"
          value={sortPriority}
          onChange={(e) => setSortPriority(e.target.value)}
        >
          <option value="">Sort by Priority</option>
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>

        <select
          className="filter-select"
          value={sortDueDate}
          onChange={(e) => setSortDueDate(e.target.value)}
        >
          <option value="">Sort by Due Date</option>
          <option value="near">Near</option>
          <option value="far">Far</option>
        </select>
      </div>

      {/* Nút Add Task */}
      {!showInput && (
        <div className="button-container">
          <button className="btn add-btn" onClick={() => setShowInput(true)}>
            + Add Task
          </button>
        </div>
      )}

      {/* Form nhập task */}
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
          <div className="task-buttons">
            <button className="btn confirm-btn" onClick={addTask}>
              Add
            </button>
            <button
              className="btn cancel-btn"
              onClick={() => setShowInput(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Danh sách Task */}
      <TasksList tasks={filteredTasks} setTasks={setTasks} />
    </div>
  );
};

export default TasksApp;
