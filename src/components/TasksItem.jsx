import React from "react";
import axios from "axios";

const TasksItem = ({ task, tasks, setTasks }) => {
  // Delete task
  const deleteTask = () => {
    axios.delete(`http://localhost:5000/tasks/${task.id}`).then(() => {
      setTasks(tasks.filter((t) => t.id !== task.id));
    });
  };

  // Toggle task completion
  const toggleCompletion = () => {
    const updatedTask = { ...task, completed: !task.completed };
    axios
      .put(`http://localhost:5000/tasks/${task.id}`, updatedTask)
      .then((response) =>
        setTasks(tasks.map((t) => (t.id === task.id ? response.data : t)))
      );
  };

  return (
    <li className={task.completed ? "completed" : ""}>
      <span onClick={toggleCompletion}>{task.title}</span>
      <button onClick={deleteTask}>Delete</button>
    </li>
  );
};

export default TasksItem;
