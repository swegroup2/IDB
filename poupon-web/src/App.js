import React, { Component } from 'react';
import { Navbar, Jumbotron, Button, Grid } from 'react-bootstrap';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div>
        <Navbar inverse fixedTop>
          <Grid>
            <Navbar.Header>
              <Navbar.Brand>
                <a href="/">Poupon.me</a>
              </Navbar.Brand>
              <Navbar.Toggle />
            </Navbar.Header>
          </Grid>
        </Navbar>
        <Jumbotron>
          <Grid>
            <h1>Welcome to Poupon</h1>
            <p>
              <Button
                bsStyle="success"
                bsSize="large"
                href="http://poupon.me/api/hello"
                target="_blank">
                API Test
              </Button>
            </p>
          </Grid>
        </Jumbotron>
      </div>
    );
  }
}

export default App;
