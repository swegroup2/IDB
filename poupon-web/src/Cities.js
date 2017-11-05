import React, {Component} from 'react';
import {
    Route,
    Switch
} from 'react-router-dom';

const config = require("./config.json");

const numberCommas = (num = 0) => num.toLocaleString();

class Cities extends Component {
    render() {
        return (
            <div className="Container">
                <Switch>
                    <Route exact path="/cities" component={CityList}/>
                    <Route path="/cities/:id" component={CityDetailCard}/>
                </Switch>
            </div>
        );
    }
}

class CityDetailCard extends Component {
    constructor(props) {
        super(props);
        this.id = this.props.match.params.id;
        this.state = {
            data: {}
        };
    }

    componentWillMount() {
        fetch(`${config.API_URL}/cities/${this.id}`)
            .then(data => data.json())
            .then(json => {
                this.setState({data: json[0]});
            })
            .catch(e => {
            });
    }

    render() {
        const {name, city_picture_link, population, state} = this.state.data;

        return (
            <div className="col-12">
                <div className="card">
                    <div className="card-body">
                        <h2 className="card-title">{name}</h2>
                        <div className="row">
                            <div className="col-sm-12 col-md-6 col-lg-4">
                                <img src={city_picture_link} className="img-fluid" alt={name}/>
                            </div>
                            <div className="col-sm-12 col-md-6 col-lg-8">
                                <p><b>Population:&nbsp;</b>{numberCommas(population)}</p>
                                <p><b>State:&nbsp;</b>{state}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

class CityList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        };
    }

    componentWillMount() {
        fetch(`${config.API_URL}/cities`)
            .then(data => data.json())
            .then(json => {
                this.setState({data: json})
            })
            .catch(e => {
            });
    }

    render() {
        const items = this.state.data.map((item, i) => {
            const {name, population, state, city_id} = item;

            return (
                <tr>
                    <th scope="row">{i + 1}</th>
                    <td><a href={`/cities/${city_id}`}>{name}</a></td>
                    <td>{numberCommas(population)}</td>
                    <td>{state}</td>
                </tr>
            )
        });
        return (
            <div className="row">
                <div className="col-12">
                    <table className="table table-light">
                        <thead className="thead-inverse">
                        <tr>
                            <th>#</th>
                            <th>City</th>
                            <th>Population</th>
                            <th>State</th>
                        </tr>
                        </thead>
                        <tbody>
                        {items}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default Cities;
