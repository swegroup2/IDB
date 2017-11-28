import React, {Component} from 'react';
import {
    Route,
    Switch
} from 'react-router-dom';
import {LoadingStub, APIAdapter, PaginatedList} from "./Components.js";
import {ArtistPreviewCard} from "./Artists.js";
import {AlbumPreviewCard} from "./Albums.js";
import {ArticlePreviewCard} from "./News.js";
import {CityPreview} from "./Cities.js";

const Highlight = require("react-highlighter");
const config = require("./config.json");

class Search extends Component {
    render() {
        return (
            <div className="Container">
                <Switch>
                    <Route path="/search/:query" component={SearchPage}/>
                </Switch>
            </div>
        );
    }
}

class SearchResults extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentTab: 0
        };

        //load current tab from props
        if (props.hasOwnProperty("currentTab"))
            this.state.currentTab = props.currentTab;
    }

    render() {
        //render tabs
        const tabs = this.props.tabs.map((tab, index) => {
            const handler = event => this.setState({currentTab: index});
            const activeClass = index === this.state.currentTab ? "active" : "";

            return (
                <li className="nav-item" style={{cursor: "pointer"}}>
                    <span className={`nav-link ${activeClass}`} onClick={handler}>
                        {tab.title}
                    </span>
                </li>
            );
        })

        //render the list of results for this tab
        const tab = this.props.tabs[this.state.currentTab];
        const resultsList = (
            <APIAdapter endpoint={`${tab.endpoint}/${this.props.query}`} defaultParams={{page: 1}}>
                <PaginatedList itemClass={tab.itemClass} itemProps={{query: this.props.query}}
                 hideSortFilter={true} />
            </APIAdapter>
        );

        return (
            <div className="row">
                <div className="col-12 text-light p-2">
                    <h3 className="mb-3">Search results for "{this.props.query}":</h3>
                    <ul className="nav nav-pills nav-fill">
                        {tabs}
                    </ul>
                </div>
                <div className="col-12">
                    {resultsList}
                </div>
            </div>
        );
    }
}

class SearchPage extends Component {
    render() {
        return (
            <SearchResults query={this.props.match.params.query} tabs={[
                {title: "Artists", endpoint: "artists/search", itemClass: ArtistPreviewCard},
                {title: "Albums", endpoint: "albums/search", itemClass: AlbumPreviewCard},
                {title: "News", endpoint: "news/search", itemClass: ArticlePreviewCard},
                {title: "Cities", endpoint: "cities/search", itemClass: CityPreview}
            ]}/>
        );
    }
}

export default Search;
