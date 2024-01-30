import './index.css'
import {Link} from 'react-router-dom'
import Header from '../Header'

const Home = () => (
  <div className="home_container">
    <Header />
    <div className="footer">
      <h1 className="home_main_heading">Find The Job That Fits Your Life</h1>
      <p className="home_desc">
        Millions of people are searching for jobs,salary information,company
        reviews. Find the jobs that fits your abilities and potential.{' '}
      </p>
      <Link className="nav_link" to="/jobs">
        <button className="find_job_btn" type="button">
          Find Jobs
        </button>
      </Link>
    </div>
  </div>
)

export default Home
