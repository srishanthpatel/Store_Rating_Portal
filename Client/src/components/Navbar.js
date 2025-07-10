import React from 'react';
import '../styles.css'
class Navbar extends React.Component {
  handleLogout = () => {
    localStorage.clear();
    window.location.href = '/login';
  };

  render() {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return (
      <nav className="navbar">
        <span className="brand">Store Ratings Portal</span>
        <span className="role">Role: {user.role}</span>
        <button onClick={this.handleLogout}>Logout</button>
      </nav>
    );
  }
}

export default Navbar;
