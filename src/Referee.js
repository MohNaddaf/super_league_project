import React, { useState, useEffect } from "react";
import "./Referee.css";
import "@aws-amplify/ui-react/styles.css";
import { API, graphqlOperation} from "aws-amplify";
import {
  Button,
  Flex,
  Heading,
  View,
  Text,
  SelectField
} from "@aws-amplify/ui-react";

import * as queries from "./graphql/queries";
import { listRegisteredTeams, listRefs} from "./graphql/queries";

const Referee = ({ signOut }) => {
  const [teams, setTeams] = useState([]);
  const [homeTeamPlayers, setHomeTeamPlayers] = useState([]);
  const [awayTeamPlayers, setAwayTeamPlayers] = useState([]);
  const [isReffing, setIsReffing] = useState(false);
  const [homeTeamID, setHomeTeamID] = useState("");
  const [awayTeamID, setAwayTeamID] = useState("");
  

  useEffect(() => {
    fetchRefs();
    fetchTeams();    
  }, []);

  async function beginReffing(event) {
    event.preventDefault();
    var homeTeam = document.getElementById("allteamshome").value;
    var awayTeam = document.getElementById("allteamsaway").value;
    var ref = document.getElementById("allrefs").value;

    if (homeTeam == 0 || awayTeam == 0 || ref == 0 ) {
        alert("Please ensure all fields are selected!");      
    }
    else if(homeTeam==awayTeam){
        alert("Please choose two different teams!");      
    }
    else{     
        fetchPlayers();
        setIsReffing(true);        
    }    
  }

  async function fetchTeams(division) {
    var apiData = {};
    if (division==undefined) {
        apiData = await API.graphql(graphqlOperation(queries.listRegisteredTeams, { filter: { year: { eq: new Date().getFullYear() }}}));
    }
    else{
        apiData = await API.graphql(graphqlOperation(queries.listRegisteredTeams, { filter: { divison: { eq: division }, year: { eq: new Date().getFullYear() }}}));
    }
    
    const teamsFromAPI = apiData.data.listRegisteredTeams.items;
    setTeams(teamsFromAPI);
    createHomeTeams(teamsFromAPI);
    createAwayTeams(teamsFromAPI);
  }

  async function fetchRefs() {
    const apiData = await API.graphql({ query: listRefs });
    const refsFromAPI = apiData.data.listRefs.items;
    setTeams(refsFromAPI);
    createRefs(refsFromAPI);
  }  

  async function fetchPlayers() {            
        API.graphql(graphqlOperation(queries.listRegisteredPlayers, { filter: { teamid: { eq: homeTeamID }}})).then((response) => {
            const homeTeamPlayersFromAPI = response.data.listRegisteredPlayers.items;
            setHomeTeamPlayers(homeTeamPlayersFromAPI);            
        });  

        API.graphql(graphqlOperation(queries.listRegisteredPlayers, { filter: { teamid: { eq: awayTeamID }}})).then((response) => {
            const awayTeamPlayersFromAPI = response.data.listRegisteredPlayers.items;
            setAwayTeamPlayers(awayTeamPlayersFromAPI);            
        });
  }

    function createHomeTeams(teams){    
        var str="<option value=0>SELECT HOME TEAM</option>";
        var currentYear = new Date().getFullYear();
        for (var i = 0; i < teams.length; i++){
            var team = teams[i];
            if (currentYear == team.year){
                str+="<option value=" + team.id + ">" + team.teamname + " - " + team.divison + " - " + new Date().getFullYear() + "</option>";      
            }
        }
        document.getElementById("allteamshome").innerHTML = str;         
    }

    function createAwayTeams(teams){    
        var str="<option value=0>SELECT AWAY TEAM</option>";
        var currentYear = new Date().getFullYear();
        for (var i = 0; i < teams.length; i++){
            var team = teams[i];
            if (currentYear == team.year){
                str+="<option value=" + team.id + ">" + team.teamname + " - " + team.divison + " - " + new Date().getFullYear() + "</option>";      
            }
        }
        document.getElementById("allteamsaway").innerHTML = str;         
    }


    function createRefs(refs){    
        var str="<option value=0>SELECT REFEREE NAME</option>";
        for (var i = 0; i < refs.length; i++){
            var ref = refs[i];            
            str+="<option value=" + ref.id + ">" + ref.firstname + " " + ref.lastname + "</option>";                
        }
        document.getElementById("allrefs").innerHTML = str;         
    }

    function refereeSelection() {
        return (
            <View className="Referee">
              <Heading level={1} style={hStyle}>Please select the two teams playing:</Heading>      
              
                <View as="form" margin="3rem 0" onSubmit={beginReffing}>      
        
                    <Flex direction="row" justifyContent="center" >
                    <SelectField
                        id="allrefs"
                        name="allrefs"
                        placeholder="SELECT REFEREE NAME"
                        label="refs"
                        labelHidden
                        variation="quiet"
                        required
                        inputStyles={textboxStyle}
                        >                                   
                        <option value="placeholder">placeholder</option>
                    </SelectField>
                    </Flex>
        
                    <Flex direction="row" justifyContent="center" >
                        <SelectField
                            id="division"
                            name="division"
                            placeholder="SELECT DIVISION"
                            label="position"
                            labelHidden
                            variation="quiet"
                            required              
                            inputStyles={textboxStyle} 
                            onChange={(e) => fetchTeams(e.target.value)}            
                            >
                            <option value="Div A">Div A</option>
                            <option value="Div B">Div B</option>
                            <option value="PREM">PREM</option>
                            <option value="COED">COED</option>
                        </SelectField>
                    </Flex>
        
                    <Flex direction="row" justifyContent="center" >
                    <SelectField
                        id="allteamshome"
                        name="allteamshome"
                        placeholder="SELECT HOME TEAM"
                        label="hometeams"
                        labelHidden
                        variation="quiet"
                        required
                        inputStyles={textboxStyle}
                        onChange={(e) => setHomeTeamID(e.target.value)}
                        >                                   
                        <option value="placeholder">placeholder</option>
                    </SelectField>
                    </Flex>
        
                    <Flex direction="row" justifyContent="center" >
                    <SelectField
                        id="allteamsaway"
                        name="allteamsaway"
                        placeholder="SELECT AWAY TEAM"
                        label="awayteams"
                        labelHidden
                        variation="quiet"
                        required
                        inputStyles={textboxStyle}
                        onChange={(e) => setAwayTeamID(e.target.value)}
                        >                                   
                        <option value="placeholder">placeholder</option>
                    </SelectField>
                    </Flex>            
                            
        
                    <Button type="submit" variation="primary">
                    Begin Refereeing
                    </Button>
                </View>                        
            </View>
          );
    }

    function beginReffingMatch() {             
        console.log(homeTeamPlayers);
        return (
            <View className="Referee">
              <Heading level={1} style={hStyle}>swag</Heading>                                    
            </View>
          );
    }



  const hStyle = { color: 'orange'};
  const textboxStyle = {
    backgroundColor: 'white',
    border: `1px solid`,
    width: '50rem',
    margin: '1rem 0'
  };


  if (isReffing){
    return beginReffingMatch();
  }
  else{
    return refereeSelection();
  }
  

};

export default (Referee);