import React from "react";
import { Link } from "react-router-dom";

export default function TaskCard({ task, onDelete, canEdit, onToggle }) {
  const dueDate = task.dueDate ? new Date(task.dueDate) : null;
  const isOverdue = dueDate && new Date() > dueDate && !task.completed;
  const dueSoon = dueDate && new Date() < dueDate && new Date() > new Date(dueDate) - 24*60*60*1000;

  return (
    <div className={`card ${isOverdue ? "task-overdue" : dueSoon ? "task-due-soon" : ""}`}>
      <h4>
        {task.title}<br/>
        {task.priority && <span className="task-priority">Priotity: {task.priority}</span>}
      </h4>
      <p>{task.description}</p>
      {dueDate && <p className="small">Due: {dueDate.toLocaleString()}</p>}
      <div style={{ display:"flex", gap: 8 }}>
        <button className="btn secondary" onClick={() => onDelete(task._id)}>Delete</button>
        {canEdit && <Link className="btn" to={`/edit/${task._id}`}>Edit</Link>}
        {onToggle && <button className="btn" onClick={() => onToggle(task)}>
          {task.completed ? "Mark Incomplete" : "Mark Complete"}
        </button>}
      </div>
    </div>
  );
}
