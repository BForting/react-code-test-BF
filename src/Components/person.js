import React from 'react';

export default class Person extends React.Component {
	// We make sure to bind our method that needs to access the state when called
	constructor(props) {
		super(props);
		this.handleRemove = this.handleRemove.bind(this);
	}

	// We use our method to call the parent component method to change the state of the parent component
	handleRemove() {
		this.props.handleRemove(this._reactInternalFiber.key);
	}

	render() {
		// We set a variable to concatenate the first name and the last name of the user
		const full_name =
			this.props.person.first_name + ' ' + this.props.person.last_name;
		// We show the user avatar, the user fullname and the "Remove" button
		// We make sur not to show the "Remove" button on the card the indicates there is no more user
		return (
			<div className="flex">
				<div className="person-card">
					<img
						src={this.props.person.avatar}
						alt={full_name}
						className="avatar"
					/>
					<div className="fullName">
						<p>{full_name}</p>
						{full_name !== 'No more user! ' && (
							<button
								className="remove-single custom-button"
								onClick={this.handleRemove}
							>
								Remove
							</button>
						)}
					</div>
				</div>
			</div>
		);
	}
}
