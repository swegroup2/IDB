import React, {Component} from 'react';
import {
    Route,
    Switch
} from 'react-router-dom';
import {LoadingStub, APIAdapter, PaginatedList} from "./Components.js";

const Highlight = require("react-highlighter");
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
                    <Route path="/artists/:id" component={SingleArtist}/>
                </Switch>
            </div>
        );
    }
}

class SingleArtist extends Component {
    render() {
        return (
            <APIAdapter endpoint={`artists/${this.props.match.params.id}`}>
                <ArtistDetailCard/>
            </APIAdapter>
        );
    }
}

class ArtistDetailCard extends Component {
    renderAlbums() {
        let albums = this.props.data.albums.map(album =>
                <tr><td><a href={`/albums/${album.album_id}`}>{album.name}</a></td></tr>);
        if (albums.length === 0) {
            albums = <tr><td className="font-italic">No albums found.</td></tr>;
        }
        return albums;
    }

    renderArticles() {
        let articles = this.props.data.news.map(article =>
                <tr><td width="15%">{new Date(article.date).toDateString()}</td><td width="85%"><a href={`/news/${article.article_id}`}>{article.title}</a></td></tr>);
        if (articles.length === 0) {
            articles = <tr><td className="font-italic">No articles found.</td></tr>;
        }
        return articles;
    }

    render() {
        if (!this.props.data)
            return <LoadingStub message="Error"/>;
        const artist = this.props.data.artist;
        const cities = this.props.data.cities;
        const albums = this.renderAlbums();
        const articles = this.renderArticles();
        
        const cityList = cities.map(city => 
            <span className="badge badge-light"><a href={`/cities/${city.city_id}`}>{city.name}</a></span>);

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
                                <p>
                                    <a className="btn btn-primary mr-1" 
                                       href={`https://open.spotify.com/artist/${artist.spotify_id}`}>
                                        Open Spotify
                                    </a>
                                </p>
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
            <APIAdapter endpoint="artists" defaultParams={{page: 1}}>
                <PaginatedList itemClass={ArtistPreviewCard}
                 sortOptions={{
                    "Most popular": {sort: "popularity", order: "desc"},
                    "Least popular": {sort: "popularity", order: "asc"}, 
                    "A-Z": {sort: "alpha", order: "asc"}, 
                    "Z-A": {sort: "alpha", order: "desc"}
                 }}/>
            </APIAdapter>
        );
    }
}

export class ArtistPreviewCard extends Component {
    render() {
        const name = this.props.data.name;
        const img = this.props.data.artist_picture_link;
        const id = this.props.data.artist_id;

        return (
            <div className="col-sm-12 col-md-6 col-lg-3">
                <div className="card">
                    <div className="Container">
                        <img src={img} className="img-fluid" alt={name}/>
                    </div>

                    <div className="card-body">
                        <h4><a href={`/artists/${id}`} className="card-title">
                        <Highlight search={this.props.query}>{name}</Highlight></a></h4>
                    </div>
                </div>
            </div>
        );
    }
}

export default Artists;
