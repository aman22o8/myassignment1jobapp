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
    Cookies.remove('JWTtoken')
    history.replace('./login')
  }
  return (
    <div className="header_container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
        alt="website logo"
        className="header_logo"
      />
      <div className="different_options_container">
        <Link className="nav_link" to="/">
          <AiFillHome className="icons" />
        </Link>
        <Link className="nav_link" to="/jobs">
          <BsBriefcaseFill className="icons" />
        </Link>
        <IoIosLogOut onClick={handleOnClick} className="icons" />
      </div>
    </div>
  )
}

export default withRouter(Header)
