import React, {
  Component,
  PropTypes
} from 'react';

import styles from './LayerItem.less';

export default class LayerItem extends Component {

  handleClick = () => {
    const name = this.refs.name.textContent.trim();
    this.props.onClick(name);
  }

  render() {
    const visibility = this.props.visible ? styles.visible : styles.hidden;

    return (
      <li className={`${styles.layerItem} ${visibility}`}>
        <button onClick={this.handleClick}>
          <span ref="name">{this.props.name}</span>
        </button>
      </li>
    );
  }
}

LayerItem.propTypes = {
  name: PropTypes.string.isRequired,
  visible: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired
};
