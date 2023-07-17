import React, { Component } from "react";
import { connect } from "react-redux";
import "./YourProjects.scss";
import { getProjectsOfUser, addProject } from "../../api/projects";
import ProjectsTable from "../../containers/ProjectsTable/ProjectsTable";
import AddProject from "../../containers/AddProject/AddProject";

class YourProjects extends Component {
  constructor(props) {
    super(props);

    this.state = {
      allProjects: [],
      filteredProjects: []
    };
  }

  async componentDidMount() {
    const projects = await getProjectsOfUser(this.props.userInfo._id);
    this.setState({
      allProjects: projects.data,
      filteredProjects: projects.data
    });
  }

  openProject = id => {
    this.props.history.push("/project/" + id);
  };

  filterProjects = event => {
    const projects = this.state.allProjects;
    const filteredProjects = projects.filter(project =>
      project.name.includes(event.target.value)
    );

    this.setState({
      filteredProjects: filteredProjects
    });
  };

  addProject = async project => {
    const projects = this.state.allProjects;
    const newProject = await addProject(project);

    projects.push(newProject.data);

    this.setState({
      allProjects: projects
    });
  };

  render() {
    return (
      <div className="projects-container">
        <div className="projects-options">
          <h4>List of projects you are member of</h4>
          <input
            className="searchInput"
            type="text"
            placeholder="Search project"
            onChange={this.filterProjects}
          />
          <AddProject addProject={this.addProject} />
        </div>
        <div className="projects-table">
          <ProjectsTable
            projects={this.state.filteredProjects}
            openProject={this.openProject}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    userInfo: state.userInfo
  };
};

export default connect(mapStateToProps)(YourProjects);
