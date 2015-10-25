import React, { Component, PropTypes } from 'react';
import LayerList from './LayerList';
import Chat from './Chat';
import Icon from 'react-fa';
import {connect} from 'react-redux';
import io from 'socket.io-client';
import _ from 'lodash';

import actions from '../actions';
import styles from './App.less';

const socket = io();

class App extends Component {

  componentDidMount() {
    socket.on('user:current', (user) => {
      this.props.dispatch(actions.setCurrentUser(user));
    });
  }

  render() {
    const label = this.props.viewer ? 'Viewing' : 'Hosting';
    return (
      <div className={styles.app}>
        <div className={styles.heading}>
          <div className={styles.bar}>
            <h1>ArcLOOP</h1>
            <h2>{label} "Canteen"</h2>
            <div className={styles.session}>
              anonymous
            </div>
          </div>
          <div className={styles.meta}>
            <div className={styles.info}>
              <Icon name="users" />
              <span>{_.size(this.props.participants)} participant{_.size(this.props.participants) === 1 ? '' : 's'}</span>
            </div>
            <div className={styles.controls}>
              <button disabled>
                <Icon name="share-alt" size="2x" />
              </button>
              <button>
                <Icon name="lock" size="2x" />
              </button>
            </div>
          </div>
        </div>
        <div className={styles.interact}>
          <Chat />
          <LayerList />
        </div>
      </div>
    );
  }
}

App.propTypes = {
  viewer: PropTypes.bool.isRequired,
  dispatch: PropTypes.func,
  participants: PropTypes.object
};

function select(state) {
  return {
    currentUser: state.currentUser,
    participants: state.chat.participants,
  };
}

export default connect(select)(App);
