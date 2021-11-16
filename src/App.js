import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import './App.css';
import Display from './components/Display';
import Details from './components/Details';


function App() {
  return (
   
      <Router>
        <Switch>
          <Route exact path="/">
            <Display />
          </Route>
          <Route path="/:Id">
            <Details />
          </Route>
        </Switch>
      </Router>
    
  );

}

export default App;
