import React, { Component } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import RatingStars from '../components/RatingStars';
import ChangePasswordModal from '../components/ChangePasswordModal';
import '../styles.css'

class OwnerDashboard extends Component {
  state = { ratings: [], avg: 0 ,showPasswordModal: false};

  componentDidMount() {
    this.fetchRatings();
  }
  

  fetchRatings = async () => {
    const token = localStorage.getItem('authToken');
    const res = await axios.get('http://localhost:3001/owner/store/ratings', {
      headers: { Authorization: `Bearer ${token}` }
    });
    const ratings = res.data;
    const avg =
      ratings.reduce((s, r) => s + r.rating, 0) / (ratings.length || 1);
    this.setState({ ratings, avg: avg.toFixed(2) });
  };

  render() {
    const { ratings, avg } = this.state;
    return (
      <>
        <Navbar />
        <div className='btnalign'>
        <button className='changebtn' onClick={() => this.setState({ showPasswordModal: true })}>Change Password</button>
        </div>
        
        <div className="dashboard">
          <div className="avg-banner">Average Rating: {avg}</div>
          <table>
            <thead>
              <tr>
                <th>User</th>
                <th>Rating</th>
              </tr>
            </thead>
            <tbody>
              {ratings.map(r => (
                <tr key={r.ratedBy + r.rating}>
                  <td>{r.ratedBy}</td>
                  <td>
                    <RatingStars value={r.rating} interactive={false} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {this.state.showPasswordModal && (
  <ChangePasswordModal onClose={() => this.setState({ showPasswordModal: false })} />
)}
      </>
    );
  }
}

export default OwnerDashboard;
