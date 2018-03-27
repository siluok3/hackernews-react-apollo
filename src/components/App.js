import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'

import CreateLink from './CreateLink';
import Header from './Header';
import LinkList from "./LinkList";

class App extends Component {
  render() {
    return (
        <div className="center w85">
          <Header />
          <div>
            <Switch>
              <Route exact path="/" component={LinkList} />
              <Route exact path="/create" component={CreateLink} />
            </Switch>
          </div>
        </div>
    )
  }
}

export default App;
