import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import firebase from 'firebase';
import { BrowserRouter as Router, Route, Link, NavLink, Switch } from 'react-router-dom';

import Home from './components/Home.js';
import Pantry from './components/Pantry.js';
import Results from './components/Results.js';
import Search from './components/Search.js';

var config = {
  apiKey: 'AIzaSyAxBftb2LL5DfmTV6tYBuM96SPXG74M8h8',
  authDomain: 'lcbo-agency.firebaseapp.com',
  databaseURL: 'https://lcbo-agency.firebaseio.com',
  projectId: 'lcbo-agency',
  storageBucket: 'lcbo-agency.appspot.com',
  messagingSenderId: '813260474801'
};

firebase.initializeApp(config);


class App extends React.Component {
  constructor() {
    super();
    this.state = {
      user: false,
      pantry: []
    }
  }

  componentDidMount() {
    const wineApp = firebase.database().ref();
    wineApp.on('value', (snapshot) => {
      let tests = snapshot.val();
      // console.log(tests);
      for (let test in tests) {
        // console.log(test);
      }
      // this.setState({
      //   blah blah blah
      // })
    });
  }

  render() {
    return (
      <Router>
        <div>
          <h1>Wine is Fine</h1>
          <nav>
            <ul>
              <li>
                <NavLink to="/pantry" activeClassName="active">Pantry</NavLink>
              </li>
              <li>
                <NavLink to="/search" activeClassName="active">Search</NavLink>
              </li>
              <li>
                <NavLink to="/results" activeClassName="active">Results</NavLink>
              </li>
            </ul>
          </nav>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/pantry" component={Pantry} />
            <Route exact path="/search" component={Search} />
            <Route exact path="/results" component={Results} />
            <Route render={() => <p>Page not found :(</p>} />
          </Switch>
        </div>
      </Router>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
