import React, { Component } from "react";
import { Router, Route, Switch } from "react-router";
import { Link } from "react-router-dom";
import createHistory from "history/createBrowserHistory";
import About from "/imports/ui/About";
import Inbox from "/imports/ui/Inbox";
import Main from "/imports/ui/Main";
import NavBar from "./Layout/NavBar";

const history = createHistory();

export default class App extends Component {
  render() {
    return (
      <Router history={history}>
        <div>
          <NavBar />
          <div className="nav">
            <ul>
              <li>
                <Link to="/about">About</Link>
              </li>
              <li>
                <Link to="/inbox">Inbox</Link>
              </li>
            </ul>
          </div>
          <div className="app">
            <Switch>
              <Route path="/" component={Main} exact />
              <Route path="/about" component={About} />
              <Route path="/inbox" component={Inbox} />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}
