import React, { useState, useEffect, useReducer } from "react";
import "./Referee.css";
import "@aws-amplify/ui-react/styles.css";
import { API, graphqlOperation} from "aws-amplify";
import {
  Button,
  Flex,
  Heading,
  View,
  SelectField,
  TextField,
  Text
} from "@aws-amplify/ui-react";

import * as queries from "./graphql/queries";
import { listSeasons} from "./graphql/queries";
import { Dimensions } from "react-native"

import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer';
import PersonIcon from '@mui/icons-material/Person';
import Collapse from '@mui/material/Collapse';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import ExpandMore from '@mui/icons-material/ExpandMore';
import StarBorder from '@mui/icons-material/StarBorder';
import Checkbox from '@mui/material/Checkbox';
import ListItemButton from '@mui/material/ListItemButton';
import * as mutations from "./graphql/mutations";

const CalculateStats = ({ signOut }) => {
    const [selectedSeason, setSelectedSeason] = useState("");
    const [selectedDivision, setSelectedDivision] = useState("");
    const [selectedSeasonFull, setSelectedSeasonFull] = useState("");
    const [selectedDivisionFull, setSelectedDivisionFull] = useState("");
    const [selectedGameNumber, setSelectedGameNumber] = useState("");
    const [selectedNumPlayers, setSelectedNumPlayers] = useState("");
    const [topGoalScorers, setTopGoalScorers] = useState([]);
    const [topPlayersForWeek, setTopPlayersForWeek] = useState([]);
    const [topKeepersForWeek, setTopKeepersForWeek] = useState([]);
    const [topKeepersUntilWeek, setTopKeepersUntilWeek] = useState([]);
    const [topPlayersForPositionForWeek, setTopPlayersForPositionForWeek] = useState({});
    const [allPositions, setAllPositions] = useState(["Center back / Defense", "Center Midfield", "Right Midfield", "Left Midfield", "Striker"]);
    const [allChecked, setAllChecked] = React.useState([]);
    const [allTopKeepersOfWeek, setAllTopKeepersOfWeek] = React.useState([]);
    const [allTopKeepersOfWeekPlayers, setAllTopKeepersOfWeekPlayers] = React.useState([]);
    const [allTopKeepersUntilWeek, setAllTopKeepersUntilWeek] = React.useState([]);
    const [allTopKeepersUntilWeekPlayers, setAllTopKeepersUntilWeekPlayers] = React.useState([]);
    const [allTopPlayersOfWeek, setAllTopPlayersOfWeek] = React.useState([]);
    const [allTopGoalScorers, setAllTopGoalScorers] = React.useState([]);
    const [allCheckedPlayers, setAllCheckedPlayers] = React.useState([]);
    const [allTopPlayersOfWeekPlayers, setAllTopPlayersOfWeekPlayers] = React.useState([]);
    const [allTopGoalScorersPlayers, setAllTopGoalScorersPlayers] = React.useState([]);
    const [, forceUpdate] = useReducer(x => x + 1, 0);
    const [generateReportClicked, setGenerateReportClicked] = useState(false);
    const [playersByPosition, setPlayersByPosition] = useState({});

    const hStyle = { color: 'orange'};
    const textboxStyle = {
        backgroundColor: 'white',
        border: `1px solid`,
        width: Dimensions.get('window').width / 100 * 60,
        margin: '1rem 0'
    };

    const divStyle = {marginRight: '1rem', marginLeft: '1rem', alignItems:'left', textAlign:'left'}

    const handleTopKeepersUntilWeek = (value, player) => () => {        
        var newObject = allTopKeepersUntilWeek;
        var newObject1 = allTopKeepersUntilWeekPlayers;

        if (newObject.includes(value)) {
            var index = newObject.indexOf(value);
            newObject.splice(index,1);

            var index1 = newObject1.indexOf(player);
            newObject1.splice(index1,1);
        }
        else{
            newObject.push(value);
            newObject1.push(player);
        }
        setAllTopKeepersUntilWeek(newObject);
        setAllTopKeepersUntilWeekPlayers(newObject1);
        forceUpdate();
    };

    const handleTopKeepersOfWeek = (value, player) => () => {        
        var newObject = allTopKeepersOfWeek;
        var newObject1 = allTopKeepersOfWeekPlayers;

        if (newObject.includes(value)) {
            var index = newObject.indexOf(value);
            newObject.splice(index,1);

            var index1 = newObject1.indexOf(player);
            newObject1.splice(index1,1);
        }
        else{
            newObject.push(value);
            newObject1.push(player);
        }
        setAllTopKeepersOfWeek(newObject);
        setAllTopKeepersOfWeekPlayers(newObject1);
        forceUpdate();
    };

    const handleTopPlayersOfWeek = (value, player) => () => {        
        var newObject = allTopPlayersOfWeek;
        var newObject1 = allTopPlayersOfWeekPlayers;

        if (newObject.includes(value)) {
            var index = newObject.indexOf(value);
            newObject.splice(index,1);

            var index1 = newObject1.indexOf(player);
            newObject1.splice(index1,1);
        }
        else{
            newObject.push(value);
            newObject1.push(player);
        }
        setAllTopPlayersOfWeek(newObject);
        setAllTopPlayersOfWeekPlayers(newObject1);
        forceUpdate();
    };

    const handleTopGoalScorerSelected = (value, player) => () => {        
        var newObject = allTopGoalScorers;
        var newObject1 = allTopGoalScorersPlayers;
        if (newObject.includes(value)) {
            var index = newObject.indexOf(value);
            newObject.splice(index,1);

            var index1 = newObject1.indexOf(player);
            newObject1.splice(index1,1);
        }
        else{
            newObject.push(value);
            newObject1.push(player);
        }
        setAllTopGoalScorers(newObject);
        setAllTopGoalScorersPlayers(newObject1);
        forceUpdate();
    };

    const handleToggle = (value, player) => () => {        
        var newObject = allChecked;
        var newObject1 = allCheckedPlayers;

        if (newObject.includes(value)) {
            var index = newObject.indexOf(value);
            newObject.splice(index,1);

            var index1 = newObject1.indexOf(player);
            newObject1.splice(index1,1);
        }
        else{
            newObject.push(value);
            newObject1.push(player);
        }
        setAllChecked(newObject);
        setAllCheckedPlayers(newObject1);
        forceUpdate();
    };

    useEffect(() => {
        fetchSeasons();
        fetchDivisions();
    }, []);
   
    async function fetchSeasons() {
        API.graphql(graphqlOperation(listSeasons)).then((response) => {
            const seasonsFromAPI = response.data.listSeasons.items;
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

    async function updateDivisions(season) {
        setSelectedSeason(season);        
        fetchDivisions(season);  
    }

    function computeStatistics() {   
        fetchPlayers();
        fetchMatches();
        fetchMatchesUntilWeek();
        fetchSeasonDivisionNames();
    }

    async function fetchSeasonDivisionNames() {
        var seasonRetrieved = await API.graphql({
            query: queries.getSeasons,
            variables: { id: selectedSeason }
        });

        var divisionRetrieved = await API.graphql({
            query: queries.getDivisions,
            variables: { id: selectedDivision }
        });

        setSelectedSeasonFull(seasonRetrieved.data.getSeasons);
        setSelectedDivisionFull(divisionRetrieved.data.getDivisions);        
    }

    function generateReport() {
        var playersByPositionNew = {};


        for (var i=0; i<allCheckedPlayers.length; i++){
            var player = allCheckedPlayers[i];

            if (player.position in playersByPositionNew) {
                var tempArray = playersByPositionNew[player.position];
                tempArray.push(player);
                playersByPositionNew[player.position] = tempArray;
            }
            else {
                playersByPositionNew[player.position] = [player];
            }
        }
       
        setPlayersByPosition(playersByPositionNew);

        setGenerateReportClicked(true);
    }

    async function calculateTopKeepersForWeek(matches) {
        var topKeepers = [];                

        for (var i=0;i<matches.length;i++){
            var match=matches[i];


            if (match.hometeamgamenumber==selectedGameNumber) {                
                var results = await API.graphql(graphqlOperation(queries.listRegisteredPlayers, {filter: {season: { eq: selectedSeason }, division: { eq: selectedDivision }, position: {eq: "Keeper"}, teamname: {eq: match.hometeam}}}));                
                
                var keepers = results.data.listRegisteredPlayers.items;
                
                var token = results.data.listRegisteredPlayers.nextToken;
            

                while (token!=null) {
                    var results2 = await API.graphql(graphqlOperation(queries.listRegisteredPlayers, {nextToken: token, filter: {season: { eq: selectedSeason }, division: { eq: selectedDivision }, position: {eq: "Keeper"}, teamname: {eq: match.hometeam}}}));                
                    keepers.push.apply(keepers, results2.data.listRegisteredPlayers.items);
                    token = results2.data.listRegisteredPlayers.nextToken;
                }
                
                if (keepers.length>0) {
                    var keeper = keepers[0];
                    var person = {id: keeper.id, firstName: keeper.firstname, lastName:keeper.lastname, teamName:keeper.teamname, concededGoals: match.awayteamscore};
                    topKeepers.push(person);
                }            
            }
            

            if (match.awayteamgamenumber==selectedGameNumber) {
                var results = await API.graphql(graphqlOperation(queries.listRegisteredPlayers, {filter: {season: { eq: selectedSeason }, division: { eq: selectedDivision }, position: {eq: "Keeper"}, teamname: {eq: match.awayteam}}}));                
                
                var keepers = results.data.listRegisteredPlayers.items;

                var token = results.data.listRegisteredPlayers.nextToken;
            
                while (token!=null) {
                    var results = await API.graphql(graphqlOperation(queries.listRegisteredPlayers, {nextToken: token, filter: {season: { eq: selectedSeason }, division: { eq: selectedDivision }, position: {eq: "Keeper"}, teamname: {eq: match.awayteam}}}));                
                    keepers.push.apply(keepers, results.data.listRegisteredPlayers.items);
                    token = results.data.listRegisteredPlayers.nextToken;
                }

                if (keepers.length>0) {
                    var keeper = keepers[0];
                    var person = {id: keeper.id, firstName: keeper.firstname, lastName:keeper.lastname, teamName:keeper.teamname, concededGoals: match.hometeamscore};
                    topKeepers.push(person);
                }   
            }            
        }                        
        
        //sort all player goals highest to lowest
        topKeepers.sort(function(a, b) {
            var keyA = a.concededGoals,
                keyB = b.concededGoals;
            
            if (keyA < keyB) return -1;
            if (keyA > keyB) return 1;
            return 0;
        });

        setTopKeepersForWeek(topKeepers.slice(0, selectedNumPlayers));      
    }


    function calculateTopPlayersForWeek(players) {
        var topPlayers = [];                

        for (var i=0;i<players.length;i++){
            var player=players[i];

            if (player.firstname=="Unassigned" || player.firstname=="Unassigned " || player.firstname=="unassigned"){
                continue;
            }

            if (player.goals=="" || player.goals==undefined) {
                continue;
            }

            var goalsToList = player.goals.split(",");
            if (goalsToList[parseInt(selectedGameNumber)-1]==undefined) {
                continue;
            }

            var assistsToList = player.assists.split(",");
            var contributionsToList = player.contributions.split(",");
            
            var person = {id: player.id, position: player.position, firstName: player.firstname, lastName:player.lastname, teamName:player.teamname, goals:parseInt(goalsToList[parseInt(selectedGameNumber)-1]), assists: parseInt(assistsToList[parseInt(selectedGameNumber)-1]), contributions: parseInt(contributionsToList[parseInt(selectedGameNumber)-1])};
            topPlayers.push(person);
        }                        

        //sort all player goals highest to lowest
        topPlayers.sort(function(a, b) {
            var keyA = a.contributions,
                keyB = b.contributions;
            
            if (keyA < keyB) return 1;
            if (keyA > keyB) return -1;
            return 0;
        });

        //select MAX top 5 players
        setTopPlayersForWeek(topPlayers.slice(0, selectedNumPlayers));        
    }
  
    function calculateTopPlayersForEachPositionForWeek(players) {
        var topPlayers = [];                

        for (var i=0;i<players.length;i++){
            var player=players[i];

            if (player.firstname=="Unassigned" || player.firstname=="Unassigned " || player.firstname=="unassigned"){
                continue;
            }

            if (player.goals=="" || player.goals==undefined) {
                continue;
            }

            var goalsToList = player.goals.split(",");
            if (goalsToList[parseInt(selectedGameNumber)-1]==undefined) {
                continue;
            }

            var assistsToList = player.assists.split(",");
            var contributionsToList = player.contributions.split(",");         
            var person = {id: player.id, position: player.position, firstName: player.firstname, lastName:player.lastname, teamName:player.teamname, goals:parseInt(goalsToList[parseInt(selectedGameNumber)-1]), assists: parseInt(assistsToList[parseInt(selectedGameNumber)-1]), contributions: parseInt(contributionsToList[parseInt(selectedGameNumber)-1])};

            if (!(player.position in topPlayers)){
                topPlayers[player.position] = [person];            
            }
            else{
                topPlayers[player.position].push(person);
            }
        }

        for (const key in topPlayers){
            topPlayers[key].sort(function(a, b) {
                var keyA = a.contributions,
                    keyB = b.contributions;
                
                if (keyA < keyB) return 1;
                if (keyA > keyB) return -1;
                return 0;
            });
        }
        
        for (const key in topPlayers) {
            topPlayers[key] = topPlayers[key].slice(0, selectedNumPlayers);
        }

        setTopPlayersForPositionForWeek(topPlayers);    
    }

    function calculateTopGoalScorers(players) {
        var topScorers = [];                

        for (var i=0;i<players.length;i++){
            var player=players[i];
            var totalGoals=0;

            if (player.firstname=="Unassigned" || player.firstname=="Unassigned " || player.firstname=="unassigned"){
                continue;
            }

            if (player.goals=="" || player.goals==undefined) {
                continue;
            }

            var goalsToList = player.goals.split(",");

            if (parseInt(selectedGameNumber) >= goalsToList.length ) {
                for (var x=0; x<goalsToList.length; x++) {
                    var goal = parseInt(goalsToList[x]);
                    totalGoals+=goal;
                }
            }

            else{
                for (var x=0; x<parseInt(selectedGameNumber); x++) {
                    var goal = parseInt(goalsToList[x]);
                    totalGoals+=goal;
                }
            }
                        
            var person = {id: player.id, position: player.position, firstName: player.firstname, lastName:player.lastname, teamName:player.teamname, goals:totalGoals};
            topScorers.push(person);
        }
                
        topScorers.sort(function(a, b) {
            var keyA = a.goals,
                keyB = b.goals;
            
            if (keyA < keyB) return 1;
            if (keyA > keyB) return -1;
            return 0;
        });

        //select MAX top 5 players
        setTopGoalScorers(topScorers.slice(0, selectedNumPlayers));              
    }

    async function fetchPlayers() {
        API.graphql(graphqlOperation(queries.listRegisteredPlayers, { filter: {season: { eq: selectedSeason }, division: { eq: selectedDivision }}})).then(async (response) => {
            const playersFromAPI = response.data.listRegisteredPlayers.items;

            var token = response.data.listRegisteredPlayers.nextToken;
            
            while (token!=null) {
                var results = await API.graphql(graphqlOperation(queries.listRegisteredPlayers, {nextToken:token, filter: {season: { eq: selectedSeason }, division: { eq: selectedDivision }}}));                
                playersFromAPI.push.apply(playersFromAPI, results.data.listRegisteredPlayers.items);
                token = results.data.listRegisteredPlayers.nextToken;
            }

            calculateTopPlayersForWeek(playersFromAPI);
            calculateTopGoalScorers(playersFromAPI);
            calculateTopPlayersForEachPositionForWeek(playersFromAPI);
        });        
    }

    async function fetchMatches() {
        API.graphql(graphqlOperation(queries.listMatches, { filter: {season: { eq: selectedSeason }, division: { eq: selectedDivision }, or:{hometeamgamenumber: { eq: selectedGameNumber }, awayteamgamenumber: { eq: selectedGameNumber }}}})).then(async (response) => {
            const teamsFromApi = response.data.listMatches.items;

            var token = response.data.listMatches.nextToken;
            
            while (token!=null) {
                var results = await API.graphql(graphqlOperation(queries.listMatches, {nextToken:token, filter: {season: { eq: selectedSeason }, division: { eq: selectedDivision }, or: {hometeamgamenumber: { eq: selectedGameNumber }, awayteamgamenumber: { eq: selectedGameNumber }}}}));                
                teamsFromApi.push.apply(teamsFromApi, results.data.listMatches.items);
                token = results.data.listMatches.nextToken;
            }
            
            calculateTopKeepersForWeek(teamsFromApi);
        });    
    }

    async function calculateTopKeepersUntilWeek(matches) {                

        var teamMap = new Map();
        var topKeepers = [];                

        for (var i=0;i<matches.length;i++){
            var match=matches[i];

            if (match.hometeamgamenumber<=selectedGameNumber) {
                if (teamMap.has(match.hometeam)){
                    var currentGoals = parseInt(teamMap.get(match.hometeam));
                    teamMap.set(match.hometeam, (currentGoals + parseInt(match.awayteamscore)));
                }
                else{
                    teamMap.set(match.hometeam, parseInt(match.awayteamscore));
                }                     
            }
            
            if (match.awayteamgamenumber<=selectedGameNumber) {
                if (teamMap.has(match.awayteam)){
                    var currentGoals = parseInt(teamMap.get(match.awayteam));
                    teamMap.set(match.awayteam, (currentGoals + parseInt(match.hometeamscore)));
                }
                else{
                    teamMap.set(match.awayteam, parseInt(match.hometeamscore));
                }
            }            
        }      
        
        for (let [key, value] of teamMap) {            
            var results = await API.graphql(graphqlOperation(queries.listRegisteredPlayers, {filter: {season: { eq: selectedSeason }, division: { eq: selectedDivision }, position: {eq: "Keeper"}, teamname: {eq: key}}}));                
                
            var keepers = results.data.listRegisteredPlayers.items;

            var token = results.data.listRegisteredPlayers.nextToken;
        
            while (token!=null) {
                var results = await API.graphql(graphqlOperation(queries.listRegisteredPlayers, {nextToken: token, filter: {season: { eq: selectedSeason }, division: { eq: selectedDivision }, position: {eq: "Keeper"}, teamname: {eq: key}}}));                
                keepers.push.apply(keepers, results.data.listRegisteredPlayers.items);
                token = results.data.listRegisteredPlayers.nextToken;
            }

            if (keepers.length>0) {
                var keeper = keepers[0];
                var person = {id: keeper.id, firstName: keeper.firstname, lastName:keeper.lastname, teamName:keeper.teamname, concededGoals: value};
                topKeepers.push(person);
            }
        }
        
        topKeepers.sort(function(a, b) {
            var keyA = a.concededGoals,
                keyB = b.concededGoals;
            
            if (keyA < keyB) return -1;
            if (keyA > keyB) return 1;
            return 0;
        });

        setTopKeepersUntilWeek(topKeepers.slice(0, selectedNumPlayers));                
    }

    async function fetchMatchesUntilWeek() {

        API.graphql(graphqlOperation(queries.listMatches, { filter: {season: { eq: selectedSeason }, division: { eq: selectedDivision }, or:{hometeamgamenumber: { le: selectedGameNumber }, awayteamgamenumber: { le: selectedGameNumber }}}})).then(async (response) => {
            const teamsFromApi = response.data.listMatches.items;

            var token = response.data.listMatches.nextToken;
            
            while (token!=null) {
                var results = await API.graphql(graphqlOperation(queries.listMatches, {nextToken:token, filter: {season: { eq: selectedSeason }, division: { eq: selectedDivision }, or: {hometeamgamenumber: { le: selectedGameNumber }, awayteamgamenumber: { le: selectedGameNumber }}}}));                
                teamsFromApi.push.apply(teamsFromApi, results.data.listMatches.items);
                token = results.data.listMatches.nextToken;
            }
            
            calculateTopKeepersUntilWeek(teamsFromApi);
        });        
    }

    function calcStats() {          
        return (
            <View className="Referee">
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
                        onChange={(e) => updateDivisions(e.target.value)}
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
                        onChange={(e) => setSelectedDivision(e.target.value)}
                        >
                    </SelectField>
                </Flex>          

                <Flex direction="row" justifyContent="center" >
                    <TextField
                        name="gamenumber"
                        placeholder="Game Number (required)"
                        label="Game Number"
                        labelHidden
                        variation="quiet"
                        required
                        inputStyles={textboxStyle}
                        onChange={(e) => setSelectedGameNumber(e.target.value)}
                    />
                </Flex>

                <Flex direction="row" justifyContent="center" >
                    <TextField
                        name="numplayers"
                        placeholder="Number of Players to Show (required)"
                        label="Num Players"
                        labelHidden
                        variation="quiet"
                        required
                        inputStyles={textboxStyle}
                        onChange={(e) => setSelectedNumPlayers(e.target.value)}
                    />
                </Flex>                                                  
    
                <Button onClick={computeStatistics} type="submit" variation="primary">
                Calculate Statistics
                </Button>
                
                <Flex direction="row" justifyContent="center" margin={"3rem"} inputStyles={textboxStyle}>

                <List sx={{ width: '100%', maxWidth: Dimensions.get('window').width/5, bgcolor: 'background.paper' }} subheader={<ListSubheader style={hStyle} component="div" id="top-5-players-for-week-subheader">Top Keepers for Week {selectedGameNumber}</ListSubheader>}>
                        {topKeepersForWeek.map((value) => {
                            return (
                                <ListItem>
                                    <ListItemButton role={undefined} onClick={handleTopKeepersOfWeek(value.id, value)} dense>
                                        <Checkbox
                                            edge="start"
                                            checked={allTopKeepersOfWeek.indexOf(value.id)!=-1}
                                            tabIndex={-1}
                                            disableRipple                                                        
                                        />
                                        <ListItemAvatar>
                                        <Avatar>
                                            <PersonIcon />
                                        </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText primary={`${value.firstName} ${value.lastName} with ${value.concededGoals} conceded goals `} secondary={`${value.teamName}`} />
                                    </ListItemButton>
                                </ListItem>
                            );
                        })}
                    </List>

                <List sx={{ width: '100%', maxWidth: Dimensions.get('window').width/5, bgcolor: 'background.paper' }} subheader={<ListSubheader style={hStyle} component="div" id="top-5-players-for-week-subheader">Top Keepers Until Week {selectedGameNumber}</ListSubheader>}>
                        {topKeepersUntilWeek.map((value) => {
                            return (
                                <ListItem>
                                    <ListItemButton role={undefined} onClick={handleTopKeepersUntilWeek(value.id, value)} dense>
                                        <Checkbox
                                            edge="start"
                                            checked={allTopKeepersUntilWeek.indexOf(value.id)!=-1}
                                            tabIndex={-1}
                                            disableRipple                                                        
                                        />
                                        <ListItemAvatar>
                                        <Avatar>
                                            <PersonIcon />
                                        </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText primary={`${value.firstName} ${value.lastName} with ${value.concededGoals} conceded goals`} secondary={`${value.teamName}`} />
                                    </ListItemButton>
                                </ListItem>
                            );
                        })}
                    </List>

                    <List sx={{ width: '100%', maxWidth: Dimensions.get('window').width/5, bgcolor: 'background.paper' }} subheader={<ListSubheader style={hStyle} component="div" id="top-5-players-for-week-subheader">Most Contributions For Week {selectedGameNumber}</ListSubheader>}>
                        {topPlayersForWeek.map((value) => {
                            return (
                                <ListItem>
                                    <ListItemButton role={undefined} onClick={handleTopPlayersOfWeek(value.id, value)} dense>
                                        <Checkbox
                                            edge="start"
                                            checked={allTopPlayersOfWeek.indexOf(value.id)!=-1}
                                            tabIndex={-1}
                                            disableRipple                                                        
                                        />
                                        <ListItemAvatar>
                                        <Avatar>
                                            <PersonIcon />
                                        </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText primary={`${value.firstName} ${value.lastName} with ${value.goals} goals and ${value.assists} assists`} secondary={`${value.teamName}`} />
                                    </ListItemButton>
                                </ListItem>
                            );
                        })}
                    </List>

                    <List sx={{ width: '100%', maxWidth: Dimensions.get('window').width/5, bgcolor: 'background.paper' }} subheader={<ListSubheader style={hStyle} component="div" id="top-5-goal-scorers-for-week-subheader">Most Contributions Per Position for Week {selectedGameNumber}</ListSubheader>}>
                        {allPositions.map((value) => {
                            return (
                                <>
                                    <ListItem>
                                        <SportsSoccerIcon>
                                        <InboxIcon />
                                        </SportsSoccerIcon>
                                        <ListItemText primary={value} />
                                        <ExpandMore />                                    
                                    </ListItem>
                                    <Collapse in={true} timeout="auto" unmountOnExit>
                                        <List component="div" disablePadding>
                                        {topPlayersForPositionForWeek[value]!=undefined && (topPlayersForPositionForWeek[value].map((player) => {
                                            return (
                                                <ListItem sx={{ pl: 4 }}>
                                                    <ListItemButton role={undefined} onClick={handleToggle(player.id, player)} dense>
                                                        <Checkbox
                                                            edge="start"
                                                            checked={allChecked.indexOf(player.id)!=-1}
                                                            tabIndex={-1}
                                                            disableRipple                                                        
                                                        />                                                  
                                                        <ListItemText primary={`${player.firstName} ${player.lastName} with ${player.goals} goals and ${player.assists} assists`} secondary={`${player.teamName}`} />
                                                    </ListItemButton>
                                                </ListItem>
                                            );
                                            }))}
                                        
                                        </List>
                                    </Collapse>
                                </>
                                
                            );
                        })}
                    </List>

                    <List sx={{ width: '100%', maxWidth: Dimensions.get('window').width/5, bgcolor: 'background.paper' }} subheader={<ListSubheader style={hStyle} component="div" id="top-5-goal-scorers-subheader">Top Goal Scorers Until Week {selectedGameNumber}</ListSubheader>}>
                        {topGoalScorers.map((value) => {
                            return (
                                <ListItem>
                                    <ListItemButton role={undefined} onClick={handleTopGoalScorerSelected(value.id, value)} dense>
                                        <Checkbox
                                            edge="start"
                                            checked={allTopGoalScorers.indexOf(value.id)!=-1}
                                            tabIndex={-1}
                                            disableRipple                                                        
                                        />
                                        <ListItemAvatar>
                                        <Avatar>
                                            <PersonIcon />
                                        </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText primary={`${value.firstName} ${value.lastName} with ${value.goals} goals`} secondary={`${value.teamName}`} />
                                    </ListItemButton>
                                </ListItem>
                            );
                        })}
                    </List>                    
                </Flex>

                <Button onClick={generateReport} type="submit" variation="primary">
                Generate Report
                </Button>
            </View>  
                               
        );
    }    

    function displayTopPlayersFromEachPosition(){
        return (
            Object.keys(playersByPosition).map((value) => {
                return (
                playersByPosition[value].map((player) => {
                    return (
                        <li><b>{value}:</b> {player.firstName} {player.lastName} - {player.teamName}</li>
                    )
                }))
            })
        );
    }

    function displayTopKeeper(){
        return (
            allTopKeepersOfWeekPlayers.map((player) => {
                return (
                    <li><b>Keeper: </b> {player.firstName} {player.lastName} - {player.teamName}</li>
                )
        }));
    }

    function displayPlayerOfTheWeek(){
        return (
            allTopPlayersOfWeekPlayers.map((player) => {
                return (
                    <li>{player.firstName} {player.lastName} - {player.teamName} ({player.goals} goals + {player.assists} assists)</li>
                )
        }));
    }

    function displayKeeperOfTheWeek(){
        return (
            allTopKeepersOfWeekPlayers.map((player) => {
                return (
                    <li>{player.firstName} {player.lastName} - {player.teamName} ({player.concededGoals} conceded goals)</li>
                )
        }));
    }

    function displayTopGoalScorers(){
        return (
            allTopGoalScorersPlayers.map((player) => {
                return (
                    <li>{player.firstName} {player.lastName} with {player.goals} goals - {player.teamName}</li>
                )
        }));
    }

    function displayTopKeepers(){
        return (
            allTopKeepersUntilWeekPlayers.map((player) => {
                return (
                    <li>{player.firstName} {player.lastName} with {player.concededGoals} conceded goals - {player.teamName}</li>
                )
        }));
    }

    function displayReport() {          
        return (
            <View className="Referee">
                
                <Flex direction="row" justifyContent="center" alignItems="left">
                    <h1 style={hStyle}>{selectedSeasonFull.season} - {selectedDivisionFull.division}</h1> 
                </Flex>

                <Flex direction="row" justifyContent="left" alignItems="left" margin={'1rem'}>
                    <div style={divStyle}>
                        <h4 style={hStyle}>{selectedDivisionFull.division} - Week {selectedGameNumber}</h4>
                    </div>
                </Flex>

                <Flex direction="row" justifyContent="left" alignItems="left" margin={'1rem'}>
                    <div style={divStyle}>
                    <h4 style={hStyle}>Week {selectedGameNumber} TOTW:</h4>
                        <ul style={hStyle}>
                            {displayTopPlayersFromEachPosition()}
                            {displayTopKeeper()}
                        </ul>
                    </div>
                </Flex>
                
                <Flex direction="row" justifyContent="left" alignItems="left" margin={'1rem'}>
                    <div style={divStyle}>
                    <h4 style={hStyle}>POTW:</h4>
                        <ul style={hStyle}>
                            {displayPlayerOfTheWeek()}
                        </ul>
                    </div>
                </Flex>

                <Flex direction="row" justifyContent="left" alignItems="left" margin={'1rem'}>
                    <div style={divStyle}>
                    <h4 style={hStyle}>Keeper of the week:</h4>
                        <ul style={hStyle}>
                            {displayKeeperOfTheWeek()}
                        </ul>
                    </div>
                </Flex>

                <Flex direction="row" justifyContent="left" alignItems="left" margin={'1rem'}>
                    <div style={divStyle}>
                    <h4 style={hStyle}>Top Goalscorers:</h4>
                        <ul style={hStyle}>
                            {displayTopGoalScorers()}
                        </ul>
                    </div>
                </Flex>

                <Flex direction="row" justifyContent="left" alignItems="left" margin={'1rem'}>
                    <div style={divStyle}>
                    <h4 style={hStyle}>Top Keepers:</h4>
                        <ul style={hStyle}>
                            {displayTopKeepers()}
                        </ul>
                    </div>
                </Flex>

            </View>
        );
    }

    if (generateReportClicked){
        return displayReport();
      }
      else{
        return calcStats();
      }
};

export default (CalculateStats);