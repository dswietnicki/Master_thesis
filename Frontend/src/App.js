import React, { Component } from 'react';
import './App.scss';
import axios from 'axios';
import { connect } from 'react-redux';
import PrivateRoute from './routeGuards/PrivateRoute';
import LoginRoute from './routeGuards/LoginRoute';
import Login from './components/Login/login';
import Home from './components/Home/home';
import YourProjects from './components/YourProjects/YourProjects';
import Projects from './components/Projects/Projects';
import Navbar from './containers/Navbar/Navbar';
import Register from './components/Register/register';
import ProjectView from './components/ProjectView/ProjectView';
import TaskView from './components/TaskView/TaskView';
import { authenticate, setUserInfo, isAdmin } from './actions/user-actions';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      profileLoaded: false
    };
  }
  async componentDidMount() {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const response = await axios.get('/api/users/user', {
          headers: {
            "x-auth-token": token
          }
        })
        this.props.setUserInfo(response.data)
        this.props.authenticate(true)
      } catch { }
    }
    this.setState({
      profileLoaded: true
    })
  }

  render() {
    return (
      this.state.profileLoaded ?
        // <Fragment>
          <div className="app-container">
          <Navbar />
          <div className="components-container">
            <LoginRoute path="/login" component={Login} authed={this.props.authenticated} />
            <LoginRoute path="/register" component={Register} authed={this.props.authenticated} />
            <PrivateRoute path="/" exact component={Home} authed={this.props.authenticated} />
            <PrivateRoute path="/allprojects" exact component={Projects} authed={this.props.authenticated} />
            <PrivateRoute path="/yourprojects" exact component={YourProjects} authed={this.props.authenticated} />
            <PrivateRoute path="/project/:projectId/" exact component={ProjectView} authed={this.props.authenticated} />
            <PrivateRoute path="/project/:projectId/:taskId" exact component={TaskView} authed={this.props.authenticated} />
          </div>
        {/* </Fragment> */}
          </div>
        :
        null
    );
  }
}

const mapStateToProps = state => {
  return {
    authenticated: state.authenticated,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    authenticate: value => dispatch(authenticate(value)),
    setUserInfo: value => dispatch(setUserInfo(value)),
    isAdmin: value => dispatch(isAdmin(value))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
