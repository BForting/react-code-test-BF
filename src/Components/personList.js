import React from 'react';
import axios from 'axios';
import Person from './person';
import image from '../media/img/sad_face.PNG';


export default class PersonList extends React.Component {
  constructor(props) {
    super(props);
    this.handleBottomReach = this.handleBottomReach.bind(this);
    this.state = {
      persons: [],
      hasTouchedBottom: false,
      scrollCount: 0,
      fetchCount: 0,
      endPerson: {
        first_name: 'No more user!',
        last_name: '',
        avatar: image
      }
    };
  };

  isBottom(el) {
    return Math.floor(el.getBoundingClientRect().bottom * 0.8) <= Math.floor(window.innerHeight);
  }

  handleBottomReach(e) {
    const rootDiv = document.getElementById('root');
    if(this.state.fetchCount <= 5) {
      if (this.isBottom(rootDiv)) {
        this.getNewUsers();
      }
    } else {
      document.removeEventListener('scroll', this.handleBottomReach);
      window.removeEventListener('resize', this.handleBottomReach);
    }
    
  }

  getNewUsers() {
    axios.get(`https://reqres.in/api/users?page=1`)
    .then(res => {
      this.setState((prevState) => {
        return {
          persons: prevState.persons.concat(res.data.data),
          fetchCount: prevState.fetchCount + 1
        };
      });
      if (!(document.getElementById('root').clientHeight >= document.documentElement.clientHeight)) {
        this.getNewUsers();
      }
    });
  }

  componentDidMount() {
    this.getNewUsers();
    document.addEventListener('scroll', this.handleBottomReach);
    window.addEventListener('resize', this.handleBottomReach);
  }

  render() {
    return (
      <div id="personList">
        {this.state.persons && this.state.persons.map((person, index) => <Person key={index} person={person}/>)}
        {(this.state.fetchCount && this.state.fetchCount > 5) && <Person key='End' person={this.state.endPerson}/>}
      </div>
    )
  }
}