import React, { Component } from 'react';
import './login.scss';
import axios from 'axios';
import { connect } from "react-redux";
import { Redirect } from 'react-router-dom'
import { authenticate, setUserInfo, isAdmin } from '../../actions/user-actions';
import Button from '@material-ui/core/Button';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      login: '',
      password: '',
      redirectRegister: false,
      formError: false
    };
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleSubmit = async (event) => {
    const login = this.state.login;
    const password = this.state.password;
    try {
      const response = await axios.post('/api/users/login', { login, password })
      localStorage.setItem('token', response.headers['x-auth-token']);
      this.props.setUserInfo(response.data);
      this.props.authenticate(true)
    }
    catch (err) {
      this.setState({
        formError: true
      })
    }
  }

  goToRegister = () => {
    this.setState({
      redirectRegister: true
    })
  }

  render() {
    if (this.state.redirectRegister) {
      return <Redirect to='/register' />;
    }
    return (
      <div className="login-container">
        <div className="login-box">
          <div className="login-form">
            <input type="text" placeholder="Login" id="login" value={this.state.login} onChange={this.handleChange}></input>
            <input type="password" placeholder="Password" id="password" value={this.state.password} onChange={this.handleChange}></input>
            <Button
              variant="contained"
              color="primary"
              onClick={this.handleSubmit}
            >
              Login
            </Button>
          </div>
          <span className="error" style={{ visibility: this.state.formError ? 'visible' : 'hidden' }}>Wrong credentials</span>
          <span className="newAcc" onClick={this.goToRegister}>New account</span>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    authenticate: value => dispatch(authenticate(value)),
    setUserInfo: value => dispatch(setUserInfo(value)),
    isAdmin: value => dispatch(isAdmin(value))
  };
};

export default connect(null, mapDispatchToProps)(Login);
