import './index.css'

const FilterGroup = props => {
  const {
    employmentTypesList,
    myEmploymentType,
    salaryRangesList,
    activeRadioId,
    mySalaryRangeType,
  } = props
  const handleEmploymentType = event => {
    myEmploymentType(event)
    // console.log(event.target.value)
  }

  const handleSalaryRange = event => {
    console.log(event.target.value)
    mySalaryRangeType(event)
  }

  return (
    <div className="filter_container">
      <hr className="horizontal_line" />
      <h1 className="title_heading_filter">Type of Employment</h1>
      <ul>
        {employmentTypesList.map(each => (
          <li key={each.employmentTypeId}>
            <input
              onChange={handleEmploymentType}
              value={each.employmentTypeId}
              type="checkbox"
            />
            <label className="title_heading_label">{each.label}</label>
          </li>
        ))}
      </ul>
      <hr className="horizontal_line" />
      <h1 className="title_heading_filter">Salary Range</h1>
      <ul>
        {salaryRangesList.map(each => (
          <li key={each.salaryRangeId}>
            <input
              name={each.label}
              checked={activeRadioId === each.salaryRangeId}
              onChange={handleSalaryRange}
              value={each.salaryRangeId}
              type="radio"
            />
            <label className="title_heading_label">{each.label}</label>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default FilterGroup
