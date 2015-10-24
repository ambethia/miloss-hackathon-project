import React from 'react';

import styles from './App.less';

class App extends React.Component {
  render() {
    return (
      <div className={styles.app}>
        <h1>ArcLOOP</h1>
        <div className={styles.prompt}>Drag to orbit. Scroll to zoom.</div>
      </div>
    );
  }
}

export default App;
