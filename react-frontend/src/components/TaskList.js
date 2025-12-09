// src/components/TaskList.js
import React from "react";
import TaskCard from "./TaskCard";

export default function TaskList({ tasks, onDelete, userId }) {
  if (!tasks.length) {
    return <div className="card"><p>No tasks found.</p></div>;
  }

  return (
    <div>
      {tasks.map((t) => (
        <TaskCard key={t.id || t._id} task={t} onDelete={onDelete} canEdit={t.userId === userId || t.userId === (userId && userId.toString())} />
      ))}
    </div>
  );
}
