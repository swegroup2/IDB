import React, {Component} from 'react';
import {
    Route,
    Switch
} from 'react-router-dom';

const config = require("./config.json");
const data = require("./about.json");

class About extends Component {
    constructor(props) {
        super(props);
        this.state = {
            commits: [],
            cards: []
        };
    }

    componentWillMount() {
        fetch('https://api.github.com/repos/swegroup2/IDB/stats/contributors').then(d => d.json())
            .then(d => {
                this.setState({
                    commits: d
                })
            })
        fetch('https://api.trello.com/1/boards/WkHJVGMT/cards').then(data => data.json())
            .then(data => {
                this.setState({
                    cards: data
                })
            })
    }


    render() {
        const cards = data.people.map((person, i) => <AboutCard key={i} person={person} commits={this.state.commits}
                                                                cards={this.state.cards}/>);
        return (
            <div className="Container">
                <div className="row">
                    <AboutSummary commits={this.state.commits} cards={this.state.cards}/>
                    {cards}
                </div>
            </div>
        );
    }
}

class APIStatusBadge extends Component {
    constructor(props) {
        super(props);
        this.state = {
            apiStatus: "unknown"
        };

        this.badgeClass = {
            "unknown": "badge-warning",
            "good": "badge-success",
            "bad": "badge-danger"
        };
        this.badgeText = {
            "unknown": "Checking...",
            "good": "Available",
            "bad": "Offline"
        };
    }

    componentWillMount() {
        fetch(`${config.API_URL}/hello`)
            .then(data => data.json())
            .then(json => {
                this.setState({apiStatus: "hello" in json ? "good" : "bad"});
            })
            .catch(e => {
                this.setState({apiStatus: "bad"});
            });
    }

    render() {
        return (
            <span className={`badge ${this.badgeClass[this.state.apiStatus]}`}>
                API Status: {this.badgeText[this.state.apiStatus]}
            </span>
        );
    }
}

class AboutSummary extends Component {

    render() {
        const commits = this.props.commits;
        const cards = this.props.cards;

        let commitCount = 0;
        let issueCount = 0;

        for (let i = 0; i < commits.length; i++) {
            commitCount += commits[i].total;
        }

        if (cards.length >= 0) {
            issueCount = cards.length;
        }

        return (
            <div className="col-lg-4 col-md-6 col-sm-12">
                <div className="card">
                    <div className="card-body">
                        <h2>Poupon</h2>

                        <APIStatusBadge/>

                        <p className="card-text">
                            Poupon is a site dedicated to the discovery of hip-hop and r&b. Its purpose is to keep users
                            informed of current events in the industry, as well as its impact around America. The
                            intended audience is anyone in the general public who is interested in hip-hop music and
                            culture.
                        </p>

                        <table className="table table-sm">
                            <tbody>
                            <tr>
                                <td><a href="https://github.com/swegroup2/IDB">GitHub</a></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td><a href="https://trello.com/b/WkHJVGMT/idb1-board">Trello</a></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td><a href="http://docs.sarahgrace.apiary.io/#">Apiary</a></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td><a href="https://swegroup2.gitbooks.io/poupon/content/report.html">Report</a>
                                </td>
                                <td></td>
                            </tr>
                            <tr>
                                <td><a href="https://swegroup2.gitbooks.io/poupon/content/uml.html">UML</a>
                                </td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>Total Commits</td>
                                <td>{commitCount}</td>
                            </tr>
                            <tr>
                                <td>Total Issues</td>
                                <td>{issueCount}</td>
                            </tr>
                            <tr>
                                <td>Total Unit Tests</td>
                                <td>0</td>
                            </tr>
                            </tbody>
                        </table>

                        <b>Data Sources: </b><a href="https://developer.spotify.com/web-api/endpoint-reference/">Spotify
                        API</a>, <a href="https://www.reddit.com/dev/api/">Reddit API</a>, <a
                        href="https://docs.genius.com/#annotations-h2">Genius API</a>*<br/>
                        <b>Tools: </b><a href="https://facebook.github.io/react/">React</a>, <a
                        href="http://flask.pocoo.org/">Flask</a>, <a href="http://getbootstrap.com/">Bootstrap</a>, <a
                        href="https://github.com/">GitHub</a>, <a
                        href="https://github.com/facebookincubator/create-react-app">Create-React-App</a>*<br/>
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
        const commits = this.props.commits;
        const cards = this.props.cards;
        let count = 0;

        for (let i = 0; i < commits.length; i++) {
            if (commits[i].author.login === person.id) {
                person.github.Commits = commits[i].total;
                break;
            }
        }

        for (let i = 0; i < cards.length; i++) {
            if (cards[i].idMembers.includes(person.trello)) {
                count++;
            }
        }

        person.github.Issues = count;

        const rows = Object.entries(person.github).map(kv => (
            <tr>
                <td>{kv[0]}</td>
                <td>{kv[1]}</td>
            </tr>
        ));

        return (
            <div className="collapse.in col-lg-4 col-md-6 col-sm-12">
                <div className="card">
                    <div className="Container">
                        <img className="img-fluid img-fullwidth" src={person.img} alt="Headshot"/>
                    </div>
                    <div className="card-body">
                        <h4>{person.name}</h4>
                        <div className="card-text mb-3">
                            <p>{person.bio}</p>
                            <p><span className="font-weight-bold">Responsibilities:</span><br/>{person.responsibilities}
                            </p>
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

