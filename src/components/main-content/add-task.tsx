import React from "react";

interface AddTaskProps {}

interface AddTaskState {}

class AddTask extends React.Component<AddTaskProps, AddTaskState> {
  state = {};
  render() {
    return (
      <div>
        <h1>Add Task</h1>
      </div>
    );
  }
}

export default AddTask;
