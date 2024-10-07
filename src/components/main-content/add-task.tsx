import React from "react";
import "./add-task.css";

interface TaskData {
  title: string;
  description: string;
  date: string;
  priority: string;
  category: string;
  subtasksTitle: string[];
  subtasksDone: boolean[];
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
  categoryTouched: boolean;
  categoryError: string;
  subtaskValue: string;
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
        category: "",
        subtasksTitle: [],
        subtasksDone: [],
      },
      titleTouched: false,
      titleError: "",
      descriptionTouched: false,
      descriptionError: "",
      dateTouched: false,
      dateError: "",
      dateInPast: false,
      categoryTouched: false,
      categoryError: "",
      subtaskValue: "",
    };
  }

  // TITLE, DESCRIPTION, CATEGORY
  // Method to update the value of the title
  handleInputChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
    field: "title" | "description" | "category"
  ) => {
    this.setState((prevState) => ({
      taskData: {
        ...prevState.taskData,
        [field]: event.target.value,
      },
      titleTouched: field === "title" ? false : prevState.titleTouched,
      descriptionTouched:
        field === "description" ? false : prevState.descriptionTouched,
      categoryTouched: field === "category" ? false : prevState.categoryTouched,
    }));
  };

  // DATE
  // Method to update the value of the date
  handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    const today = new Date();
    const selectedDate = new Date(value);
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

  // Method to handle the blur event of the date
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

  // ASSIGNED USERS
  // Method to open the assigned user list
  openAssignedUserList = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const inputValue = event.target.value;
    console.log(inputValue);
  };

  // PRIORITY
  // Method to update the value of the priority
  togglePriority = (priority: string) => {
    this.setState((prevState) => ({
      taskData: {
        ...prevState.taskData,
        priority: priority,
      },
    }));
  };

  // SUBTASKS
  // Method to update the value of the subtask
  updateSubtaskValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      subtaskValue: event.target.value,
    });
  };

  // Method to add a new subtask and set subtasksDone to true
  addSubtask = () => {
    const { subtaskValue, taskData } = this.state;
    if (subtaskValue.trim()) {
      this.setState({
        taskData: {
          ...taskData,
          subtasksTitle: [...taskData.subtasksTitle, subtaskValue],
          subtasksDone: [...taskData.subtasksDone, true],
        },
        subtaskValue: "",
      });
    }
  };

  // Method for deleting a subtask and removing the associated status
  deleteSubtask = (subtask: string, index: number) => {
    this.setState((prevState) => ({
      taskData: {
        ...prevState.taskData,
        subtasksTitle: prevState.taskData.subtasksTitle.filter(
          (_, i) => i !== index
        ),
        subtasksDone: prevState.taskData.subtasksDone.filter(
          (_, i) => i !== index
        ),
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
      categoryTouched,
      categoryError,
      subtaskValue,
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
          <div className="add-task-category">
            <p>
              Category<span className="red-dot">*</span>
            </p>
            <select
              id="category"
              name="category"
              value={taskData.category}
              onChange={(event) => this.handleInputChange(event, "category")}
              onBlur={() => {
                if (!taskData.category) {
                  this.setState({
                    categoryTouched: true,
                    categoryError: "Required",
                  });
                }
              }}
              required
            >
              <option value="" disabled>
                Select Category
              </option>
              <option value="User Story">User Story</option>
              <option value="Technical Task">Technical Task</option>
            </select>
            <img
              className="open"
              src="/assets/img/add-task/arrow-down.svg"
              alt=""
            />
            <div className="error-msg">
              {categoryTouched && categoryError && <p>{categoryError}</p>}
            </div>
          </div>
          <div className="add-task-subtask">
            <p>Subtask</p>
            <input
              type="text"
              id="subtask"
              name="subtask"
              placeholder="Enter subtask..."
              value={subtaskValue}
              onChange={this.updateSubtaskValue}
              autoComplete="off"
            />
            {subtaskValue ? (
              <div className="add-task-subtask-btns">
                <img
                  src="./../../../assets/img/add-task/close.svg"
                  alt="Clear"
                  onClick={() => this.setState({ subtaskValue: "" })}
                />
                <span className="add-task-subtask-line"></span>
                <img
                  src="./../../../assets/img/add-task/check.svg"
                  alt="Add"
                  onClick={this.addSubtask}
                />
              </div>
            ) : (
              <img
                className="add-task-add"
                src="./../../../assets/img/add-task/add.svg"
                alt="Add"
              />
            )}
            {taskData.subtasksTitle.length > 0 && (
              <div className="add-task-subtask-list">
                {taskData.subtasksTitle
                  .slice()
                  .reverse()
                  .map((task, index) => (
                    <div key={index} className="add-task-single-subtask">
                      <p>- {task}</p>
                      <img
                        src="./../../../assets/img/add-task/close.svg"
                        alt="Delete"
                        onClick={() => this.deleteSubtask(task, index)}
                      />
                    </div>
                  ))}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default TaskForm;
