import React, { Component } from 'react';
import {
  Route,
  Switch
} from 'react-router-dom';

var data = require('./data.json').data;

class Albums extends Component {
    render() {
        return (
            <div className="Container">
            <Switch>
                <Route exact path="/albums" component={MultipleAlbums}/>
                <Route component={SingleAlbum}/>
            </Switch>
            </div>
        );
    }
}

class SingleAlbum extends Component {
    render() {
        var path = window.location.pathname.split("/");
        var id = path[2];
        console.log("id: " + id);
        for(var i = 0; i < data.albums.length; i++) {
            if(data.albums[i].id == id) {
                return (
                        <div className="row">
                        <div className="col-sm-0 col-md-3 col-lg-4">
                        </div>
                        <AlbumCard album={data.albums[i]}/>
                        <div className="col-sm-0 col-md-3 col-lg-4">
                        </div>
                        </div>
                       );
            }
        }
    }
}

class MultipleAlbums extends Component {
    render() {
        const items = data.albums.map((item, i) =>
            <AlbumCard key={i} album={item}/>
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

class AlbumCard extends Component {
    render() {
        var album = this.props.album;
        var collapseName = "collapse"+album.id;
        const tracks = album.tracks.map((item, i) => <span key={i}>{item.name}<br/></span>);
        return (
                <div className="col-sm-12 col-md-6 col-lg-4">
                <div className="card">
                <div className="Container">
                <img src={album.image.url} className="card-img-top" alt={album.name}/>
                <div className="card-block">
                <div className="Container">
                <h4 className="card-title"><a href={"/albums/"+album.id}>{album.name}</a></h4>
                <h6 className="card-subtitle mb-2 text-muted">{album.artist}</h6>
                </div>
                <div className="Container">
                <p className="card-text">
                <b>Release Date:</b> {new Date(album.release_date).toDateString()}<br/>
                <b>Label:</b> {album.label}<br/>
                </p>
                <a data-toggle="collapse" data-parent="#accordion" href={"#"+collapseName} aria-expanded="false" aria-controls={collapseName}>
                TrackList
                </a>
                <div id={collapseName} className="collapse hide" role="tabpanel">
                {tracks}
                </div>
                </div>
                </div>
                </div>
                </div>
                </div>
        );
    }
}

export default Albums;
