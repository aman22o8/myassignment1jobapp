import './index.css'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import {Component} from 'react'

const apiConstant = {
  INITIAL: 'initial',
  SUCCESS: 'success',
  PROGRESS: 'in_progress',
  FAILURE: 'failure',
}

class ProfileDetail extends Component {
  state = {
    ininialprofile: {},

    currentprocess: apiConstant.INITIAL,
  }

  componentDidMount() {
    this.getMyProfile()
  }

  getMyProfile = async () => {
    this.setState({currentprocess: apiConstant.PROGRESS})
    const jwtToken = Cookies.get('JWTtoken')
    const options = {
      mathid: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch('https://apis.ccbp.in/profile', options)
    const data = await response.json()
    if (response.ok) {
      console.log(response, data)
      const updatedProfile = {
        name: data.profile_details.name,
        profileImageUrl: data.profile_details.profile_image_url,
        shortBio: data.profile_details.short_bio,
      }
      this.setState({
        ininialprofile: updatedProfile,
        currentprocess: apiConstant.SUCCESS,
      })
    } else {
      this.setState({currentprocess: apiConstant.FAILURE})
    }
  }

  renderSuccess = () => {
    const {ininialprofile} = this.state
    const {name, profileImageUrl, shortBio} = ininialprofile
    return (
      <div className="profile_container">
        <img src={profileImageUrl} alt="profile" className="profile_logo" />
        <h1 className="profile_name">{name}</h1>
        <p className="profile_bio">{shortBio}</p>
      </div>
    )
  }

  renderLoading = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderFailure = () => (
    <button className="failure_profile_btn" type="button">
      Retry
    </button>
  )

  renderProfile = () => {
    const {currentprocess} = this.state
    switch (currentprocess) {
      case apiConstant.SUCCESS:
        return this.renderSuccess()
      case apiConstant.PROGRESS:
        return this.renderLoading()
      case apiConstant.FAILURE:
        return this.renderFailure()

      default:
        return null
    }
  }

  render() {
    return <div className="profile_container">{this.renderProfile()}</div>
  }
}

export default ProfileDetail
