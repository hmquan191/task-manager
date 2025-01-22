import React from "react";
import TasksItem from "./TasksItem";

const TasksList = ({ tasks, setTasks }) => {
  return (
    <ul className="task-list">
      {tasks.map((task) => (
        <TasksItem
          key={task.id}
          task={task}
          tasks={tasks}
          setTasks={setTasks}
        />
      ))}
    </ul>
  );
};

export default TasksList;
