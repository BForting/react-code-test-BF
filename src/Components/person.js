import React from 'react';

export default class Person extends React.Component {
  render () {
    return (
      <div>
        {this.props.person.first_name}
      </div>
    )
  }
}