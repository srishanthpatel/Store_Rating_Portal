import React, { Component } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import '../styles.css'
class SignupForm extends Component {
  state = {
    name: '',
    email: '',
    address: '',
    password: '',
    confirm: '',
    fieldErrors: {},
    apiError: '',
    successMsg: ''
  };

  validateName = v => v.length >= 20 && v.length <= 60;
  validateAddress = v => v.length <= 400;
  validateEmail = v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
  validatePassword = v =>
    /^(?=.*[A-Z])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,16}$/.test(v);

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value, apiError: '', successMsg: '' });
  };

  runClientValidation = () => {
    const { name, email, address, password, confirm } = this.state;
    const errs = {};

    if (!this.validateName(name)) errs.name = 'Name must be 20‑60 characters';
    if (!this.validateEmail(email)) errs.email = 'Invalid email format';
    if (!this.validateAddress(address)) errs.address = 'Address max 400 chars';
    if (!this.validatePassword(password))
      errs.password =
        '8‑16 chars, 1 uppercase, 1 special';
    if (password !== confirm) errs.confirm = 'Passwords do not match';

    return errs;
  };

  handleSubmit = async e => {
    e.preventDefault();
    const fieldErrors = this.runClientValidation();
    if (Object.keys(fieldErrors).length) {
      this.setState({ fieldErrors });
      return;
    }

    const { name, email, address, password } = this.state;
    try {
      await axios.post('http://localhost:3001/auth/register', {
        name,
        email,
        address,
        password
      });
      this.setState({
        successMsg: 'Registration successful! Please log in.',
        fieldErrors: {},
        name: '',
        email: '',
        address: '',
        password: '',
        confirm: ''
      });
      setTimeout(() => this.props.history.push('/login'), 1500);
    } catch (err) {
      const msg =
        err.response?.data?.error || 'Email Already Registered';
      this.setState({ apiError: msg });
    }
  };

  renderInput = (name, type, placeholder) => (
    <div className="form-group">
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={this.state[name]}
        onChange={this.handleChange}
        className={`form-inp${this.state.fieldErrors[name] ? 'invalid' : ''}`}
        required
      />
      {this.state.fieldErrors[name] && (
        <small className="error">{this.state.fieldErrors[name]}</small>
      )}
    </div>
  );

  render() {
    const { apiError, successMsg } = this.state;

    return (
      <div className="form-container">
        <h2>Signup</h2>

        {apiError && <p className="error center">{apiError}</p>}
        {successMsg && <p className="success center">{successMsg}</p>}

        <form onSubmit={this.handleSubmit} noValidate>
          {this.renderInput('name', 'text', 'Full Name (20‑60 chars)')}
          {this.renderInput('email', 'email', 'Email')}
          {this.renderInput('address', 'text', 'Address (max 400 chars)')}
          {this.renderInput('password', 'password', 'Password')}
          {this.renderInput('confirm', 'password', 'Confirm Password')}
          <button type="submit" className='btnstyle'>Create Account</button>
        </form>

        <p className="center">
          Already registered? <a href="/login">Log in</a>
        </p>
      </div>
    );
  }
}

export default withRouter(SignupForm);
