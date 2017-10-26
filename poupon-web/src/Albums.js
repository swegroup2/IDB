import React, { Component } from 'react';
import {
  Route,
  Switch
} from 'react-router-dom';

var data = require('./data.json').data;
var db = require('./database.json').database;

class Albums extends Component {
    render() {
        return (
            <div className="Container">
                <Switch>
                <Route exact path="/albums" component={MultipleAlbums}/>
                <Route path="/albums/:id" component={AlbumDetailCard}/>
                </Switch>
            </div>
        );
    }
}

class AlbumDetailCard extends Component {
    constructor(props) {
        super(props);
        this.id = this.props.match.params.id;
        this.state = {
            data: {},
            artistData: {}
        };
    }

    componentWillMount() {
        fetch(`http://poupon.me/api/albums/${this.id}`)
            .then(data => data.json())
            .then(json => {
                this.setState({data: json[0]});

                fetch(`http://poupon.me/api/artists/${this.state.data.artist_id}`)
                    .then(artistData => artistData.json())
                    .then(artistJson => {
                        this.setState({artistData: artistJson[0]});
                    })
                    .catch(e => {});
            })
            .catch(e => {});
    }

    render() {
        const name = this.state.data.name;
        const img = this.state.data.album_picture_link;
        const date = new Date(this.state.data.release_date);
        const sid = this.state.data.spotify_id;
        const artist_name = this.state.artistData.name;
        const artist_id = this.state.data.artist_id;
        const artist_url = `/artists/${artist_id}`;
        const spotify_link = `https://open.spotify.com/album/${sid}`;

        return (
            <div className="col-12">
                <div className="card">
                    <div className="card-body">
                        <h2 className="card-title">{name}</h2>
                        <div className="row">
                            <div className="col-sm-12 col-md-6 col-lg-4">
                                <img src={img} className="img-fluid" alt={name}/>
                            </div>
                            <div className="col-sm-12 col-md-6 col-lg-4">
                                <iframe src={`https://open.spotify.com/embed?uri=${spotify_link}&theme=white`} 
                                        width="100%" height="100%" frameborder="0" allowtransparency="true"></iframe>
                            </div>
                            <div className="col-sm-12 col-md-12 col-lg-4">
                                <p><b>Artist:&nbsp;</b><a href={artist_url}>{artist_name}</a></p>
                                <p><b>Release Date:&nbsp;</b>{date.toLocaleDateString()}</p>
                                <p><a href={spotify_link}>Open Spotify</a></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

class MultipleAlbums extends Component {
    constructor(props) {
        super(props);
        this.state = {
            top: []
        };
    }

    componentWillMount() {
        fetch("http://poupon.me/api/albums")
            .then(data => data.json())
            .then(json => {
                this.setState({top: json})
            })
            .catch(e => {});
    }

    render() {
        const items = this.state.top.map((item, i) => <AlbumPreviewCard key={i} data={item}/>);
        return (
            <div className="row">
                {items}
            </div>
        );
    }
}

class AlbumPreviewCard extends Component {
    render() {
        const name = this.props.data.name;
        const img = this.props.data.album_picture_link;
        const id = this.props.data.album_id;

        return (
            <div className="col-sm-12 col-md-6 col-lg-4">
                <div className="card">
                    <div className="Container">
                        <img src={img} className="card-img-top" alt={name}/>
                    </div>

                    <div className="card-body">
                        <h4><a href={`/albums/${id}`} className="card-title">{name}</a></h4>
                    </div>
                </div>
            </div>
        );
    }
}

export default Albums;
