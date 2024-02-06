import './index.css'

import {MdLocationOn} from 'react-icons/md'
import {FaStar} from 'react-icons/fa'
import {BsBriefcaseFill} from 'react-icons/bs'

const SimilarCard = props => {
  const {eachItem} = props
  const {
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    rating,
    title,
  } = eachItem
  return (
    <li className="similar_cards_container">
      <div className="card_header">
        <img
          src={companyLogoUrl}
          alt="similar job company logo"
          className="card_job_logo"
        />
        <div>
          <h1 className="title_heading">{title}</h1>
          <div className="rating_container">
            <FaStar className="stars" />
            <p className="title_rating">{rating}</p>
          </div>
        </div>
      </div>

      {/* <hr className="horizontal_line" /> */}
      <div className="card_footer">
        <h1 className="desc_heading">Description</h1>
        <p className="title_heading">{jobDescription}</p>
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
        {/* <p className="lpa_heading">aman</p> */}
      </div>
    </li>
  )
}

export default SimilarCard
