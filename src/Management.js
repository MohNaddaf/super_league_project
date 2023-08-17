import { withAuthenticator} from '@aws-amplify/ui-react'
import {React, useState, useEffect} from 'react'
import { Auth } from 'aws-amplify'
import Referee from './Referee';


function Management () { 
  const [isRef, setRef] = useState(false);  
  const [isAdmin, setAdmin] = useState(false);

  useEffect(() => {
    getAuthentication();
  }, []);

  const getAuthentication = () => {
    Auth.currentAuthenticatedUser().then((response) => {
      var isReferee = response.signInUserSession.accessToken.payload['cognito:groups'].includes('Refs');
      var isAdmininstrator = response.signInUserSession.accessToken.payload['cognito:groups'].includes('admin');
      setRef(isReferee);      
      setAdmin(isAdmininstrator);      
    });    
  };

  return (            
    <div id="management">
      {isRef && (<Referee/>)}
      {isAdmin && (<Referee/>)}      
    </div>
  )  
}

export default withAuthenticator(Management)