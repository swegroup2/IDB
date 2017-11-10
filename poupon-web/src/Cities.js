import React, {Component} from 'react';
import {
    Route,
    Switch
} from 'react-router-dom';
import {LoadingStub, APIAdapter, PaginatedList} from "./Components.js";

const Highlight = require("react-highlighter");
const config = require("./config.json");

const numberCommas = (num = 0) => num.toLocaleString();

class Cities extends Component {
    render() {
        return (
            <div className="Container">
                <Switch>
                    <Route exact path="/cities" component={MultipleCities}/>
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
            loaded: false,
            data: {}
        };
    }

    componentDidMount() {
        fetch(`${config.API_URL}/cities/${this.id}`)
            .then(data => data.json())
            .then(json => {
                this.setState({data: json, loaded: true});
            })
            .catch(e => {
            });
    }

    render() {
        if (!this.state.loaded)
            return <LoadingStub />;

        const {name, city_picture_link, population, state} = this.state.data.city;

        let articles = this.state.data.news.map(article =>
                <tr><td width="15%">{new Date(article.date).toDateString()}</td><td width="85%"><a href={`/news/${article.article_id}`}>{article.title}</a></td></tr>);
        if (articles.length === 0) {
            articles = <tr><td className="font-italic">No articles found.</td></tr>;
        }

        const artists = this.state.data.artists.map(artist =>
            <span className="badge badge-light"><a href={`/artists/${artist.artist_id}`}>{artist.name}</a></span>);

        return (
            <div className="col-12">
                <div className="card">
                    <div className="card-body">
                        <h2 className="card-title">{name}, {state}</h2>
                        <div className="row">
                            <div className="col-sm-12 col-md-6 col-lg-4">
                                <img src={city_picture_link} className="img-fluid" alt={name}/>
                            </div>
                            <div className="col-sm-12 col-md-6 col-lg-6" >
                                <p><b>Population:&nbsp;</b>{numberCommas(population)}</p>
                                <b>Related Artists: </b>{artists}<br/>
                            </div>
                            <div className="col-sm-12 col-md-12 col-lg-12">
                                <h3>News Articles</h3>
                                    <table className="table table-light table-sm table-hover">
                                        <tbody>
                                        {articles}
                                        </tbody>
                                    </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export class MultipleCities extends Component {
    render() {
        return (
            <APIAdapter endpoint="cities" defaultParams={{page: 1}}>
                <PaginatedList itemClass={CityPreview}
                 sortOptions={{
                    "A-Z": {sort: "alpha", order: "asc"}, 
                    "Z-A": {sort: "alpha", order: "desc"},
                    "Biggest": {sort: "population", order: "desc"},
                    "Smallest": {sort: "population", order: "asc"}
                 }}
                 filterOptions={{
                    "pop": ["range0"]
                 }}/>
            </APIAdapter>
        );
    }
}

export class CityPreview extends Component {
    render() {
        const {city_id, name, population, state} = this.props.data;

        return (
            <div className="col-12 p-0">
            <table className="table table-light m-0">
                <thead className="thead-inverse">
                    <tbody className="w-100" style={{"display": "inline-table"}}>
                        <tr className="w-100">
                            <td style={{width: "30%"}}><a href={`/cities/${city_id}`}>{name}</a></td>
                            <td style={{width: "40%"}}>{numberCommas(population)}</td>
                            <td style={{width: "30%"}}>{state}</td>
                        </tr>
                    </tbody>
                </thead>
            </table>
            </div>
        );
    }
}

export default Cities;
