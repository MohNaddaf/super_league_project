import React, { useState, useEffect } from "react";
import "./App.css";
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
  withAuthenticator,
} from "@aws-amplify/ui-react";
import { listRegisteredTeams } from "./graphql/queries";
import {
  createRegisteredPlayers as createRegisteredPlayerMutation
} from "./graphql/mutations";



const App = ({ signOut }) => {
  const [teams, setTeams] = useState([]);

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

  const hStyle = { color: 'orange' };

  return (
    <View className="App">
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
              inputStyles={{
                backgroundColor: 'white',
                border: `1px solid`,
                width: '40rem',
                margin: '1rem 0'
              }}
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
              inputStyles={{
                backgroundColor: 'white',
                border: `1px solid`,
                width: '40rem',
                margin: '1rem 0'
              }}
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
              inputStyles={{
                backgroundColor: 'white',
                border: `1px solid`,
                width: '40rem',
                margin: '1rem 0'
              }}
            />    
          </Flex>

          <Flex direction="row" justifyContent="center" >
            <TextField
              name="phone"
              placeholder="Phone (required)"
              label="Phone"
              labelHidden
              variation="quiet"
              required
              inputStyles={{
                backgroundColor: 'white',
                border: `1px solid`,
                width: '40rem',
                margin: '1rem 0'
              }}
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
              inputStyles={{
                backgroundColor: 'white',
                border: `1px solid`,
                width: '40rem',
                margin: '1rem 0'
              }}
              >                                   
              <option value="apple">placeholder</option>
            </SelectField>
          </Flex>

          <Flex direction="row" justifyContent="center" >
            <SelectField
              id="position"
              name="position"
              placeholder="SELECT YOUR POSITION"
              label="position"
              labelHidden
              variation="quiet"
              required
              inputStyles={{
                backgroundColor: 'white',
                border: `1px solid`,
                width: '40rem',
                margin: '1rem 0'
              }}
              >
              <option value="keeper">Keeper</option>
              <option value="cb">Center back / Defense</option>
              <option value="cm">Center Midfield</option>
              <option value="rm">Right Midfield</option>
              <option value="lm">Left Midfield</option>
              <option value="s">Striker</option>
            </SelectField>
          </Flex>

          <Flex direction="row" justifyContent="center" >
            <TextField
              name="instagram"
              placeholder="Instagram"
              label="instagram"
              labelHidden
              variation="quiet"
              inputStyles={{
                backgroundColor: 'white',
                border: `1px solid`,
                width: '40rem',
                margin: '1rem 0'
              }}
            />    
          </Flex>

          <Button type="submit" variation="primary">
            REGISTER
          </Button>
      </View>
  </View>
  );
};

export default (App);