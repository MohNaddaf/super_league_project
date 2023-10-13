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

const CalculateStats = ({ signOut }) => {
    const [selectedSeason, setSelectedSeason] = useState("");
    const [selectedDivision, setSelectedDivision] = useState("");
    const [selectedGameNumber, setSelectedGameNumber] = useState("");
    const [selectedNumPlayers, setSelectedNumPlayers] = useState("");
    const [topGoalScorers, setTopGoalScorers] = useState([]);
    const [topPlayersForWeek, setTopPlayersForWeek] = useState([]);
    const [topPlayersForPositionForWeek, setTopPlayersForPositionForWeek] = useState({});
    const [allPositions, setAllPositions] = useState(["Center back / Defense", "Center Midfield", "Right Midfield", "Left Midfield", "Striker"]);
    const [allChecked, setAllChecked] = React.useState([]);
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
            apiData = await API.graphql(graphqlOperation(queries.listRegisteredTeams));
        }
        else{            
            apiData = await API.graphql(graphqlOperation(queries.listRegisteredTeams, { filter: { season: { eq: season }}}));
        }
        
        const teamsFromAPI = apiData.data.listRegisteredTeams.items;
        var divs = [];
        for (var i=0; i<teamsFromAPI.length;i++) {
            if (divs.includes(teamsFromAPI[i].divison) == false) {
                divs.push(teamsFromAPI[i].divison);
            }
        }

        createDivisions(divs);
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

    async function updateDivisions(season) {
        setSelectedSeason(season);        
        fetchDivisions(season);  
    }

    function computeStatistics() {   
        fetchPlayers();
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
                        onChange={(e) => setSelectedDivision(e.target.value)}
                        >
                        <option value="Div A">Div A</option>
                        <option value="Div B">Div B</option>
                        <option value="PREM">PREM</option>
                        <option value="COED">COED</option>
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
                    <List sx={{ width: '100%', maxWidth: Dimensions.get('window').width/4, bgcolor: 'background.paper' }} subheader={<ListSubheader style={hStyle} component="div" id="top-5-players-for-week-subheader">Most Contributions For Week {selectedGameNumber}</ListSubheader>}>
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

                    <List sx={{ width: '100%', maxWidth: Dimensions.get('window').width/4, bgcolor: 'background.paper' }} subheader={<ListSubheader style={hStyle} component="div" id="top-5-goal-scorers-for-week-subheader">Most Contributions Per Position for Week {selectedGameNumber}</ListSubheader>}>
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

                    <List sx={{ width: '100%', maxWidth: Dimensions.get('window').width/4, bgcolor: 'background.paper' }} subheader={<ListSubheader style={hStyle} component="div" id="top-5-goal-scorers-subheader">Top Goal Scorers Until Week {selectedGameNumber}</ListSubheader>}>
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

    function displayPlayerOfTheWeek(){
        return (
            allTopPlayersOfWeekPlayers.map((player) => {
                return (
                    <li>{player.firstName} {player.lastName} - {player.teamName} ({player.goals} goals + {player.assists} assists)</li>
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

    function displayReport() {          
        return (
            <View className="Referee">
                
                <Flex direction="row" justifyContent="center" alignItems="left">
                    <h1 style={hStyle}>{selectedSeason} - {selectedDivision}</h1> 
                </Flex>

                <Flex direction="row" justifyContent="left" alignItems="left" margin={'1rem'}>
                    <div style={divStyle}>
                        <h4 style={hStyle}>{selectedDivision} - Week {selectedGameNumber}</h4>
                    </div>
                </Flex>

                <Flex direction="row" justifyContent="left" alignItems="left" margin={'1rem'}>
                    <div style={divStyle}>
                    <h4 style={hStyle}>Week {selectedGameNumber} TOTW:</h4>
                        <ul style={hStyle}>
                            {displayTopPlayersFromEachPosition()}
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
                    <h4 style={hStyle}>Top Goalscorers:</h4>
                        <ul style={hStyle}>
                            {displayTopGoalScorers()}
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