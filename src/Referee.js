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

const Referee = ({ signOut }) => {
const [teams, setTeams] = useState([]);
const [seasons, setSeasons] = useState([]);
const [divisions, setDivisions] = useState([]);
const [selectedSeason, setSelectedSeason] = useState("");
const [selectedSeasonStartDate, setSelectedSeasonStartDate] = useState("");
const [selectedDivision, setSelectedDivision] = useState("");
const [selectedTeam, setSelectedTeam] = useState("");
const [homeTeamPlayers, setHomeTeamPlayers] = useState([]);
const [awayTeamPlayers, setAwayTeamPlayers] = useState([]);
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
    fetchCurrentPlayer(value.id);
    setSelectedTeam(homeoraway);
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
            setPlayerStats(playerFromAPI);
        });
    }

    async function fetchPlayers() {            
        API.graphql(graphqlOperation(queries.listRegisteredPlayers, { filter: { teamid: { eq: homeTeamID }, onRoster: { eq: true }}})).then((response) => {
            const homeTeamPlayersFromAPI = response.data.listRegisteredPlayers.items;            
            setHomePlayers(homeTeamPlayersFromAPI);
            setPlayerStatsGameStart(homeTeamPlayersFromAPI, homeTeamGamesPlayed, true); 
        });  

        API.graphql(graphqlOperation(queries.listRegisteredPlayers, { filter: { teamid: { eq: awayTeamID }, onRoster: { eq: true }}})).then((response) => {
            const awayTeamPlayersFromAPI = response.data.listRegisteredPlayers.items;
            setAwayPlayers(awayTeamPlayersFromAPI);
            setPlayerStatsGameStart(awayTeamPlayersFromAPI, awayTeamGamesPlayed, false);         
        });        
    }

    async function setHomePlayers(players) {
        var allPlayers = [];

        for (var i=0; i<players.length;i++) {
            var player=players[i];

            var higherDiv = await doesPlayerPlayInHigherDivision(player);
            
            var playerToAdd = {
                id: player.id,
                firstname: player.firstname,
                lastname: player.lastname,
                onHigherDiv: higherDiv
            };
            allPlayers.push(playerToAdd);
        }
        setHomeTeamPlayers(allPlayers);        
    }

    async function setAwayPlayers(players) {
        var allPlayers = [];

        for (var i=0; i<players.length;i++) {
            var player=players[i];

            var higherDiv = await doesPlayerPlayInHigherDivision(player);
            
            var playerToAdd = {
                id: player.id,
                firstname: player.firstname,
                lastname: player.lastname,
                onHigherDiv: higherDiv
            };
            allPlayers.push(playerToAdd);
        }
        setAwayTeamPlayers(allPlayers);        
    }

    async function doesPlayerPlayInHigherDivision(player) {            
           var playsHigher = false;

            for (var div in divisionMapping){
                if (divisionMapping[div] < divisionMapping[player.division]){
                    await API.graphql(graphqlOperation(queries.listRegisteredPlayers, { filter: { season: { eq: player.season }, division: { eq: div }, year: { eq: player.year }, firstname: { eq: player.firstname }, lastname: { eq: player.lastname }}})).then((response) => {
                        const playerResults = response.data.listRegisteredPlayers.items;
                        if (playerResults.length > 0){
                            playsHigher = true;
                        }
                    });
                }
            }
            return playsHigher;           
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
            fetchCurrentPlayer(playerid);
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
            fetchCurrentPlayer(playerid);
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
            fetchCurrentPlayer(playerid);
        }
    }    

    function setPlayerStats(player) {         
        console.log(player);       
        var gameNumber = selectedTeam == "Home" ? homeTeamGamesPlayed : awayTeamGamesPlayed;

        var goalsToList = player.goals.split(",");
        console.log(goalsToList);
        var assistsToList = player.assists.split(",");

        setCurrentGoals(parseInt(goalsToList[gameNumber]));
        setCurrentAssists(parseInt(assistsToList[gameNumber]));     
    }

    function addGoal(event) {
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
    }

    function addAssist(event) {
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
    }

    function removeGoal(event) {
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
    }

    function removeAssist(event) {
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
    }

    async function EndMatch(event) {
        const data = {
            hometeam: selectedHomeTeam.teamname,
            awayteam: selectedAwayTeam.teamname,
            hometeamscore: currentHomeTeamScore,
            awayteamscore: currentAwayTeamScore,
            season: selectedSeason,
            division: selectedDivision,
            year: new Date().getFullYear()
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
                                {value.onHigherDiv == true ? <ListItemText sx={{padding: 0, margin: 0, color: 'red'}} primary={`${value.firstname} ${value.lastname}`} /> : <ListItemText sx={{padding: 0, margin: 0}} primary={`${value.firstname} ${value.lastname}`} />}
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
                                    {value.onHigherDiv == true ? <ListItemText sx={{padding: 0, margin: 0, color: 'red'}} primary={`${value.firstname} ${value.lastname}`} /> : <ListItemText sx={{padding: 0, margin: 0}} primary={`${value.firstname} ${value.lastname}`} />}                                    
                                    </ListItemButton>
                                </ListItem>
                            );
                            })}
                        </List>
                    </Flex>
                    
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