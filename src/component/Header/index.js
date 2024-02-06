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
      {/* For large responsive view */}

      <ul className="different_options_container_responsive">
        <li className="nav_list">
          <Link className="nav_link_responsive" to="/">
            Home
          </Link>
        </li>
        <li className="nav_list">
          <Link className="nav_link_responsive" to="/jobs">
            Jobs
          </Link>
        </li>
        <li className="button_list">
          <button
            type="button"
            onClick={handleOnClick}
            className="icons_responsive"
          >
            Logout
          </button>
        </li>
      </ul>
    </div>
  )
}

export default withRouter(Header)
