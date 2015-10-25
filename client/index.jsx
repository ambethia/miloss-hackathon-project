import React from 'react';
import ReactDOM from 'react-dom';
import Viewer from './Viewer';
import App from './components/App';
import {Provider} from 'react-redux';
import configureStore from './store/configureStore';
import './index.less';

const store = configureStore();
const isViewing = window.location.pathname !== '/host';

document.addEventListener('DOMContentLoaded', () => {
  const viewer = new Viewer(store, document.getElementById('viewer'));
  if (isViewing) {
    viewer.isFollowing = true;
  }

  viewer.start();
});

const root = (
  <Provider store={store}>
    <App viewer={isViewing}/>
  </Provider>
);

ReactDOM.render(root, document.getElementById('app'));
