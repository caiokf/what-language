import React from 'react';

import './icons.sass';

export default class Icon extends React.Component {
  render() {
    return (
      <svg className={ `icon icon--${this.props.icon}` }>
        <use xmlnsXlink="http://www.w3.org/1999/xlink" xlinkHref={ `#icon-${this.props.icon}` }></use>
      </svg>
    );
  }
}
