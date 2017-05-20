import { observable, action, extendObservable } from 'mobx'
import axios from 'axios'

export default class AppState {
  @observable toLogin
  @observable authenticated
  @observable authenticating
  @observable items
  @observable item
  @observable user

  @observable testval

  constructor() {
    this.toLogin = false
    this.authenticated = false
    this.authenticating = false
    this.items = []
    this.item = {}
    this.user = { username: 'anonymous' }

    this.testval = 'Cobbled together by '
  }

  async fetchData(pathname, id) {
    let { data } = await axios.get(
      `https://jsonplaceholder.typicode.com${pathname}`
    )
    console.log(data)
    data.length > 0 ? this.setData(data) : this.setSingle(data)
  }

  fetchUser() {
    axios.get('http://localhost:3000/api/user').then(res => {
      console.log('fetched user: ', res.data)
      this.setUser(res.data || { username: 'anonymous' })
    })
  }

  @action setUser(user) {
    this.user = user
    console.log('stored user: ', this.user)
    this.authenticated = this.user.username != 'anonymous'
  }

  @action setData(data) {
    this.items = data
  }

  @action setSingle(data) {
    this.item = data
  }

  @action clearItems() {
    this.items = []
    this.item = {}
  }

  @action async login(usernameAndPassword) {
    let { data } = await axios.post(
      'http://localhost:3000/api/auth/login',
      usernameAndPassword
    )
    console.log('login: ', data)
    this.setUser(data)
    this.authenticating = false
  }

  @action async logout() {
    let { data } = await axios.post('http://localhost:3000/api/auth/logout', {})
    console.log('logout: ', data)
    this.authenticated = !(data == 'ok')
  }
}
