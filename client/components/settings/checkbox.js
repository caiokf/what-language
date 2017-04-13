import React from 'react';

import './checkbox.sass';

export default class Checkbox extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      checked: false
    };
  }

  componentWillReceiveProps(nextProps) {
    if ('checked' in nextProps) {
      this.setState({ checked: nextProps.checked });
    }
  }

  handleChange(e) {
    this.setState({ checked: !this.state.checked });
    e.preventDefalut();
  }

  render() {
    const boxContent = this.state.checked ? 'x' : ' ';

    return (
      <a href="#" className="checkbox" onClick={ this.handleChange.bind(this) }>
        [&nbsp;{boxContent}&nbsp;] <span>{this.props.children}</span>
      </a>
    );
  }
}
