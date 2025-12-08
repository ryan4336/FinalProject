import React, { useMemo, useState } from "react";
import TaskCard from "./TaskCard";

export default function TaskList({ tasks = [], loading, onDelete, onToggleComplete }) {
  const [filter, setFilter] = useState("all");
  const [sortBy, setSortBy] = useState("dueAsc");

  const filtered = useMemo(() => {
    let out = [...tasks];
    if (filter === "complete") out = out.filter(t => t.isCompleted);
    if (filter === "incomplete") out = out.filter(t => !t.isCompleted);
    if (filter === "high") out = out.filter(t => t.priority === "High");
    if (filter === "medium") out = out.filter(t => t.priority === "Medium");
    if (filter === "low") out = out.filter(t => t.priority === "Low");

    if (sortBy === "dueAsc") {
      out.sort((a,b) => new Date(a.dueDate || 0) - new Date(b.dueDate || 0));
    } else if (sortBy === "dueDesc") {
      out.sort((a,b) => new Date(b.dueDate || 0) - new Date(a.dueDate || 0));
    } else if (sortBy === "alpha") {
      out.sort((a,b) => (a.title || "").localeCompare(b.title || ""));
    }
    return out;
  }, [tasks, filter, sortBy]);

  if (loading) return <div className="card">Loading tasks...</div>;
  if (!tasks || tasks.length === 0) return <div className="card">No tasks found. <br/>Create one!</div>;

  return (
    <div>
      <div style={{display:"flex", gap:8, marginBottom:12}}>
        <select value={filter} onChange={e => setFilter(e.target.value)} className="small">
          <option value="all">All</option>
          <option value="incomplete">Incomplete</option>
          <option value="complete">Complete</option>
          <option value="high">Priority: High</option>
          <option value="medium">Priority: Medium</option>
          <option value="low">Priority: Low</option>
        </select>

        <select value={sortBy} onChange={e => setSortBy(e.target.value)} className="small">
          <option value="dueAsc">Sort: Due (asc)</option>
          <option value="dueDesc">Sort: Due (desc)</option>
          <option value="alpha">Sort: Title (A→Z)</option>
        </select>
      </div>

      <div style={{display:"grid", gap:10}}>
        {filtered.map(task => (
          <TaskCard 
            key={task.id}
            task={task}
            onDelete={() => onDelete(task.id)}
            onToggle={() => onToggleComplete(task)}
          />
        ))}
      </div>
    </div>
  );
}
