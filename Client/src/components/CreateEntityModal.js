import React, { Component } from 'react';
import axios from 'axios';
import Modal from './Modal';
import '../styles.css'

class CreateEntityModal extends Component {
  state = {
    step: 'select',          
    entityType: '',          
    name: '', email: '', address: '', password: '',
    role: 'USER', owner_id: '',
    owners: [],
    error: '', success: ''
  };

  loadOwners = async () => {
    const token = localStorage.getItem('authToken');
    const res = await axios.get('https://storeratingportal-production.up.railway.app/admin/users', {
      headers: { Authorization: `Bearer ${token}` }
    });
    this.setState({ owners: res.data.filter(u => u.role === 'OWNER') });
  };

  chooseType = async type => {
    if (type === 'STORE') await this.loadOwners();
    this.setState({ entityType: type, step: 'form', role: type });
  };

  handleChange = e =>
    this.setState({ [e.target.name]: e.target.value, error: '', success: '' });

  validate = () => {
    const { entityType, name, email, address, password } = this.state;
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const passOk =
      /^(?=.*[A-Z])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,16}$/.test(password);

    if (name.length < 20 || name.length > 60) return 'Name 20‑60 chars';
    if (!emailOk) return 'Invalid email';
    if (address.length > 400) return 'Address ≤ 400 chars';

    if (entityType !== 'STORE' && !passOk)
      return 'Password weak: 8‑16, 1 capital & special';

    return null;
  };

  handleSubmit = async e => {
    e.preventDefault();
    const error = this.validate();
    if (error) return this.setState({ error });

    const token = localStorage.getItem('authToken');
    const cfg = { headers: { Authorization: `Bearer ${token}` } };

    try {
      const { entityType, name, email, address, password, owner_id } = this.state;
      if (entityType === 'STORE') {
        await axios.post(
          'https://storeratingportal-production.up.railway.app/admin/stores',
          { name, email, address, owner_id: owner_id || null },
          cfg
        );
      } else if (entityType==='OWNER') {
        await axios.post(
          'https://storeratingportal-production.up.railway.app/admin/owners',
          {
            name,
            email,
            address,
            password,
          },cfg
        );
      }
      else if (entityType==='USER') {
        await axios.post(
          'https://storeratingportal-production.up.railway.app/admin/users',
          {
            name,
            email,
            address,
            password,
          },cfg
        );
      }
      else{
        await axios.post(
          'https://storeratingportal-production.up.railway.app/admin/admins',
          {
            name,
            email,
            address,
            password,
          },cfg
        );
      }
      this.setState({ success: `${entityType} Created successfully!` });
      this.props.onSuccess();          
    } catch (err) {
      const {entityType}=this.state
      const msg = err.response?.data?.error || `${entityType} Creation failed`;
      this.setState({ error: msg ,success:""});
    }
  };

  reset = () =>
    this.setState({
      step: 'select',
      entityType: '',
      name: '', email: '', address: '', password: '',
      role: 'USER', owner_id: '', owners: [], error: '', success: ''
    });

  renderSelect = () => (
    <div className="select-grid">
      {['ADMIN', 'OWNER', 'USER', 'STORE'].map(t => (
        <button key={t} onClick={() => this.chooseType(t)} className="select-btn">
          {t === 'USER' ? 'Normal User' : t[0] + t.slice(1).toLowerCase()}
        </button>
      ))}
    </div>
  );

  renderForm = () => {
    const { entityType, owners } = this.state;
    const isStore = entityType === 'STORE';
    return (
      <form onSubmit={this.handleSubmit} className="entity-form">
        <h3>Create {isStore ? 'Store' : entityType}</h3>

        {this.renderInput('name', 'text', isStore ? 'Store Name' : 'Full Name')}
        {this.renderInput('email', 'email', 'Email')}
        {this.renderInput('address', 'text', 'Address')}

        {!isStore && this.renderInput('password', 'password', 'Password')}

        {isStore && (
          <select name="owner_id" onChange={this.handleChange} value={this.state.owner_id}>
            <option value="">Assign Owner (optional)</option>
            {owners.map(o => (
              <option key={o.id} value={o.id}>
                {o.name} ({o.email})
              </option>
            ))}
          </select>
        )}

        {this.state.error && <p className="error">{this.state.error}</p>}
        {this.state.success && <p className="success">{this.state.success}</p>}

        <div className="btn-row">
          <button type="submit">Create</button>
          <button type="button" onClick={this.reset} className="secondary">
            Back
          </button>
        </div>
      </form>
    );
  };

  renderInput = (name, type, placeholder) => (
    <input
      name={name}
      type={type}
      value={this.state[name]}
      placeholder={placeholder}
      onChange={this.handleChange}
      required
    />
  );

  render() {
    const { isOpen, onClose } = this.props;
    const { step } = this.state;

    return (
      <Modal isOpen={isOpen} onClose={() => { this.reset(); onClose(); }}>
        {step === 'select' ? this.renderSelect() : this.renderForm()}
      </Modal>
    );
  }
}

export default CreateEntityModal;
