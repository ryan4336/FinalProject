import React from "react";
import TaskList from "../components/TaskList";

export default function HomePage({ tasks, loading, onDelete, onToggleComplete, onRefresh }) {
  return (
    <div>
      <div style={{display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:16}}>
        <h1>All Tasks</h1>
        <div>
          <button className="btn small" onClick={onRefresh}>Refresh</button>
        </div>
      </div>

      <TaskList 
        tasks={tasks} 
        loading={loading} 
        onDelete={onDelete} 
        onToggleComplete={onToggleComplete} 
      />
    </div>
  );
}
