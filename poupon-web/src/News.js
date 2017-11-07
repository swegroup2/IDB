import React, {Component} from 'react';
import {
    Route,
    Switch
} from 'react-router-dom';
import LoadingStub from "./Components.js";

const config = require("./config.json");

const urlGetDomain = url => /.+?\/\/(.+?)(?:\/|$)/.exec(url)[1];

class Articles extends Component {
    render() {
        return (
            <div className="Container">
                <Switch>
                    <Route exact path="/news" component={MultipleArticles}/>
                    <Route path="/news/:id" component={ArticleDetailCard}/>
                </Switch>
            </div>
        );
    }
}

class ArticleDetailCard extends Component {
    constructor(props) {
        super(props);
        this.id = this.props.match.params.id;
        this.state = {
            loaded: false,
            data: {}
        };
    }

    componentDidMount() {
        fetch(`${config.API_URL}/news/${this.id}`)
            .then(data => data.json())
            .then(json => {
                this.setState({data: json, loaded: true});
            })
            .catch(e => {});
    }

    render() {
        if (!this.state.loaded)
            return <LoadingStub />;

        const {article_id, media_link, title, upvotes, thumbnail} = this.state.data.news;
        const date = new Date(this.state.data.news.date);
        const domain = media_link ? urlGetDomain(media_link) : "";

        const artists = this.state.data.artist.map(a =>
            <span className="badge badge-light"><a href={`/artists/${a[1]}`}>{a[0]}</a></span>);
        const albums = this.state.data.album.map(a =>
            <span className="badge badge-light"><a href={`/albums/${a[1]}`}>{a[0]}</a></span>);

        return (
            <div className="col-sm-12">
                <div className="card">
                    <div className="card-body">
                        <div className="row">
                        <div className="col-sm-12 col-md-4">
                        <img src={thumbnail} className="img-fluid" alt={title}/>
                        </div>
                        <div className="col-sm-12 col-md-8">
                        <h4 className="card-title">{title}</h4>
                        <h6 className="card-subtitle mb-2 text-muted">{`points: ${upvotes}`}</h6>
                        <p className="card-text">
                            <b>Related Artists: </b>{artists}<br/>
                            <b>Related Albums: </b>{albums}</p>
                        <a href={media_link} className="card-link">{`Open (${domain})`}</a>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

class MultipleArticles extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            loaded: false
        };
    }

    componentDidMount() {
        fetch(`${config.API_URL}/news`)
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

        const items = this.state.data.map((item, i) => <ArticlePreviewCard key={i} data={item}/>);
        return (
            <div className="row">
                {items}
            </div>
        );
    }
}

class ArticlePreviewCard extends Component {
    render() {
        const {name, title, media_link, upvotes, article_id, thumbnail} = this.props.data;
        const domain = media_link ? urlGetDomain(media_link) : "";

        return (
            <div className="col-sm-12 col-md-6">
                <div className="card">
                    <div className="card-body">
                        <div className="row">
                        <div className="col-sm-12 col-md-4">
                        <img src={thumbnail} className="img-fluid" alt={title}/>
                        </div>
                        <div className="col-sm-12 col-md-8">
                        <h5 className="card-title">{title}</h5>
                        <h6 className="card-subtitle mb-2 text-muted">{`points: ${upvotes}`}</h6>
                        <a className="btn btn-primary mr-1" href={media_link}>{`Open (${domain})`}</a>
                        <a className="btn btn-primary" href={`/news/${article_id}`}>{`Details`}</a>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Articles;
