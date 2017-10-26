import React, { Component } from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';

import Navbar from './Navbar';
import Artists from './Artists';
import Albums from './Albums';
import News from './News';
import Cities from './Cities';
import About from './About'

function Home() {
  return (
      <div>
        <div className="row justify-content-center">
          <div className="col-md-6 col-sm-12">
          <h1 className="display-4 text-white mb-4">Welcome to Poupon.me</h1>
                <iframe width="100%" height="315" src="https://www.youtube.com/embed/jOgPk5T1xi0?rel=0" frameborder="0" style={{border:0}} className="mb-5" allowfullscreen></iframe>
                <a href="/api/hello" target="_blank" rel="noopener noreferrer">
                </a>
          </div>
        </div>
      </div>
  );
}

function NotFound() {
  return (
    <div>
      <p>URL not found!</p>
    </div>
  );
}

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Navbar/>
          <div className="Container">
          <Switch>
                <Route exact path="/" component={Home}/>
                <Route path="/artists" component={Artists}/>
                <Route path="/albums" component={Albums}/>
                <Route path="/news" component={News}/>
                <Route path="/cities" component={Cities}/>
                <Route path="/about" component={About}/>
                <Route component={NotFound} />
          </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
