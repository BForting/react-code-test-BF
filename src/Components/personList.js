import React from 'react';
import axios from 'axios';
import Person from './person';
import image from '../media/img/sad_face.PNG';

export default class PersonList extends React.Component {
	// We make sure to bind our methods that need to access the state when called
	// We set the variables and state we need to handle the user data
	constructor(props) {
		super(props);
		this.handleBottomReach = this.handleBottomReach.bind(this);
		this.handleRemove = this.handleRemove.bind(this);
		this.handleRemoveAll = this.handleRemoveAll.bind(this);
		this.getNewUsers = this.getNewUsers.bind(this);
		this.lockFetch = false;
		this.refTimeOutLockFetch = null;
		this.state = {
			persons: [],
			hasTouchedBottom: false,
			scrollCount: 0,
			page: 1,
			hasMoreData: true,
			endPerson: {
				first_name: 'No more user!',
				last_name: '',
				avatar: image
			}
		};
	}

	// We check if the DOM element has reached the bottom of the screen
	// We also tweak the size to 80% of its real size so the user don't bump on the end of the window
	isBottom(el) {
		return (
			Math.floor(el.getBoundingClientRect().bottom * 0.8) <=
			Math.floor(window.innerHeight)
		);
	}

	// If our DOM element didn't reach the bottom of the screen, we fetch more data
	handleBottomReach(e) {
		const rootDiv = document.getElementById('root');
		if (this.isBottom(rootDiv)) {
			this.getNewUsers();
		}
	}

	// We fetch data on the reqres API
	// The lockFetch variable makes sure that we don't fire to many API calls when there is no more data to fetch
	// Though we don't block it entirely in case the database is updated while the user is navigating
	getNewUsers() {
		if (this.lockFetch) return;
		this.lockFetch = true;
		axios
			.get(`https://reqres.in/api/users?page=${this.state.page}`)
			.then(res => {
				if (res.data.data.length !== 0) {
					this.lockFetch = false;
					this.setState(prevState => {
						return {
							persons: prevState.persons.concat(res.data.data),
							page: prevState.page + 1,
							hasMoreData: true
						};
					});
					if (
						!(
							document.getElementById('root').clientHeight >=
							document.documentElement.clientHeight
						)
					) {
						this.getNewUsers();
					}
				} else {
					this.setState(() => {
						return {
							hasMoreData: false
						};
					});
					if (!this.refTimeOutLockFetch)
						this.refTimeOutLockFetch = setTimeout(
							() => (this.lockFetch = false),
							10000
						);
				}
			});
	}

	// We set a method to send our child component to remove a single User
	handleRemove(id) {
		this.setState(prevState => {
			prevState.persons.splice(id, 1);
			return {
				persons: prevState.persons
			};
		});
	}

	// We set a method to remove all the Users
	handleRemoveAll() {
		this.setState(() => {
			return {
				persons: [],
				page: 1,
				hasMoreData: true
			};
		});
	}

	// We fetch our first data and add Event listener on scroll and resize
	componentDidMount() {
		this.getNewUsers();
		document.addEventListener('scroll', this.handleBottomReach);
		window.addEventListener('resize', this.handleBottomReach);
	}

	// We make sure to remove the events when the component is unmounted
	componentWillUnmount() {
		document.removeEventListener('scroll', this.handleBottomReach);
		window.removeEventListener('resize', this.handleBottomReach);
	}

	// We display the interface based on the content of the persons variable in the state
	render() {
		return (
			<div id="personList">
				{this.state.persons.length !== 0 && (
					<button
						className="button-general custom-button"
						onClick={this.handleRemoveAll}
					>
						Remove all
					</button>
				)}
				{this.state.persons &&
					this.state.persons.map((person, index) => (
						<Person
							key={index}
							person={person}
							handleRemove={this.handleRemove}
						/>
					))}
				{this.state.persons.length === 0 && (
					<button
						className="button-general custom-button"
						onClick={this.getNewUsers}
					>
						Get users
					</button>
				)}
				{!this.state.hasMoreData && (
					<Person key="End" person={this.state.endPerson} />
				)}
			</div>
		);
	}
}
