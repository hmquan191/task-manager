import React from "react";
import TasksItem from "./TasksItem";
import "./styles/TasksList.css";
const TasksList = ({ tasks, setTasks }) => {
  if (!Array.isArray(tasks)) {
    console.error("Tasks is not an array:", tasks);
    return <p>No tasks available</p>; // Or a fallback UI
  }

  return (
    <ul>
      {tasks.map((task) => (
        <TasksItem
          key={task._id}
          task={task}
          tasks={tasks}
          setTasks={setTasks}
        />
      ))}
    </ul>
  );
};

export default TasksList;
