import React from "react";
import "./add-task.css";
import { Task } from "../../../interfaces/task.interface";
import LargeButton from "../../shared/components/buttons/large-btn";
import { addNewTask } from "../../../services/firebase.service";
import Subtask from "./subtasks";
import Assigned from "./assigned";
import { User } from "../../../interfaces/user.interface";

interface AddTaskProps {
  users: User[];
  addTask: (task: Task) => Promise<void>;
  showOverlay: (message: string, timeout?: number) => void;
}

interface AddTaskState {
  taskData: Task;
  titleTouched: boolean;
  titleError: string;
  descriptionTouched: boolean;
  descriptionError: string;
  dateTouched: boolean;
  dateError: string;
  dateInPast: boolean;
  categoryTouched: boolean;
  categoryError: string;
  assigned: string[];
}

class AddTask extends React.Component<AddTaskProps, AddTaskState> {
  constructor(props: AddTaskProps) {
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
        assigned: [],
        creator: "",
        status: "todo",
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
      assigned: [],
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
  // Method to handle the change in the list of assigned users
  handleAssignedChange = (assigned: string[]) => {
    this.setState((prevState) => ({
      taskData: {
        ...prevState.taskData,
        assigned,
      },
      assigned,
    }));
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
  // Method for receiving changes to subtasks
  handleSubtasksChange = (subtasksTitle: string[], subtasksDone: boolean[]) => {
    this.setState((prevState) => ({
      taskData: {
        ...prevState.taskData,
        subtasksTitle,
        subtasksDone,
      },
    }));
  };

  // FORM
  // Method to reset the form
  resetForm = () => {
    this.setState({
      taskData: {
        title: "",
        description: "",
        date: "",
        priority: "medium",
        category: "",
        subtasksTitle: [],
        subtasksDone: [],
        assigned: [],
        creator: "",
        status: "todo",
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
    });
  };

  // Method for checking whether the entire form is valid
  isFormValid = () => {
    const { isTitleValid, isDescriptionValid, isDateValid, isCategoryValid } =
      this.validateFields();
    return isTitleValid && isDescriptionValid && isDateValid && isCategoryValid;
  };

  // Method to validate the fields
  validateFields = () => {
    const { taskData } = this.state;

    const isTitleValid = taskData.title.length >= 8;
    const isDescriptionValid = taskData.description.length >= 24;
    const isDateValid = taskData.date !== "";
    const isCategoryValid = taskData.category !== "";

    return {
      isTitleValid,
      isDescriptionValid,
      isDateValid,
      isCategoryValid,
      isTitleEmpty: taskData.title.length === 0,
      isDescriptionEmpty: taskData.description.length === 0,
      dateError: taskData.date === "" ? "Date is required" : "",
      categoryError: taskData.category === "" ? "Required" : "",
    };
  };

  // Method to submit the form and add a new task
  handleFormSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (this.isFormValid()) {
      try {
        const { taskData } = this.state;
        await addNewTask(taskData);
        await this.props.addTask(taskData);
        this.props.showOverlay("Task added successfully!", 5000);
        this.resetForm();
        await new Promise((resolve) => setTimeout(resolve, 5000));
        window.location.href = "/board";
      } catch (error) {
        console.error("Error adding task:", error);
      }
    }
  };

  render() {
    const {
      taskData,
      titleTouched,
      descriptionTouched,
      dateTouched,
      dateInPast,
      categoryTouched,
    } = this.state;

    const {
      isTitleValid,
      isDescriptionValid,
      isTitleEmpty,
      isDescriptionEmpty,
      dateError,
      categoryError,
    } = this.validateFields();

    return (
      <form className="add-task" onSubmit={this.handleFormSubmit}>
        <div className="add-task-content">
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
                  });
                }}
              />
              <div className="error-msg">
                {titleTouched &&
                  (isTitleEmpty ? (
                    <p>Title is required</p>
                  ) : (
                    !isTitleValid && <p>Minimum 8 letters required</p>
                  ))}
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
                onChange={(event) =>
                  this.handleInputChange(event, "description")
                }
                onBlur={() => {
                  this.setState({
                    descriptionTouched: true,
                  });
                }}
                placeholder="Enter a description..."
                autoComplete="off"
                required
              ></textarea>
              <div className="error-msg">
                {descriptionTouched &&
                  (isDescriptionEmpty ? (
                    <p>Description is required</p>
                  ) : !isDescriptionValid ? (
                    <p>Minimum 24 letters required</p>
                  ) : null)}
              </div>
            </div>
            <div className="add-task-assigned">
              <p>Assigned to</p>
              <Assigned
                users={this.props.users}
                assigned={this.state.taskData.assigned}
                onAssignedChange={this.handleAssignedChange}
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
                {categoryTouched && categoryError && (
                  <p>
                    <p>Category is required</p>
                  </p>
                )}
              </div>
            </div>
            <Subtask onSubtasksChange={this.handleSubtasksChange} />
          </div>
        </div>
        <div className="add-task-footer">
          <LargeButton
            value="Clear"
            type="button"
            imgPath="clear"
            isWhite={true}
            onClick={this.resetForm}
          />
          <LargeButton
            value="Add Task"
            type="submit"
            imgPath="add"
            disabled={!this.isFormValid()}
          />
        </div>
      </form>
    );
  }
}

export default AddTask;
