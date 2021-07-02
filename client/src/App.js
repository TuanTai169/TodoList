
import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Landing from './components/layout/Landing';
import Auth from './views/Auth';

function App() {
  return <Router>
    <Switch>
      <Route exact path='/' component={Landing}/>
      <Route exact path='/login' render={pros => <Auth {...pros} authRoute='login'/>}/>
      <Route exact path='/register' render={pros => <Auth {...pros} authRoute='register'/>}/>
    </Switch>
  </Router>
}

export default App;
