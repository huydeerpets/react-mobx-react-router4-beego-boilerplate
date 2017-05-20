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

    this.testval = 'Original cobbled together by '
    this.enhanceval = 'enhanced with go backend support by '
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
      this.setUser(res.data || { username: 'anonymous' })
    })
  }

  @action setUser(user) {
    this.user = user
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
    this.setUser(data)
    this.authenticating = false
  }

  @action async logout() {
    let { data } = await axios.post('http://localhost:3000/api/auth/logout', {})
    this.authenticated = !(data == 'ok')
  }
}
