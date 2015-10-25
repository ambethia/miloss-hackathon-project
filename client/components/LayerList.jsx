import React, {
  Component,
  PropTypes
} from 'react';
import {connect} from 'react-redux';

import LayerItem from './LayerItem';
import LayerPreset from './LayerPreset';
import * as actions from '../actions';
import styles from './LayerList.less';

class LayerList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      activePreset: 'Improved Clip'
    };
  }

  toggleClick = (name) => {
    this.props.dispatch(actions.toggleLayer(name));
  }

  changePreset = (name) => {
    this.setState({activePreset: name});

    // HACK!
    console.log(name);

    switch (name) {
    case 'Original Design':
      this.props.dispatch(actions.hideLayer('clip_single'));
      this.props.dispatch(actions.showLayer('clip_double'));
      break;
    case 'Improved Clip':
      this.props.dispatch(actions.showLayer('clip_single'));
      this.props.dispatch(actions.hideLayer('clip_double'));
      break;
    default:
      // ...
    }
  };

  componentDidMount() {
    // Another HACK!
    setTimeout(() => {this.changePreset(this.state.activePreset)}, 10);
  }

  render() {
    const presets = ['Original Design', 'Improved Clip'].map((name, i) => {
      return <LayerPreset key={i} name={name} active={this.state.activePreset === name} onClick={this.changePreset} />;
    });

    return (
      <table className={styles.layerList}>
        <thead>
          <tr>
            <th colSpan="42">Presets</th>
          </tr>
        </thead>
        <tbody>
          {presets}
        </tbody>
        <thead>
          <tr>
            <th colSpan="42">Layers</th>
          </tr>
        </thead>
        <tbody>
          {this.props.layers.map((layer, index) =>
            <LayerItem key={index} onClick={this.toggleClick} {...layer}/>
          )}
        </tbody>
      </table>
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
