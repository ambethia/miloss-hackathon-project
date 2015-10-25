import React, {
  Component,
  PropTypes
} from 'react';
import {connect} from 'react-redux';
import Icon from 'react-fa';
import io from 'socket.io-client';

import * as actions from '../actions';
import styles from './Chat.less';

const socket = io();

class Chat extends Component {
  // toggleClick = (name) => {
  //   this.props.dispatch(actions.toggleLayer(name));
  // }

  componentDidMount() {
    socket.on('user:connect', (user) => {
      this.props.dispatch(actions.addParticipant(user));
    });

    socket.on('user:disconnect', (userId) => {
      this.props.dispatch(actions.removeParticipant(userId));
    });
  }

  render() {
    return (
      <div className={styles.chat}>
        <ul className={styles.messages}>
          <li className={styles.message}>
            <span className={styles.author} style={{
              color: '#69cf68'
            }}><Icon name="empire"/>
              Jason</span>
            <span className={styles.content}>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</span>
          </li>
          <li className={styles.message}>
            <span className={styles.author} style={{
              color: '#6869cf'
            }}>Other</span>
            <span className={styles.content}>Sunt in culpa qui officia deserunt mollit anim id est laborum.</span>
          </li>
          <li className={styles.message}>
            <span className={styles.author} style={{
              color: '#cf6869'
            }}>Person</span>
            <span className={styles.content}>
              Phasellus auctor orci quis nulla sagittis fringilla. Donec sollicitudin malesuada porta. Ut metus felis, consequat eget semper gravida, tempor sed massa.
            </span>
          </li>
          <li className={styles.message}>
            <span className={styles.author} style={{
              color: '#69cf68'
            }}><Icon name="empire"/>
              Jason</span>
            <span className={styles.content}>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</span>
          </li>
        </ul>
        <div className={styles.chatInput}>
          <input ref="chatInput" type="text"/>
          <Icon name="comment" size="lg"/>
        </div>
      </div>
    );
  }
}

Chat.propTypes = {
  dispatch: PropTypes.func
};

function select(state) {
  return {
    participants: state.chat.participants,
    messages: state.chat.messages,
  };
}

export default connect(select)(Chat);
