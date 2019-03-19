import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";


import './App.css';

import axios from 'axios';
import Login from "./Login";

import DoctorDashboard from './doctor-components/DoctorDashboard';
import UserDashboard from './user-components/UserDashboard';

class App extends Component {
  
  state = {
    contacts: []
  };
  
  componentDidMount() {
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then(response => {

        // create an array of contacts only with relevant data
        const newContacts = response.data.map(c => {
          return {
            id: c.id,
            name: c.name
          };
        });

        // create a new "State" object without mutating 
        // the original State object. 
        const newState = Object.assign({}, this.state, {
          contacts: newContacts
        });

        // store the new state object in the component's state
        this.setState(newState);
      })
      .catch(error => console.log(error));
  }
  
  render() {
    return (
      <Router>
      <div className="App">
        <Login/>
      </div>
        <div>
          <ul>
            <li>
              <Link to="/user-dashboard">UserDashboard</Link>
            </li>
            <li>
              <Link to="/doctor-dashboard">DoctorDashboard</Link>
            </li>
          </ul>
          <hr/>
  
          <Route path="/user-dashboard" component={UserDashboard} />
          <Route path="/doctor-dashboard" component={DoctorDashboard} />
        </div>
      </Router>
    );
  }
}

export default App;