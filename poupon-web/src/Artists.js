import React, { Component } from 'react';

var data = require('./data/artists.json');

class Artists extends Component {
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
                    <img src={artist.image.url} className="card-img-top"/>
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
                         <a href={artist.external_urls.spotify} class="btn btn-primary">Open Spotify</a>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
        );
    }
}

export default Artists;
