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
class GetGrades extends Component {
    constructor(props) {
      super(props);
      console.log("AddAssignment.cnstr "+ JSON.stringify(props.location.assignment));
      this.state = {name: ""};    
      this.handleID = this.handleID.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.state = { rows :  [] };
    } 
          
    // when submit button pressed, add new assignment.
    getGrade (nameVar) {
        console.log("GetGrades.handleSubmit");
        const token = Cookies.get('XSRF-TOKEN');
      
    fetch(`${SERVER_URL}/getStudentGrade/${nameVar}` , 
        {  
            method: 'GET', 
            headers: { 'Content-Type': 'application/json','X-XSRF-TOKEN': token }, 
            credentials: 'include'                     
        })
    .then((response) => response.json())
    .then((responseData) => {
        if (Array.isArray(responseData.grades)) {
            this.setState({
                rows: responseData.grades.map((row,index) => {
                    return {id:index, ...row};
                })
            });
        } else {
            toast.error("Fetch failed", {
                position: toast.POSITION.BOTTOM_LEFT
            });
        }
    })      
    .catch(err => {
        toast.error("Get Grade failed", {
            position: toast.POSITION.BOTTOM_LEFT
        });
        console.error(err);
    })
   }    
          
   //get assignment ID entry
    handleID (event) {
      this.setState({name: event.target.value});
    };   

    handleSubmit(event) {
      event.preventDefault();
      this.getGrade(this.state.name);
    };
 
    render() {     
        const columns = [
            { field: 'name', headerName: 'Name', width: 250 },
            { field: 'email', headerName: 'Email', width: 250},
            { field: 'grade', headerName: 'Grade', width: 150 , editable:true}
        ];

        const assignment = this.props.location.assignment;
        
        return(
            <div className="App">              
              <div style={{ height: 400, width: '100%' }}>
              <br></br>
              <h4>Enter Assignment ID To Get Your Grade</h4>
              <form onSubmit={this.handleSubmit}>
                <input type="text"  name="assign" value={this.state.name} placeholder="Assignment ID" onChange={this.handleID}  />
                <br></br><br></br>                
                <Button type="submit" variant="outlined" color="primary" style={{margin: 10}}>
                  Submit
                </Button>
               </form>                          
                
              </div>
              <ToastContainer autoClose={1500} />   
            </div>
            ); 
        };
}//END CLASS GetGrades

export default GetGrades;