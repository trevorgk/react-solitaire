import React from 'react';

import { suits } from '../../types';

import './styles.css';
import FoundationPile from './FoundationPile/FoundationPile';

const Foundation = () => {
  return (
    <div className="Foundation">
      {suits.map((suit) => (
        <FoundationPile key={suit} suit={suit} />
      ))}
    </div>
  );
};

export default Foundation;
