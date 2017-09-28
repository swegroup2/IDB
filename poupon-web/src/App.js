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

function Home() {
  return (
      <div>
        <div className="Container">
        <a href="/api/hello" target="_blank" rel="noopener noreferrer">
          <button type="button" className="btn btn-primary">API Test</button>
        </a>
      </div>
      </div>
  );
}

function Api() {
    return (
            <div>
            Poupon
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
                <Route path="/api/*" component={Api}/>
                <Route component={NotFound} />
          </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
