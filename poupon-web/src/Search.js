import React, {Component} from 'react';
import {
    Route,
    Switch
} from 'react-router-dom';
import {LoadingStub, APIAdapter, PaginatedList} from "./Components.js";
import {Tabs, Tab, TabContainer} from 'react-bootstrap';


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
                <Tabs defaultActiveKey={1} id="uncontrolled-tab-example">
                    <Tab eventKey={1} title="Artists"><p>Tab 1 content</p></Tab>
                    <Tab eventKey={2} title="Albums">Tab 2 content</Tab>
                    <Tab eventKey={3} title="News">Tab 3 content</Tab>
                    <Tab eventKey={4} title="Cities">Tab 4 content</Tab>

                </Tabs>
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
