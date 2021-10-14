import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom'
import Grid from '@material-ui/core/Grid';
import {DataGrid} from '@material-ui/data-grid';
import Button from '@material-ui/core/Button';
import Cookies from 'js-cookie';
import {SERVER_URL} from '../constants.js'

// NOTE:  for OAuth security, http request must have
//   credentials: 'include' 
//

//  required properties -  assignment
//  
//  NOTE: because Gradebook is invoked via <Route> in App.js  
//  props are accessed via props.location 
class AddAssignment extends Component {
    constructor(props) {
      super(props);
      console.log("AddAssignment.cnstr "+ JSON.stringify(props.location.assignment));
      this.state = {name: "", course: "", date: "", RTname: "", RTcourse: "", RTdate: ""};
      this.handleName = this.handleName.bind(this);
      this.handleCourse = this.handleCourse.bind(this);
      this.handleDate = this.handleDate.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.addAssign = this.addAssign.bind(this);
    } 
          
   // when submit button pressed, add new assignment.
   addAssign (nameVar, courseVar, dateVar) {
      console.log("AddAssignment.handleSubmit");
      const token = Cookies.get('XSRF-TOKEN');
      
      fetch(`${SERVER_URL}/add?nameAssign=${nameVar}&courseID=${courseVar}&dueDate=${dateVar}` , 
          {  
            method: 'PUT', 
            headers: { 'Content-Type': 'application/json','X-XSRF-TOKEN': token }, 
            credentials: 'include',
            body: JSON.stringify({nameAssign: nameVar, courseID: courseVar, dueDate: dateVar})          
          })
      .then(res => {
          if (res.ok) {
            toast.success("Assignment successfully added", {
            position: toast.POSITION.BOTTOM_LEFT
            });
            //place any calls here --- this.fetchGrades();
          } else {
            toast.error("Assignment add failed", {
            position: toast.POSITION.BOTTOM_LEFT
            });
            console.error('Put http status =' + res.status);            
      }})
        .catch(err => {
          toast.error("Assignment add failed", {
            position: toast.POSITION.BOTTOM_LEFT
          });
          console.error(err);
        });
   };    
          
   //get assignment name entry
    handleName (event) {
      this.setState({name: event.target.value});
    };    

    //get course id entry
    handleCourse (event) {
      this.setState({course: event.target.value});
    };

    //get due date entry
    handleDate (event) {
      this.setState({date: event.target.value});
    };

    handleSubmit(event) {
      event.preventDefault();
      this.addAssign(this.state.name, this.state.course, this.state.date);
    };
 
    render() {     
        return(
            <div className="App">              
              <div style={{ height: 400, width: '100%' }}>
              <br></br>
              <h4>Create New Assignment</h4>
              <form onSubmit={this.handleSubmit}>
                <input type="text"  name="assign" value={this.state.name} placeholder="Assignment Name" onChange={this.handleName}  />
                <br></br><br></br>
                <input type="text"  name="id" value={this.state.course} placeholder="Course ID" onChange={this.handleCourse}  />
                <br></br><br></br>
                <input type="text"  name="date" value={this.state.date} placeholder="Due Date" onChange={this.handleDate}  />
                <br></br><br></br>
                <Button type="submit" variant="outlined" color="primary" style={{margin: 10}}>
                  Submit
                </Button>
                </form>                           
                <Button component={Link} to={{pathname:'/'}} variant="outlined" color="primary" 
                  style={{margin: 10}}>
                  Assignments
                </Button>
              </div>
              <ToastContainer autoClose={1500} />   
            </div>
            ); 
        };
}//END CLASS AddAssignment

 // check on properties.  location.assignment must exist  
AddAssignment.propTypes = {
  location: (properties, propertyName, componentName) => {
      if ( properties.location.assignment == undefined ) {
        return new Error('AddAssignment missing required property assignment.');
    }
  }
}

export default AddAssignment;