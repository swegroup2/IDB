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

    renderAlbumList(albums) {
        const items = albums.map((item) => {
            const {name, artist_id, album_id} = item;

            return (
                <tr>
                    <td><a href={`/albums/${album_id}`}>{name}</a></td>
                </tr>
            );
        });

        return (
            <table className="table">
                <thead className="thead-light">
                <tr>
                    <th>Albums</th>
                </tr>
                </thead>
                <tbody>
                {items}
                </tbody>
            </table>
        );
    }

    render() {
        if (!this.state.loaded)
            return <LoadingStub />;

        const artist = this.state.data.artist;
        const albums = this.state.data.albums;
        const cities = this.state.data.cities;

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
                            <div className="col-sm-12 col-md-6 col-lg-4">
                                <img src={artist.artist_picture_link} className="img-fluid" alt={artist.name}/>
                            </div>
                            <div className="col-sm-12 col-md-6 col-lg-8">
                                <p><b>Popularity:&nbsp;</b>{popularityRating(artist.popularity)}</p>
                                <p><b>Related Cities: </b>{cityList}</p>
                                <p><a href={`https://open.spotify.com/artist/${artist.spotify_id}`}>Open Spotify</a></p>
                                {this.renderAlbumList(albums)}
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
            <PaginatedList data={[{name: "test", artist_picture_link: "", id: "420"}]} itemClass={ArtistPreviewCard}/>
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
