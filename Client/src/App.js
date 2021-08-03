import { BrowserRouter as Router, Route } from 'react-router-dom'
import GoogleButton from './components/Signin/GoogleButton';
import FacebookButton from './components/Signin/FacebookButton';
import RegisterCommonForm from './components/Signin/RegisterCommonForm';
import Login from './components/Login/LoginCommon'

function App() {
  return (
    <Router>
      <Route path='/'>
        <GoogleButton />
        <FacebookButton />
      </Route>
      <Route path='/register'>
      <RegisterCommonForm/>
      </Route>
      <Route path='/login'>
      <Login/>
      </Route>
    </Router>
  );
}

export default App;
