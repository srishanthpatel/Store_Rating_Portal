import React, { Component } from 'react';
import axios from 'axios';
import '../styles.css'

class ChangePasswordModal extends Component {
  state = {
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
    success: '',
    error: '',
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value, success: '', error: '' });
  };

  validate = () => {
    const { newPassword, confirmPassword } = this.state;
    if (newPassword !== confirmPassword) return 'Passwords do not match';
    if (!/^(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,16}$/.test(newPassword))
      return 'New password must be 8–16 chars, 1 uppercase, 1 special char';
    return null;
  };

  handleSubmit = async e => {
    e.preventDefault();
    const { oldPassword, newPassword } = this.state;
    const err = this.validate();
    if (err) return this.setState({ error: err });

    try {
      const token = localStorage.getItem('authToken');
      const res = await axios.post(
        'https://storeratingportal-production.up.railway.app/auth/update-password',
        { oldPassword, newPassword },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      this.setState({
        success: res.data.message || 'Password updated successfully!',
        oldPassword: '',
        newPassword: '',
        confirmPassword: '',
        error: ''
      });
    } catch (err) {
      const msg = err.response?.data?.error || 'Password update failed';
      this.setState({ error: msg });
    }
  };

  render() {
    const { onClose } = this.props;
    const { oldPassword, newPassword, confirmPassword, error, success } = this.state;

    return (
      <div className="modal-backdrop">
        <div className="modal-box">
          <h3>Change Password</h3>
          {error && <p className="error">{error}</p>}
          {success && <p className="success">{success}</p>}
          <form onSubmit={this.handleSubmit}>
            <input
              type="password"
              name="oldPassword"
              value={oldPassword}
              onChange={this.handleChange}
              placeholder="Old Password"
              required
            />
            <input
              type="password"
              name="newPassword"
              value={newPassword}
              onChange={this.handleChange}
              placeholder="New Password"
              required
            />
            <input
              type="password"
              name="confirmPassword"
              value={confirmPassword}
              onChange={this.handleChange}
              placeholder="Confirm New Password"
              required
            />
            <button type="submit">Update Password</button>
            <button type="button" onClick={onClose} className="cancel-btn">Cancel</button>
          </form>
        </div>
      </div>
    );
  }
}

export default ChangePasswordModal;
