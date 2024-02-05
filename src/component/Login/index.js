import {Component} from 'react'
import './index.css'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'

class Login extends Component {
  state = {userName: '', userPassword: '', errorMessage: '', isLoading: false}

  //   componentDidMount() {
  //     this.getlogin()
  //   }

  errorMsg = error => this.setState({errorMessage: error, isLoading: true})

  handleSubmit = event => {
    event.preventDefault()
    this.getlogin()
    this.setState({userName: '', userPassword: ''})
  }

  getlogin = async () => {
    const {userName, userPassword} = this.state
    const {history} = this.props
    const userDetails = {
      username: userName,
      password: userPassword,
    }
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    const response = await fetch('https://apis.ccbp.in/login', options)
    const data = await response.json()
    // console.log(response, data)
    const jwtToken = data.jwt_token
    if (response.ok) {
      this.setState({isLoading: false})
      Cookies.set('jwt_token', jwtToken, {expires: 30})
      history.replace('/')
    } else {
      this.errorMsg(data.error_msg)
    }
  }

  handleUserName = event => {
    this.setState({userName: event.target.value})
  }

  handleUserPassword = event => {
    this.setState({userPassword: event.target.value})
  }

  render() {
    const {userName, userPassword, errorMessage, isLoading} = this.state
    const Token = Cookies.get('jwt_token')
    console.log(Token)

    if (Token !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="login_container">
        <form onSubmit={this.handleSubmit} className="form_container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="main_logo"
          />
          <label htmlFor="userName" className="label_for_input">
            USERNAME
          </label>
          <input
            onChange={this.handleUserName}
            value={userName}
            id="userName"
            type="text"
            placeholder="Username"
            className="input_field"
          />
          <label htmlFor="userPassword" className="label_for_input">
            PASSWORD
          </label>
          <input
            onChange={this.handleUserPassword}
            value={userPassword}
            id="userPassword"
            type="password"
            placeholder="Password"
            className="input_field"
          />
          <button type="submit" className="login_btn">
            Login
          </button>
          {isLoading && <p className="incorrect">{errorMessage}</p>}
        </form>
      </div>
    )
  }
}

export default Login
