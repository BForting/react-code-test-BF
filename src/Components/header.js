import React from 'react';

export default class Header extends React.Component {

  render() {
    return (
      <div id="header">
        <h1 id="title">{this.props.title}</h1>
      </div>
    )
  }
}