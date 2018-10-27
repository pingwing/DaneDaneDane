import React, { Component } from 'react'
import { Router, Route, Switch } from 'react-router'
import createHistory from 'history/createBrowserHistory'
import Creator from './Pages/Creator'
import Main from './Pages/Main'
import GoodPractices from './Pages/GoodPractices'
import FileUpload from './Pages/FileUpload'
import NavBar from './Layout/NavBar'
import Typography from '@material-ui/core/Typography'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'

const history = createHistory()

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#0f2548'
    }
  }
})

export default class App extends Component {
  render () {
    return (
      <MuiThemeProvider theme={theme}>
        <Router history={history}>
          <>
            <NavBar />
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
              <Route path="/best_practices" component={GoodPractices} />
              <Route path="/fupl" component={FileUpload} />
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
          </>
        </Router>
      </MuiThemeProvider>
    )
  }
}
