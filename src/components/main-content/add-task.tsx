import React from "react";
import "./add-task.css";

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

  handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    field: "title" | "description"
  ) => {
    this.setState((prevState) => ({
      taskData: {
        ...prevState.taskData,
        [field]: event.target.value,
      },
      titleTouched: field === "title" ? false : prevState.titleTouched,
      descriptionTouched:
        field === "description" ? false : prevState.descriptionTouched,
    }));
  };

  openAssignedUserList = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const inputValue = event.target.value;
    console.log(inputValue);
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
      <div className="add-task">
        <div className="add-task-left">
          <div className="add-task-title">
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
              onChange={(event) => this.handleInputChange(event, "title")}
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
          <div className="add-task-description">
            <p>
              Description
              <span className="red-dot">*</span>
            </p>
            <textarea
              id="description"
              rows={5}
              name="description"
              value={taskData.description}
              onChange={(event) => this.handleInputChange(event, "description")}
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
          <div className="add-task-assigned">
            <p>Assigned to</p>
            <input
              type="text"
              id="assigned"
              name="assigned"
              placeholder="Search..."
              autoComplete="off"
              required
              onChange={(event) => this.openAssignedUserList(event)}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default TaskForm;
