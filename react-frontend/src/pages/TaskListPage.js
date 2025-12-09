import React from "react";
import TaskList from "../components/TaskList";
import useTasks from "../hooks/useTasks";

export default function TasksPage({ user }) {
  const { tasks, loading, removeTask, editTask } = useTasks(user);

  const toggleComplete = (task) => {
    editTask(task._id, { ...task, completed: !task.completed });
  };

  return (
    <TaskList 
      tasks={tasks}
      loading={loading}
      onDelete={removeTask}
      onToggleComplete={toggleComplete}
      userId={user?._id}
    />
  );
}
