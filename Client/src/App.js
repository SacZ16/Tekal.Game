import { Redirect, Route, Switch } from 'react-router-dom'
import LoginPage from './components/Login/LoginCommon'
import FormData from './components/FormData/formularyData';
import RegisterWithEmail from './components/Signin/RegisterEmail';
import Home from './components/Home/Home'
import FinalGame from './components/Final/Final'
import Game from './components/Game/Game'
import PreFinalGame from './components/Prefinal/Prefinal';
import VerificationEmail from './components/Login/VerificationEmail';
import Verification from './components/Verification/sendEmailVerification';
import ChangePassword from './components/ChangePassword/changePassword'
import ImagePlayer from './components/ImagePLayer/ImagePlayer';


function App() {
  return (
    <>
      <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/login' component={LoginPage} />
        <Route exact path='/register' component={RegisterWithEmail} />
        <Route exact path='/form' component={FormData} />
        <Route exact path='/game' component={Game} />
        <Route exact path='/close' component={FinalGame} />
        <Route exact path='/preclose' component={PreFinalGame} />
        <Route exact path='/forgotPassword' component={VerificationEmail} />
        <Route exact path='/verificationemail' component={Verification} />
        <Route exact path='/passwordchange' component={ChangePassword} />
        <Route exact path='/imageplayer' component={ImagePlayer} />
      </Switch>
    </>
  );
}

export default App;
