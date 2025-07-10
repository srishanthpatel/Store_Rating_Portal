import React from 'react';
import '../styles.css'

const Star = ({ filled }) => (
  <span className={filled ? 'star filled' : 'star'}>&#9733;</span>
);

class RatingStars extends React.Component {
  handleClick = idx => {
    const { onChange } = this.props;
    if (onChange) onChange(idx);         // idx is 1‑5
  };

  render() {
    const { value = 0, interactive } = this.props;
    return (
      <span className="stars">
        {[1, 2, 3, 4, 5].map(i => (
          <span
            key={i}
            onClick={interactive ? () => this.handleClick(i) : null}
            style={{ cursor: interactive ? 'pointer' : 'default' }}
          >
            <Star filled={i <= value} />
          </span>
        ))}
      </span>
    );
  }
}

export default RatingStars;
