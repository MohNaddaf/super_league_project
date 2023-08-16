import React, { useState, useEffect } from "react";
import "./Referee.css";
import "@aws-amplify/ui-react/styles.css";
import { API } from "aws-amplify";
import {
  Button,
  Flex,
  Heading,
  Text,
  TextField,
  View,
  SelectField,
  CheckboxField
} from "@aws-amplify/ui-react";

import { listRegisteredTeams } from "./graphql/queries";
import {
  createRegisteredPlayers as createRegisteredPlayerMutation
} from "./graphql/mutations";


const Referee = ({ signOut }) => {

  const [value, setValue] = React.useState('')

  const handleChange = (newValue) => {
    setValue(newValue)
  }

  const [teams, setTeams] = useState([]);
  const [checked, setChecked] = React.useState(false);
  const [hasError, setHasError] = React.useState(false);
  useEffect(() => {
    fetchTeams();
  }, []);

  async function fetchTeams() {
    const apiData = await API.graphql({ query: listRegisteredTeams });
    const teamsFromAPI = apiData.data.listRegisteredTeams.items;
    setTeams(teamsFromAPI);
    createTeams(teamsFromAPI);
  }

  function createTeams(teams){    
      var str="<option value=0>SELECT YOUR TEAM</option>";
      var currentYear = new Date().getFullYear();
      for (var i = 0; i < teams.length; i++){
        var team = teams[i];
        if (currentYear == team.year){
          str+="<option value=" + team.id + ">" + team.teamname + " - " + team.divison + " - " + new Date().getFullYear() + "</option>";      
        }
      }
      document.getElementById("allteams").innerHTML = str;         
  }

  async function createRegisteredPlayer(event) {
    event.preventDefault();

    if (!checked) {
      setHasError(true);
    } else {
      setHasError(false);
    

    const form = new FormData(event.target);

    var teamID = document.getElementById("allteams").value;
    var position = document.getElementById("position").value;

    console.log(teamID);
    console.log(position);

    if (teamID == 0) {
      alert("Please select a team!");      
    }
    else{

      var teamName = "";
      var division = "";
      var season = "";
      
      for (var i = 0; i < teams.length; i++){
        var team = teams[i];
        if (team.id == teamID){
          teamName = team.teamname;
          division = team.divison;
          season = team.season;
          break;
        }
      }

        const data = {
          firstname: form.get("fname"),
          lastname: form.get("lname"),
          teamname: teamName,
          division: division,
          season: season,
          position: position,
          email: form.get("email"),
          phonenumber: form.get("phone"),
          instagramhandle: form.get("instagram")
        };

        console.log(data);
        
        await API.graphql({
          query: createRegisteredPlayerMutation,
          variables: { input: data },
        });

        alert("Player " + data.firstname + " " + data.lastname + " added successfully");

        event.target.reset();      
      }
    }
  }

  const hStyle = { color: 'orange'};
  const textboxStyle = {
    backgroundColor: 'white',
    border: `1px solid`,
    width: '50rem',
    margin: '1rem 0'
  };

  return (
    <View className="Referee">
      <Heading level={1} style={hStyle}>Fill the form Below to be added to your teams roster </Heading>      
      
      <View as="form" margin="3rem 0" onSubmit={createRegisteredPlayer}>      
          <Flex direction="row" justifyContent="center" alignItems="left">     
            <TextField
              name="fname"
              placeholder="First Name (required)"
              label="First Name"
              labelHidden
              variation="quiet"
              required
              inputStyles={textboxStyle}
            />

          </Flex>

          <Flex direction="row" justifyContent="center" >
            <TextField
              name="lname"
              placeholder="Last Name (required)"
              label="Last Name"
              labelHidden
              variation="quiet"
              required
              inputStyles={textboxStyle}
            />    
          </Flex>

          <Flex direction="row" justifyContent="center" >
            <TextField
              name="email"
              placeholder="Email (required)"
              label="Email"
              labelHidden
              variation="quiet"
              required
              inputStyles={textboxStyle}
            />    
          </Flex>      

          <Flex direction="row" justifyContent="center" >
            <SelectField
              id="allteams"
              name="teamname"
              placeholder="SELECT YOUR TEAM"
              label="teamname"
              labelHidden
              variation="quiet"
              required
              inputStyles={textboxStyle}
              >                                   
              <option value="placeholder">placeholder</option>
            </SelectField>
          </Flex>
                    

          <Button type="submit" variation="primary">
            REGISTER
          </Button>
      </View>
  </View>
  );
};

export default (Referee);