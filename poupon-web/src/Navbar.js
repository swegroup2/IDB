import React, {Component} from 'react';
import {
    Link
} from 'react-router-dom';

const config = require("./config.json");

class Navbar extends Component {
    constructor(params) {
        super(params);

        this.state = {
            searchQuery: ""
        };
    }

    render() {
        //todo: move this?
        const tabs = [
            {name: "Home", href: "/"},
            {name: "About", href: "/about"},
            {name: "Artists", href: "/artists"},
            {name: "Albums", href: "/albums"},
            {name: "News", href: "/news"},
            {name: "Cities", href: "/cities"},
            {name: "Dataviz", href: "/dataviz"}
        ];

        //generate navigation tabs
        let navtabs = tabs.map(data => {
            //figure out what css classes to use
            let classes = ["navbar-item"];
            if (document.location.pathname === data.href)
                classes.push("active");

            return <li className={classes.join(" ")} key={data.name}>
                <Link to={data.href}>
                    <div className="nav-link">{data.name}</div>
                </Link>
            </li>
        });

        const searchSubmit = event => {
            event.preventDefault();
            document.location.href = "/search/" + this.state.searchQuery;
        };
        const searchChange = event => this.setState({searchQuery: event.target.value});

        //render navbar template
        return (
            <nav className="navbar navbar-expand-md navbar-light bg-light">
                <a className="navbar-brand" href="/">Poupon</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse"
                        data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                        aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        {navtabs}
                    </ul>
                    <form className="form-inline my-2 my-lg-0" onSubmit={searchSubmit}>
                        <input className="form-control mr-sm-2" type="text" placeholder="Search"
                               aria-label="Search" onChange={searchChange} value={this.state.searchQuery}></input>
                        <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                    </form>
                </div>
            </nav>
        );
    }
}

export default Navbar;
