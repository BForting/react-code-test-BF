import React from 'react';
import './App.css';
import PersonList from './Components/personList';
import Header from './Components/header';
import Loader from './Components/loader';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.state = {
      isLoading: true
    };
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState(() => {
        return {
          isLoading: false
        };
      });
    }, 3000);
  }

  render() {
      return (
      <div className="App">
        {this.state.isLoading && <Loader />}
        <Header title='Users'/>
        <PersonList />
      </div>
    );
  }
}

export default App;
