import React, { Component } from 'react';

var data = require('./data.json').data[2];

class News extends Component {
    render() {
        const items = data.news.map(item => <Preview news={item}/>);
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
    	const {title, score, num_comments, url, artists} = this.props.news;
    	const dStart = url.indexOf("//") + 2;
    	const dEnd = url.indexOf("/", dStart);
    	const domain = url.substring(dStart, dEnd);
        return (
            <div className="col-sm-12 col-md-6">
            	<div className="Container">
                <div className="card">
                  <div className="Container">
				  <div className="card-block">
				    <h4 className="card-title">{title}</h4>
				    <h6 className="card-subtitle mb-2 text-muted">{"points: " + score}</h6>
				    <p className="card-text">{"Artists: " + artists.join(", ")}</p>
				    <a href={url} className="card-link">{`Open (${domain})`}</a>
				  </div>
				  </div>
				</div>
            	</div>
            </div>
        );
    }
}

export default News;
