import React, { Component } from 'react';
import axios from 'axios';
import DashboardCard from '../components/DashboardCard';
import Navbar from '../components/Navbar';
import CreateEntityModal from '../components/CreateEntityModal';
import '../styles.css'

class AdminDashboard extends Component {
  state = {
    totals: { users: 0, stores: 0, ratings: 0 },
    users: [],
    stores: [],
    sortKeyUsers: 'name',
    sortAscUsers: true,
    sortKeyStores: 'name',
    sortAscStores: true,
    search: '',
    showModal: false
  };

  componentDidMount() {
    this.fetchTotals();
    this.fetchUsers();
    this.fetchStores();
  }
   toggleModal = () => this.setState(prev => ({ showModal: !prev.showModal }));

  fetchTotals = async () => {
    const token = localStorage.getItem('authToken');
    const cfg = { headers: { Authorization: `Bearer ${token}` } };
    const res = await axios.get('http://localhost:3001/admin/summary', cfg); // adapt if needed
    this.setState({ totals: res.data },this.fetchTotals);
  };

  fetchUsers = async () => {
    const token = localStorage.getItem('authToken');
    const res = await axios.get('http://localhost:3001/admin/users', {
      headers: { Authorization: `Bearer ${token}` }
    });
    this.setState({ users: res.data },this.fetchUsers);
  };

  fetchStores = async () => {
    const token = localStorage.getItem('authToken');
    const res = await axios.get('http://localhost:3001/admin/stores', {
      headers: { Authorization: `Bearer ${token}` }
    });
    this.setState({ stores: res.data },this.fetchStores);
  };

  sortUsers = key => {
    this.setState(prev => ({
      sortKeyUsers: key,
      sortAscUsers: key === prev.sortKeyUsers ? !prev.sortAscUsers : true
    }));
  };

  sortStores = key => {
    this.setState(prev => ({
      sortKeyStores: key,
      sortAscStores: key === prev.sortKeyStores ? !prev.sortAscStores : true
    }));
  };

  renderTable = (items, cols, sortKey, sortAsc, onSort) => {
    const sorted = [...items].sort((a, b) => {
      if (a[sortKey] < b[sortKey]) return sortAsc ? -1 : 1;
      if (a[sortKey] > b[sortKey]) return sortAsc ? 1 : -1;
      return 0;
    });

    return (
      <table>
        <thead>
          <tr>
            {cols.map(c => (
              <th key={c.key} onClick={() => onSort(c.key)}>
                {c.label} {sortKey === c.key ? (sortAsc ? '▲' : '▼') : ''}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sorted.map(it => (
            <tr key={it.id}>
              {cols.map(c => (
                <td key={c.key}>{it[c.key]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  render() {
    const {
      totals,
      users,
      stores,
      sortKeyUsers,
      sortAscUsers,
      sortKeyStores,
      sortAscStores
    } = this.state;

    return (
      <>
        <Navbar />
        <div className='btnalign'>
        <button className="create-btn" onClick={this.toggleModal}>+ Create</button>
        <CreateEntityModal
        isOpen={this.state.showModal}
        onClose={this.toggleModal}
        onSuccess={() => { this.fetchUsers(); this.fetchStores(); }}
        /></div>
        <div className="dashboard">
          <div className="card-grid">
            <DashboardCard title="Total Users" value={totals.users} color="#28a745" />
            <DashboardCard title="Total Stores" value={totals.stores} color="#17a2b8" />
            <DashboardCard title="Total Ratings" value={totals.ratings} color="#ffc107" />
          </div>

          <h2 className="section-title">Users</h2>
          {this.renderTable(
            users,
            [
              { key: 'name', label: 'Name' },
              { key: 'email', label: 'Email' },
              { key: 'address', label: 'Address' },
              { key: 'role', label: 'Role' }
            ],
            sortKeyUsers,
            sortAscUsers,
            this.sortUsers
          )}

          <h2 className="section-title">Stores</h2>
          {this.renderTable(
            stores,
            [
              { key: 'name', label: 'Name' },
              { key: 'email', label: 'Email' },
              { key: 'address', label: 'Address' },
              { key: 'average_rating', label: 'Rating' }
            ],
            sortKeyStores,
            sortAscStores,
            this.sortStores
          )}
        </div>
      </>
    );
  }
}

export default AdminDashboard;
