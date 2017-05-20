import React, { Component } from 'react'
import { Route, Link } from 'react-router-dom'
import { inject, observer } from 'mobx-react'
import LazyRoute from 'lazy-route'
import DevTools from 'mobx-react-devtools'

import TopBar from './TopBar'

@inject('store')
@observer
export default class App extends Component {
  constructor(props) {
    super(props)
    this.store = this.props.store
  }

  componentDidMount() {}

  render() {
    this.store.appState.fetchUser()
    const {
      authenticated,
      authenticating,
      timeToRefresh,
      refreshToken,
      testval,
      enhanceval
    } = this.store.appState
    return (
      <div className="wrapper">
        {/*<DevTools />*/}
        <TopBar />

        <Route
          exact
          path="/"
          render={props => (
            <LazyRoute {...props} component={import('./Home')} />
          )}
        />
        <Route
          exact
          path="/posts"
          render={props => (
            <LazyRoute {...props} component={import('./SubPage')} />
          )}
        />
        <Route
          exact
          path="/posts/:id"
          render={props => (
            <LazyRoute {...props} component={import('./SubItem')} />
          )}
        />
        <Route
          exact
          path="/login"
          render={props => (
            <LazyRoute {...props} component={import('./Login')} />
          )}
        />
        <footer>
          {testval}
          <a href="https://twitter.com/mhaagens" target="_blank">
            @mhaagens
          </a>
          {' '}
          | github:
          {' '}
          <a href="https://github.com/mhaagens" target="_blank">
            mhaagens
          </a>
          &nbsp;
          {enhanceval}
          <a href="https://twitter.com/torstenhein" target="_blank">
            @torstenhein
          </a>
          &nbsp;
          | github:
          {' '}
          <a href="https://github.com/tozzr" target="_blank">
            tozzr
          </a>
        </footer>
      </div>
    )
  }
}
