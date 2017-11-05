import React, {Component} from 'react';

const config = require("./config.json");

export default class LoadingStub extends Component {
	render() {
		return (
			<div className="alert alert-primary" role="alert">
				Loading...
			</div>
		);
	}
}