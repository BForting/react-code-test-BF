import React from 'react';
import './App.css';
import PersonList from './Components/personList';
import Header from './Components/header';
import Loader from './Components/loader';

class App extends React.Component {
	// We make sure to bind our method that needs to access the state when called
	constructor(props) {
		super(props);
		this.componentDidMount = this.componentDidMount.bind(this);
		this.state = {
			isLoading: true
		};
	}

	// We set a timer of 3 seconds to change the isLoading variable
	componentDidMount() {
		setTimeout(() => {
			this.setState(() => {
				return {
					isLoading: false
				};
			});
		}, 3000);
	}

	// We use the "isLoading" variable in the state to show or hide the Loader component
	// We use a generic Header component to which we send a title of "Users" for our example
	render() {
		return (
			<div className="App">
				{this.state.isLoading && <Loader />}
				<Header title="Users" />
				<PersonList />
			</div>
		);
	}
}

export default App;
