import React from "react";

import { useMediaQuery } from "react-responsive";

const HomePage = () => {
  const isFullPage = useMediaQuery({ minWidth: 768 });

  return (
    <div
      className="home-page"
      style={{ marginTop: isFullPage ? "120px" : "200px" }}
    >
      <h1>Welcome to Todo App</h1>
    </div>
  );
};

export default HomePage;
