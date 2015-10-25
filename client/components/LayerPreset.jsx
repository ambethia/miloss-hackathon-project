import React, {
  Component,
  PropTypes
} from 'react';
import Icon from 'react-fa';

import styles from './LayerPreset.less';

export default class LayerPreset extends Component {

  handleClick = () => {
    console.log("clicked");
    this.props.onClick(this.props.name);
  }

  render() {
    let icon;

    if (this.props.active) {
      icon = <Icon name="check" />;
    }

    const active = this.props.active ? styles.active : styles.inactive;

    return (
      <tr className={`${styles.layerPreset} ${active}`} onClick={this.handleClick}>
        <td className={styles.name}>{this.props.name}</td>
        <td>
          {icon}
        </td>
      </tr>
    );
  }
}

LayerPreset.propTypes = {
  name: PropTypes.string.isRequired,
  active: PropTypes.bool.isRequired,
  onClick: PropTypes.func
};
