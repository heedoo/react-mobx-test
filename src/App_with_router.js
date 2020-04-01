import React from 'react';
import Main from './main/main';
import { Switch, Route } from 'react-router-dom';

export default class App extends React.Component {
  render() {
    return (
      <div>
        <Switch>
          <Route exact path="/">
            <Main />
          </Route>
        </Switch>
      </div>
    );
  }
}
