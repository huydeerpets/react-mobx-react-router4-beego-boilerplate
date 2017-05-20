import React, { Component } from 'react'
import { autobind } from 'core-decorators'
import { inject, observer } from 'mobx-react'
import { Link, Redirect, withRouter } from 'react-router-dom'

import TopNav from './TopNav'
import Button from './ui/Button'

@withRouter
@inject('store')
@observer
@autobind
export default class TopBar extends Component {
  constructor(props) {
    super(props)
    this.store = this.props.store.appState
  }

  authenticate(e) {
    if (e) e.preventDefault()
    console.log('CLICKED BUTTON')
    this.store.toLogin = true
  }

  render() {
    const { authenticated } = this.store
    return (
      <div className="topbar">
        <TopNav location={this.props.location} />
        {this.store.authenticated &&
          <span style={{ marginRight: '1em' }}>
            logged in as {this.store.user.username}
          </span>}
        <Button
          onClick={
            authenticated
              ? () => {
                  this.store.logout()
                }
              : () => {
                  this.authenticate()
                }
          }
          title={authenticated ? 'Log out' : 'Sign in'}
        />
        {this.store.toLogin && <Redirect to="/login" />}
      </div>
    )
  }
}
