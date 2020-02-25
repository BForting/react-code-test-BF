import React from 'react';

export default class Loader extends React.Component {
	render() {
		return (
			<div id="loader">
				<div>
					<div className="dot dot-1"></div>
					<div className="dot dot-2"></div>
					<div className="dot dot-3"></div>
				</div>
			</div>
		);
	}
}
