import React from 'react';
import ReactDOM from 'react-dom';
import Viewer from './Viewer';
import App from './components/App';

import './index.less';

const isViewing = window.location.pathname === '/viewer';

document.addEventListener('DOMContentLoaded', () => {
  const viewer = new Viewer(document.getElementById('viewer'));
  if (isViewing) {
    viewer.isFollowing = true;
  }

  viewer.start();
});

ReactDOM.render(<App viewer={isViewing} />, document.getElementById('app'));
