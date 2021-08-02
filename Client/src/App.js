import { BrowserRouter as Router, Route } from 'react-router-dom'
import GoogleButton from './components/Login/GoogleButton';
import FacebookButton from './components/Login/FacebookButton';

function App() {
  return (
    <Router>
      <Route path='/'>
        <GoogleButton />
        <FacebookButton />
      </Route>
    </Router>
  );
}

export default App;
