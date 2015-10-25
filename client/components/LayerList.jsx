import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import LayerItem from './LayerItem';
import * as actions from '../actions';
import styles from './LayerList.less';

class LayerList extends Component {
  toggleClick = (name) => {
    this.props.dispatch(actions.toggleLayer(name));
  }

  render() {
    return (
      <ul className={styles.layerList}>
        {this.props.layers.map((layer, index) =>
          <LayerItem {...layer} key={index} onClick={this.toggleClick} />
        )}
      </ul>
    );
  }
}

LayerList.propTypes = {
  dispatch: PropTypes.func,
  layers: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    visible: PropTypes.bool.isRequired
  }))
};

function select(state) {
  return {
    layers: state.layers
  };
}

export default connect(select)(LayerList);
