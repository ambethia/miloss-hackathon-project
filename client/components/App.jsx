import React, { Component, PropTypes } from 'react';
import LayerList from './LayerList';

import styles from './App.less';

class App extends Component {

  render() {
    return (
      <div className={styles.app}>
        <h1>ArcLOOP</h1>
        <p>{this.props.viewer ? 'Viewing' : ''}</p>
        <div className={styles.prompt}>Drag to orbit. Scroll to zoom.</div>
        <LayerList />
      </div>
    );
  }
}

App.propTypes = {
  viewer: PropTypes.bool.isRequired
};

export default App;
