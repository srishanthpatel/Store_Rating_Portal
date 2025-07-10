import React, { Component } from 'react';
import axios from 'axios';
import '../styles.css'

class LoginForm extends Component {
  state = {
    email: '',
    password: '',
    error: '',
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value, error: '' });
  };

  handleSubmit = async e => {
    e.preventDefault();
    const { email, password } = this.state;

    if (!email || !password) {
      this.setState({ error: 'All fields are required' });
      return;
    }

    try {
      const res = await axios.post('http://localhost:3001/auth/login', { email, password });
      const { role } = res.data.user;
       localStorage.setItem('authToken', res.data.accessToken);
        localStorage.setItem('user', JSON.stringify(res.data.user));

      // redirect based on role
      if (role === 'ADMIN') {
        this.props.history.push('/admin/dashboard');
      } else if (role === 'OWNER') {
        this.props.history.push('/owner/dashboard');
      } else {
        this.props.history.push('/user/stores');
      }
    } catch (err) {
      const msg = err.response?.data?.error ||err.response.data.message;
      this.setState({ error: msg });
      console.log(err.response.data.message)
    }
  };

  render() {
    const { email, password, error } = this.state;

    return (
      <div className="form-container">
        <h2>Login</h2>
        {error && <p className="error">{error}</p>}
        <form onSubmit={this.handleSubmit}>
          <input
            type="email"
            name="email"
            value={email}
            placeholder="Email"
            onChange={this.handleChange}
            required
            className='form-inp'
          />
          <input
            type="password"
            name="password"
            value={password}
            placeholder="Password"
            onChange={this.handleChange}
            className='form-inp'
            required
          />
          <button type="submit" className='btnstyle'>Login</button>
        </form>
        <p>Don't have an account? <a href="/signup">Signup</a></p>
      </div>
    );
  }
}

export default LoginForm;
