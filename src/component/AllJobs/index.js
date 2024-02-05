import './index.css'
import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import JobCard from '../JobCard'
import SearchBar from '../SearchBar'
import ProfileDetail from '../ProfileDetail'
import FilterGroup from '../FilterGroup'

const apiConstant = {
  INITIAL: 'initial',
  SUCCESS: 'success',
  PROGRESS: 'in_progress',
  FAILURE: 'failure',
}
const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

class AllJobs extends Component {
  state = {
    myJobsArray: [],
    // isLoading: true,
    initialSearch: '',
    employmentTypeArray: [],
    currentprocess: apiConstant.INITIAL,
    activeRadioId: 0,
  }

  componentDidMount() {
    this.getAllJobs()
  }

  getAllJobs = async () => {
    const {initialSearch, employmentTypeArray, activeRadioId} = this.state
    console.log(`my array of employment is ${employmentTypeArray.join()}`)
    this.setState({currentprocess: apiConstant.PROGRESS})
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      mathid: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(
      `https://apis.ccbp.in/jobs?employment_type=${employmentTypeArray.join()}&minimum_package=${activeRadioId}&search=${initialSearch}`,
      options,
    )
    const data = await response.json()
    if (response.ok) {
      //   console.log(response, data)
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

  handleFailureButtons = () => this.getAllJobs()

  renderSuccess = () => {
    const {myJobsArray} = this.state
    if (myJobsArray !== 0) {
      return (
        <ul className="list_job_container">
          {myJobsArray.map(each => (
            <JobCard key={each.id} eachItem={each} />
          ))}
        </ul>
      )
    }
    return (
      <div className="failure_container">
        <img
          className="failure_image"
          src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
          alt="no jobs"
        />
        <h1 className="failure_heading">No Jobs Found</h1>
        <p className="failure_desc">
          We could not find any jobs.Try other filters.
        </p>
      </div>
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
        We cannot seems to find the page you are looking for.{' '}
      </p>
      <button
        onClick={this.handleFailureButtons}
        className="find_job_btn"
        type="button"
      >
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

  mySearchButton = () => this.getAllJobs()

  mySearchevent = myValue => this.setState({initialSearch: myValue})

  myEmploymentType = event => {
    if (event.target.checked) {
      this.setState(
        prevState => ({
          employmentTypeArray: [
            ...prevState.employmentTypeArray,
            event.target.value,
          ],
        }),
        this.getAllJobs,
      )
    } else {
      this.setState(
        prevState => ({
          employmentTypeArray: prevState.employmentTypeArray.filter(
            each => each !== event.target.value,
          ),
        }),
        this.getAllJobs,
      )
    }
  }

  mySalaryRangeType = event =>
    this.setState({activeRadioId: event.target.value}, this.getAllJobs)

  render() {
    // const {myJobsArray, isLoading, currentprocess} = this.state
    const {initialSearch, activeRadioId} = this.state
    return (
      <div className="all_jobs_container">
        <Header />

        <SearchBar
          initialSearch={initialSearch}
          mySearchevent={this.mySearchevent}
          mySearchButton={this.mySearchButton}
        />

        <ProfileDetail />
        <FilterGroup
          employmentTypesList={employmentTypesList}
          myEmploymentType={this.myEmploymentType}
          salaryRangesList={salaryRangesList}
          activeRadioId={activeRadioId}
          mySalaryRangeType={this.mySalaryRangeType}
        />

        {/* <div className="render_container"> */}
        {this.renderAllJobs()}
        {/* </div> */}
      </div>
    )
  }
}

export default AllJobs
