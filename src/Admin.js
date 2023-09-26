import React, { useState, useEffect } from "react";
import "./Referee.css";
import "@aws-amplify/ui-react/styles.css";
import {
  Button,
  Flex,
  View,
  TextField,
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

import {
  createRefs as createReferee
} from "./graphql/mutations";

import {
  createRegisteredTeams as createTeam
} from "./graphql/mutations";

const Admin = ({ signOut }) => {
    const [value, setValue] = React.useState(0);
    const [playerRows, setPlayerRows] = React.useState([]);
    const [matchRows, setMatchRows] = React.useState([]);
    const [selectedSeason, setSelectedSeason] = useState("");
  
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

    const matchColumns = [      
      { field: "id", hide: true },
      { field: "season", headerName: "Season", width: 150 },
      { field: "division", headerName: "Division", width: 150 },
      { field: "year", headerName: "Year", width: 150 },
      { field: "hometeam", headerName: "Home Team", width: 150 },
      { field: "awayteam", headerName: "Away Team", width: 150 },
      { field: "hometeamscore", headerName: "Home Team Score", width: 150 },
      { field: "awayteamscore", headerName: "Away Team Score", width: 150 },
      { field: "referee", headerName: "Referee", width: 150 }
  ];

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

    async function getReferee(refID) {
      var response = await API.graphql(graphqlOperation(queries.listRefs, { filter: {id: { eq: refID }}}));
      const refName = response.data.listRefs.items[0].firstname + " " + response.data.listRefs.items[0].lastname;      
      return refName;      
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
                onroster: player.onRoster
            }

            allRows.push(row);            
        }

        setPlayerRows(allRows);              
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
              referee: ref
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
          if (newValue==3) {            
            fetchSeasons();
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

    async function fetchSeasons() {
      API.graphql(graphqlOperation(listSeasons, { filter: { year: { eq: new Date().getFullYear() }}})).then((response) => {
        const seasonsFromAPI = response.data.listSeasons.items;            
        createSeasons(seasonsFromAPI);      
      });    
    }

    function createSeasons(seasons){    
      var str="<option value=0>SELECT SEASON</option>";
      for (var i = 0; i < seasons.length; i++){
        var season = seasons[i];
        str+="<option value=" + season.season + ">" + season.season + "</option>";      
      }
      document.getElementById("allseasonsadd").innerHTML = str;
      console.log("HERE");
    }  


    function removePlayersView() {
      return (
        <div style={{ height: Dimensions.get('window').height / 100 * 60, width: "100%" }}>
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
                  onChange={(e) => setSelectedSeason(e.target.value)}           
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
                      >
                      <option value="Div A">Div A</option>
                      <option value="Div B">Div B</option>
                      <option value="PREM">PREM</option>
                      <option value="COED">COED</option>
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
            <StyledDataGrid onRowSelectionModelChange={handleRowSelection} disableColumnFilter disableColumnMenu disableDensitySelector disableColumnSelector rows={matchRows} columns={matchColumns} slots={{ toolbar: GridToolbar }}
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

      console.log(data);      
    
      await API.graphql({
        query: createTeam,
        variables: { input: data },
      });              

      alert("Team added succesfully");

      event.target.reset();        
    }

    function adminOptions() {
        return (
            <div>
                <Box className="Refereee" sx={{ width: '100%', backgroundColor: 'orange', margin:'' }}>
                    <Tabs value={value} onChange={handleChange} aria-label="nav tabs example">
                        <LinkTab  label="Calculate Player Stats"/>
                        <LinkTab label="Remove Players"/>
                        <LinkTab label="Add Referees"/>
                        <LinkTab label="Add Team"/>
                        <LinkTab label="Match History"/>
                    </Tabs>
                </Box>
                
                {value == 0 ? <CalculateStats/> : value == 1 ? removePlayersView() : value == 2 ? manageRefView() : value == 3 ? addTeamView() : matchHistoryView()}              
            </div>
        );
    }

    return adminOptions();
};

export default (Admin);