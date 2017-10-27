import React, { Component } from 'react';
import {
  Route,
  Switch
} from 'react-router-dom';

var data = require('./data.json').data;
var db = require('./database.json').database;

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
            data: {}
        };
    }

    componentWillMount() {
        fetch(`http://poupon.me/api/news/${this.id}`)
            .then(data => data.json())
            .then(json => {
                this.setState({data: json[0]});
            })
            .catch(e => {});
    }

    render() {
        const {article_id, media_link, title, upvotes} = this.state.data;
        const date = new Date(this.state.data.date);
        const domain = media_link ? urlGetDomain(media_link) : "";

        return (
            <div className="col-sm-12 col-md-6">
                <div className="card">
                    <div className="card-body">
                        <h4 className="card-title"><a href={`/news/${article_id}`}>{title}</a></h4>
                        <h6 className="card-subtitle mb-2 text-muted">{`points: ${upvotes}`}</h6>
                        <p className="card-text">
                        <b>Related Artists: </b>todo<br/>
                        <b>Related Albums: </b>todo</p>
                        <a href={media_link} className="card-link">{`Open (${domain})`}</a>
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
            data: []
        };
    }

    componentWillMount() {
        fetch("http://poupon.me/api/news")
            .then(data => data.json())
            .then(json => {
                this.setState({data: json})
            })
            .catch(e => {});
    }

    render() {
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
        const {name, title, media_link, upvotes, article_id} = this.props.data;
        const domain = media_link ? urlGetDomain(media_link) : "";

        return (
            <div className="col-sm-12 col-md-6">
                <div className="card">
                    <div className="card-body">
                        <h4 className="card-title">{title}</h4>
                        <h6 className="card-subtitle mb-2 text-muted">{`points: ${upvotes}`}</h6>
                        <p className="card-text">
                        <b>Related Artists: </b>todo<br/>
                        <b>Related Albums: </b>todo</p>
                        <a className="btn btn-primary mr-1" href={media_link}>{`Open (${domain})`}</a>
                        <a className="btn btn-primary" href={`/news/${article_id}`}>{`Details`}</a>
                    </div>
                </div>
            </div>
        );
    }
}

export default Articles;