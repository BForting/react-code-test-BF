import React from 'react';

export default class Person extends React.Component {
	constructor(props) {
		super(props);
		this.componentDidMount = this.componentDidMount.bind(this);
		this.state = {
			fullName: ''
		};
	}

	componentDidMount() {
		this.setState(() => {
			return {
				fullName:
					this.props.person.first_name + ' ' + this.props.person.last_name
			};
		});
	}

	render() {
		return (
			<div className="flex">
				<div className="person-card">
					<img
						src={this.props.person.avatar}
						alt={this.state.fullName}
						className="avatar"
					/>
					<p className="fullName">{this.state.fullName}</p>
				</div>
				{/* <hr /> */}
			</div>
		);
	}
}
