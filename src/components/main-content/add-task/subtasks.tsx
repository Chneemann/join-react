import React from "react";
import "./subtasks.css";

interface SubtaskProps {
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
        // Callback zu AddTask, um Änderungen weiterzugeben
        this.props.onSubtasksChange(newSubtasksTitle, newSubtasksDone);
      }
    );
  };

  render() {
    const { subtasksTitle, subtaskValue } = this.state;

    return (
      <div className="subtask">
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
            {subtasksTitle
              .slice()
              .reverse()
              .map((task, index) => (
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

export default Subtask;
