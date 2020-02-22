import React from 'react';
import './App.css';
import PersonList from './Components/personList';

class App extends React.Component {
  render() {
      return (
      <div className="App">
        <PersonList />
      </div>
    );
  }
}

export default App;
