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
  {...klondikeActions})
export default class Klondike extends Component {

  render() {
    // debugger;
    const {klondike, error, editing, loading, load} = this.props;
    //console.log('klondike', klondike);
    const styles = require('./Klondike.scss');
    let refreshClassName = 'fa fa-refresh';
    if (loading) {
      refreshClassName += ' fa-spin';
    }

    return (
      <div className="container">
        <p></p>
        <button className={styles.refreshBtn + ' btn btn-success'} onClick={load}>
          <i className={refreshClassName}/> {' '} Reload Klondike
        </button>
        {klondike && klondike.deck &&
          <div style={{height:"500px"}}>
            <Game initialValues={klondike}/>
          </div>}

      </div>
    );
  }
}
