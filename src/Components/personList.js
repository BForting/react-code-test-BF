import React from 'react';
import axios from 'axios';
import Person from './person';

export default class PersonList extends React.Component {
  constructor(props) {
    super(props);
    this.trackScrolling = this.trackScrolling.bind(this);
    this.state = {
      persons: [],
      hasTouchedBottom: false,
      scrollCount: 0
    };
  };

  isBottom(el) {
    return el.getBoundingClientRect().bottom <= window.innerHeight;
  }

  trackScrolling(e) {
    this.setState((prevState) => {
      return {
        scrollCount: prevState.scrollCount + 1
      };
    });
    const rootDiv = document.getElementById('root');
    if (this.isBottom(rootDiv)) {
      this.getNewUsers();
    }
  }

  getNewUsers() {
    axios.get(`https://reqres.in/api/users?page=1`)
    .then(res => {
      this.setState((prevState) => {
        return {
          persons: prevState.persons.concat(res.data.data)
        };
      });
      if (!(document.getElementById('root').clientHeight >= document.documentElement.clientHeight)) {
        this.getNewUsers();
      }
    });
  }

  componentDidMount() {
    this.getNewUsers();
    document.addEventListener('scroll', this.trackScrolling);
  }

  render() {
    return (
      <div>
        <h2 style={{position: 'fixed'}}>{this.state.scrollCount}</h2>
        {this.state.persons && this.state.persons.map((person, index) => <Person key={index} person={person}/>)}
      </div>
    )
  }
}