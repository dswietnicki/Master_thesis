import React, { Component } from 'react';
import { connect } from "react-redux";
import './home.scss';
import { getTasksOfUser } from '../../api/tasks';
import TasksTable from '../../containers/TasksTable/TasksTable';

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userTasks: []
    };
  }

  async componentDidMount() {
    let tasks = await getTasksOfUser(this.props.userInfo._id);
    tasks = tasks.data.filter(task => {
      return task.status === 'IN_PROGRESS'
    })
    this.setState({
      userTasks: tasks
    })
  }

  openTask = id => {
    this.props.history.push("/project/" + this.state.projectId + "/" + id);
  };

  render() {
    return (
      <div>
          <h4>Your tasks in progress </h4>
        <TasksTable tasks={this.state.userTasks} openTask={this.openTask} />
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    userInfo: state.userInfo
  };
};

export default connect(mapStateToProps)(Home);
