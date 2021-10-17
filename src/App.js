import './App.css';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Login from './components/Login';
import Gradebook from './components/Gradebook';
import Assignment from './components/Assignment';
import AddAssignment from './components/AddAssignment';
import GetGrades from './components/GetGrades';
import {BrowserRouter, Switch, Route} from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <AppBar position="static" color="default">
        <Toolbar>
           <Typography variant="h6" color="inherit">
            Gradebook
           </Typography>
        </Toolbar>
      </AppBar>
      <BrowserRouter>
       <Switch>
        <Route exact path='/' component={Login} />
        <Route exact path='/assignment' component={Assignment} />
        <Route path='/gradebook' component={Gradebook} />
        <Route path='/add' component={AddAssignment} />
        <Route path='/getStudentGrade' component={GetGrades} />
       </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
