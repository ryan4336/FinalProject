// src/components/TaskCard.js
import React from "react";
import { Link } from "react-router-dom";

function isDueSoon(dueDateStr){
  if(!dueDateStr) return false;
  const due = new Date(dueDateStr);
  const now = new Date();
  const diffDays = (due - now) / (1000*60*60*24);
  return diffDays >=0 && diffDays <= 3;
}

export default function TaskCard({ task, onDelete, canEdit }) {
  const dueSoon = isDueSoon(task.dueDate);
  const overdue = task.dueDate ? new Date(task.dueDate) < new Date() && !task.isCompleted : false;

  return (
    <div className={`card ${overdue ? 'task-overdue' : dueSoon ? 'task-due-soon' : ''}`}>
      <div style={{display:"flex", justifyContent:"space-between", alignItems:"center"}}>
        <div>
          <div style={{fontWeight:700}}>{task.title} {task.isCompleted && <span style={{color:"#2b8f2b"}}>(Done)</span>}</div>
          <div className="small">{task.description}</div>
          <div className="small">
            Due: {task.dueDate ? new Date(task.dueDate).toLocaleString() : "—"}
            <span className="task-priority">Priority: {task.priority || "Normal"}</span>
          </div>
        </div>

        <div style={{display:"flex", gap:8}}>
          {canEdit ? <Link to={`/edit/${task.id || task._id}`} className="btn">Edit</Link> : null}
          {canEdit ? <button className="btn secondary" onClick={() => onDelete(task.id || task._id)}>Delete</button> : null}
        </div>
      </div>
    </div>
  );
}
