import './App.css'
import {Switch, Route, Redirect} from 'react-router-dom'
import ProtectedRoute from './component/ProtectedRoute'
import Login from './component/Login'
import Home from './component/Home'
import AllJobs from './component/AllJobs'
import DetailsJobs from './component/DetailsJobs'
import NotFound from './component/NotFound'

// These are the lists used in the application. You can move them to any component needed.
/*
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
*/

/*
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
*/

// Replace your code here
const App = () => (
  <div className="main_container">
    <Switch>
      <Route path="/login" component={Login} />
      <ProtectedRoute exact path="/" component={Home} />
      <ProtectedRoute exact path="/jobs" component={AllJobs} />
      <ProtectedRoute exact path="/jobs/:id" component={DetailsJobs} />
      <Route path="/not-found" component={NotFound} />
      <Redirect to="not-found" />
    </Switch>
  </div>
)

export default App
