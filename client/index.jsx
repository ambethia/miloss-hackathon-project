import React from 'react';
import ReactDOM from 'react-dom';
import Viewer from './Viewer';
import App from './components/App';

import './index.less';

document.addEventListener('DOMContentLoaded', () => {
  const viewer = new Viewer(document.getElementById('viewer'));
  viewer.start();
});

ReactDOM.render(<App />, document.getElementById('app'));
