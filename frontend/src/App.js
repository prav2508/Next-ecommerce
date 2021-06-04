import { BrowserRouter as Router, Link, Route, Switch,Redirect } from "react-router-dom";
import './App.css';

import Home from './components/home';
import Login from './components/login';
import Logout from './components/logout';

function App() {
  return (


    
    <div className="container-fluid p-0">
    
      <Router>
        <Switch>
        <Route path="/login" component={Login} />
        <Route path="/home" component={Home} />
        <Route path="/logout" component={Logout} />
    
         
          
        </Switch>

      </Router>
     
    </div>
  );
}

export default App;
