import React, { Component } from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch
} from 'react-router-dom';
import Navbar from './Navbar';
import Artists from './Artists';
import News from './News';

function Home() {
  return (
      <div>
        <div className="Container">
        <a href="http://poupon.me/api/hello" target="_blank">
          <button type="button" className="btn btn-primary">API Test</button>
        </a>
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
                <Route path="/news" component={News}/>
                <Route component={NotFound} />
          </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
