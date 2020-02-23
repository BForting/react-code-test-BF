import React from 'react';

export default class Person extends React.Component {
	constructor(props) {
		super(props);
		this.handleRemove = this.handleRemove.bind(this);
	}

	handleRemove() {
		this.props.handleRemove(this._reactInternalFiber.key);
	}

	render() {
		const full_name =
			this.props.person.first_name + ' ' + this.props.person.last_name;
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
