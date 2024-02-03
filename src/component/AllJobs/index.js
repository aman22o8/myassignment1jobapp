import './index.css'
import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import JobCard from '../JobCard'
import ProfileDetail from '../ProfileDetail'

const apiConstant = {
  INITIAL: 'initial',
  SUCCESS: 'success',
  PROGRESS: 'in_progress',
  FAILURE: 'failure',
}

class AllJobs extends Component {
  state = {
    myJobsArray: [],
    // isLoading: true,
    currentprocess: apiConstant.INITIAL,
  }

  componentDidMount() {
    this.getAllJobs()
  }

  getAllJobs = async () => {
    this.setState({currentprocess: apiConstant.PROGRESS})
    const jwtToken = Cookies.get('JWTtoken')
    const options = {
      mathid: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch('https://apis.ccbp.in/jobs', options)
    const data = await response.json()
    if (response.ok) {
      console.log(response, data)
      const updatedList = data.jobs.map(each => ({
        companyLogoUrl: each.company_logo_url,
        employmentType: each.employment_type,
        id: each.id,
        jobDescription: each.job_description,
        location: each.location,
        packagePerAnnum: each.package_per_annum,
        rating: each.rating,
        title: each.title,
      }))
      this.setState({
        myJobsArray: updatedList,
        currentprocess: apiConstant.SUCCESS,
      })
    } else {
      this.setState({currentprocess: apiConstant.FAILURE})
    }
  }

  renderSuccess = () => {
    const {myJobsArray} = this.state
    return (
      <ul className="list_job_container">
        {myJobsArray.map(each => (
          <JobCard key={each.id} eachItem={each} />
        ))}
      </ul>
    )
  }

  renderLoading = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderFailure = () => (
    <div className="failure_container">
      <img
        className="failure_image"
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
      />
      <h1 className="failure_heading">Oops! Something Went Wrong</h1>
      <p className="failure_desc">
        We cannot seems to fing the page you are looking for.{' '}
      </p>
      <button className="find_job_btn" type="button">
        Retry
      </button>
    </div>
  )

  renderAllJobs = () => {
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
    // const {myJobsArray, isLoading, currentprocess} = this.state

    return (
      <div className="all_jobs_container">
        <Header />
        <ProfileDetail />

        {/* <div className="render_container"> */}
        {this.renderAllJobs()}
        {/* </div> */}
      </div>
    )
  }
}

export default AllJobs
