import React, { Component } from "react";
import "./add-task.css";

interface TaskData {
  title: string;
}

interface Props {}

interface State {
  taskData: TaskData;
  titleTouched: boolean;
  titleError: string;
}

class AddTask extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      taskData: {
        title: "",
      },
      titleTouched: false,
      titleError: "",
    };
  }

  handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      taskData: {
        ...this.state.taskData,
        title: event.target.value,
      },
      titleTouched: true,
    });
  };

  render() {
    const { taskData, titleTouched, titleError } = this.state;

    const isTitleValid = taskData.title.length >= 8;
    const isTitleEmpty = taskData.title.length === 0;

    return (
      <div className="title">
        <p>
          Title
          <span className="red-dot">*</span>
        </p>
        <input
          type="text"
          id="title"
          name="title"
          placeholder={taskData.title ? taskData.title : "test"}
          value={taskData.title}
          autoComplete="off"
          required
          onChange={this.handleInputChange}
          onBlur={() => {
            this.setState({
              titleTouched: true,
              titleError: isTitleEmpty
                ? "Required"
                : !isTitleValid
                ? "Minimum 8 letters required"
                : "",
            });
          }}
        />
        <div className="error-msg">
          {titleTouched && titleError && <p>{titleError}</p>}
        </div>
      </div>
    );
  }
}

export default AddTask;
