import React from 'react';
import axios from 'axios';
import Person from './person';
import image from '../media/img/sad_face.PNG';

export default class PersonList extends React.Component {
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
			lockFetch: false,
			endPerson: {
				first_name: 'No more user!',
				last_name: '',
				avatar: image
			}
		};
	}

	isBottom(el) {
		return (
			Math.floor(el.getBoundingClientRect().bottom * 0.8) <=
			Math.floor(window.innerHeight)
		);
	}

	handleBottomReach(e) {
		const rootDiv = document.getElementById('root');
		if (this.isBottom(rootDiv)) {
			this.getNewUsers();
		}
	}

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

	handleRemove(id) {
		this.setState(prevState => {
			prevState.persons.splice(id, 1);
			return {
				persons: prevState.persons
			};
		});
	}

	handleRemoveAll() {
		this.setState(() => {
			return {
				persons: [],
				page: 1,
				hasMoreData: true
			};
		});
	}

	componentDidMount() {
		this.getNewUsers();
		document.addEventListener('scroll', this.handleBottomReach);
		window.addEventListener('resize', this.handleBottomReach);
	}

	componentWillUnmount() {
		document.removeEventListener('scroll', this.handleBottomReach);
		window.removeEventListener('resize', this.handleBottomReach);
	}

	render() {
		console.log(this.state.persons);
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
