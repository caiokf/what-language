import React from 'react';

import './checkbox.sass';

export default class Checkbox extends React.Component {
  handleChange(e) {
    this.props.onChange && this.props.onChange(!this.props.checked);
    e.preventDefault();
  }

  render() {
    const boxContent = this.props.checked ? 'x' : ' ';

    return (
      <a href="#" className="checkbox" onClick={ this.handleChange.bind(this) }>
        [&nbsp;{boxContent}&nbsp;] <span>{this.props.children}</span>
      </a>
    );
  }
}
