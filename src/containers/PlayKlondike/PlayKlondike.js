import React, {Component} from 'react';
import DocumentMeta from 'react-document-meta';
import {Klondike} from 'components';

export default class PlayKlondike extends Component {

  render() {
    return (
      <div className="container">
        <Klondike pileCount={7} wasteSize={3}/>
      </div>
    );
  }
}
