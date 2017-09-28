import React, { Component } from 'react';

var data = require('./data/artists.json');
console.log(data);

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
        const genres = this.props.artist.genres.map((genre) => {return(genre + ", ");})
        const albums = this.props.artist.albums.map((album) => {return(album) + ", ";})
        return (
                <div className="col-sm-6 col-md-4">
                <div className="card">
                    <div className="Container">
                    <img src={this.props.artist.image.url} className="card-img-top"/>
                    <div className="card-block">
                        <div className="Container">
                        <h4 className="card-title">{this.props.artist.name}</h4>
                        </div>
                        <div className="Container">
                        <p className="card-text">
                            genres: {genres}<br/>
                            albums: {albums}
                        </p>
                    </div>
                    </div>
                    </div>
                </div>
                </div>
        );
    }
}

export default Artists;
