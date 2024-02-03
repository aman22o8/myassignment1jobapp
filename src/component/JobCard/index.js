import './index.css'
import {Link} from 'react-router-dom'
import {MdLocationOn} from 'react-icons/md'
import {FaStar} from 'react-icons/fa'
import {BsBriefcaseFill} from 'react-icons/bs'

const JobCard = props => {
  const {eachItem} = props
  const {
    companyLogoUrl,
    employmentType,
    id,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
  } = eachItem
  return (
    <Link className="nav_link_" to={`/jobs/${id}`}>
      <div className="card_header">
        <img
          src={companyLogoUrl}
          alt="company logo"
          className="card_job_logo"
        />
        <div>
          <p className="title_heading">{title}</p>
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
        <h1 className="desc_heading">Description</h1>
        <p className="title_heading">{jobDescription}</p>
      </div>
    </Link>
  )
}

export default JobCard
