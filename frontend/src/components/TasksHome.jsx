import React, { useState, useEffect } from "react";
import axios from "axios";
import TasksList from "./TasksList";
import "./styles/TasksHome.css";

const TasksHome = () => {
  const [tasks, setTasks] = useState([]);
  const [sortPriority, setSortPriority] = useState(""); // Lọc theo mức độ ưu tiên
  const [sortDueDate, setSortDueDate] = useState(""); // Lọc theo ngày đến hạn

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        let url = "http://localhost:5000/api/v1/tasks?finish=true&order=asc";

        // Áp dụng bộ lọc theo mức độ ưu tiên
        if (sortPriority) {
          url += `&priority=${sortPriority}`;
        }

        // Áp dụng bộ lọc theo ngày đến hạn
        if (sortDueDate === "near") {
          url += "&sort=due_date&order=asc"; // Gần nhất trước
        } else if (sortDueDate === "far") {
          url += "&sort=due_date&order=desc"; // Xa nhất trước
        }

        const response = await axios.get(url);
        setTasks(response.data.data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchTasks();
  }, [sortPriority, sortDueDate]); // Chạy lại khi thay đổi bộ lọcs

  return (
    <div className="finished-tasks-container">
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

      {/* Danh sách Task đã hoàn thành */}
      <TasksList tasks={tasks} setTasks={setTasks} />
    </div>
  );
};

export default TasksHome;
