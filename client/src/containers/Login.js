/* eslint-disable no-console */
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';

import {
  LinkButtons,
  SubmitButtons,
  registerButton,
  homeButton,
  loginButton,
  forgotButton,
  inputStyle,
  HeaderBar,
} from '../components/Login';

const title = {
  pageTitle: 'ThisforThat',
};

class Login extends Component {
  constructor() {
    super();

    this.state = {
      username: '',
      password: '',
      loggedIn: false,
      showError: false,
      showNullError: false,
    };
  }

  handleChange = name => (event) => {
    this.setState({
      [name]: event.target.value,
    });
  };

  loginUser = (e) => {
    e.preventDefault();
    //TESTING REMOVE BEFORE PRODUCTION
    console.log("loginuser reached!")
    console.log(this.state);
    const { username, password } = this.state; 
    if (username === '' || password === '') {
      this.setState({
        showError: false,
        showNullError: true,
        loggedIn: false,
      });
    } else {
      axios
        .post('http://localhost:8080/login', {
          username,
          password,
        })
        .then((response) => {
          console.log(response.data);
          localStorage.setItem('JWT', response.data.token);
          this.setState({
            // 64/65 added by santiago
            username: response.data.username,
            password: response.data.password,
            loggedIn: true,
            showError: false,
            showNullError: false,
          });
          console.log('working on 69')
        })
        // .catch((error) => {
        //   console.log("ARE YOU THERE");
        //   // console.error(error.response.data);
        //   if (
        //     error.response.data === 'bad username'
        //     || error.response.data === 'passwords do not match'
        //   ) {
        //     this.setState({
        //       showError: true,
        //       showNullError: false,
        //     });
        //   }
        // });
    }
  };

  render() {
    const {
      username,
      password,
      showError,
      loggedIn,
      showNullError,
    } = this.state;
    if (!loggedIn) {
      return (
        <div>
          <HeaderBar title={title} />
          <form className="profile-form" onSubmit={this.loginUser}>
            <TextField
              style={inputStyle}
              id="username"
              label="username"
              value={username}
              onChange={this.handleChange('username')}
              placeholder="Username"
            />
            <TextField
              style={inputStyle}
              id="password"
              label="password"
              value={password}
              onChange={this.handleChange('password')}
              placeholder="Password"
              type="password"
            />
            <SubmitButtons buttonStyle={loginButton} buttonText="Login" />
          </form>
          {showNullError && (
            <div>
              <p>The username or password cannot be empty.</p>
            </div>
          )}
          {showError && (
            <div>
              <p>
                That username or password isn&apos;t recognized. Please try
                again or register now.
              </p>
              <LinkButtons
                buttonText="Register"
                buttonStyle={registerButton}
                link="/register"
              />
            </div>
          )}
          <LinkButtons buttonText="Go Home" buttonStyle={homeButton} link="/" />
          <LinkButtons
            buttonStyle={forgotButton}
            buttonText="Forgot Password?"
            link="/forgotPassword"
          />
        </div>
      );
    }
    return <Redirect to={`/userProfile/${username}`} />;
  }
}

export default Login;
