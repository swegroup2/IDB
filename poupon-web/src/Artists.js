import React, {Component} from 'react';
import {
    Route,
    Switch
} from 'react-router-dom';
import LoadingStub from "./Components.js";
import {ModelController, PaginatedList} from "./Lists.js";

const config = require("./config.json");

function popularityRating(val) {
    return val;
}

class Artists extends Component {
    render() {
        return (
            <div className="Container">
                <Switch>
                    <Route exact path="/artists" component={MultipleArtists}/>
                    <Route path="/artists/:id" component={ArtistDetailCard}/>
                </Switch>
            </div>
        );
    }
}

class ArtistDetailCard extends Component {
    constructor(props) {
        super(props);
        this.id = this.props.match.params.id;
        this.state = {
            data: {},
            loaded: false
        };
    }

    componentDidMount() {
        fetch(`${config.API_URL}/artists/${this.id}`)
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

        const artist = this.state.data.artist;
        const cities = this.state.data.cities;

        let articles = this.state.data.news.map(article =>
                <tr><td><a href={`/news/${article.article_id}`}>{article.title}</a></td></tr>);
        if (articles.length === 0) {
            articles = <tr><td className="font-italic">No articles found.</td></tr>;
        }

        let albums = this.state.data.albums.map(album =>
                <tr><td><a href={`/albums/${album.albums_id}`}>{album.name}</a></td></tr>);
        if (albums.length === 0) {
            albums = <tr><td className="font-italic">No albums found.</td></tr>;
        }

        const cityList = cities.map(city => (
            <span className="badge badge-light">
                <a href={`/cities/${city.city_id}`}>{city.name}</a>
            </span>
        ));

        return (
            <div className="col-12">
                <div className="card">
                    <div className="card-body">
                        <h2 className="card-title">{artist.name}</h2>
                        <div className="row">
                            <div className="col-sm-12 col-md-12 col-lg-4">
                                <img src={artist.artist_picture_link} className="img-fluid" alt={artist.name}/>
                            </div>
                            <div className="col-sm-12 col-md-12 col-lg-8">
                                <p><a className="btn btn-primary mr-1" href={`https://open.spotify.com/artist/${artist.spotify_id}`}>Open Spotify</a></p>
                                <p><b>Related Cities: </b>{cityList}</p>
                                <p><b>Albums: </b></p>
                                    <table className="table table-light table-sm table-hover">
                                        <tbody>
                                        {albums}
                                        </tbody>
                                    </table>
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

class MultipleArtists extends Component {
    render() {
        return (
            <ModelController endpoint="artists">
                <PaginatedList pageValue={1} itemClass={ArtistPreviewCard}/>
            </ModelController>
        );
    }
}

class ArtistPreviewCard extends Component {
    render() {
        const name = this.props.data.name;
        const img = this.props.data.artist_picture_link;
        const id = this.props.data.artist_id;

        return (
            <div className="col-sm-12 col-md-6 col-lg-4">
                <div className="card">
                    <div className="Container">
                        <img src={img} className="img-fluid" alt={name}/>
                    </div>

                    <div className="card-body">
                        <h4><a href={`/artists/${id}`} className="card-title">{name}</a></h4>
                    </div>
                </div>
            </div>
        );
    }
}

export default Artists;
