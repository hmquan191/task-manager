import React, { useState, useEffect } from "react";

const TaskForm = ({ onSaveTask, editingTask }) => {
  const [title, setTitle] = useState("");

  useEffect(() => {
    if (editingTask) setTitle(editingTask.title);
  }, [editingTask]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    onSaveTask({ id: editingTask?.id || Date.now(), title, completed: false });
    setTitle("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter task"
      />
      <button type="submit">{editingTask ? "Update" : "Add"}</button>
    </form>
  );
};

export default TaskForm;
