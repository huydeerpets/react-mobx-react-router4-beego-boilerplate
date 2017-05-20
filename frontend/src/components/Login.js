import React, { Component } from 'react'
import { autobind } from 'core-decorators'
import { inject, observer } from 'mobx-react'
import { Redirect } from 'react-router-dom'

@inject('store')
@observer
@autobind
export default class Login extends Component {
  constructor(props) {
    super(props)
    this.store = this.props.store.appState
    this.state = { username: '', password: '' }
  }

  setUsername(e) {
    this.setState({ username: e.target.value })
  }

  setPassword(e) {
    this.setState({ password: e.target.value })
  }

  render() {
    return (
      <div className="page login">
        {!this.store.authenticated &&
          <form method="post" action="javascript:;">
            <input
              type="text"
              name="username"
              value={this.state.username}
              onChange={this.setUsername}
            />
            <input
              type="password"
              name="password"
              value={this.state.password}
              onChange={this.setPassword}
            />
            <button
              onClick={() => {
                this.store.login(this.state)
              }}
            >
              log me in
            </button>
          </form>}
        {this.props.store.authenticated &&
          !this.props.store.authenticating &&
          <Redirect to="/" />}
      </div>
    )
  }
}
