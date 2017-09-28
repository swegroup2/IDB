import React, { Component } from 'react';

var data = require('./data.json').data[1];

class Albums extends Component {
    render() {
        const items = data.albums.map((item, i) =>
            <Preview key={i} album={item} index={i}/>
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
        var album = this.props.album;
        var collapseName = "collapse"+this.props.index;
        const tracks = album.tracks.map((item, i) => <span key={i}>{item.name}<br/></span>);
        console.log(tracks);
        return (
            <div className="col-sm-12 col-md-6 col-lg-4">
            <div className="card">
                <div className="Container">
                <img src={album.image.url} className="card-img-top" alt={album.name}/>
                <div className="card-block">
                    <div className="Container">
                    <h4 className="card-title">{album.name}</h4>
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

