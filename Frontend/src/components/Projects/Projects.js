import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Projects.scss';
import { getAllProjects, addProject } from '../../api/projects';
import ProjectsTable from '../../containers/ProjectsTable/ProjectsTable';
import AddProject from '../../containers/AddProject/AddProject';
import { allUsers } from '../../api/users';

class Projects extends Component {
  constructor(props) {
    super(props);

    this.state = {
      allProjects: [],
      filteredProjects: [],
      users: []
    };
  }

  async componentDidMount() {
    const fetchedUsers = await allUsers();
    const users = [];
    fetchedUsers.data.forEach(user => {
      const newUser = {
        id: user._id,
        name: user.name + ' ' + user.surname
      }
      users.push(newUser)
    })
    const projects = await getAllProjects();
    this.setState({
      allProjects: projects.data,
      filteredProjects: projects.data,
      users: users
    })
  }

  openProject = (id) => {
    this.props.history.push('/project/' + id)
  }

  filterProjects = (event) => {
    const projects = this.state.allProjects;
    const filteredProjects = projects.filter(project => project.name.includes(event.target.value));

    this.setState({
      filteredProjects: filteredProjects
    })
  }

  addProject = async (project) => {
    const projects = this.state.allProjects;
    const newProject = await addProject(project);

    projects.push(newProject.data);

    this.setState({
      allProjects: projects
    })
  }

  render() {
    return (
      <div className="projects-container">
        <div className="projects-options">
          <h4>All projects</h4>
          <input className="searchInput" type="text" placeholder="Search project" onChange={this.filterProjects} />
          <AddProject addProject={this.addProject} users={this.state.users}/>
        </div>
        <div className="projects-table">
          <ProjectsTable projects={this.state.filteredProjects} openProject={this.openProject} />
        </div>
      </div>
    );
  }
}


const mapStateToProps = state => {
  return {
    userInfo: state.userInfo,
  };
};

export default connect(mapStateToProps)(Projects);