import React, {Component} from 'react';
import {
    Route,
    Switch
} from 'react-router-dom';
import {LoadingStub} from "./Components.js";

const config = require("./config.json");

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
            loaded: false
        };
    }

    componentDidMount() {
        fetch(`${config.API_URL}/albums/${this.id}`)
            .then(data => data.json())
            .then(json => {
                this.setState({data: json, loaded: true});
            })
            .catch(e => {
            });
    }

    render() {
        if (!this.state.loaded)
            return <LoadingStub />;

        const album = this.state.data.album;
        const artist = this.state.data.artist;
        const album_date = new Date(album.release_date);

        const artist_url = `/artists/${artist.artist_id}`;
        const album_spotify_link = `https://open.spotify.com/album/${album.spotify_id}`;

        let articles = this.state.data.news.map(article =>
                <tr><td width="15%">{new Date(article.date).toDateString()}</td><td width="85%"><a href={`/news/${article.article_id}`}>{article.title}</a></td></tr>);
        if (articles.length === 0) {
            articles = <tr><td className="font-italic">No articles found.</td></tr>;
        }

        return (
            <div className="col-12">
                <div className="card">
                    <div className="card-body">
                        <h2 className="card-title">{album.name}</h2>
                        <div className="row">
                            <div className="col-sm-12 col-md-12 col-lg-4">
                                <img src={album.album_picture_link} className="img-fluid" alt={album.name}/>
                            </div>
                            <div className="col-sm-12 col-md-12 col-lg-4" style={{"min-height": "350px"}}>
                                <iframe src={`https://open.spotify.com/embed?uri=${album_spotify_link}&theme=white`}
                                        width="100%" height="100%" frameborder="0" allowtransparency="true"></iframe>
                            </div>
                            <div className="col-sm-12 col-md-12 col-lg-4">
                                <p><a className="btn btn-primary mr-1" href={album_spotify_link}>Open Spotify</a></p>
                                <p><b>Artist:&nbsp;</b><a href={artist_url}>{artist.name}</a></p>
                                <p><b>Release Date:&nbsp;</b>{album_date.toDateString()}</p>
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

class MultipleAlbums extends Component {
    constructor(props) {
        super(props);
        this.state = {
            top: [],
            loaded: false
        };
    }

    componentDidMount() {
        fetch(`${config.API_URL}/albums`)
            .then(data => data.json())
            .then(json => {
                this.setState({top: json, loaded: true});
            })
            .catch(e => {
            });
    }

    render() {
        if (!this.state.loaded)
                return <LoadingStub />;

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
                        <img src={img} className="img-fluid" alt={name}/>
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
