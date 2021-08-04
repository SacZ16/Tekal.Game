import { BrowserRouter as Router, Route } from 'react-router-dom'
import GoogleButton from './components/Signin/GoogleButton';
import FacebookButton from './components/Signin/FacebookButton';
import RegisterCommonForm from './components/Signin/RegisterCommonForm';
import LoginPage from './components/Login/LoginCommon'
import FormData from './components/FormData/formularyData';



function App() {
  return (
    <Router>
      <Route path='/login'>
        <LoginPage/>
      </Route>
      <Route exact path='/register'>
        <RegisterCommonForm/>
        <FormData />
      </Route>
    </Router>
  );
}

export default App;
