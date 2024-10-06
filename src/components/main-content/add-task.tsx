import React from "react";

interface TaskData {
  title: string;
  description: string;
}

interface State {
  taskData: TaskData;
  titleTouched: boolean;
  titleError: string;
  descriptionTouched: boolean;
  descriptionError: string;
}

class TaskForm extends React.Component<{}, State> {
  constructor(props: {}) {
    super(props);
    this.state = {
      taskData: {
        title: "",
        description: "",
      },
      titleTouched: false,
      titleError: "",
      descriptionTouched: false,
      descriptionError: "",
    };
  }

  handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      taskData: {
        ...this.state.taskData,
        title: event.target.value,
      },
      titleTouched: false,
    });
  };

  handleDescriptionChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    this.setState({
      taskData: {
        ...this.state.taskData,
        description: event.target.value,
      },
      descriptionTouched: false,
    });
  };

  render() {
    const {
      taskData,
      titleTouched,
      titleError,
      descriptionTouched,
      descriptionError,
    } = this.state;

    // Validation logic
    const isTitleValid = taskData.title.length >= 8;
    const isTitleEmpty = taskData.title.length === 0;

    const isDescriptionValid = taskData.description.length >= 24;
    const isDescriptionEmpty = taskData.description.length === 0;

    return (
      <div>
        <div className="title">
          <p>
            Title
            <span className="red-dot">*</span>
          </p>
          <input
            type="text"
            id="title"
            name="title"
            placeholder={taskData.title ? taskData.title : "Enter title..."}
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
        <div className="description">
          <p>
            Description
            <span className="red-dot">*</span>
          </p>
          <textarea
            id="description"
            rows={5}
            name="description"
            value={taskData.description}
            onChange={this.handleDescriptionChange}
            onBlur={() => {
              this.setState({
                descriptionTouched: true,
                descriptionError: isDescriptionEmpty
                  ? "Required"
                  : !isDescriptionValid
                  ? "Minimum 24 letters required"
                  : "",
              });
            }}
            placeholder="Enter a description..."
            autoComplete="off"
            required
          ></textarea>
          <div className="error-msg">
            {descriptionTouched && descriptionError && (
              <p>{descriptionError}</p>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default TaskForm;
