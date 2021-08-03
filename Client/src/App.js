import { BrowserRouter as Router, Route } from 'react-router-dom'
import GoogleButton from './components/Signin/GoogleButton';
import FacebookButton from './components/Signin/FacebookButton';
import LoginCommon from './components/Login/LoginCommon';


function App() {
  return (
    <Router>
      <Route path='/login'>
        <LoginCommon />
      </Route>
      <Route exact path='/'>
        <GoogleButton />
        <FacebookButton />
      </Route>
    </Router>
  );
}

export default App;
