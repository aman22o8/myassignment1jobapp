import './index.css'
import {Link, withRouter} from 'react-router-dom'
import {AiFillHome} from 'react-icons/ai'
import {IoIosLogOut} from 'react-icons/io'
import {BsBriefcaseFill} from 'react-icons/bs'
import Cookies from 'js-cookie'

const Header = props => {
  const {history} = props
  const handleOnClick = () => {
    // console.log(history)
    Cookies.remove('jwt_token')
    history.replace('./login')
  }
  return (
    <div className="header_container">
      <Link to="/" className="nav_link">
        <img
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          alt="website logo"
          className="header_logo"
        />
      </Link>
      <ul className="different_options_container">
        <li>
          <Link className="nav_link" to="/">
            <AiFillHome className="icons" />
          </Link>
        </li>
        <li>
          <Link className="nav_link" to="/jobs">
            <BsBriefcaseFill className="icons" />
          </Link>
        </li>
        <li>
          <IoIosLogOut onClick={handleOnClick} className="icons" />
        </li>
      </ul>
    </div>
  )
}

export default withRouter(Header)
