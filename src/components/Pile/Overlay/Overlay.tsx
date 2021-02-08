import React from 'react';

import './styles.css';

interface Props {
  color: 'red' | 'yellow' | 'green';
}
const Overlay = ({ color }: Props) => (
  <div className={`Overlay Overlay--${color}`}>&nbsp;</div>
);

export default Overlay;
