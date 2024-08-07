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

import * as queries from "./graphql/queries";
import * as mutations from "./graphql/mutations";
import { listRegisteredTeams, listRefs, listSeasons} from "./graphql/queries";
import { createMatches as createMatch} from "./graphql/mutations";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import { Dimensions } from "react-native"
import { Auth } from 'aws-amplify'

const Referee = ({ signOut }) => {
const [teams, setTeams] = useState([]);
const [seasons, setSeasons] = useState([]);
const [divisions, setDivisions] = useState([]);
const [selectedSeason, setSelectedSeason] = useState("");
const [selectedDivision, setSelectedDivision] = useState("");
const [currentRef, setCurrentRef] = useState("");
const [selectedDivisionName, setSelectedDivisionName] = useState("");
const [selectedTeam, setSelectedTeam] = useState("");
const [homeTeamPlayers, setHomeTeamPlayers] = useState([]);
const [awayTeamPlayers, setAwayTeamPlayers] = useState([]);
const [divisionsForSeason, setDivisionsForSeason] = useState([]);
const [divisionMappingForSeason, setDivisionMappingForSeason] = useState({});
const [homeTeamGamesPlayed, setHomeTeamGamesPlayed] = useState(0);
const [awayTeamGamesPlayed, setAwayTeamGamesPlayed] = useState(0);
const [isReffing, setIsReffing] = useState(false);
const [homeTeamID, setHomeTeamID] = useState("");
const [awayTeamID, setAwayTeamID] = useState("");
const [playerID, setPlayerID] = useState("");
const [currentPlayer, setCurrentPlayer] = useState({});
const [selectedHomeTeam, setSelectedHomeTeam] = useState({});
const [selectedAwayTeam, setSelectedAwayTeam] = useState({});
const [currentGoals, setCurrentGoals] = useState(0);
const [currentAssists, setCurrentAssists] = useState(0);
const [currentHomeTeamScore, setCurrentHomeTeamScore] = useState(0);
const [currentAwayTeamScore, setCurrentAwayTeamScore] = useState(0);
const [suspensionLength, setSuspensionLength] = useState(0);

const divisionMapping = {
    "PREM" : 0,
    "Div A" : 1,
    "Div B" : 2
}

var currentScoreHome = 0;
var currentScoreAway = 0;

const hStyle = { color: 'orange'};
const textboxStyle = {
    backgroundColor: 'white',
    border: `1px solid`,
    width: Dimensions.get('window').width / 100 * 60,
    margin: '1rem 0'
};

const hometeamstyle = {
    'text-align': 'left',
    width: '45%',
    color: 'green',
    'font-size': `18px`
}

const awayteamstyle = {
    'text-align': 'left',
    width: '45%',
    color: 'orange',
    'font-size': `18px`
}

const handleToggle = (value, homeoraway) => () => {     
    setPlayerID(value.id);        
    setSelectedTeam(homeoraway);
    fetchCurrentPlayer(value.id, homeoraway);
};

    useEffect(() => {
        fetchRefs();
        fetchSeasons();
        fetchDivisions();
        fetchTeams();
        fetchSuspensionLength();    
    }, []);

    async function beginReffing(event) {
        event.preventDefault();
        var homeTeam = document.getElementById("allteamshome").value;
        var awayTeam = document.getElementById("allteamsaway").value;
        var ref = document.getElementById("allrefs").value;
        var season = document.getElementById("allseasons").value;
        var division = document.getElementById("alldivisions").value;

        if (homeTeam == 0 || awayTeam == 0 || ref == 0 || season == 0 || division == 0) {
            alert("Please ensure all fields are selected!");      
        }
        else if(homeTeam==awayTeam){
            alert("Please choose two different teams!");      
        }
        else{
            var mapping = await fetchDivisionsForSeason(season);
            setCurrentRef(ref);
            fetchPlayers(mapping);
            setIsReffing(true);         
        }    
    }

    async function fetchSuspensionLength() {    
        var apiData = await API.graphql(graphqlOperation(queries.listSuspensions));            
        const suspensionInfo = apiData.data.listSuspensions.items;
        setSuspensionLength(suspensionInfo[0].suspensionGameLength);
    }

    async function fetchTeams(season, division) {    
        
        
        var apiData = {};
        let teamsFromApi = [];

        if (season==undefined || season=="") {
            return;
        }
        else if (division==undefined || division=="") {
          return;
        }
        else{     
            setSelectedDivision(division);
            var divisionName = (await API.graphql(graphqlOperation(queries.getDivisions, { id: division}))).data.getDivisions;
            setSelectedDivisionName(divisionName.division);     
            apiData = await API.graphql(graphqlOperation(queries.listRegisteredTeams, { filter: { season: { eq: season }, divison: { eq: division }}}));

            teamsFromApi = apiData.data.listRegisteredTeams.items;                    
            var token = apiData.data.listRegisteredTeams.nextToken;

            while (token!=null) {
                var results = await API.graphql(graphqlOperation(queries.listRegisteredTeams, {nextToken:token, filter: { season: { eq: season }, divison: { eq: division }}}));
                teamsFromApi.push.apply(teamsFromApi, results.data.listRegisteredTeams.items);
                token = results.data.listRegisteredTeams.nextToken;
            }
        }
    
        setTeams(teamsFromApi);
        createHomeTeams(teamsFromApi);
        createAwayTeams(teamsFromApi);
    }

    async function fetchRefs() {
        const apiData = await API.graphql({ query: listRefs });
        const refsFromAPI = apiData.data.listRefs.items;
        setTeams(refsFromAPI);
        createRefs(refsFromAPI);
    }

    async function fetchSeasons() {
        API.graphql(graphqlOperation(listSeasons, { filter: { isseasonactive: { eq: true }}})).then((response) => {
            const seasonsFromAPI = response.data.listSeasons.items;
            setSeasons(seasonsFromAPI);      
            createSeasons(seasonsFromAPI);      
        });    
    }

    async function fetchDivisions(season) {
        var apiData = {};
        if (season=="" || season==undefined) {
            return;
        }
        else{            
            apiData = await API.graphql(graphqlOperation(queries.listDivisions, { filter: { season: { eq: season }}}));
        }
        
        const divisionsFromApi = apiData.data.listDivisions.items;
          
        createDivisions(divisionsFromApi);
      }

    async function updateDivisionsAndTeams(season) {
        setSelectedSeason(season);
        fetchDivisions(season);        
        fetchTeams(season, selectedDivision);        
    }

    async function fetchCurrentPlayer(playerid, homeoraway) { 
        API.graphql(graphqlOperation(queries.getRegisteredPlayers, { id: playerid})).then((response) => {
            const playerFromAPI = response.data.getRegisteredPlayers;
            setCurrentPlayer(playerFromAPI);
            setPlayerStats(playerFromAPI, homeoraway);
        });
    }

    async function fetchDivisionsForSeason(season) {        
        var apiData = await API.graphql(graphqlOperation(queries.listDivisions, { filter: { season: { eq: season }}}));               
        
        const divisionsFromApi = apiData.data.listDivisions.items;
            
        setDivisionsForSeason(divisionsFromApi);

        var mapping = {}        

        for (var div of divisionsFromApi) {
            for (var map in divisionMapping) {                                                
                if (div.division.toLowerCase().includes(map.toLowerCase())) {
                    var mapToAdd = {
                        divPriority: divisionMapping[map],
                        divId: div.id
                    }
                    mapping[div.division] = mapToAdd;                    
                }                
            }
        }
        
        setDivisionMappingForSeason(mapping);
        return mapping;
    }

    async function fetchPlayers(mapping) {            
        API.graphql(graphqlOperation(queries.listRegisteredPlayers, { filter: { teamid: { eq: homeTeamID }, onRoster: { eq: true }}})).then(async (response) => {
            const homeTeamPlayersFromAPI = response.data.listRegisteredPlayers.items;
            var token = response.data.listRegisteredPlayers.nextToken;

            while (token!=null) {
                var results = await API.graphql(graphqlOperation(queries.listRegisteredPlayers, {nextToken:token, filter: {teamid: { eq: homeTeamID }, onRoster: { eq: true }}}));
                homeTeamPlayersFromAPI.push.apply(homeTeamPlayersFromAPI, results.data.listRegisteredPlayers.items);
                token = results.data.listRegisteredPlayers.nextToken;
            }  
            
            await setHomePlayers(homeTeamPlayersFromAPI, mapping);
            setPlayerStatsGameStart(homeTeamPlayersFromAPI, homeTeamGamesPlayed, true); 
        });  

        API.graphql(graphqlOperation(queries.listRegisteredPlayers, { filter: { teamid: { eq: awayTeamID }, onRoster: { eq: true }}})).then(async (response) => {
            const awayTeamPlayersFromAPI = response.data.listRegisteredPlayers.items;

            var token = response.data.listRegisteredPlayers.nextToken;

            while (token!=null) {
                var results = await API.graphql(graphqlOperation(queries.listRegisteredPlayers, {nextToken:token, filter: {teamid: { eq: awayTeamID }, onRoster: { eq: true }}}));
                awayTeamPlayersFromAPI.push.apply(awayTeamPlayersFromAPI, results.data.listRegisteredPlayers.items);
                token = results.data.listRegisteredPlayers.nextToken;
            }

            await setAwayPlayers(awayTeamPlayersFromAPI, mapping);
            setPlayerStatsGameStart(awayTeamPlayersFromAPI, awayTeamGamesPlayed, false);         
        });        
    }

    async function setHomePlayers(players, mapping) {
        var allPlayers = [];

        for (var i=0; i<players.length;i++) {
            var player=players[i];

            var higherDiv = await doesPlayerPlayInHigherDivision(player, mapping);
            var suspended = false;


            if (player.hasOwnProperty("suspendedUntilGameNumber")) {
                if (homeTeamGamesPlayed+1 < player.suspendedUntilGameNumber) {
                    suspended = true;
                }
            }
            
            var playerToAdd = {
                id: player.id,
                firstname: player.firstname,
                lastname: player.lastname,
                onHigherDiv: higherDiv,
                isSuspended: suspended
            };
            allPlayers.push(playerToAdd);
        }

        setHomeTeamPlayers(allPlayers);        
    }

    async function setAwayPlayers(players, mapping) {
        var allPlayers = [];

        for (var i=0; i<players.length;i++) {
            var player=players[i];

            var higherDiv = await doesPlayerPlayInHigherDivision(player, mapping);
            var suspended = false;


            if (player.hasOwnProperty("suspendedUntilGameNumber")) {
                if (awayTeamGamesPlayed+1 < player.suspendedUntilGameNumber) {
                    suspended = true;
                }
            }
            
            var playerToAdd = {
                id: player.id,
                firstname: player.firstname,
                lastname: player.lastname,
                onHigherDiv: higherDiv,
                isSuspended: suspended
            };
            allPlayers.push(playerToAdd);
        }
        setAwayTeamPlayers(allPlayers);        
    }

    async function doesPlayerPlayInHigherDivision(player, mapping) {
           var playsHigher = false;

            if (!(selectedDivisionName in mapping)) {
                return false;
            }
            
            for (var div in mapping){
                if (mapping[div].divPriority < mapping[selectedDivisionName].divPriority){                    
                    var response = await API.graphql(graphqlOperation(queries.listRegisteredPlayers, { filter: { season: { eq: player.season }, division: { eq: mapping[div].divId }, year: { eq: player.year }, firstname: { eq: player.firstname }, lastname: { eq: player.lastname }}}));
                    const playerResults = response.data.listRegisteredPlayers.items;                    
                    var token = response.data.listRegisteredPlayers.nextToken;

                    while (token!=null) {
                        var results = await API.graphql(graphqlOperation(queries.listRegisteredPlayers, {nextToken:token, filter: { season: { eq: player.season }, division: { eq: mapping[div].divId }, year: { eq: player.year }, firstname: { eq: player.firstname }, lastname: { eq: player.lastname }}}));
                        playerResults.push.apply(playerResults, results.data.listRegisteredPlayers.items);
                        token = results.data.listRegisteredPlayers.nextToken;
                    }
                    
                    if (playerResults.length > 0){
                        playsHigher = true;
                    }                    
                }
            }

            return playsHigher;
    }

    function createSeasons(seasons){    
        var str="<option value=0>SELECT SEASON</option>";
        for (var i = 0; i < seasons.length; i++){
            var season = seasons[i];
            str+="<option value=" + season.id + ">" + season.season + " - " + season.year + "</option>";      
        }
        document.getElementById("allseasons").innerHTML = str;         
    }

    function createDivisions(divisions){    
        var str="<option value=0>SELECT DIVISION</option>";
        for (var i = 0; i < divisions.length; i++){
            var division = divisions[i];
            str+="<option value=" + division.id + ">" + division.division + "</option>";      
        }
        document.getElementById("alldivisions").innerHTML = str;         
    }

    async function createHomeTeams(teams){    
        var str="<option value=0>SELECT HOME TEAM</option>";
        for (var i = 0; i < teams.length; i++){
            var team = teams[i];
            var division = (await API.graphql(graphqlOperation(queries.getDivisions, { id: team.divison}))).data.getDivisions;
            str+="<option value=" + team.id + ">" + team.teamname + " - " + division.division  + "</option>";      
        }
        document.getElementById("allteamshome").innerHTML = str;         
    }

    async function createAwayTeams(teams){    
        var str="<option value=0>SELECT AWAY TEAM</option>";
        for (var i = 0; i < teams.length; i++){
            var team = teams[i];
            var division = (await API.graphql(graphqlOperation(queries.getDivisions, { id: team.divison}))).data.getDivisions;
            str+="<option value=" + team.id + ">" + team.teamname + " - " + division.division + "</option>";      
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
                setHomeTeamGamesPlayed(teams[i].gamesplayed);
                setSelectedTeam("Home");
            }
        }
    }

    function setAwayTeamVars(awayID) {
        setAwayTeamID(awayID);
        for (var i=0; i<teams.length;i++) {
            if (teams[i].id == awayID){
                setSelectedAwayTeam(teams[i]);
                setAwayTeamGamesPlayed(teams[i].gamesplayed);
                setSelectedTeam("Away");
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
                            onChange={(e) => fetchTeams(selectedSeason, e.target.value)}            
                            >
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
                    </SelectField>
                    </Flex>            
                                            
                    <Button type="submit" variation="primary">
                    Begin Refereeing
                    </Button>                                        
                </View>
                    <Flex direction="row" justifyContent="center" >
                        <Button style={{backgroundColor: 'red'}} onClick={signOut} type="submit" variation="primary">
                        Log Out
                        </Button>
                    </Flex>
            </View>
          );
    }

    function signOut() {
        Auth.signOut();
    }

    function setPlayerStatsGameStart(players, gamesplayed, isHomeTeam) {
        var newGoals="";
        var newAssists="";
        var newContributions="";
        for (var i=0; i<players.length;i++){                                
            var player=players[i];

            if (player.goals=="" || player.goals==undefined) {
                newGoals="0";
                for (var x=0; x<gamesplayed; x++){
                    newGoals = newGoals + ",0";
                }
                updatePlayerGoals(player.id, newGoals, true);
            }
            else {
                var goalsToList = player.goals.split(",");
                if (goalsToList.length == gamesplayed) {
                    newGoals = player.goals + ",0";
                    updatePlayerGoals(player.id, newGoals, true);
                }
                else if (goalsToList.length < gamesplayed){                    
                    newGoals=player.goals;
                    while(goalsToList.length<=gamesplayed){
                        newGoals = newGoals + ",0";
                        goalsToList.push("0");
                    }
                    updatePlayerGoals(player.id, newGoals, true);
                }
                else{
                    if(isHomeTeam){
                        currentScoreHome += parseInt(goalsToList[gamesplayed]);                        
                        setCurrentHomeTeamScore(currentScoreHome);
                    }
                    else{
                        currentScoreAway += parseInt(goalsToList[gamesplayed]);
                        setCurrentAwayTeamScore(currentScoreAway);
                    }
                }
            }

            if (player.assists=="" || player.assists==undefined) {
                newAssists="0";
                for (var x=0; x<gamesplayed; x++){
                    newAssists = newAssists + ",0";
                }
                updatePlayerAssists(player.id, newAssists, true);
            }
            else {
                var assistsToList = player.assists.split(",");
                if (assistsToList.length == gamesplayed) {
                    newAssists = player.assists + ",0";
                    updatePlayerAssists(player.id, newAssists, true);
                }
                else if (assistsToList.length < gamesplayed){
                    newAssists=player.assists;
                    while(assistsToList.length<=gamesplayed){
                        newAssists = newAssists + ",0";
                        assistsToList.push("0");
                    }
                    updatePlayerAssists(player.id, newAssists, true);
                }
            }


            if (player.contributions=="" || player.contributions==undefined) {
                newContributions="0";
                for (var x=0; x<gamesplayed; x++){
                    newContributions = newContributions + ",0";
                }
                updatePlayerContributions(player.id, newContributions, true);
            }
            else {
                var contributionsToList = player.contributions.split(",");
                if (contributionsToList.length == gamesplayed) {
                    newContributions = player.contributions + ",0";
                    updatePlayerContributions(player.id, newContributions, true);
                }
                else if (contributionsToList.length < gamesplayed){
                    newContributions=player.contributions;
                    while(contributionsToList.length<=gamesplayed){
                        newContributions = newContributions + ",0";
                        contributionsToList.push("0");
                    }
                    updatePlayerContributions(player.id, newContributions, true);
                }
            }
        }        
    }

    async function updatePlayerGoals(playerid, newgoals, freshStart) {
        const informationToUpdate = {
            id: playerid,
            goals: newgoals
        };

        const playerReturned = await API.graphql({ 
            query: mutations.updateRegisteredPlayers, 
            variables: { input: informationToUpdate }
        });

        if (freshStart == false) {
            fetchCurrentPlayer(playerid, selectedTeam);
        }        
    }

    async function updatePlayerAssists(playerid, newassists, freshStart) {
        const informationToUpdate = {
            id: playerid,
            assists: newassists
        };

        await API.graphql({ 
            query: mutations.updateRegisteredPlayers, 
            variables: { input: informationToUpdate }
        });

        if (freshStart == false) {
            fetchCurrentPlayer(playerid, selectedTeam);
        } 
    }

    async function updatePlayerContributions(playerid, newcontributions, freshStart) {
        const informationToUpdate = {
            id: playerid,
            contributions: newcontributions
        };

        await API.graphql({ 
            query: mutations.updateRegisteredPlayers, 
            variables: { input: informationToUpdate }
        });

        if (freshStart == false) {
            fetchCurrentPlayer(playerid, selectedTeam);
        }
    }    

    function setPlayerStats(player, homeoraway) { 
        var gameNumber = homeoraway == "Home" ? homeTeamGamesPlayed : awayTeamGamesPlayed;

        var goalsToList = player.goals.split(",");
        var assistsToList = player.assists.split(",");

        setCurrentGoals(parseInt(goalsToList[gameNumber]));
        setCurrentAssists(parseInt(assistsToList[gameNumber]));     
    }

    async function addGoal(event) {
        setTimeout(async () => {
            if(Object.keys(currentPlayer).length==0){
                return;
            }
            var gameNumber = selectedTeam == "Home" ? homeTeamGamesPlayed : awayTeamGamesPlayed;
            var goalsToList = currentPlayer.goals.split(",");
            var assistsToList = currentPlayer.assists.split(",");
            var contributions = currentPlayer.contributions.split(",");
            var id = currentPlayer.id;
        
            goalsToList[gameNumber] = parseInt(goalsToList[gameNumber]) + 1;
            updatePlayerGoals(id, goalsToList.toString(), false);

            contributions[gameNumber] = parseInt(goalsToList[gameNumber]) + parseInt(assistsToList[gameNumber]);
            updatePlayerContributions(id, contributions.toString(), false);
            
            if (selectedTeam == "Home") {
                var newScore = currentHomeTeamScore+1;
                setCurrentHomeTeamScore(newScore);
            }
            else{
                var newScore = currentAwayTeamScore+1;
                setCurrentAwayTeamScore(newScore);
            }
        }, 1000);
    }

    function addAssist(event) {
        setTimeout(() => {
            if(Object.keys(currentPlayer).length==0){
                return;
            }
            var gameNumber = selectedTeam == "Home" ? homeTeamGamesPlayed : awayTeamGamesPlayed;
            var assistsToList = currentPlayer.assists.split(",");
            var goalsToList = currentPlayer.goals.split(",");
            var contributions = currentPlayer.contributions.split(",");
            var id = currentPlayer.id;

            assistsToList[gameNumber] = parseInt(assistsToList[gameNumber]) + 1;
            updatePlayerAssists(id, assistsToList.toString(), false);

            contributions[gameNumber] = parseInt(goalsToList[gameNumber]) + parseInt(assistsToList[gameNumber]);
            updatePlayerContributions(id, contributions.toString(), false);
        }, 1000);
    }

    function removeGoal(event) {
        setTimeout(() => {
            if(Object.keys(currentPlayer).length==0){
                return;
            }    
            var gameNumber = selectedTeam == "Home" ? homeTeamGamesPlayed : awayTeamGamesPlayed;
            var goalsToList = currentPlayer.goals.split(",");
            var assistsToList = currentPlayer.assists.split(",");
            var contributions = currentPlayer.contributions.split(",");
            var id = currentPlayer.id;

            if (goalsToList[gameNumber]!=0) {
                goalsToList[gameNumber] = parseInt(goalsToList[gameNumber]) - 1;
                updatePlayerGoals(id, goalsToList.toString(), false);

                contributions[gameNumber] = parseInt(goalsToList[gameNumber]) + parseInt(assistsToList[gameNumber]);
                updatePlayerContributions(id, contributions.toString(), false);

                if (selectedTeam == "Home") {
                    var newScore = currentHomeTeamScore-1;
                    setCurrentHomeTeamScore(newScore);
                }
                else{
                    var newScore = currentAwayTeamScore-1;
                    setCurrentAwayTeamScore(newScore);
                }
            }
        }, 1000);
    }

    function removeAssist(event) {
        setTimeout(() => {
            if(Object.keys(currentPlayer).length==0){
                return;
            }
            var gameNumber = selectedTeam == "Home" ? homeTeamGamesPlayed : awayTeamGamesPlayed;
            var assistsToList = currentPlayer.assists.split(",");
            var goalsToList = currentPlayer.goals.split(",");
            var contributions = currentPlayer.contributions.split(",");
            var id = currentPlayer.id;

            if (assistsToList[gameNumber]!=0) {
                assistsToList[gameNumber] = parseInt(assistsToList[gameNumber]) - 1;
                updatePlayerAssists(id, assistsToList.toString(), false);

                contributions[gameNumber] = parseInt(goalsToList[gameNumber]) + parseInt(assistsToList[gameNumber]);
                updatePlayerContributions(id, contributions.toString(), false);
            }
        }, 1000);
    }

    async function EndMatch(event) {        
        var now = new Date();

        // Set the timezone offset for EST (-5 hours)
        var estOffset = -5 * 60; // -5 hours converted to minutes

        // Calculate the UTC time
        var estTime = new Date(now.getTime() + estOffset * 60000);

        // Get the day of the month
        var dayOfMonth = estTime.getUTCDate();
        
        var month = new Date().getUTCMonth() + 1;
        var year = new Date().getUTCFullYear();
        var date = "" + year + "-" + month + "-" + dayOfMonth;
        
        const data = {
            hometeam: selectedHomeTeam.teamname,
            awayteam: selectedAwayTeam.teamname,
            hometeamscore: currentHomeTeamScore,
            awayteamscore: currentAwayTeamScore,
            season: selectedSeason,
            division: selectedDivision,
            year: new Date().getFullYear(),
            referee: currentRef,
            gamedate: date,
            hometeamgamenumber: (homeTeamGamesPlayed+1),
            awayteamgamenumber: (awayTeamGamesPlayed+1)
        };
            
        await API.graphql({
            query: createMatch,
            variables: { input: data },
        });        
          
        const updateHomeTeam = {
            id: selectedHomeTeam.id,
            gamesplayed: (selectedHomeTeam.gamesplayed + 1)
        };

        const updateAwayTeam = {
            id: selectedAwayTeam.id,
            gamesplayed: (selectedAwayTeam.gamesplayed + 1)
        };
        
        await API.graphql({ 
            query: mutations.updateRegisteredTeams, 
            variables: { input: updateHomeTeam }
        });
        await API.graphql({ 
            query: mutations.updateRegisteredTeams, 
            variables: { input: updateAwayTeam }
        });
        
        alert("Match Ended");
        window.location.reload();
    }

    async function addRedCard(event) {
        if(Object.keys(currentPlayer).length==0){
            return;
        }


        var gameNumber = selectedTeam == "Home" ? homeTeamGamesPlayed : awayTeamGamesPlayed;
        var playerID = currentPlayer.id;
        var suspendedUntil = gameNumber + suspensionLength + 2;

        if (currentPlayer.hasOwnProperty("suspendedUntilGameNumber")) {
            if (currentPlayer.suspendedUntilGameNumber == suspendedUntil) {
                alert("Red card has already been applied.");
                return;
            }
        }

        const informationToUpdate = {
            id: playerID,
            suspendedUntilGameNumber: suspendedUntil
        };
        
        const playerReturned = await API.graphql({ 
            query: mutations.updateRegisteredPlayers, 
            variables: { input: informationToUpdate }
        });

        fetchCurrentPlayer(playerID, selectedTeam);
        
        alert("Red card applied successfully");

        //Current game number for team is homeTeamGamesPlayed + 1.
        // Suspend Until (homeTeamGamesPlayed + 1) + (suspensionLength+1)

        //When checking check if (homeTeamGamesPlayed + 1) <= suspensionUntilGameNumber


    }

    async function addYellowCard(event) {
        console.log(selectedTeam);
    }

    function beginReffingMatch() {  
        return (
            <View className="Referee">
              <Heading level={3} style={hStyle}>Score:</Heading>     
              
              <Flex direction="row" justifyContent="center"  >                   
              <Heading level={4} style={hStyle}>{currentHomeTeamScore} - </Heading>
              <Heading level={4} style={{ color: 'green'}}>{currentAwayTeamScore}</Heading>
              </Flex>

              <Flex direction="row" justifyContent="center">          
                <label className="hometeam" style={hometeamstyle}>Home Team: {selectedHomeTeam.teamname}</label>
                <label className="awayteam" style={awayteamstyle}>Away Team: {selectedAwayTeam.teamname}</label>
              </Flex>
              

              <Flex direction="row" justifyContent="center" >          
                    <List spacing={0} sx={{ item: {padding: 0}, margin: 0, width: '50%', maxWidth: Dimensions.get('window').width/2, bgcolor: 'background.paper', overflow: 'auto', maxHeight: Dimensions.get('window').height/2}}>
                        {homeTeamPlayers.map((value) => {
                            return (
                            <ListItem
                                key={value.id}                                
                                disablePadding
                                sx={{padding: 0.1, margin: 0}}
                            >
                                <ListItemButton sx={{padding: 0, margin: 0}} role={undefined} onClick={handleToggle(value, "Home")} dense>
                                <ListItemIcon sx={{padding: 0.1, margin: 0}}>
                                    <Checkbox
                                    edge="start"
                                    checked={playerID == value.id}
                                    tabIndex={-1}
                                    disableRipple
                                    sx={{padding: 0.5, margin: 0}}
                                    />
                                </ListItemIcon>
                                {(value.onHigherDiv == true) || (value.isSuspended) ? <ListItemText sx={{padding: 0, margin: 0, color: 'red'}} primary={`${value.firstname} ${value.lastname}`} /> : <ListItemText sx={{padding: 0, margin: 0}} primary={`${value.firstname} ${value.lastname}`} />}
                                </ListItemButton>
                            </ListItem>
                            );
                        })}
                    </List>
                    <List sx={{item: {padding: 0}, margin: 0, width: '50%', maxWidth: Dimensions.get('window').width/2, bgcolor: 'background.paper', overflow: 'auto', maxHeight: Dimensions.get('window').height/2 }}>
                        {awayTeamPlayers.map((value) => {
                            return (
                                <ListItem
                                    key={value.id}                                
                                    disablePadding
                                    sx={{padding: 0.1, margin: 0}}
                                >
                                    <ListItemButton sx={{padding: 0, margin: 0}} role={undefined} onClick={handleToggle(value, "Away")} dense>
                                    <ListItemIcon sx={{padding: 0.1, margin: 0}}>
                                        <Checkbox
                                        edge="start"
                                        checked={playerID == value.id}
                                        tabIndex={-1}
                                        disableRipple
                                        sx={{padding: 0.5, margin: 0}}
                                        />
                                    </ListItemIcon>
                                    {(value.onHigherDiv == true) || (value.isSuspended) ? <ListItemText sx={{padding: 0, margin: 0, color: 'red'}} primary={`${value.firstname} ${value.lastname}`} /> : <ListItemText sx={{padding: 0, margin: 0}} primary={`${value.firstname} ${value.lastname}`} />}                                    
                                    </ListItemButton>
                                </ListItem>
                            );
                            })}
                        </List>
                    </Flex>
                    
                        
                    <div className="red-yellow-cards"> 
                        <Flex direction="row" justifyContent="center">
                            <Button onClick={addRedCard} style={{width: '90%', maxWidth: Dimensions.get('window').width/2.3, backgroundColor: 'red'}} type="submit" variation="primary" >
                            RED CARD
                            </Button>
                        </Flex>                         
                    </div>
                    <div className="single-goal-assists"> 
                        <Flex direction="row" justifyContent="center">
                            <Button onClick={addGoal} style={{width: '45%', maxWidth: Dimensions.get('window').width/2.3, backgroundColor: 'green'}} type="submit" variation="primary" >
                            GOAL
                            </Button>
                            <Button onClick={addAssist} style={{width: '45%', maxWidth: Dimensions.get('window').width/2.3}} type="submit" variation="primary" >
                            ASSIST
                            </Button>
                        </Flex>                         
                    </div>
                    <div className="goal-assists"> 
                        <Flex direction="row" justifyContent="center">
                            <Button onClick={removeGoal} style={{width: '3rem', backgroundColor: 'green'}} type="submit" variation="primary" >
                            -
                            </Button>
                            <TextField
                                name="goals"
                                placeholder={currentGoals}
                                value={currentGoals}
                                labelHidden                                
                                inputStyles={{backgroundColor: 'white', width: '3rem'}}
                                isReadOnly={true}
                            />                            
                            <Button onClick={addGoal} style={{width: '3rem', backgroundColor: 'green'}} type="submit" variation="primary" >
                            +
                            </Button>


                            <Button onClick={removeAssist} style={{width: '3rem'}} type="submit" variation="primary" >
                            -
                            </Button>
                            <TextField
                                name="assists"
                                placeholder={currentAssists}
                                value={currentAssists}
                                labelHidden                                
                                inputStyles={{backgroundColor: 'white', width: '3rem'}}
                                isReadOnly={true}
                            />
                            <Button onClick={addAssist} style={{width: '3rem'}} type="submit" variation="primary" >
                            +
                            </Button>
                        </Flex>
                        <div className="end-match"> 
                            <Flex direction="row" justifyContent="center">
                                <Button onClick={EndMatch} style={{width: '90%', maxWidth: Dimensions.get('window').width/1.1, backgroundColor: 'purple'}} type="submit" variation="primary" >
                                END MATCH
                                </Button>
                            </Flex>                         
                        </div>                      
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