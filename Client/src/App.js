import { Route, Switch } from 'react-router-dom'
import LoginPage from './components/Login/LoginCommon'
import FormData from './components/FormData/formularyData';
import RegisterWithEmail from './components/Signin/RegisterEmail';
import Home from './components/Home/Home'
import FinalGame from './components/Final/Final'
import Game from './components/Game/Game'

function App() {
  return (
    <>
      <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/login' component={LoginPage} />
        <Route exact path='/register' component={RegisterWithEmail} />
        <Route exact path='/form' component={FormData} />
        <Route path='/game' component={Game} />
        <Route path='/close' component={FinalGame} />
      </Switch>
    </>
  );
}

export default App;
