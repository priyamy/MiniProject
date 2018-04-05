
import React,{Component} from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import {Card, CardTitle} from 'material-ui/Card';
import LinearProgress from 'material-ui/LinearProgress';
import Paper from 'material-ui/Paper';
import { Link } from 'react-router-dom'
//import Grid from "material-ui/Grid";


const style = {
  height: 480,
  width: 500,
  margin: 10,
  display: 'inline-block',
};


var authToken = null;

var url = "https://auth.arisen52.hasura-app.io/v1/login";

var requestOptions = {
    "method": "POST",
    "headers": {
        "Content-Type": "application/json"
    }
};

    export default class Login extends Component {
      state = {
        name:'',
        email:'',
        address:'',
        lat:'',
        lon:'',
        radius:''
      }

   change = (e) => {
     this.setState({
       [e.target.name]: e.target.value
     });
   };

   onSubmit=(e) =>{
     e.preventDefault();
     this.setState({
        name:'',
        email:'',
        address:'',
        lat:'',
        lon:'',
        radius:''
     });
  this.login();
   }

sendSessionID = (sessionid,username) => {
var urlq = "https://data.arisen52.hasura-app.io/v1/query";
var requestOptions = {
   "method": "POST",
   "headers": {"Content-Type": "application/json",
               "Authorization": "Bearer " + sessionid},};
     var body= {
   "type": "update",
   "args": {
       "table": "User_Details",
       "where": {
           "User_Name": {
               "$eq": username }},
       "$set": { "Session_Id": sessionid }}};

     requestOptions.body = JSON.stringify(body);
     fetch(urlq, requestOptions)
     .then((response)=> {
       console.log(response);
       return response.json();
     })
     .then((result)=> {
       //console.log("Token Update",result);
     })
     .catch((error)=> {
       console.log('Request Failed:' + error);
     }); }


login =()=> {
  var url = "https://data.arisen52.hasura-app.io/v1/query";
var requestOptions = {
    "method": "POST",
    "headers": {
        "Content-Type": "application/json",
        "Authorization": "Bearer 1f5686df68a21e8561e899013e40293b4b1b43a53bff2397"
    }
};
  var body = {
    "type": "insert",
    "args": {
        "table": "user",
        "objects": [
            {
                "name": this.state.name,
                "email": this.state.email,
                "address": this.state.address,
                "lat": this.state.lat,
                "lon": this.state.lon,
                "radius": this.state.radius
            }
        ]
    }
};
requestOptions.body = JSON.stringify(body);

fetch(url, requestOptions)
.then(function(response) {
  return response.json();
})
.then(function(result) {
  window.location.href = '/home';
  console.log(result);
})
.catch(function(error) {
  console.log('Request Failed:' + error);
});
}


      render() {
        return(
          <div>

          <Paper style={style} zDepth={3} >
          <Card>
          <LinearProgress mode="indeterminate" />
          <CardTitle
             title="Welcome to Securestan " subtitle="Security and Surveillance of Students" />
          <form noValidate="false" autoComplete="off" >
          <TextField
              name="name"
              hintText="Enter the name"
              floatingLabelText="Name of the Organization"
              floatingLabelfixed={true}
              value={this.state.name}
              onChange={e =>this.change(e)}
          /> <br/>

          <TextField
              name="email"
              hintText="example@example.com"
              floatingLabelText="Email ID"
              floatingLabelfixed={true}
              value={this.state.email}
              onChange={e =>this.change(e)}
          /> <br/>

          <TextField
              name="address"
              hintText="Please enter you address"
              floatingLabelText="Address"
              floatingLabelfixed={true}
              value={this.state.address}
              onChange={e =>this.change(e)}
              
          /> <br/>


          <TextField
              name="lat"
              hintText="Please enter the latitude (deg)"
              floatingLabelText="Latitude"
              floatingLabelfixed={true}
              value={this.state.lat}
              onChange={e =>this.change(e)}
              
          /> <br/>
          <TextField
              name="lon"
              hintText="Please enter the longitude (deg)"
              floatingLabelText="Longitude"
              floatingLabelfixed={true}
              value={this.state.lon}
              onChange={e =>this.change(e)}
              
          /> <br/>
          
          <TextField 
                 name="radius"
                 hintText="Enter the radius of geofence(m)"
                 floatingLabelText="Radius of Geofence"
                 floatingLabelfixed={true}
                 value={this.state.radius}
                 onChange={e =>this.change(e)}
          /><br/>
          <br/>
          <RaisedButton onClick={(e)=>this.onSubmit(e)} label="Deploy Geofence" secondary={true} />

         
          </form>
          <br/>
            <LinearProgress mode="indeterminate" />
          </Card>
          </Paper>
          </div>
        );
      }

  }
