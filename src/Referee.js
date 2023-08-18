import React, { useState, useEffect } from "react";
import "./Referee.css";
import "@aws-amplify/ui-react/styles.css";
import { API, graphqlOperation} from "aws-amplify";
import {
  Button,
  Flex,
  Heading,
  View,
  SelectField,
  TextField
} from "@aws-amplify/ui-react";

import moment from 'moment';
import * as queries from "./graphql/queries";
import { listRegisteredTeams, listRefs, listSeasons} from "./graphql/queries";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';

const Referee = ({ signOut }) => {
const [teams, setTeams] = useState([]);
const [seasons, setSeasons] = useState([]);
const [divisions, setDivisions] = useState([]);
const [selectedSeason, setSelectedSeason] = useState("");
const [selectedSeasonStartDate, setSelectedSeasonStartDate] = useState("");
const [selectedDivision, setSelectedDivision] = useState("");
const [homeTeamPlayers, setHomeTeamPlayers] = useState([]);
const [awayTeamPlayers, setAwayTeamPlayers] = useState([]);
const [isReffing, setIsReffing] = useState(false);
const [homeTeamID, setHomeTeamID] = useState("");
const [awayTeamID, setAwayTeamID] = useState("");
const [playerID, setPlayerID] = useState("");
const [currentPlayer, setCurrentPlayer] = useState({});
const [selectedHomeTeam, setSelectedHomeTeam] = useState({});
const [selectedAwayTeam, setSelectedAwayTeam] = useState({});
const [currentGoals, setCurrentGoals] = useState(0);
const [currentAssists, setCurrentAssists] = useState(0);

const hStyle = { color: 'orange'};
const textboxStyle = {
    backgroundColor: 'white',
    border: `1px solid`,
    width: '50rem',
    margin: '1rem 0'
};

const handleToggle = (value) => () => {     
    setPlayerID(value.id);
    fetchCurrentPlayer(value.id);
};

    useEffect(() => {
        fetchRefs();
        fetchSeasons();
        fetchDivisions();
        fetchTeams();    
    }, []);

    async function beginReffing(event) {
        event.preventDefault();
        var homeTeam = document.getElementById("allteamshome").value;
        var awayTeam = document.getElementById("allteamsaway").value;
        var ref = document.getElementById("allrefs").value;

        if (homeTeam == 0 || awayTeam == 0 || ref == 0 ) {
            alert("Please ensure ref and teams are selected!");      
        }
        else if(homeTeam==awayTeam){
            alert("Please choose two different teams!");      
        }
        else{     
            fetchPlayers();
            setIsReffing(true);        
        }    
    }

    async function fetchTeams(division,seasonSelected) {
        var apiData = {};
        if ((division==undefined || division=="") && (seasonSelected==undefined || seasonSelected=="")) {
            apiData = await API.graphql(graphqlOperation(queries.listRegisteredTeams, { filter: { year: { eq: new Date().getFullYear() }}}));
        }
        else if (seasonSelected==undefined || seasonSelected==""){
            setSelectedDivision(division);
            apiData = await API.graphql(graphqlOperation(queries.listRegisteredTeams, { filter: { divison: { eq: division }, year: { eq: new Date().getFullYear() }}}));
        }
        else if (division==undefined || division==""){
            apiData = await API.graphql(graphqlOperation(queries.listRegisteredTeams, { filter: { season: { eq: seasonSelected }, year: { eq: new Date().getFullYear() }}}));
        }
        else{
            setSelectedDivision(division);            
            apiData = await API.graphql(graphqlOperation(queries.listRegisteredTeams, { filter: { divison: { eq: division }, season: { eq: seasonSelected }, year: { eq: new Date().getFullYear() }}}));
                        
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

    async function fetchSeasons() {
        API.graphql(graphqlOperation(listSeasons, { filter: { year: { eq: new Date().getFullYear() }}})).then((response) => {
            const seasonsFromAPI = response.data.listSeasons.items;
            setSeasons(seasonsFromAPI);      
            createSeasons(seasonsFromAPI);      
        });    
    }

    async function fetchDivisions(season) {
        var apiData = {};
        if (season=="" || season==undefined) {
            apiData = await API.graphql(graphqlOperation(queries.listRegisteredTeams, { filter: { year: { eq: new Date().getFullYear() }}}));
        }
        else{            
            apiData = await API.graphql(graphqlOperation(queries.listRegisteredTeams, { filter: { season: { eq: season }, year: { eq: new Date().getFullYear() }}}));
        }
        
        const teamsFromAPI = apiData.data.listRegisteredTeams.items;
        var divs = [];
        for (var i=0; i<teamsFromAPI.length;i++) {
            if (divs.includes(teamsFromAPI[i].divison) == false) {
                divs.push(teamsFromAPI[i].divison);
            }
        }

        setDivisions(divs);
        createDivisions(divs);
    }

    async function updateDivisionsAndTeams(season) {
        setSelectedSeason(season);

        for (var i=0; i<seasons.length;i++) {
            if (seasons[i].season == season && seasons[i].year == new Date().getFullYear()) {
                setSelectedSeasonStartDate(seasons[i].startdate);
            }
        }

        fetchDivisions(season);        
        fetchTeams(selectedDivision, season);        
    }

    async function fetchCurrentPlayer(playerid) { 
        API.graphql(graphqlOperation(queries.getRegisteredPlayers, { id: playerid})).then((response) => {
            const playerFromAPI = response.data.getRegisteredPlayers;
            setCurrentPlayer(playerFromAPI);          
        });
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
    function createSeasons(seasons){    
        var str="<option value=0>SELECT SEASON</option>";
        for (var i = 0; i < seasons.length; i++){
            var season = seasons[i];
            str+="<option value=" + season.season + ">" + season.season + "</option>";      
        }
        document.getElementById("allseasons").innerHTML = str;         
    }

    function createDivisions(divisions){    
        var str="<option value=0>SELECT DIVISION</option>";
        for (var i = 0; i < divisions.length; i++){
            var division = divisions[i];
            str+="<option value=\"" + division + "\">" + division + "</option>";      
        }
        document.getElementById("alldivisions").innerHTML = str;         
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

    function setHomeTeamVars(homeID) {
        setHomeTeamID(homeID);
        for (var i=0; i<teams.length;i++) {
            if (teams[i].id == homeID){
                setSelectedHomeTeam(teams[i]);
            }
        }
    }

    function setAwayTeamVars(awayID) {
        setAwayTeamID(awayID);
        for (var i=0; i<teams.length;i++) {
            if (teams[i].id == awayID){
                setSelectedAwayTeam(teams[i]);
            }
        }
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
                            id="allseasons"
                            name="allseasons"
                            placeholder="SELECT SEASON"
                            label="seasons"
                            labelHidden
                            variation="quiet"
                            required
                            inputStyles={textboxStyle}
                            onChange={(e) => updateDivisionsAndTeams(e.target.value)}
                            >                                   
                            <option value="placeholder">placeholder</option>
                        </SelectField>
                    </Flex>

                    <Flex direction="row" justifyContent="center" >
                        <SelectField
                            id="alldivisions"
                            name="alldivisions"
                            placeholder="SELECT DIVISION"
                            label="position"
                            labelHidden
                            variation="quiet"
                            required              
                            inputStyles={textboxStyle} 
                            onChange={(e) => fetchTeams(e.target.value, selectedSeason)}            
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
                        onChange={(e) => setHomeTeamVars(e.target.value)}
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
                        onChange={(e) => setAwayTeamVars(e.target.value)}
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

    function addGoal(event) {
        //Fetch current player
        fetchCurrentPlayer(playerID);
        
        
        //selectedSeasonStartDate


        //Update The Goal for current Player ID.

        //Fetch current player again
        //update score state for current player

        //Need to somehow figure the week we are in :/
        //
        //
        //
        //
        //
    }

    function addAssist(event) {
        alert("Adding Assist");
    }

    function removeGoal(event) {
        alert("Removing Goal");
    }

    function removeAssist(event) {
        alert("Removing Assist");
    }

    function beginReffingMatch() {
        //moment().format(); 
        //var today = moment().add(6,'days');
        //var birthday = moment(selectedSeasonStartDate, 'YYYY-MM-DD');
        //var birthday = moment(selectedSeasonStartDate, 'YYYY-MM-DD').add(6, 'days');
        //selectedSeasonStartDate
        //selectedSeasonStartDate
        //console.log(today.diff(birthday, 'week'));    

        //console.log(selectedSeasonStartDate);
        return (
            <View className="Referee">
              <Heading level={1} style={hStyle}>Select players to update scores</Heading>     

              <Flex direction="row" justifyContent="center" style={{margin: '2rem 0'}} >          
                <label className="hometeam">Home Team: {selectedHomeTeam.teamname}</label>
                <label className="awayteam">Away Team: {selectedAwayTeam.teamname}</label>
              </Flex>

              <Flex direction="row" justifyContent="center" >          
    
                        <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper', overflow: 'auto', maxHeight: 400}}>
                            {homeTeamPlayers.map((value) => {
                                return (
                                <ListItem
                                    key={value.id}                                
                                    disablePadding
                                >
                                    <ListItemButton role={undefined} onClick={handleToggle(value)} dense>
                                    <ListItemIcon>
                                        <Checkbox
                                        edge="start"
                                        name="swag"
                                        checked={playerID == value.id}
                                        tabIndex={-1}
                                        disableRipple
                                        />
                                    </ListItemIcon>
                                    <ListItemText  primary={`${value.firstname} ${value.lastname}`} />
                                    </ListItemButton>
                                </ListItem>
                                );
                            })}
                        </List>

                        <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper', overflow: 'auto', maxHeight: 400 }}>
                            {awayTeamPlayers.map((value) => {
                                return (
                                <ListItem
                                    key={value.id}                                
                                    disablePadding
                                >
                                    <ListItemButton role={undefined} onClick={handleToggle(value)} dense>
                                    <ListItemIcon>
                                        <Checkbox
                                        edge="start"
                                        name="swag"
                                        checked={playerID == value.id}
                                        tabIndex={-1}
                                        disableRipple
                                        />
                                    </ListItemIcon>
                                    <ListItemText  primary={`${value.firstname} ${value.lastname}`} />
                                    </ListItemButton>
                                </ListItem>
                                );
                            })}
                        </List>
                    </Flex>
                    
                    <div className="single-goal-assists"> 
                        <Flex direction="row" justifyContent="center">
                            <Button onClick={addGoal} style={{width: '23rem', backgroundColor: 'green'}} type="submit" variation="primary" >
                            GOAL
                            </Button>
                            <Button onClick={addAssist} style={{width: '23rem'}} type="submit" variation="primary" >
                            ASSIST
                            </Button>
                        </Flex>                         
                    </div>   
                    <div className="goal-assists"> 
                        <Flex direction="row" justifyContent="center">
                            <Button onClick={removeGoal} style={{width: '7rem', backgroundColor: 'green'}} type="submit" variation="primary" >
                            -
                            </Button>
                            <TextField
                                name="goals"
                                placeholder={currentGoals}
                                value={currentGoals}
                                labelHidden                                
                                inputStyles={{backgroundColor: 'white', width: '7rem'}}
                                isReadOnly={true}
                            />                            
                            <Button onClick={addGoal} style={{width: '7rem', backgroundColor: 'green'}} type="submit" variation="primary" >
                            +
                            </Button>


                            <Button onClick={removeAssist} style={{width: '7rem'}} type="submit" variation="primary" >
                            -
                            </Button>
                            <TextField
                                name="assists"
                                placeholder={currentAssists}
                                value={currentAssists}
                                labelHidden                                
                                inputStyles={{backgroundColor: 'white', width: '7rem'}}
                                isReadOnly={true}
                            />
                            <Button onClick={addAssist} style={{width: '7rem'}} type="submit" variation="primary" >
                            +
                            </Button>
                        </Flex>                         
                    </div>           
            </View>
          );
    }

  if (isReffing){
    return beginReffingMatch();
  }
  else{
    return refereeSelection();
  }  
};

export default (Referee);