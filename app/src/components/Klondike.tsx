import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {KlondikeStore} from '../stores'



export class Klondike extends React.Component<{store: KlondikeStore}, any> {
  render() {
    return (
      <div>Klondike reload</div>
    )
  }
}