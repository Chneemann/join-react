import React from "react";
import "./subtasks.css";
import { withTranslation, WithTranslation } from "react-i18next";
import { Task } from "../../../interfaces/task.interface";

interface SubtaskProps extends WithTranslation {
  taskId: string | null;
  tasks: Task[];
  onSubtasksChange: (subtasksTitle: string[], subtasksDone: boolean[]) => void;
}

interface SubtaskState {
  subtasksTitle: string[];
  subtasksDone: boolean[];
  subtaskValue: string;
}

class Subtask extends React.Component<SubtaskProps, SubtaskState> {
  constructor(props: SubtaskProps) {
    super(props);
    this.state = {
      subtasksTitle: [],
      subtasksDone: [],
      subtaskValue: "",
    };
  }

  /**
   * Lifecycle method to load the subtasks when the component mounts.
   */
  componentDidMount() {
    const { taskId, tasks } = this.props;
    if (taskId) {
      const taskToLoad = tasks.find((task) => task.id === taskId);
      if (taskToLoad) {
        this.setState({
          subtasksTitle: taskToLoad.subtasksTitle.map((subtask) => subtask),
          subtasksDone: taskToLoad.subtasksDone.map((subtask) => subtask),
        });
      }
    }
  }

  // Method for updating the subtask input value
  updateSubtaskValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ subtaskValue: event.target.value });
  };

  // Method to add a new subtask
  addSubtask = () => {
    const { subtaskValue, subtasksTitle, subtasksDone } = this.state;
    if (subtaskValue.trim()) {
      const newSubtasksTitle = [...subtasksTitle, subtaskValue];
      const newSubtasksDone = [...subtasksDone, true];

      this.setState(
        {
          subtasksTitle: newSubtasksTitle,
          subtasksDone: newSubtasksDone,
          subtaskValue: "",
        },
        () => {
          this.props.onSubtasksChange(newSubtasksTitle, newSubtasksDone);
        }
      );
    }
  };

  // Method for deleting a subtask
  deleteSubtask = (index: number) => {
    const { subtasksTitle, subtasksDone } = this.state;
    const newSubtasksTitle = subtasksTitle.filter((_, i) => i !== index);
    const newSubtasksDone = subtasksDone.filter((_, i) => i !== index);

    this.setState(
      {
        subtasksTitle: newSubtasksTitle,
        subtasksDone: newSubtasksDone,
      },
      () => {
        this.props.onSubtasksChange(newSubtasksTitle, newSubtasksDone);
      }
    );
  };

  render() {
    const { t } = this.props;
    const { subtasksTitle, subtaskValue } = this.state;

    return (
      <div className="subtask">
        <p>{t("add-task.subtask")}</p>
        <input
          type="text"
          id="subtask"
          name="subtask"
          maxLength={27}
          placeholder={t("add-task.enterSubtask")}
          value={subtaskValue}
          onChange={this.updateSubtaskValue}
          autoComplete="off"
        />
        {subtaskValue ? (
          <div className="subtask-btns">
            <img
              src="./../../../assets/img/add-task/close.svg"
              alt="Clear"
              onClick={() => this.setState({ subtaskValue: "" })}
            />
            <span className="subtask-line"></span>
            <img
              src="./../../../assets/img/add-task/check.svg"
              alt="Add"
              onClick={this.addSubtask}
            />
          </div>
        ) : (
          <img
            className="subtask-add"
            src="./../../../assets/img/add-task/add.svg"
            alt="Add"
          />
        )}
        {subtasksTitle.length > 0 && (
          <div className="subtask-list">
            {subtasksTitle.slice().map((task, index) => (
              <div key={index} className="single-subtask">
                <p>- {task}</p>
                <img
                  src="./../../../assets/img/add-task/close.svg"
                  alt="Delete"
                  onClick={() => this.deleteSubtask(index)}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }
}

export default withTranslation()(Subtask);
