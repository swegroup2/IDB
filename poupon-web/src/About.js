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
                {cards}
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
                        <div className="card-text mb-3">{person.bio}</div>
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
