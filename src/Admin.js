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

const Admin = ({ signOut }) => {
    const [selectedSeason, setSelectedSeason] = useState("");
    const [selectedDivision, setSelectedDivision] = useState("");
    const [selectedGameNumber, setSelectedGameNumber] = useState("");
    const [topGoalScorers, setTopGoalScorers] = useState([]);
    const [topPlayersForWeek, setTopPlayersForWeek] = useState([]);
    const [topPlayersForPositionForWeek, setTopPlayersForPositionForWeek] = useState({});
    const [allPositions, setAllPositions] = useState(["Center back / Defense", "Center Midfield", "Right Midfield", "Left Midfield", "Striker"]);

    
    const hStyle = { color: 'orange', 'font-size': `18px`};
    const textboxStyle = {
        backgroundColor: 'white',
        border: `1px solid`,
        width: Dimensions.get('window').width / 100 * 60,
        margin: '1rem 0'
    };

    useEffect(() => {
        fetchSeasons();
        fetchDivisions();
    }, []);
   
    async function fetchSeasons() {
        API.graphql(graphqlOperation(listSeasons, { filter: { year: { eq: new Date().getFullYear() }}})).then((response) => {
            const seasonsFromAPI = response.data.listSeasons.items;
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

    function calculateTopPlayersForWeek(players) {
        var topPlayers = [];                

        for (var i=0;i<players.length;i++){
            var player=players[i];

            if (player.goals=="" || player.goals==undefined) {
                continue;
            }

            var goalsToList = player.goals.split(",");
            if (goalsToList[parseInt(selectedGameNumber)-1]==undefined) {
                continue;
            }

            var assistsToList = player.assists.split(",");
            var contributionsToList = player.contributions.split(",");
            
            var person = {firstName: player.firstname, lastName:player.lastname, teamName:player.teamname, goals:parseInt(goalsToList[parseInt(selectedGameNumber)-1]), assists: parseInt(assistsToList[parseInt(selectedGameNumber)-1]), contributions: parseInt(contributionsToList[parseInt(selectedGameNumber)-1])};
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
        setTopPlayersForWeek(topPlayers.slice(0, 5));        
    }
  
    function calculateTopPlayersForEachPositionForWeek(players) {
        var topPlayers = [];                

        for (var i=0;i<players.length;i++){
            var player=players[i];

            if (player.goals=="" || player.goals==undefined) {
                continue;
            }

            var goalsToList = player.goals.split(",");
            if (goalsToList[parseInt(selectedGameNumber)-1]==undefined) {
                continue;
            }

            var assistsToList = player.assists.split(",");
            var contributionsToList = player.contributions.split(",");         
            var person = {firstName: player.firstname, lastName:player.lastname, teamName:player.teamname, goals:parseInt(goalsToList[parseInt(selectedGameNumber)-1]), assists: parseInt(assistsToList[parseInt(selectedGameNumber)-1]), contributions: parseInt(contributionsToList[parseInt(selectedGameNumber)-1])};

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
            topPlayers[key] = topPlayers[key].slice(0, 5);
        }

        setTopPlayersForPositionForWeek(topPlayers);    
    }

    function calculateTopGoalScorers(players) {
        var topScorers = [];                

        for (var i=0;i<players.length;i++){
            var player=players[i];
            var totalGoals=0;
            if (player.goals=="" || player.goals==undefined) {
                continue;
            }

            var goalsToList = player.goals.split(",");
            for (var x=0; x<goalsToList.length; x++) {
                var goal = parseInt(goalsToList[x]);
                totalGoals+=goal;
            }
            
            var person = {firstName: player.firstname, lastName:player.lastname, teamName:player.teamname, goals:totalGoals};
            topScorers.push(person);
        }
        
        //sort all player goals highest to lowest
        topScorers.sort(function(a, b) {
            var keyA = a.goals,
                keyB = b.goals;
            
            if (keyA < keyB) return 1;
            if (keyA > keyB) return -1;
            return 0;
        });

        //select MAX top 5 players
        setTopGoalScorers(topScorers.slice(0, 5));              
    }

    async function fetchPlayers() {            
        API.graphql(graphqlOperation(queries.listRegisteredPlayers, { filter: {season: { eq: selectedSeason }, division: { eq: selectedDivision }}})).then((response) => {
            const playersFromAPI = response.data.listRegisteredPlayers.items;
            calculateTopPlayersForWeek(playersFromAPI);
            calculateTopGoalScorers(playersFromAPI);
            calculateTopPlayersForEachPositionForWeek(playersFromAPI);
        });          
    }

    function adminPage()   {          
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
    
                <Button onClick={computeStatistics} type="submit" variation="primary">
                Calculate Statistics
                </Button>
                
                <Flex direction="row" justifyContent="left" margin={"10rem"} inputStyles={textboxStyle}>             
                    <List sx={{ width: '100%', maxWidth: Dimensions.get('window').width/4, bgcolor: 'background.paper' }} subheader={<ListSubheader style={hStyle} component="div" id="top-5-players-for-week-subheader">Top Players for Week {selectedGameNumber}</ListSubheader>}>
                        {topPlayersForWeek.map((value) => {
                            return (
                                <ListItem>
                                    <ListItemAvatar>
                                    <Avatar>
                                        <PersonIcon />
                                    </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText primary={`${value.firstName} ${value.lastName} with ${value.goals} goals and ${value.assists} assists`} secondary={`${value.teamName}`} />
                                </ListItem>
                            );
                        })}
                    </List>

                    <List sx={{ width: '100%', maxWidth: Dimensions.get('window').width/4, bgcolor: 'background.paper' }} subheader={<ListSubheader style={hStyle} component="div" id="top-5-goal-scorers-for-week-subheader">Top Goal Scorers for Week {selectedGameNumber}</ListSubheader>}>
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
                                        {console.log(topPlayersForPositionForWeek)}
                                        <List component="div" disablePadding>
                                        {topPlayersForPositionForWeek[value]!=undefined && (topPlayersForPositionForWeek[value].map((player) => {
                                            return (
                                                <ListItem sx={{ pl: 4 }}>
                                                    <PersonIcon>
                                                    <StarBorder />
                                                    </PersonIcon>
                                                    <ListItemText primary={`${player.firstName} ${player.lastName} with ${player.goals} goals and ${player.assists} assists`} secondary={`${player.teamName}`} />
                                                </ListItem>
                                            );
                                            }))}
                                        
                                        </List>
                                    </Collapse>
                                </>
                                
                            );
                        })}
                    </List>

                    <List sx={{ width: '100%', maxWidth: Dimensions.get('window').width/4, bgcolor: 'background.paper' }} subheader={<ListSubheader style={hStyle} component="div" id="top-5-goal-scorers-subheader">Top Goal Scorers So Far</ListSubheader>}>
                        {topGoalScorers.map((value) => {
                            return (
                                <ListItem>
                                    <ListItemAvatar>
                                    <Avatar>
                                        <PersonIcon />
                                    </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText primary={`${value.firstName} ${value.lastName} with ${value.goals} goals`} secondary={`${value.teamName}`} />
                                </ListItem>
                            );
                        })}
                    </List>
                </Flex>        
            </View>                        
        );
    }

    return adminPage();
};

export default (Admin);