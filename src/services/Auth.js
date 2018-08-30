import axios from "axios";

export default class Auth {
  constructor() {
    axios.defaults.baseURL = 'http://localhost:8000/api/'
    this.setAuthorizationHeader()
    
  }

  isAuthenticated() {
    return localStorage.getItem('token')
  }

  logout() {
    localStorage.removeItem('token')
  }

  login(email, password) {
    return axios.post('auth/login', {email, password})
    .then((response) => {
      localStorage.setItem('token', response.data.access_token)
      //window.localStorage  //istu stvar radi ali je onako krace
      this.setAuthorizationHeader()
    })
  }

  setAuthorizationHeader() {
    const token = localStorage.getItem('token');
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
  }
}

export const authService = new Auth()