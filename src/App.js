import React, { useState, useEffect } from "react";
import ReactDOM from 'react-dom/client';
import {render} from 'react-dom';
import "./App.css";
import "@aws-amplify/ui-react/styles.css";
import { Auth } from 'aws-amplify'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Redirect,
} from "react-router-dom";

import Management from './Management'
import PlayerRegistration from './PlayerRegistration';
import Rosters from './Rosters';

const App = ({ signOut }) => {

  const root = document.getElementById('root');

  return (
    <>
      <Router>
        <Routes>                             
          <Route path='/PlayerRegistration' element={<PlayerRegistration/>} />
          <Route path='/Rosters' element={<Rosters/>} />
          <Route path='/Management' element={<Management/>} />       
          <Route to="/" />
        </Routes>
      </Router>
    </>
  );
};

export default (App);