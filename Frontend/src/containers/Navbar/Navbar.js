import React, { Component, Fragment } from 'react';
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import './Navbar.scss';
import { authenticate, setUserInfo, isAdmin } from '../../actions/user-actions';

class Navbar extends Component {
  logout = () => {
    localStorage.setItem('token', '');
    this.props.authenticate(false);
    this.props.setUserInfo({});
    this.props.isAdmin(false);
  }

  getUserName = () => {
    return this.props.userInfo.name + ' ' + this.props.userInfo.surname
  }
  

  render() {
    return (
      <Fragment>
        {this.props.authenticated ?
          <div className="nav-bar">
            <div className="nav-container">
              <Link className="nav-item" to="/">Home</Link>
              <Link className="nav-item" to="/allprojects">All Projects</Link>
              <Link className="nav-item" to="/yourprojects">Your Projects</Link>
            </div>
            <div className="me">
              Login as: {this.getUserName()}
              <div className="logout" onClick={this.logout}>Logout</div>
            </div>
          </div>
          :
          null}
      </Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    authenticated: state.authenticated,
    userInfo: state.userInfo
  };
};

const mapDispatchToProps = dispatch => {
  return {
    authenticate: value => dispatch(authenticate(value)),
    setUserInfo: value => dispatch(setUserInfo(value)),
    isAdmin: value => dispatch(isAdmin(value))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
