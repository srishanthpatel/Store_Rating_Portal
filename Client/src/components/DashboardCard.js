import React from 'react';
import '../styles.css'
class DashboardCard extends React.Component {
  render() {
    const { title, value, color } = this.props;
    return (
      <div className="card" style={{ borderTopColor: color }}>
        <h3>{title}</h3>
        <p>{value}</p>
      </div>
    );
  }
}

export default DashboardCard;
