import React from "react";
import TaskApp from "../components/TasksApp";
import { useMediaQuery } from "react-responsive";

const TasksPage = () => {
  const isFullPage = useMediaQuery({ minWidth: 768 });
  return (
    <div
      className="task-page"
      style={{ marginTop: isFullPage ? "120px" : "200px" }}
    >
      <TaskApp />
    </div>
  );
};

export default TasksPage;
