import React from "react";
import "./add-task.css";
import { Task } from "../../../interfaces/task.interface";
import LargeButton from "../../shared/components/buttons/large-btn";
import Subtask from "./subtasks";
import Assigned from "./assigned";
import { User } from "../../../interfaces/user.interface";
import { withTranslation, WithTranslation } from "react-i18next";

interface AddTaskProps extends WithTranslation {
  users: User[];
  currentUser: User;
  taskStatus: string;
  addTask: (task: Task) => Promise<void>;
  showOverlayMsg: (
    message: string,
    timeout: number,
    action: { reload?: boolean; href?: string }
  ) => void;
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
  currentUser: User;
  isSubmitting: boolean;
}

// Constants for validation inside the component
const TITLE_MIN_LENGTH = 8;
const TITLE_MAX_LENGTH = 40;
const DESCRIPTION_MIN_LENGTH = 24;
const DESCRIPTION_MAX_LENGTH = 180;

class AddTask extends React.Component<AddTaskProps, AddTaskState> {
  constructor(props: AddTaskProps) {
    super(props);
    const today = new Date().toISOString().split("T")[0];
    this.state = {
      taskData: {
        title: "",
        description: "",
        date: today,
        priority: "medium",
        category: "",
        subtasksTitle: [],
        subtasksDone: [],
        assigned: [],
        creator: this.props.currentUser.id || "",
        status: this.props.taskStatus,
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
      currentUser: this.props.currentUser,
      isSubmitting: false,
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

    const selectedDate = new Date(value);
    const today = new Date();

    today.setHours(0, 0, 0, 0);

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

    const selectedDate = new Date(date);
    const today = new Date();

    today.setHours(0, 0, 0, 0);

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
    const today = new Date().toISOString().split("T")[0];
    this.setState({
      taskData: {
        title: "",
        description: "",
        date: today,
        priority: "medium",
        category: "",
        subtasksTitle: [],
        subtasksDone: [],
        assigned: [],
        creator: this.props.currentUser.id || "",
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

    const isTitleValid =
      taskData.title.length >= TITLE_MIN_LENGTH &&
      taskData.title.length <= TITLE_MAX_LENGTH;
    const isDescriptionValid =
      taskData.description.length >= DESCRIPTION_MIN_LENGTH &&
      taskData.description.length <= DESCRIPTION_MAX_LENGTH;
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

    if (this.isFormValid() && !this.state.isSubmitting) {
      this.setState({ isSubmitting: true });

      try {
        const { taskData } = this.state;
        await this.props.addTask(taskData);
        this.props.showOverlayMsg("Task added successfully", 1500, {
          href: "/board",
        });
        this.resetForm();
      } catch (error) {
        this.props.showOverlayMsg("Error adding task", 1500, {
          reload: false,
        });
        console.error("Error adding task:", error);
      } finally {
        this.setState({ isSubmitting: false });
      }
    }
  };

  render() {
    const { t } = this.props;

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

    const today = new Date().toISOString().split("T")[0];

    return (
      <form className="add-task" onSubmit={this.handleFormSubmit}>
        <div className="add-task-content">
          <div className="add-task-left">
            <div className="add-task-title">
              <p>
                {t("add-task.title")}
                <span className="red-dot">*</span>
              </p>
              <input
                type="text"
                id="title"
                name="title"
                maxLength={TITLE_MAX_LENGTH}
                placeholder={
                  taskData.title ? taskData.title : t("add-task.enterTitle")
                }
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
                    <p>{t("add-task.requiredField")}</p>
                  ) : (
                    (!isTitleValid &&
                      taskData.title.length < TITLE_MIN_LENGTH && (
                        <p>
                          {t("add-task.minLettersRequired", {
                            count: TITLE_MIN_LENGTH,
                          })}
                        </p>
                      )) ||
                    (!isTitleValid &&
                      taskData.title.length > TITLE_MAX_LENGTH && (
                        <p>
                          {t("add-task.maxLettersAllowed", {
                            count: TITLE_MAX_LENGTH,
                          })}
                        </p>
                      ))
                  ))}
              </div>
            </div>
            <div className="add-task-description">
              <p>
                {t("add-task.description")}
                <span className="red-dot">*</span>
              </p>
              <textarea
                id="description"
                rows={5}
                maxLength={DESCRIPTION_MAX_LENGTH}
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
                placeholder={t("add-task.enterDescription")}
                autoComplete="off"
                required
              ></textarea>
              <div className="error-msg">
                {descriptionTouched &&
                  (isDescriptionEmpty ? (
                    <p>{t("add-task.requiredField")}</p>
                  ) : (
                    (!isDescriptionValid &&
                      taskData.description.length < DESCRIPTION_MIN_LENGTH && (
                        <p>
                          {t("add-task.minLettersRequired", {
                            count: DESCRIPTION_MIN_LENGTH,
                          })}
                        </p>
                      )) ||
                    (!isDescriptionValid &&
                      taskData.description.length > DESCRIPTION_MAX_LENGTH && (
                        <p>
                          {t("add-task.maxLettersAllowed", {
                            count: DESCRIPTION_MAX_LENGTH,
                          })}
                        </p>
                      ))
                  ))}
              </div>
            </div>
            <div className="add-task-assigned">
              <p>{t("add-task.assignedTo")}</p>
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
                {t("add-task.date")}
                <span className="red-dot">*</span>
              </p>
              <input
                type="date"
                id="date"
                name="date"
                value={taskData.date}
                min={today}
                onChange={this.handleDateChange}
                onBlur={this.handleDateBlur}
                autoComplete="off"
                required
              />
              <div className="error-msg">
                {dateTouched && dateError && <p>{dateError}</p>}
                {dateTouched && !dateError && dateInPast && (
                  <p>{t("add-task.dateInPast")}</p>
                )}
              </div>
            </div>
            <div className="add-task-priority">
              <p>{t("add-task.priority")}</p>
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
                    <span>{t("add-task.priorityLevels.high")}</span>
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
                    <span>{t("add-task.priorityLevels.medium")}</span>
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
                    <span>{t("add-task.priorityLevels.low")}</span>
                    <img src="/assets/img/low.svg" alt="Low" />
                  </div>
                </button>
              </div>
            </div>
            <div className="add-task-category">
              <p>
                {t("add-task.category")}
                <span className="red-dot">*</span>
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
                  {t("add-task.selectCategory")}
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
                  <p>{t("add-task.requiredField")}</p>
                )}
              </div>
            </div>
            <Subtask onSubtasksChange={this.handleSubtasksChange} />
          </div>
        </div>
        <div className="add-task-footer">
          <LargeButton
            value={t("add-task.clear")}
            type="button"
            imgPath="clear"
            isWhite={true}
            onClick={this.resetForm}
            disabled={this.state.isSubmitting}
          />
          <LargeButton
            value={t("add-task.addTask")}
            type="submit"
            imgPath="add"
            disabled={!this.isFormValid() || this.state.isSubmitting}
          />
        </div>
      </form>
    );
  }
}

export default withTranslation()(AddTask);
