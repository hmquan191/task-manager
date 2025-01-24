import React from "react";

import { useMediaQuery } from "react-responsive";
import TasksHome from "../components/TasksHome";
const HomePage = () => {
  const isFullPage = useMediaQuery({ minWidth: 768 });

  return (
    <div
      className="home-page"
      style={{ marginTop: isFullPage ? "120px" : "200px" }}
    >
      <TasksHome />
    </div>
  );
};

export default HomePage;
