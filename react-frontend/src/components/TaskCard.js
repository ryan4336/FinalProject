import React from "react";
import { Link } from "react-router-dom";

function highlightClass(task){
  if(!task.dueDate) return "card";
  const due = new Date(task.dueDate);
  const now = new Date();
  const diffDays = Math.ceil((due - now) / (1000 * 60 * 60 * 24));
  if (task.isCompleted) return "card";
  if (diffDays < 0) return "card highlight-overdue";
  if (diffDays <= 3) return "card highlight-soon";
  return "card highlight-ok";
}

export default function TaskCard({ task, onDelete, onToggle }) {
  return (
    <div className={highlightClass(task)}>
      <div className="task-row">
        <div style={{flex:"1 1 auto"}}>
          <div style={{display:"flex", justifyContent:"space-between", alignItems:"flex-start", gap:12}}>
            <div>
              <div style={{fontSize:16, fontWeight:700}}>{task.title} {task.isCompleted ? "✓" : ""}</div>
              <div className="task-meta">{task.description}</div>
            </div>

            <div style={{textAlign:"right"}}>
              <div className="task-meta">Due: {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : "N/A"}</div>
              <div className="task-meta">Priority: {task.priority || "Medium"}</div>
            </div>
          </div>
        </div>
      </div>

      <div style={{marginTop:10, display:"flex", gap:8}}>
        <button className="btn small" onClick={onToggle}>{task.isCompleted ? "Mark Incomplete" : "Mark Complete"}</button>
        <Link to={`/edit/${task.id}`} className="btn small" style={{textDecoration:"none", display:"inline-flex", alignItems:"center", justifyContent:"center"}}>Edit</Link>
        <button className="btn small secondary" onClick={onDelete}>Delete</button>
      </div>
    </div>
  );
}
