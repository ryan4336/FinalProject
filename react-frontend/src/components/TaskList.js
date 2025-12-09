import React from "react";
import TaskCard from "./TaskCard";

export default function TaskList({ tasks, onDelete, onToggleComplete, userId }) {
  if (!tasks.length) {
    return <div className="card"><p>No tasks found.</p></div>;
  }

  return (
    <div>
      {tasks.map((t) => (
        <TaskCard 
          key={t._id} 
          task={t} 
          onDelete={onDelete} 
          onToggle={onToggleComplete} 
          canEdit={t.user === userId || t.user === (userId && userId.toString())} 
        />
      ))}
    </div>
  );
}
