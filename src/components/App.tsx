import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {KlondikeStore} from '../stores';
import {Klondike} from './';

interface State {
  store: KlondikeStore
}

export class App extends React.Component<Any, State> {
  constructor(props) {
    super(props);
    const store = new KlondikeStore();
    this.state = {store}; 
  }
  render() {
    const {store} = this.state;
    return (
      <Klondike store={store}/>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'));