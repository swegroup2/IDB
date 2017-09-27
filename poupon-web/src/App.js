import React, { Component } from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';
import Navbar from './Navbar';


function Home() {
  return (
      <div>
        <p>Rendered with React.</p>
        <a href="http://poupon.me/api/hello" target="_blank">
          <button type="button" className="btn btn-primary">API Test</button>
        </a>
      </div>
  );
}

function Artists() {
  return (
    <div>
      <p>Artists will be displayed here!</p>
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
        <div style={{textAlign: "center"}}>
          <Navbar/>
          <Route exact path="/" component={Home}/>
          <Route path="/artists" component={Artists}/>
          <Route exact path="*" component={NotFound} />
        </div>
      </Router>
    );
  }
}

export default App;
