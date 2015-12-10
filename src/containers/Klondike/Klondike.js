import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as klondikeActions from 'redux/modules/klondike';
import {isLoaded, load as loadKlondike} from 'redux/modules/klondike';
import DocumentMeta from 'react-document-meta';
import {Klondike as Game} from 'components';
import connectData from 'helpers/connectData';
import config from '../../config';

function fetchDataDeferred(getState, dispatch) {
  if (!isLoaded(getState())) {
    return dispatch(loadKlondike());
  }
}

@connectData(null, fetchDataDeferred)
@connect(
  state => ({
    klondike: state.klondike.data,
    error: state.klondike.error,
    loading: state.klondike.loading
  }),
  {...klondikeActions, initializeWithKey })
export default class Klondike extends Component {

  render() {
    // debugger;
    const {klondike, error, editing, loading, load} = this.props;
    let refreshClassName = 'fa fa-refresh';
    if (loading) {
      refreshClassName += ' fa-spin';
    }
    const styles = require('./Klondike.scss');

    return (
      <div className="container">
        <Game />
      </div>
    );
  }
}
