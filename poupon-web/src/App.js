import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import Navbar from './Navbar';

class App extends Component {
  render() {
    return (
      <div style={{textAlign: "center"}}>
      <Navbar/>
      <p>Rendered with React.</p>
      <a href="http://poupon.me/api/hello" target="_blank">
        <button type="button" className="btn btn-primary">API Test</button>
      </a>
      </div>
    );
  }
}

export default App;
