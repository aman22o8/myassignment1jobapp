import './index.css'

const NotFound = () => (
  <div className="not_found_container">
    <img
      className="not_found_image"
      src="https://assets.ccbp.in/frontend/react-js/jobby-app-not-found-img.png"
      alt="not found"
    />
    <h1 className="heading_not_found">Page Not Found</h1>
    <p className="desc_not_found">
      We are sorry, the page you requested could not be found
    </p>
  </div>
)

export default NotFound
