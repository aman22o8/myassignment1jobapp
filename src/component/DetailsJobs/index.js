import './index.css'
import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {MdLocationOn} from 'react-icons/md'
import {FaStar} from 'react-icons/fa'
import {BsBriefcaseFill} from 'react-icons/bs'
import {FiExternalLink} from 'react-icons/fi'
import SimilarCard from '../SimilarCard'
import Header from '../Header'

const apiConstant = {
  INITIAL: 'initial',
  SUCCESS: 'success',
  PROGRESS: 'in_progress',
  FAILURE: 'failure',
}

class DetailsJobs extends Component {
  state = {
    myDetailsJobsArray: {},
    // isLoading: true,
    currentprocess: apiConstant.INITIAL,
  }

  componentDidMount() {
    this.getAllJobs()
  }

  getAllJobs = async () => {
    this.setState({currentprocess: apiConstant.PROGRESS})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      mathid: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(`https://apis.ccbp.in/jobs/${id}`, options)
    const data = await response.json()
    if (response.ok) {
      console.log(data)
      const updatedjobDetails = {
        companyLogoUrl: data.job_details.company_logo_url,
        companyWebsiteUrl: data.job_details.company_website_url,
        employmentType: data.job_details.employment_type,
        id: data.job_details.id,
        jobDescription: data.job_details.job_description,
        lifeAtCompany: {
          description: data.job_details.life_at_company.description,
          imageUrl: data.job_details.life_at_company.image_url,
        },
        location: data.job_details.location,
        packagePerAnnum: data.job_details.package_per_annum,
        rating: data.job_details.rating,
        title: data.job_details.title,
        skills: data.job_details.skills.map(eachItem => ({
          imageUrl: eachItem.image_url,
          name: eachItem.name,
        })),
        similarJobs: data.similar_jobs.map(each => ({
          companyLogoUrl: each.company_logo_url,
          employmentType: each.employment_type,
          id: each.id,
          jobDescription: each.job_description,
          location: each.location,
          rating: each.rating,
          title: each.title,
        })),
      }
      console.log(updatedjobDetails)

      this.setState({
        myDetailsJobsArray: updatedjobDetails,
        currentprocess: apiConstant.SUCCESS,
      })
    } else {
      this.setState({currentprocess: apiConstant.FAILURE})
    }
  }

  handleFailureDetailsJob = () => this.getAllJobs()

  renderSuccess = () => {
    const {myDetailsJobsArray} = this.state
    const {
      companyLogoUrl,
      companyWebsiteUrl,
      employmentType,
      //   id,
      jobDescription,
      lifeAtCompany,
      location,
      packagePerAnnum,
      rating,
      title,
      skills,
      similarJobs,
    } = myDetailsJobsArray
    return (
      <div className="details_job_main_container">
        <Header />
        <div className="job_details_container">
          <div className="card_header">
            <img src={companyLogoUrl} alt={title} className="card_job_logo" />
            <div>
              <h1 className="title_heading">{title}</h1>
              <div className="rating_container">
                <FaStar className="stars" />
                <p className="title_rating">{rating}</p>
              </div>
            </div>
          </div>
          <div className="card_middle">
            <div className="for_loaction_container">
              <div className="location_container">
                <MdLocationOn className="location_interntype" />
                <p className="location_intern_type">{location}</p>
              </div>
              <div className="location_container">
                <BsBriefcaseFill className="location_interntype" />
                <p className="location_intern_type">{employmentType}</p>
              </div>
            </div>
            <p className="lpa_heading">{packagePerAnnum}</p>
          </div>
          <hr className="horizontal_line" />
          <div className="card_footer">
            <div className="desc_link_container">
              <h1 className="desc_heading">Description</h1>
              <a
                target="_blank"
                className="visit_link"
                href={companyWebsiteUrl}
                rel="noreferrer"
              >
                Visit
                <FiExternalLink height={30} width={30} />
              </a>
            </div>
            <p className="title_heading">{jobDescription}</p>
            <h1 className="skill_heading">Skills</h1>
            <ul className="skill_container">
              {skills.map(each => (
                <li key={each.name} className="each_skill_list">
                  <img
                    src={each.imageUrl}
                    alt={each.name}
                    className="skill_logo"
                  />
                  <p className="skill_heading">{each.name}</p>
                </li>
              ))}
            </ul>
            <h1 className="life_at_company_heading">Life at Company</h1>
            <p className="life_at_company_heading_desc">
              {lifeAtCompany.description}
            </p>
            <img
              src={lifeAtCompany.imageUrl}
              alt="life at company"
              className="life_at_company_image"
            />
          </div>
        </div>
        <h1 className="similar_job">Similar Jobs</h1>
        <ul className="list_job_container">
          {' '}
          {similarJobs.map(each => (
            <SimilarCard key={each.id} eachItem={each} />
          ))}
        </ul>
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
        We cannot seem to find the page you are looking for.{' '}
      </p>
      <button
        onClick={this.handleFailureDetailsJob}
        className="find_job_btn"
        type="button"
      >
        Retry
      </button>
    </div>
  )

  renderDetailsJobs = () => {
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
        {/* <Header /> */}

        {/* <div className="render_container"> */}
        {this.renderDetailsJobs()}
        {/* </div> */}
      </div>
    )
  }
}

export default DetailsJobs
