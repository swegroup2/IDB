import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div style={{textAlign: "center", marginTop: "2em"}}>
      <h1>Welcome to Poupon!</h1>
      <p>Rendered with React.</p>
      <a href="http://poupon.me/api/hello" target="_blank">
        <button type="button" className="btn btn-primary">API Test</button>
      </a>
      </div>
    );
  }
}

export default App;
