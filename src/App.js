import React, { useState, useEffect } from "react";
import ReactDOM from 'react-dom/client';
import PlayerRegistration from './PlayerRegistration';
import {render} from 'react-dom';

import "./App.css";
import "@aws-amplify/ui-react/styles.css";

const App = ({ signOut }) => {

  const root = document.getElementById('root');

  return (
    render(<PlayerRegistration />, root)
  );
};

export default (App);