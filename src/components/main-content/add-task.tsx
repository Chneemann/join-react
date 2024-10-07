import React from "react";
import "./add-task.css";

interface TaskData {
  title: string;
  description: string;
  date: string;
  priority: string;
}

interface State {
  taskData: TaskData;
  titleTouched: boolean;
  titleError: string;
  descriptionTouched: boolean;
  descriptionError: string;
  dateTouched: boolean;
  dateError: string;
  dateInPast: boolean;
}

class TaskForm extends React.Component<{}, State> {
  constructor(props: {}) {
    super(props);
    this.state = {
      taskData: {
        title: "",
        description: "",
        date: "",
        priority: "medium",
      },
      titleTouched: false,
      titleError: "",
      descriptionTouched: false,
      descriptionError: "",
      dateTouched: false,
      dateError: "",
      dateInPast: false,
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

  handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    const today = new Date();
    const selectedDate = new Date(value);

    // Check if the date is in the past
    const isDateInPast = selectedDate < today;

    this.setState((prevState) => ({
      taskData: {
        ...prevState.taskData,
        date: value,
      },
      dateTouched: false,
      dateInPast: isDateInPast,
      dateError: value === "" ? "Date is required" : "",
    }));
  };

  handleDateBlur = () => {
    const { date } = this.state.taskData;
    const today = new Date();
    const selectedDate = new Date(date);

    const isDateInPast = selectedDate < today;

    this.setState({
      dateTouched: true,
      dateError: date === "" ? "Date is required" : "",
      dateInPast: isDateInPast,
    });
  };

  openAssignedUserList = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const inputValue = event.target.value;
    console.log(inputValue);
  };

  togglePriority = (priority: string) => {
    this.setState((prevState) => ({
      taskData: {
        ...prevState.taskData,
        priority: priority,
      },
    }));
  };

  render() {
    const {
      taskData,
      titleTouched,
      titleError,
      descriptionTouched,
      descriptionError,
      dateTouched,
      dateError,
      dateInPast,
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

        <div className="add-task-middle">
          <div className="line"></div>
        </div>

        <div className="add-task-right">
          <div className="add-task-date">
            <p>
              Date
              <span className="red-dot">*</span>
            </p>
            <input
              type="date"
              id="date"
              name="date"
              value={taskData.date}
              onChange={this.handleDateChange}
              onBlur={this.handleDateBlur}
              autoComplete="off"
              required
            />
            <div className="error-msg">
              {dateTouched && dateError && <p>{dateError}</p>}
              {dateTouched && !dateError && dateInPast && (
                <p>Date cannot be in the past</p>
              )}
            </div>
          </div>
          <div className="add-task-priority">
            <p>Priority</p>
            <div className="add-task-priority-btns">
              <button
                type="button"
                className={`add-task-priority-btn ${
                  taskData.priority === "urgent"
                    ? "add-task-priority-btn-active"
                    : ""
                }`}
                style={{
                  backgroundColor:
                    taskData.priority === "urgent" ? "red" : "white",
                }}
                onClick={() => this.togglePriority("urgent")}
              >
                <div className="add-task-priority-btn-text">
                  <span>Urgent</span>
                  <img src="/assets/img/urgent.svg" alt="Urgent" />
                </div>
              </button>
              <button
                type="button"
                className={`add-task-priority-btn ${
                  taskData.priority === "medium"
                    ? "add-task-priority-btn-active"
                    : ""
                }`}
                style={{
                  backgroundColor:
                    taskData.priority === "medium" ? "orange" : "white",
                }}
                onClick={() => this.togglePriority("medium")}
              >
                <div className="add-task-priority-btn-text">
                  <span>Medium</span>
                  <img src="/assets/img/medium.svg" alt="Medium" />
                </div>
              </button>
              <button
                type="button"
                className={`add-task-priority-btn ${
                  taskData.priority === "low"
                    ? "add-task-priority-btn-active"
                    : ""
                }`}
                style={{
                  backgroundColor:
                    taskData.priority === "low" ? "green" : "white",
                }}
                onClick={() => this.togglePriority("low")}
              >
                <div className="add-task-priority-btn-text">
                  <span>Low</span>
                  <img src="/assets/img/low.svg" alt="Low" />
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default TaskForm;
