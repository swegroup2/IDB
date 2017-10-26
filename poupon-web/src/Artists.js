import React, { Component } from 'react';
import {
  Route,
  Switch
} from 'react-router-dom';

var data = require('./data.json').data;
var db = require('./database.json').database;

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
            data: {}
        };
    }

    componentWillMount() {
        fetch(`http://poupon.me/api/artists/${this.id}`)
            .then(data => data.json())
            .then(json => {
                this.setState({data: json[0]})
            })
            .catch(e => {});
    }

    render() {
        const name = this.state.data.name;
        const img = this.state.data.artist_picture_link;
        const popularity = this.state.data.popularity;
        const sid = this.state.data.spotify_id;

        return (
            <div className="col-12">
                <div className="card">
                    <div className="row">
                        <div className="col-sm-12 col-md-6 col-lg-4">
                            <img src={img} className="img-fluid" alt={name}/>
                        </div>
                        <div className="col-sm-12 col-md-6 col-lg-8">
                            <h2 className="card-title">{name}</h2>
                            <div className="card-block">
                                <p><b>Popularity:&nbsp;</b>{popularity}</p>
                                <p><a href={`https://open.spotify.com/artist/${sid}`}>Open Spotify</a></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

class MultipleArtists extends Component {
    constructor(props) {
        super(props);
        this.state = {
            top: []
        };
    }

    componentWillMount() {
        fetch("http://poupon.me/api/artists/top/30")
            .then(data => data.json())
            .then(json => {
                this.setState({top: json})
            })
            .catch(e => {});
    }

    render() {
        const items = this.state.top.map((item, i) => <ArtistPreviewCard key={i} data={item}/>);
        return (
            <div className="row">
                {items}
            </div>
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
                        <img src={img} className="card-img-top" alt={name}/>
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
