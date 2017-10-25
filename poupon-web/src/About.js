import React, { Component } from 'react';
import {
  Route,
  Switch
} from 'react-router-dom';

const data = require('./about.json');

class About extends Component {
    render() {
        const cards = data.people.map((person, i) => <AboutCard key={i} person={person}/>);
        return (
            <div className="Container">
            <div className="row">
                <AboutSummary/>
                {cards}
            </div>
            </div>
        );
    }
}

class AboutSummary extends Component {
    constructor(props) {
        super(props);
        this.state = {
            apiTest: false
        };
    }

    componentWillMount() {
        fetch("http://poupon.me/api/hello")
            .then(data => data.json())
            .then(json => {
                this.setState({apiTest: "hello" in json});
            });
    }
    
    render() {
        return (
            <div className="col-lg-4 col-md-6 col-sm-12">
                <div className="card">
                    <div className="card-body">
                        <h2>Poupon</h2>
                        
                        <span className={`badge badge-${this.state.apiTest ? "success" : "danger"}`}>
                            API Status: {this.state.apiTest ? "Available" : "Offline"}
                        </span>

                        <p className="card-text">
                        Poupon is a site dedicated to the discovery of hip-hop and r&b. Its purpose is to keep users informed of current events in the industry, as well as its impact around America. The intended audience is anyone in the general public who is interested in hip-hop music and culture.
                        </p>
                        
                        <table className="table table-sm">
                        <tbody>
                        <tr><td><a href="https://github.com/swegroup2/IDB">GitHub</a></td><td></td></tr>
                        <tr><td><a href="https://trello.com/b/WkHJVGMT/idb1-board">Trello</a></td><td></td></tr>
                        <tr><td><a href="http://docs.sarahgrace.apiary.io/#">Apiary</a></td><td></td></tr>
                        <tr><td><a href="https://utexas.app.box.com/s/ifvpz6r63gsh6ib7fl01oj4wp1ytm87e">Report</a></td><td></td></tr>
                        <tr><td>Total Commits</td><td>100</td></tr>
                        <tr><td>Total Issues</td><td>33</td></tr>
                        <tr><td>Total Unit Tests</td><td>0</td></tr>
                        </tbody>
                        </table>
                        
                        <b>Data Sources: </b><a href="https://developer.spotify.com/web-api/endpoint-reference/">Spotify API</a>, <a href="https://www.reddit.com/dev/api/">Reddit API</a>, <a href="https://docs.genius.com/#annotations-h2">Genius API</a>*<br/>
                        <b>Tools: </b><a href="https://facebook.github.io/react/">React</a>, <a href="http://flask.pocoo.org/">Flask</a>, <a href="http://getbootstrap.com/">Bootstrap</a>, <a href="https://github.com/">GitHub</a>, <a href="https://github.com/facebookincubator/create-react-app">Create-React-App</a>*<br/>
                        *more details in report
                    </div>
                </div>
            </div>
        );
    }
}

class AboutCard extends Component {
    render() {
        const person = this.props.person;
        const rows = Object.entries(person.github).map(kv => (
            <tr>
              <td>{kv[0]}</td>
              <td>{kv[1]}</td>
            </tr>
        ));

        return (
            <div className="col-lg-4 col-md-6 col-sm-12">
                <div className="card">
                    <div className="Container">
                    <img className="card-img-top" src={person.img} alt="Headshot"/>
                    </div>
                    <div className="card-body">
                        <h4>{person.name}</h4>
                        <div className="card-text mb-3">
                            <p>{person.bio}</p>
                            <p><span className="font-weight-bold">Responsibilities:</span><br/>{person.responsibilities}</p>
                        </div>
                        <table className="table table-sm">
                          <tbody>
                            {rows}
                          </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    }
}

export default About;

