import React, { Component } from "react";
import { Router, Route, Switch } from "react-router";
import createHistory from "history/createBrowserHistory";
import Creator from "/imports/ui/Creator";
import Main from "/imports/ui/Main";
import NavBar from "./Layout/NavBar";
import Typography from "@material-ui/core/Typography";

const history = createHistory();

export default class App extends Component {
  render() {
    return (
      <Router history={history}>
        <div>
          <NavBar />
          <Typography component="div" style={{ padding: 8 * 3 }}>
            <Switch>
              <Route path="/" component={Main} exact />
              <Route
                path="/about"
                component={() => (
                  <div>
                    <h1>Po co dobre dane?</h1>
                  </div>
                )}
              />
              <Route
                path="/best_practices"
                component={() => (
                  <div>
                    <h1>Dobre praktyki</h1>
                  </div>
                )}
              />
              <Route path="/creator" component={Creator} />
              <Route
                path="/upload"
                component={() => (
                  <div>
                    <h1>Udostępnij dane</h1>
                  </div>
                )}
              />
            </Switch>
          </Typography>
        </div>
      </Router>
    );
  }
}
