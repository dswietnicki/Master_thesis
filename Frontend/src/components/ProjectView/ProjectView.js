import React, { Component } from "react";
import { getTasksFromProject, addTask } from "../../api/tasks";
import { getProject } from "../../api/projects";
import "./ProjectView.scss";
import TasksShortInfo from "../../containers/TasksShortInfo/TasksShortInfo";
import AddTask from "../../containers/AddTask/AddTask";

class ProjectView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      projectId: "",
      tasks: [],
      project: {}
    };
  }

  async componentDidMount() {
    const tasks = await getTasksFromProject(this.props.match.params.projectId);
    const project = await getProject(this.props.match.params.projectId);

    this.setState({
      projectId: this.props.match.params.projectId,
      tasks: tasks.data,
      project: project.data,
      users: project.data.users
    });
  }

  openTask = id => {
    this.props.history.push("/project/" + this.state.projectId + "/" + id);
  };

  addTask = async (task) => {
    task.projectId = this.state.projectId;
    const tasks = this.state.tasks;
    const newTask = await addTask(task);

    tasks.push(newTask.data);

    this.setState({
      tasks: tasks
    })
  }

  render() {
    return (
      <div>
        <div className="project-info">
          <p>Project name: {this.state.project.name}</p>
        </div>
        <div className="add-task-project">
        <AddTask addTask={this.addTask} users={this.state.users}/>
        </div>
        <TasksShortInfo tasks={this.state.tasks} openTask={this.openTask} />
      </div>
    );
  }
}

export default ProjectView;
