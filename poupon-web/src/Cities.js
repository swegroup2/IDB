import React, { Component } from 'react';

var data = require('./data.json').data[3];

class Cities extends Component {
    render() {
        const items = data.cities.map(item => <Preview city={item}/>);
        return (
            <div className="Container">
            <div className="row">
                {items}
            </div>
            </div>
     	);
	}
}

class Preview extends Component {
    render() {
        const {name, state, population, artists, coordinates} = this.props.city;
        return (
            <div className="col-sm-12 col-md-6">
            	<div className="Container">
                <div className="card">
                  <div className="Container">
				  <div className="card-block">
				    <h4 className="card-title">{name}, {state}</h4>
				    <h6 className="card-subtitle mb-2 text-muted">
                        <b>Population: </b>{population}
                    </h6>
				    <p className="card-text">
                        {"Artists: " + artists.join(", ")}<br/>
                        <b>Coordinates: </b>{coordinates.latitude}, {coordinates.longitude}
                    </p>
				  </div>
				  </div>
				</div>
            	</div>
            </div>
        );
    }
}

export default Cities;

