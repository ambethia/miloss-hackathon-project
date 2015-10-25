import React, {
  Component,
  PropTypes
} from 'react';
import Icon from 'react-fa';

import styles from './LayerItem.less';

export default class LayerItem extends Component {

  handleClick = () => {
    const name = this.refs.name.textContent.trim();
    this.props.onClick(name);
  }

  render() {
    const visibility = this.props.visible ? styles.visible : styles.hidden;
    const visIcon = this.props.visible ? 'eye' : 'eye-slash';
    return (
      <tr className={`${styles.layerItem} ${visibility}`}>
        <td ref="name">{this.props.name}</td>
        <td>
          <button onClick={this.handleClick}>
            <Icon name={visIcon} />
          </button>
        </td>
      </tr>
    );
  }
}

LayerItem.propTypes = {
  name: PropTypes.string.isRequired,
  visible: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired
};
