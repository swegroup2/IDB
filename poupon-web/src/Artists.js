import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom';

var data = require('./data/artists.json');
console.log(data);

class Artists extends Component {
    render() {
        const items = data.artists.map((item) =>
            <Preview artist={item}/>
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
        const genres = this.props.artist.genres.map((genre) => <li>{genre}</li>)
        const albums = this.props.artist.albums.map((album) => <li>{album}</li>)
        return (
                <div className="col-sm-6 col-md-4">
                <div className="Container">
                    <img src={this.props.artist.image.url} className="img-fluid"/>
                    {this.props.artist.name}
                    {genres}
                    {albums}
                </div>
                </div>
        );
    }
}

export default Artists;
