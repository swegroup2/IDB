import React, { Component } from 'react';
import {
  Route,
  Switch
} from 'react-router-dom';

var data = require('./data.json').data;
var db = require('./database.json').database;

class Cities extends Component {
    render() {
        return (
            <div className="Container">
            <Switch>
                <Route exact path="/cities" component={MultipleCities}/>
                <Route component={SingleCity}/>
            </Switch>
            </div>
        );
    }
}

class SingleCity extends Component {
    render() {
        var path = window.location.pathname.split("/");
        var id = path[2];
        console.log("id: " + id);
        for(var i = 0; i < data.cities.length; i++) {
            if(data.cities[i].id == id) {
                return (
                        <div className="row">
                        <div className="col-md-0 col-lg-3">
                        </div>
                        <CityCard city={data.cities[i]}/>
                        <div className="col-md-0 col-lg-3">
                        </div>
                        </div>
                       );
            }
        }
    }
}

class MultipleCities extends Component {
    render() {
        const items = data.cities.map((item, i) => <CityCard key={i} city={item}/>);
        return (
            <div className="row">
                {items}
            </div>
     	);
	}
}

class CityCard extends Component {
    render() {
        const {id, name, state, population, artists, coordinates} = this.props.city;
        const related_artists = artists.map(item =>
            {if(item in db) {
                return(<span><a href={"/artists/"+db[item]}>{item}</a>, </span>);
            } else {
                return(<span>{item}, </span>);
            }}
            );
        return (
            <div className="col-md-12 col-lg-6">
                <div className="card">
				  <div className="card-body">
				    <h4 className="card-title"><a href={"/cities/"+id}>{name}, {state}</a></h4>
				    <h6 className="card-subtitle mb-2 text-muted">
                        <b>Population: </b>{population}
                    </h6>
				    <p className="card-text">
                        <b>Related Artists: </b>{related_artists}<br/>
                        <b>Related News Articles: </b><br/>
                        <b>Coordinates: </b>{coordinates.latitude}, {coordinates.longitude}
                    </p>
				  </div>
            	</div>
            </div>
        );
    }
}

export default Cities;

