import React from 'react';
import { NUM_TABLEAU_PILES } from '../../modules/solitaire/constants';

import './styles.css';
import TableauPile from './TableauPile/TableauPile';

const Tableau = () => {
  let rows = [];

  for (let i = 0; i < NUM_TABLEAU_PILES; i++) {
    rows.push(<TableauPile idx={i} key={i} />);
  }
  return <div className="Tableau">{rows}</div>;
};

export default Tableau;
