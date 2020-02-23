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
			page: 1,
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
		axios
			.get(`https://reqres.in/api/users?page=${this.state.page}`)
			.then(res => {
				console.log('DATA ', res.data.data);
				console.log('IS TRUE ?', res.data.data == true);
				console.log('IS FLIP TRUE ?', !!res.data.data);
				if (!!res.data.data) {
					this.setState(prevState => {
						return {
							persons: prevState.persons.concat(res.data.data),
							page: prevState.page + 1
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
					document.removeEventListener('scroll', this.handleBottomReach);
					window.removeEventListener('resize', this.handleBottomReach);
				}
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
		return (
			<div id="personList">
				{this.state.persons &&
					this.state.persons.map((person, index) => (
						<Person key={index} person={person} />
					))}
				{this.state.fetchCount && this.state.fetchCount > 5 && (
					<Person key="End" person={this.state.endPerson} />
				)}
			</div>
		);
	}
}
