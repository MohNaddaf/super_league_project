import React, { useState, useEffect, useReducer} from "react";
import "./Referee.css";
import "@aws-amplify/ui-react/styles.css";
import {
  Button,
  Flex,
  View,
  TextField,
  Heading,
  SelectField
} from "@aws-amplify/ui-react";
import * as queries from "./graphql/queries";
import * as mutations from "./graphql/mutations";
import CalculateStats from "./CalculateStats";
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { DataGrid, GridToolbar, gridClasses} from "@mui/x-data-grid";
import { alpha, styled } from '@mui/material/styles';
import { API, graphqlOperation} from "aws-amplify";
import { Dimensions } from "react-native";
import { listSeasons } from "./graphql/queries";
import { Auth } from 'aws-amplify'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';

import {
  createRefs as createReferee
} from "./graphql/mutations";

import {
  createRegisteredTeams as createTeam
} from "./graphql/mutations";

import {
  createSeasons as createSeason
} from "./graphql/mutations";

import {
  createDivisions as createDivision
} from "./graphql/mutations";

import {
  createRegisteredPlayers as createRegisteredPlayerMutation
} from "./graphql/mutations";

const Admin = ({ signOut }) => {
    const [value, setValue] = React.useState(0);
    const [playerRows, setPlayerRows] = React.useState([]);
    const [playerInstagramRows, setPlayerInstagramRows] = React.useState([]);
    const [matchRows, setMatchRows] = React.useState([]);
    const [selectedSeason, setSelectedSeason] = useState("");    
    const [currentHomeTeamScore, setCurrentHomeTeamScore] = useState(0);
    const [currentAwayTeamScore, setCurrentAwayTeamScore] = useState(0);
    const [selectedPlayer, setSelectedPlayer] = useState({});
    const [homeTeamPlayers, setHomeTeamPlayers] = useState([]);
    const [awayTeamPlayers, setAwayTeamPlayers] = useState([]);
    const [selectedMatch, setSelectedMatch] = useState("");
    const [homeTeamName, setHomeTeamName] = useState("");
    const [awayTeamName, setAwayTeamName] = useState("");
    const [homeOrAway, setHomeOrAway] = useState("");
    const [, forceUpdate] = useReducer(x => x + 1, 0);

    const playerColumns = [
        { field: "id", hide: true },
        { field: "fname", headerName: "First Name", width: 150 },
        { field: "lname", headerName: "Last Name", width: 150 },
        { field: "teamname", headerName: "Team Name", width: 150 },
        { field: "season", headerName: "Season", width: 150 },
        { field: "division", headerName: "Division", width: 150 },
        { field: "year", headerName: "Year", width: 150 },
        { field: "onroster", headerName: "Is On Roster", width: 150 }
    ];

    const playerInstagramColumns = [
      { field: "id", hide: true },
      { field: "fname", headerName: "First Name", width: 150 },
      { field: "lname", headerName: "Last Name", width: 150 },
      { field: "instagramhandle", headerName: "Instagram Handle", width: 150 }
    ];

    const matchColumns = [      
      { field: "id", hide: true },
      { field: "season", headerName: "Season", width: 150 },
      { field: "division", headerName: "Division", width: 150 },
      { field: "year", headerName: "Year", width: 150 },
      { field: "hometeam", headerName: "Home Team", width: 150 },
      { field: "awayteam", headerName: "Away Team", width: 150 },
      { field: "hometeamscore", headerName: "Home Team Score", width: 150 },
      { field: "awayteamscore", headerName: "Away Team Score", width: 150 },
      { field: "referee", headerName: "Referee", width: 150 },
      { field: "gamedate", headerName: "Game Date", width: 150 }
  ];

  const handleToggle = (value, homeoraway) => () => {      
      setSelectedPlayer(value);
      setHomeOrAway(homeoraway);    
  };

  const hStyle = { color: 'orange'};


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

      const textboxStyle = {
        backgroundColor: 'white',
        border: `1px solid`,
        width: Dimensions.get('window').width / 100 * 60,
        margin: '1rem 0'
      };

    var selectedPlayers = [];

    useEffect(() => {
        fetchPlayers();
        fetchMatches();
    }, []);

    function customCheckbox(theme) {
        return {
          '& .MuiCheckbox-root svg': {
            width: 16,
            height: 16,
            backgroundColor: 'transparent',
            border: `1px solid ${
              theme.palette.mode === 'light' ? '#d9d9d9' : 'rgb(67, 67, 67)'
            }`,
            borderRadius: 2,
          },
          '& .MuiCheckbox-root svg path': {
            display: 'none',
          },
          '& .MuiCheckbox-root.Mui-checked:not(.MuiCheckbox-indeterminate) svg': {
            backgroundColor: '#1890ff',
            borderColor: '#1890ff',
          },
          '& .MuiCheckbox-root.Mui-checked .MuiIconButton-label:after': {
            position: 'absolute',
            display: 'table',
            border: '2px solid #fff',
            borderTop: 0,
            borderLeft: 0,
            transform: 'rotate(45deg) translate(-50%,-50%)',
            opacity: 1,
            transition: 'all .2s cubic-bezier(.12,.4,.29,1.46) .1s',
            content: '""',
            top: '50%',
            left: '39%',
            width: 5.71428571,
            height: 9.14285714,
          },
          '& .MuiCheckbox-root.MuiCheckbox-indeterminate .MuiIconButton-label:after': {
            width: 8,
            height: 8,
            backgroundColor: '#1890ff',
            transform: 'none',
            top: '39%',
            border: 0,
          },
        };
    }
      
    const StyledDataGrid = styled(DataGrid)(({ theme }) => ({
    border: 0,        
    color:
        theme.palette.mode === 'light' ? 'orange' : 'rgba(0,0,0,0.85)',
    fontFamily: [
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
    ].join(','),
    WebkitFontSmoothing: 'auto',
    letterSpacing: 'normal',
    '& .MuiDataGrid-columnsContainer': {
        backgroundColor: theme.palette.mode === 'light' ? '#fafafa' : '#1d1d1d',
    },
    '& .MuiDataGrid-iconSeparator': {
        display: 'none',
    },
    '& .MuiDataGrid-columnHeader, .MuiDataGrid-cell': {
        borderRight: `1px solid ${
        theme.palette.mode === 'light' ? '#f0f0f0' : '#303030'
        }`,
    },
    '& .MuiDataGrid-columnsContainer, .MuiDataGrid-cell': {
        borderBottom: `1px solid ${
        theme.palette.mode === 'light' ? '#f0f0f0' : '#303030'
        }`,
    },
    '& .MuiDataGrid-cell': {
        color:
        theme.palette.mode === 'light' ? 'rgba(0,0,0,.85)' : 'rgba(255,255,255,0.65)',
    },
    '& .MuiPaginationItem-root': {
        borderRadius: 0,
    },
    ...customCheckbox(theme),
    }));

    function addGoal() {

      if (homeOrAway=="") {
        return;
      }      

      if (homeOrAway=="Home"){

        var playersBeforeUpdate = homeTeamPlayers;
        
        setCurrentHomeTeamScore(parseInt(currentHomeTeamScore)+1);

        for (var i=0; i< homeTeamPlayers.length;i++){
          if (selectedPlayer.id == homeTeamPlayers[i].id) {
            playersBeforeUpdate[i].currGoals++;
            playersBeforeUpdate[i].currContributions++;

            playersBeforeUpdate[i].allGoals[playersBeforeUpdate[i].gameNum-1] = parseInt(playersBeforeUpdate[i].allGoals[playersBeforeUpdate[i].gameNum-1])+1;
            playersBeforeUpdate[i].allContributions[playersBeforeUpdate[i].gameNum-1] = parseInt(playersBeforeUpdate[i].allContributions[playersBeforeUpdate[i].gameNum-1])+1;
          }
        }      
      }

      else {
        var playersBeforeUpdate = awayTeamPlayers;
        
        setCurrentAwayTeamScore(parseInt(currentAwayTeamScore)+1);

        for (var i=0; i< awayTeamPlayers.length;i++){
          if (selectedPlayer.id == awayTeamPlayers[i].id) {
            playersBeforeUpdate[i].currGoals++;
            playersBeforeUpdate[i].currContributions++;

            playersBeforeUpdate[i].allGoals[playersBeforeUpdate[i].gameNum-1] = parseInt(playersBeforeUpdate[i].allGoals[playersBeforeUpdate[i].gameNum-1])+1;
            playersBeforeUpdate[i].allContributions[playersBeforeUpdate[i].gameNum-1] = parseInt(playersBeforeUpdate[i].allContributions[playersBeforeUpdate[i].gameNum-1])+1;
          }
        }
      }      
    }

    function addAssist() {
      if (homeOrAway=="") {
        return;
      }      

      if (homeOrAway=="Home"){

        var playersBeforeUpdate = homeTeamPlayers;
        
        for (var i=0; i< homeTeamPlayers.length;i++){
          if (selectedPlayer.id == homeTeamPlayers[i].id) {
            playersBeforeUpdate[i].currAssists++;
            playersBeforeUpdate[i].currContributions++;

            playersBeforeUpdate[i].allAssists[playersBeforeUpdate[i].gameNum-1] = parseInt(playersBeforeUpdate[i].allAssists[playersBeforeUpdate[i].gameNum-1])+1;
            playersBeforeUpdate[i].allContributions[playersBeforeUpdate[i].gameNum-1] = parseInt(playersBeforeUpdate[i].allContributions[playersBeforeUpdate[i].gameNum-1])+1;
          }
        }
        forceUpdate();
      }

      else {
        var playersBeforeUpdate = awayTeamPlayers;        

        for (var i=0; i< awayTeamPlayers.length;i++){
          if (selectedPlayer.id == awayTeamPlayers[i].id) {
            playersBeforeUpdate[i].currAssists++;
            playersBeforeUpdate[i].currContributions++;

            playersBeforeUpdate[i].allAssists[playersBeforeUpdate[i].gameNum-1] = parseInt(playersBeforeUpdate[i].allAssists[playersBeforeUpdate[i].gameNum-1])+1;
            playersBeforeUpdate[i].allContributions[playersBeforeUpdate[i].gameNum-1] = parseInt(playersBeforeUpdate[i].allContributions[playersBeforeUpdate[i].gameNum-1])+1;
          }
        }
        forceUpdate();
      } 
    }

    function removeGoal(){
      if (homeOrAway=="") {
        return;
      }      

      if (homeOrAway=="Home"){

        var playersBeforeUpdate = homeTeamPlayers;
        
        for (var i=0; i< homeTeamPlayers.length;i++){
          if (selectedPlayer.id == homeTeamPlayers[i].id) {

            if (playersBeforeUpdate[i].currGoals == 0) {
              return;
            }

            playersBeforeUpdate[i].currGoals--;
            playersBeforeUpdate[i].currContributions--;

            playersBeforeUpdate[i].allGoals[playersBeforeUpdate[i].gameNum-1] = parseInt(playersBeforeUpdate[i].allGoals[playersBeforeUpdate[i].gameNum-1])-1;
            playersBeforeUpdate[i].allContributions[playersBeforeUpdate[i].gameNum-1] = parseInt(playersBeforeUpdate[i].allContributions[playersBeforeUpdate[i].gameNum-1])-1;
          
            setCurrentHomeTeamScore(parseInt(currentHomeTeamScore)-1);
          }
        }      
      }

      else {
        var playersBeforeUpdate = awayTeamPlayers;
        
        for (var i=0; i< awayTeamPlayers.length;i++){
          if (selectedPlayer.id == awayTeamPlayers[i].id) {

            if (playersBeforeUpdate[i].currGoals == 0) {
              return;
            }

            playersBeforeUpdate[i].currGoals--;
            playersBeforeUpdate[i].currContributions--;

            playersBeforeUpdate[i].allGoals[playersBeforeUpdate[i].gameNum-1] = parseInt(playersBeforeUpdate[i].allGoals[playersBeforeUpdate[i].gameNum-1])-1;
            playersBeforeUpdate[i].allContributions[playersBeforeUpdate[i].gameNum-1] = parseInt(playersBeforeUpdate[i].allContributions[playersBeforeUpdate[i].gameNum-1])-1;
            
            setCurrentAwayTeamScore(parseInt(currentAwayTeamScore)-1);
          }
        }
      }
    }

    function removeAssist() {
      if (homeOrAway=="") {
        return;
      }      

      if (homeOrAway=="Home"){

        var playersBeforeUpdate = homeTeamPlayers;
        
        for (var i=0; i< homeTeamPlayers.length;i++){
          if (selectedPlayer.id == homeTeamPlayers[i].id) {

            if (playersBeforeUpdate[i].currAssists == 0) {
              return;
            }

            playersBeforeUpdate[i].currAssists--;
            playersBeforeUpdate[i].currContributions--;

            playersBeforeUpdate[i].allAssists[playersBeforeUpdate[i].gameNum-1] = parseInt(playersBeforeUpdate[i].allAssists[playersBeforeUpdate[i].gameNum-1])-1;
            playersBeforeUpdate[i].allContributions[playersBeforeUpdate[i].gameNum-1] = parseInt(playersBeforeUpdate[i].allContributions[playersBeforeUpdate[i].gameNum-1])-1;          
          }
        } 
        forceUpdate();
      }

      else {
        var playersBeforeUpdate = awayTeamPlayers;
        
        for (var i=0; i< awayTeamPlayers.length;i++){
          if (selectedPlayer.id == awayTeamPlayers[i].id) {

            if (playersBeforeUpdate[i].currAssists == 0) {
              return;
            }

            playersBeforeUpdate[i].currAssists--;
            playersBeforeUpdate[i].currContributions--;

            playersBeforeUpdate[i].allAssists[playersBeforeUpdate[i].gameNum-1] = parseInt(playersBeforeUpdate[i].allAssists[playersBeforeUpdate[i].gameNum-1])-1;
            playersBeforeUpdate[i].allContributions[playersBeforeUpdate[i].gameNum-1] = parseInt(playersBeforeUpdate[i].allContributions[playersBeforeUpdate[i].gameNum-1])-1;                        
          }
        }
        forceUpdate();
      }
    }

    async function SaveMatchEdit() {      

      for (var i=0; i<homeTeamPlayers.length; i++) {
        const informationToUpdate = {
            id: homeTeamPlayers[i].id,
            goals: homeTeamPlayers[i].allGoals.toString(),
            assists: homeTeamPlayers[i].allAssists.toString(),
            contributions: homeTeamPlayers[i].allContributions.toString()
        };
        
        await API.graphql({ 
            query: mutations.updateRegisteredPlayers, 
            variables: { input: informationToUpdate }
        });
      }

      for (var i=0; i<awayTeamPlayers.length; i++) {
        const informationToUpdate = {
            id: awayTeamPlayers[i].id,
            goals: awayTeamPlayers[i].allGoals.toString(),
            assists: awayTeamPlayers[i].allAssists.toString(),
            contributions: awayTeamPlayers[i].allContributions.toString()
        };
        
        await API.graphql({ 
            query: mutations.updateRegisteredPlayers, 
            variables: { input: informationToUpdate }
        });
      }

      //update match score
      const updatedMatchInformation = {
        id: selectedMatch,
        hometeamscore: currentHomeTeamScore,
        awayteamscore: currentAwayTeamScore
      };

      await API.graphql({ 
        query: mutations.updateMatches, 
        variables: { input: updatedMatchInformation }
      });

      window.location.reload();
    }

    async function getReferee(refID) {
      var response = await API.graphql(graphqlOperation(queries.listRefs, { filter: {id: { eq: refID }}}));
      const refName = response.data.listRefs.items[0].firstname + " " + response.data.listRefs.items[0].lastname;      
      return refName;      
    }

    async function updateDivisions(season) {
      setSelectedSeason(season);        
      fetchDivisions(season);
    }
    
    async function fetchPlayers() {
        API.graphql(graphqlOperation(queries.listRegisteredPlayers)).then(async (response) => {
            const playersFromAPI = response.data.listRegisteredPlayers.items;

            var token = response.data.listRegisteredPlayers.nextToken;
            
            while (token!=null) {
                var results = await API.graphql(graphqlOperation(queries.listRegisteredPlayers, {nextToken:token}));
                playersFromAPI.push.apply(playersFromAPI, results.data.listRegisteredPlayers.items);
                token = results.data.listRegisteredPlayers.nextToken;
            }

            createPlayersTable(playersFromAPI);
        });  
    }

    async function fetchMatches() {
      API.graphql(graphqlOperation(queries.listMatches)).then(async (response) => {
          const matchesFromAPI = response.data.listMatches.items;

          var token = response.data.listMatches.nextToken;
          
          while (token!=null) {
              var results = await API.graphql(graphqlOperation(queries.listMatches, {nextToken:token}));
              matchesFromAPI.push.apply(matchesFromAPI, results.data.listMatches.items);
              token = results.data.listMatches.nextToken;
          }

          createMatchHistoryTable(matchesFromAPI);
      });  
  }

    function createPlayersTable(players) {
        var allRows = [];

        for (var i=0; i<players.length;i++){
            var player = players[i];
            var row = {
                id: player.id,
                fname: player.firstname,
                lname: player.lastname,
                teamname: player.teamname,
                season: player.season,
                division: player.division,
                year: player.year,
                onroster: player.onRoster,
                instagramhandle: player.instagramhandle
            }

            allRows.push(row);            
        }

        setPlayerRows(allRows);
        setPlayerInstagramRows(allRows);
    }            

    async function createMatchHistoryTable(matches) {
      var allRows = [];      
      for (var i=0; i<matches.length;i++){
          var match = matches[i];
          var ref = await getReferee(match.referee);                
   
          var row = {
              id: match.id,             
              season: match.season,
              division: match.division,
              year: match.year,
              hometeam: match.hometeam,
              awayteam: match.awayteam,
              hometeamscore: match.hometeamscore,
              awayteamscore: match.awayteamscore,
              referee: ref,
              gamedate: match.gamedate
          }

          allRows.push(row);            
      }

      setMatchRows(allRows);              
  }

    const handleChange = (event, newValue) => {
        // event.type can be equal to focus with selectionFollowsFocus.
        if (
          event.type !== 'click' ||
          (event.type === 'click' && samePageLinkNavigation(event))
        ) {
          setValue(newValue);

          if (newValue==5) {            
            fetchSeasons();
            fetchDivisions();
          }   
          if (newValue==3) {            
            fetchSeasonsForDivision();
          }       
        }
      };

    function samePageLinkNavigation(event) {
        if (
          event.defaultPrevented ||
          event.button !== 0 || // ignore everything but left-click
          event.metaKey ||
          event.ctrlKey ||
          event.altKey ||
          event.shiftKey
        ) {
          return false;
        }
        return true;
    }

    function LinkTab(props) {
        return (
          <Tab
            component="a"
            onClick={(event) => {
              // Routing libraries handle this, you can remove the onClick handle when using them.
              if (samePageLinkNavigation(event)) {
                event.preventDefault();
              }
            }}
            {...props}
          />
        );
      }

    function handleRowSelection(e) {       
        selectedPlayers = e;                      
    }

    function removePlayers() {
        console.log(selectedPlayers);
        for (var i=0; i<selectedPlayers.length;i++) {
            removePlayerFromRoster(selectedPlayers[i]);
        }
    }

    function deleteMatch() {
      if (window.confirm("Are you sure that you want to delete this match!")) {
        for (var i=0; i<selectedPlayers.length;i++) {
          removeMatch(selectedPlayers[i]);
        }
      }
    }

    async function editMatch() {
      if (selectedPlayers.length>1 || selectedPlayers.length==0) {
        alert("Please select only one match to edit");
      }
      else{
        var match = await API.graphql(graphqlOperation(queries.getMatches, { id: selectedPlayers[0]}));
        console.log(match);
        if (match.data.getMatches.hometeamgamenumber == null || match.data.getMatches.awayteamgamenumber == null) {
          alert("This match does not support editing. It is missing a gamenumber, most likely since it was recorded from a older season");
          return;
        }
        populateMatchEdit();
        setValue(99);
      }
    }

    async function populateMatchEdit() {
      // fetch match info
      var match = await API.graphql(graphqlOperation(queries.getMatches, { id: selectedPlayers[0]}));
      var homeTeam = match.data.getMatches.hometeam;
      var awayTeam = match.data.getMatches.awayteam;
      var homeTeamGameNumber = parseInt(match.data.getMatches.hometeamgamenumber);
      var awayTeamGameNumber = parseInt(match.data.getMatches.awayteamgamenumber);
      var season = match.data.getMatches.season;
      var division = match.data.getMatches.division;            

      setSelectedMatch(match.data.getMatches.id);
      setCurrentHomeTeamScore(match.data.getMatches.hometeamscore);
      setCurrentAwayTeamScore(match.data.getMatches.awayteamscore);
      setHomeTeamName(homeTeam);
      setAwayTeamName(awayTeam);

      //grab all players for hometeam
      var apiData = await API.graphql(graphqlOperation(queries.listRegisteredPlayers, {filter: {season: { eq: season }, division: { eq: division }, teamname: {eq: homeTeam}}}));                
                
      var homePlayers = apiData.data.listRegisteredPlayers.items;

      var token = apiData.data.listRegisteredPlayers.nextToken;
  
      while (token!=null) {
          var apiData = await API.graphql(graphqlOperation(queries.listRegisteredPlayers, {nextToken: token, filter: {season: { eq: season }, division: { eq: division }, teamname: {eq: homeTeam}}}));                
          homePlayers.push.apply(homePlayers, apiData.data.listRegisteredPlayers.items);
          token = apiData.data.listRegisteredPlayers.nextToken;
      }

      //grab all players for awayteam
      var apiData = await API.graphql(graphqlOperation(queries.listRegisteredPlayers, {filter: {season: { eq: season }, division: { eq: division }, teamname: {eq: awayTeam}}}));                
                
      var awayPlayers = apiData.data.listRegisteredPlayers.items;

      var token = apiData.data.listRegisteredPlayers.nextToken;
  
      while (token!=null) {
          var apiData = await API.graphql(graphqlOperation(queries.listRegisteredPlayers, {nextToken: token, filter: {season: { eq: season }, division: { eq: division }, teamname: {eq: awayTeam}}}));                
          awayPlayers.push.apply(awayPlayers, apiData.data.listRegisteredPlayers.items);
          token = apiData.data.listRegisteredPlayers.nextToken;
      }


      var allHomePlayers = [];
      for (var i=0; i<homePlayers.length;i++){

        if (homePlayers[i].goals=="" || homePlayers[i].goals==null)
          continue;

        if (homePlayers[i].assists=="" || homePlayers[i].assists==null)
          continue;

        if (homePlayers[i].contributions=="" || homePlayers[i].contributions==null)
          continue;

        var goalsToList = homePlayers[i].goals.split(",");
        var assistsToList = homePlayers[i].assists.split(",");
        var contributionsToList = homePlayers[i].contributions.split(",");

        var currentGoals = parseInt(goalsToList[homeTeamGameNumber-1]);
        var currentAssists = parseInt(assistsToList[homeTeamGameNumber-1]);
        var currentContributions = parseInt(contributionsToList[homeTeamGameNumber-1]);
        var person = {id: homePlayers[i].id, firstName: homePlayers[i].firstname, lastName:homePlayers[i].lastname, teamName:homePlayers[i].teamname, currGoals: currentGoals, currAssists: currentAssists, currContributions: currentContributions, gameNum: homeTeamGameNumber, allGoals: goalsToList, allAssists: assistsToList, allContributions: contributionsToList};        
        allHomePlayers.push(person);
      }

      setHomeTeamPlayers(allHomePlayers);

      var allAwayPlayers = [];
      for (var i=0; i<awayPlayers.length;i++){

        if (awayPlayers[i].goals=="" || awayPlayers[i].goals==null)
          continue;

        if (awayPlayers[i].assists=="" || awayPlayers[i].assists==null)
          continue;

        if (awayPlayers[i].contributions=="" || awayPlayers[i].contributions==null)
          continue;

        var goalsToList = awayPlayers[i].goals.split(",");
        var assistsToList = awayPlayers[i].assists.split(",");
        var contributionsToList = awayPlayers[i].contributions.split(",");        


        var currentGoals = parseInt(goalsToList[awayTeamGameNumber-1]);
        var currentAssists = parseInt(assistsToList[awayTeamGameNumber-1]);
        var currentContributions = parseInt(contributionsToList[awayTeamGameNumber-1]);
        var person = {id: awayPlayers[i].id, firstName: awayPlayers[i].firstname, lastName:awayPlayers[i].lastname, teamName:awayPlayers[i].teamname, currGoals: currentGoals, currAssists: currentAssists, currContributions: currentContributions, gameNum: awayTeamGameNumber, allGoals: goalsToList, allAssists: assistsToList, allContributions: contributionsToList};        
        allAwayPlayers.push(person);
      }

      setAwayTeamPlayers(allAwayPlayers);
    }

    function displayEditMatch() {
      return (
        <View className="Referee">
          <Heading level={3} style={hStyle}>Score:</Heading>     
          
          <Flex direction="row" justifyContent="center"  >                   
          <Heading level={4} style={hStyle}>{currentHomeTeamScore} - </Heading>
          <Heading level={4} style={{ color: 'green'}}>{currentAwayTeamScore}</Heading>
          </Flex>

          <Flex direction="row" justifyContent="center">          
            <label className="hometeam" style={hometeamstyle}>Home Team: {homeTeamName}</label>
            <label className="awayteam" style={awayteamstyle}>Away Team: {awayTeamName}</label>
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
                                checked={selectedPlayer.id == value.id}
                                tabIndex={-1}
                                disableRipple
                                sx={{padding: 0.5, margin: 0}}
                                />
                            </ListItemIcon>
                            <ListItemText sx={{padding: 0, margin: 0}} primary={`${value.firstName} ${value.lastName} (G: ${value.currGoals} A: ${value.currAssists})`} />
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
                                    checked={selectedPlayer.id == value.id}
                                    tabIndex={-1}
                                    disableRipple
                                    sx={{padding: 0.5, margin: 0}}
                                    />
                                </ListItemIcon>
                                <ListItemText sx={{padding: 0, margin: 0}} primary={`${value.firstName} ${value.lastName} (G: ${value.currGoals} A: ${value.currAssists})`} />                                 
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
                            placeholder={selectedPlayer.currGoals}
                            value={selectedPlayer.currGoals}
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
                            placeholder={selectedPlayer.currAssists}
                            value={selectedPlayer.currAssists}
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
                            <Button onClick={SaveMatchEdit} style={{width: '90%', maxWidth: Dimensions.get('window').width/1.1, backgroundColor: 'purple'}} type="submit" variation="primary" >
                            SAVE MATCH EDIT
                            </Button>
                        </Flex>                         
                    </div>                      
                </div>           
        </View>
      );
    }

    function addPlayers() {
      console.log(selectedPlayers);
      for (var i=0; i<selectedPlayers.length;i++) {
          addPlayerToRoster(selectedPlayers[i]);
      }
    }

    async function addPlayerToRoster(playerid) {
      const informationToUpdate = {
          id: playerid,
          onRoster: true
      };

      const playerReturned = await API.graphql({ 
          query: mutations.updateRegisteredPlayers, 
          variables: { input: informationToUpdate }
      });

      fetchPlayers(); 
  }

    async function removePlayerFromRoster(playerid) {
        const informationToUpdate = {
            id: playerid,
            onRoster: false
        };

        const playerReturned = await API.graphql({ 
            query: mutations.updateRegisteredPlayers, 
            variables: { input: informationToUpdate }
        });

        fetchPlayers(); 
    }

    async function removeMatch(matchID) {
      const idToRemove = {
          id: matchID
      };

      console.log(idToRemove);
      
      await API.graphql({ 
          query: mutations.deleteMatches, 
          variables: { input: idToRemove }
      });

      fetchMatches();
  }

    async function fetchSeasons() {
      API.graphql(graphqlOperation(listSeasons, { filter: { year: { eq: new Date().getFullYear() }}})).then((response) => {
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
          apiData = await API.graphql(graphqlOperation(queries.listDivisions, { filter: { season: { eq: season }, year: { eq: new Date().getFullYear() }}}));
      }
      
      const divisionsFromApi = apiData.data.listDivisions.items;
        
      createDivisions(divisionsFromApi);
    }

    function createDivisions(divisions){          
      var str="<option value=0>SELECT DIVISION</option>";
      for (var i = 0; i < divisions.length; i++){
          var division = divisions[i];
          str+="<option value=" + division.id + ">" + division.division + "</option>";      
      }
      document.getElementById("alldivisions").innerHTML = str;         
    }

    async function fetchSeasonsForDivision() {
      API.graphql(graphqlOperation(listSeasons)).then((response) => {
        const seasonsFromAPI = response.data.listSeasons.items;            
        createSeasonsForDivision(seasonsFromAPI);      
      });    
    }

    function createSeasons(seasons){    
      var str="<option value=0>SELECT SEASON</option>";
      for (var i = 0; i < seasons.length; i++){
        var season = seasons[i];
        str+="<option value=" + season.id + ">" + season.season + " - " + season.year + "</option>";      
      }
      document.getElementById("allseasonsadd").innerHTML = str;
    } 

    function createSeasonsForDivision(seasons){    
      var str="<option value=0>SELECT SEASON</option>";
      for (var i = 0; i < seasons.length; i++){
        var season = seasons[i];
        str+="<option value=" + season.id + ">" + season.season + " - " + season.year + "</option>";      
      }
      document.getElementById("allseasonsfordivision").innerHTML = str;
    } 

    function playerInstagramView() {
      return (
        <div style={{ height: Dimensions.get('window').height, width: "100%" }}>
            <StyledDataGrid onRowSelectionModelChange={handleRowSelection} checkboxSelection disableColumnFilter disableColumnMenu disableDensitySelector disableColumnSelector rows={playerInstagramRows} columns={playerInstagramColumns} slots={{ toolbar: GridToolbar }}
                slotProps={{                    
                    toolbar: {
                        showQuickFilter: true,
                        printOptions: { disableToolbarButton: true },
                        csvOptions: { disableToolbarButton: true },
                        quickFilterProps: { debounceMs: 250 },
                    },
                }}
            />
        </div>
      );
    }

    function removePlayersView() {
      return (
        <div style={{ height: Dimensions.get('window').height / 100 * 85, width: "100%" }}>
            <StyledDataGrid onRowSelectionModelChange={handleRowSelection} checkboxSelection disableColumnFilter disableColumnMenu disableDensitySelector disableColumnSelector rows={playerRows} columns={playerColumns} slots={{ toolbar: GridToolbar }}
                slotProps={{                    
                    toolbar: {                        
                        showQuickFilter: true,
                        printOptions: { disableToolbarButton: true },
                        csvOptions: { disableToolbarButton: true },
                        quickFilterProps: { debounceMs: 250 },
                    },
                }}
            />
            <Button variation="primary" onClick={removePlayers} style={{ margin: 10, backgroundColor: 'red'}}>Remove Players From Roster</Button>
            <Button variation="primary" onClick={addPlayers} style={{ margin: 10, backgroundColor: 'blue'}}>Add Players to Rosters</Button>
          </div>
      );
    }    

    function logOut() {
      Auth.signOut();
    }

    function manageRefView() {
      return (
        <div className="Referee">
        <View as="form"  onSubmit={addRef} style={{width: Dimensions.get('window').width}}> 
            <Flex direction="row" justifyContent="center" alignItems="left">     
              <TextField
                id="fname"
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
                id="lname"
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
                id="email"
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
              <TextField
                id="phone"
                name="phone"
                placeholder="Phone Number (required)"
                label="Phone Number"
                labelHidden
                variation="quiet"
                required
                inputStyles={textboxStyle}
              />    
            </Flex>

            <Button type="submit" variation="primary">
              ADD REFEREE
            </Button>
            </View>
          </div>
      );
    }

    function addSeasonView() {
      return (
        <div className="Referee">
        <View as="form"  onSubmit={addSeason} style={{width: Dimensions.get('window').width}}> 
            <Flex direction="row" justifyContent="center" alignItems="left">     
              <TextField
                id="year"
                name="year"
                placeholder="Year (required)"
                label="Year"
                labelHidden
                variation="quiet"
                required
                inputStyles={textboxStyle}
              />

            </Flex>

            <Flex direction="row" justifyContent="center" >
              <TextField
                id="season"
                name="season"
                placeholder="Season Name (required)"
                label="Season"
                labelHidden
                variation="quiet"
                required
                inputStyles={textboxStyle}
              />    
            </Flex>

            <Button type="submit" variation="primary">
              ADD SEASON
            </Button>
            </View>
          </div>
      );
    }

    function addDivisionView() {
      return (
        <div className="Referee">
          <View as="form"  onSubmit={addDivision} style={{width: Dimensions.get('window').width}}>

            <Flex direction="row" justifyContent="center" >
                <SelectField
                  id="allseasonsfordivision"
                  name="seasonsfordivision"
                  placeholder="SELECT SEASON"
                  label="seasons"
                  labelHidden
                  variation="quiet"
                  required
                  inputStyles={textboxStyle}
                  onChange={(e) => setSelectedSeason(e.target.value)}           
                  >                                   
                  <option value="placeholder">placeholder</option>
                </SelectField>
              </Flex>              

              <Flex direction="row" justifyContent="center" >
                <TextField
                  id="divisionname"
                  name="divisionname"
                  placeholder="Division Name (required)"
                  label="Division Name"
                  labelHidden
                  variation="quiet"
                  required
                  inputStyles={textboxStyle}
                />    
              </Flex>

              <Button type="submit" variation="primary">
                ADD DIVISION
              </Button>
            </View>
          </div>
      );
    }

    function addTeamView() {
      return (
        <div className="Referee">
          <View as="form"  onSubmit={addTeam} style={{width: Dimensions.get('window').width}}>

            <Flex direction="row" justifyContent="center" >
                <SelectField
                  id="allseasonsadd"
                  name="seasons"
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
                      >
                  </SelectField>
              </Flex>         

              <Flex direction="row" justifyContent="center" >
                <TextField
                  id="teamname"
                  name="teamname"
                  placeholder="Team Name (required)"
                  label="Team Name"
                  labelHidden
                  variation="quiet"
                  required
                  inputStyles={textboxStyle}
                />    
              </Flex>

              <Button type="submit" variation="primary">
                ADD TEAM
              </Button>
            </View>
          </div>
      );
    }

    function matchHistoryView() {
      return (
        <div style={{ height: Dimensions.get('window').height / 100 * 60, width: "100%" }}>
            <StyledDataGrid onRowSelectionModelChange={handleRowSelection} checkboxSelection disableColumnFilter disableColumnMenu disableDensitySelector disableColumnSelector rows={matchRows} columns={matchColumns} slots={{ toolbar: GridToolbar }}
                slotProps={{                    
                    toolbar: {                        
                        showQuickFilter: true,
                        printOptions: { disableToolbarButton: true },
                        csvOptions: { disableToolbarButton: true },
                        quickFilterProps: { debounceMs: 250 },
                    },
                }}
            />  
            <Button variation="primary" onClick={deleteMatch} style={{ margin: 10, backgroundColor: 'red'}}>Delete Match</Button>
            <Button variation="primary" onClick={editMatch} style={{ margin: 10, backgroundColor: 'orange'}}>Edit Match</Button>

          </div>
      );
    }

    async function addRef(event) {
      event.preventDefault();

      var firstname = document.getElementById("fname").value
      var lastname = document.getElementById("lname").value;
      var email = document.getElementById("email").value;
      var phonenumber = document.getElementById("phone").value;

      const data = {
        firstname: firstname,
        lastname: lastname,
        email: email,
        phonenumber: phonenumber
      };    
    
      await API.graphql({
        query: createReferee,
        variables: { input: data },
      });              

      alert("Ref added succesfully");

      event.target.reset();            
    }

    async function addSeason(event) {
      event.preventDefault();

      var year = document.getElementById("year").value
      var season = document.getElementById("season").value;
      
      const data = {
        year: year,
        season: season,
        isseasonactive: true
      };    
    
      await API.graphql({
        query: createSeason,
        variables: { input: data },
      });              

      alert("Season added succesfully");

      event.target.reset();            
    }

    async function addDivision(event) {
      event.preventDefault();

      var division = document.getElementById("divisionname").value;
      var season = document.getElementById("allseasonsfordivision").value;
      
      var response = await API.graphql(graphqlOperation(queries.listSeasons, { filter: {id: { eq: season }}}));
      var seasonyear = response.data.listSeasons.items[0].year;

      const data = {
        division: division,
        season: selectedSeason,
        year: seasonyear
      };
    
      await API.graphql({
        query: createDivision,
        variables: { input: data },
      });

      alert("Division added succesfully");

      event.target.reset();        
    }

    async function addTeam(event) {
      event.preventDefault();

      var division = document.getElementById("alldivisions").value;
      var teamname = document.getElementById("teamname").value;
      
      const data = {
        divison: division,
        teamname: teamname,
        season: selectedSeason,
        year: new Date().getFullYear(),
        gamesplayed: 0
      };
                
      var newTeam = await API.graphql({
        query: createTeam,
        variables: { input: data },
      });              
      
      var team = newTeam.data.createRegisteredTeams;      

      const data2 = {
        firstname: "Unassigned",
        lastname: "Player",
        teamname: team.teamname,
        division: team.divison,
        season: team.season,
        position: "Striker",
        email: "noemail@gmail.com",
        teamid: team.id,
        phonenumber: "613-111-1111",
        year: new Date().getFullYear(),
        onRoster: true
      };            
      
      await API.graphql({
        query: createRegisteredPlayerMutation,
        variables: { input: data2 },
      });

      alert("Team added succesfully");

      event.target.reset();        
    }

    function adminOptions() {
        return (
            <div>
                <Box className="Refereee" sx={{ width: '100%', backgroundColor: 'orange', margin:'' }}>
                    <Tabs value={value} onChange={handleChange} aria-label="nav tabs example">                        
                        <LinkTab label="Calculate Player Stats"/>
                        <LinkTab label="Remove Players"/>
                        <LinkTab label="Player Instagrams"/>
                        <LinkTab label="Add Season"/>
                        <LinkTab label="Add Division"/>
                        <LinkTab label="Add Referees"/>
                        <LinkTab label="Add Team"/>
                        <LinkTab label="Match History"/>
                        <LinkTab label="Log Out"/>                        
                    </Tabs>
                </Box>
                
                {value == 0 ? <CalculateStats/> : value == 1 ? removePlayersView() : value == 2 ? playerInstagramView() : value == 3 ? addSeasonView() : value == 4 ? addDivisionView() : value == 5 ? manageRefView() : value == 6 ? addTeamView() : value == 7 ? matchHistoryView() : value == 99 ? displayEditMatch() : logOut()}              
            </div>
        );
    }

    return adminOptions();
};

export default (Admin);