import React, {Component} from 'react';
import {
    Route,
    Switch
} from 'react-router-dom';
import {LoadingStub, APIAdapter, PaginatedList} from "./Components.js";
// import {Tabs, Tab, TabContainer} from 'react-bootstrap';


const config = require("./config.json");

function popularityRating(val) {
    return val;
}

class Search extends Component {
    render() {
        return (
            <div className="Container">
                <Switch>
                    <Route path="/search/:query" component={MultipleArtists}/>
                </Switch>
            </div>
        );
    }
}

class MultipleArtists extends Component {
    render() {
        return (
            <div>

                <APIAdapter endpoint="artists" defaultParams={{page: 1}}>
                    <PaginatedList itemClass={ArtistPreviewCard}
                    sortOptions={{
                        "Most popular": {sort: "popularity", order: "desc"},
                        "Least popular": {sort: "popularity", order: "asc"}, 
                        "A-Z": {sort: "alphabetical", order: "desc"}, 
                        "Z-A": {sort: "alphabetical", order: "asc"}
                    }}/>
                </APIAdapter>
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

export default Search;
