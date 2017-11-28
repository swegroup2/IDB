import React, {Component} from 'react';
import {
    Route,
    Switch
} from 'react-router-dom';
import {LoadingStub} from "./Components.js";

const config = require("./config.json");

export default class Dataviz extends Component {
    render() {
        return (
            <div className="Container">
                <div className="alert alert-primary" role="alert">
                    Dataviz coming soon.
                </div>
            </div>
        );
    }
}
