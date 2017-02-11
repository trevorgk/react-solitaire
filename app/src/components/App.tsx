import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {KlondikeStore} from '../stores';
import {Klondike} from './';

interface State {
  store: KlondikeStore
}

export class App extends React.Component<any, State> {
  constructor(props) {
    super(props);
    const store = KlondikeStore.init();
    this.state = {store}; 
    window['store'] = store;
  }
  render() {
    const {store} = this.state;
    return (
      <Klondike store={store}/>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('klondike-app'));