import React from "react";
import TaskList from "../components/TaskList";

export default function TaskListPage(props){
  return <div><h1>Tasks</h1><TaskList {...props} /></div>;
}
