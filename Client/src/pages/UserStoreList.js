import React, { Component } from 'react';
import axios from 'axios';
import RatingStars from '../components/RatingStars';
import Navbar from '../components/Navbar';
import ChangePasswordModal from '../components/ChangePasswordModal';
import '../styles.css'

class UserStoreList extends Component {
  state = { stores: [], search: '', submitting: {} ,showPasswordModal: false}

  componentDidMount() {
    this.fetchStores();
  }

  fetchStores = async () => {
    const token = localStorage.getItem('authToken');
    const res = await axios.get(
      `https://storeratingportal-production.up.railway.app/stores/all?search=${this.state.search}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    this.setState({ stores: res.data });
  };

  handleSearchChange = e => {
    this.setState({ search: e.target.value });
  };

  handleSearchSubmit = e => {
    e.preventDefault();
    this.fetchStores();
  };

  submitRating = async (storeId, value) => {
    const token = localStorage.getItem('authToken');
    this.setState(prev => ({
      submitting: { ...prev.submitting, [storeId]: true }
    }));

    try {
      await axios.post(
        'https://storeratingportal-production.up.railway.app/ratings/submit',
        { storeId, value },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      this.setState(prev => ({
        stores: prev.stores.map(s =>
          s.id === storeId ? { ...s, user_rating: value } : s
        ),
        submitting: { ...prev.submitting, [storeId]: false }
      }));
    } catch {
      alert('Could not submit rating');
      this.setState(prev => ({
        submitting: { ...prev.submitting, [storeId]: false }
      }));
    }
  };

  render() {
    const { stores, search, submitting } = this.state;

    return (
      <>
        <Navbar />
        <div className='btnalign'>
        <button className="changebtn" onClick={() => this.setState({ showPasswordModal: true })}>Change Password</button>
        </div>
        
        <div className="dashboard">
          <form className="search-bar" onSubmit={this.handleSearchSubmit}>
            <input
              type="text"
              placeholder="Search by name or address"
              value={search}
              onChange={this.handleSearchChange}
            />
            <button type="submit">Search</button>
          </form>

          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Address</th>
                <th>Overall Rating</th>
                <th>Your Rating</th>
              </tr>
            </thead>
            <tbody>
              {stores.map(s => (
                <tr key={s.id}>
                  <td>{s.name}</td>
                  <td>{s.address}</td>
                  <td>{s.average_rating ?? 'N/A'}</td>
                  <td>
                    <RatingStars
                      value={s.user_rating}
                      interactive={!submitting[s.id]}
                      onChange={val => this.submitRating(s.id, val)}
                    />
                    {submitting[s.id] && <small>Saving…</small>}
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

export default UserStoreList;
