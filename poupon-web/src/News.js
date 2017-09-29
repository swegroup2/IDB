import React, { Component } from 'react';
import {
  Route,
  Switch
} from 'react-router-dom';

var data = require('./data.json').data;
var db = require('./database.json').database;

class News extends Component {
    render() {
        return (
            <Switch>
                <Route exact path="/news" component={MultipleNews}/>
                <Route component={SingleNews}/>
            </Switch>
        );
    }
}

class SingleNews extends Component {
    render() {
        var path = window.location.pathname.split("/");
        var id = path[2];
        console.log("id: " + id);
        for(var i = 0; i < data.news.length; i++) {
            if(data.news[i].id == id) {
                return (
                        <div className="row">
                        <div className="col-sm-0 col-md-3">
                        </div>
                        <NewsCard news={data.news[i]}/>
                        <div className="col-sm-0 col-md-3">
                        </div>
                        </div>
                       );
            }
        }
    }
}

class MultipleNews extends Component {
    render() {
        const items = data.news.map((item, i) => <NewsCard key={i} news={item}/>);
        return (
            <div className="row">
                {items}
            </div>
     	);
	}
}

class NewsCard extends Component {
    render() {
    	const {id, title, score, num_comments, url, artists, albums} = this.props.news;
    	const dStart = url.indexOf("//") + 2;
    	const dEnd = url.indexOf("/", dStart);
    	const domain = url.substring(dStart, dEnd);
        const related_artists = artists.map(item =>
            {if(item in db) {
                return(<span><a href={"/artists/"+db[item]}>{item}</a>, </span>);
            } else {
                return(<span>{item}, </span>);
            }}
            );
        const related_albums = albums.map(item =>
            {if(item in db) {
                return(<span><a href={"/albums/"+db[item]}>{item}</a>, </span>);
            } else {
                return(<span>{item}, </span>);
            }}
            );
        return (
                <div className="col-sm-12 col-md-6">
                <div className="card">
                <div className="card-body">
                <h4 className="card-title"><a href={"/news/"+id}>{title}</a></h4>
                <h6 className="card-subtitle mb-2 text-muted">{"points: " + score}</h6>
                <p className="card-text">
                <b>Related Artists: </b>{related_artists}<br/>
                <b>Related Albums: </b>{related_albums}
                </p>
                <a href={url} className="card-link">{`Open (${domain})`}</a>
                </div>
                </div>
                </div>
        );
    }
}

export default News;
