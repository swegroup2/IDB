import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch
} from 'react-router-dom';

var data = require('./data.json').data[0];

class Artists extends Component {
    render() {
        return (
            <div className="Container">
            <Switch>
                <Route exact path="/artists" component={MultipleArtists}/>
                <Route component={SingleArtist}/>
            </Switch>
            </div>
        );
    }
}

class SingleArtist extends Component {
    render() {
        var path = window.location.pathname.split("/");
        var id = path[2];
        console.log("id: " + id);
        for(var i = 0; i < data.artists.length; i++) {
            if(data.artists[i].id == id) {
                var artist = data.artists[i];
                return (
                        <div className="row">
                        <div className="col-sm-0 col md-4">
                        </div>

                        <div className="col-sm-12 col-md-4">
                        <div className="card">
                        <div className="Container">
                        <img src={artist.image.url} className="card-img-top" alt={artist.name}/>
                        <div className="card-block">
                        <div className="Container">
                <h4 className="card-title">{artist.name}</h4>
                        </div>
                        <div className="Container">
                        <p className="card-text">
                        <b>Genres:</b> {artist.genres.join(", ")}<br/>
                        <b>Albums:</b> {artist.albums.join(", ")}<br/>
                        <b>Cities:</b> {artist.cities.join(", ")}<br/>
                        <b>Related Artists:</b> {artist.related_artists.join(", ")}<br/>
                        </p>
                        <a href={artist.external_urls.spotify}>Open Spotify</a>
                        </div>
                        </div>
                        </div>
                        </div>
                        </div>

                        <div className="col-sm-0 col md-4">
                        </div>
                        </div>
                        );
            }
        }
    }
}

class MultipleArtists extends Component {
    render() {
        const items = data.artists.map((item, i) =>
                <Preview key={i} artist={item}/>
                );
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
        var artist = this.props.artist;
        return (
                <div className="col-sm-6 col-md-4">
                <div className="card">
                <div className="Container">
                <img src={artist.image.url} className="card-img-top" alt={artist.name}/>
                <div className="card-block">
                <div className="Container">
                        <a href={"artists/"+artist.id} className="card-title"> {artist.name}</a>
                </div>
                <div className="Container">
                <p className="card-text">
                <b>Genres:</b> {artist.genres.join(", ")}<br/>
                <b>Albums:</b> {artist.albums.join(", ")}<br/>
                <b>Cities:</b> {artist.cities.join(", ")}<br/>
                <b>Related Artists:</b> {artist.related_artists.join(", ")}<br/>
                </p>
                <a href={artist.external_urls.spotify}>Open Spotify</a>
                </div>
                </div>
                </div>
                </div>
                </div>
                );
    }
}

export default Artists;
