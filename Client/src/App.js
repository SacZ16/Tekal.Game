import { BrowserRouter as Router, Route } from 'react-router-dom'
import LoginPage from './components/Login/LoginCommon'
import FormData from './components/FormData/formularyData';
import RegisterWithEmail from './components/Signin/RegisterEmail';


function App() {
  return (
    <Router>
      <Route path='/login'>
        <LoginPage/>
      </Route>
      <Route exact path='/register'>
        <RegisterWithEmail />
      </Route>
      <Route exact path='/form'>
      <FormData/>
      </Route>
    </Router>
  );
}

export default App;
