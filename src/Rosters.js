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


  import Table from '@mui/material/Table';
  import TableBody from '@mui/material/TableBody';
  import TableCell, { tableCellClasses } from '@mui/material/TableCell';
  import TableContainer from '@mui/material/TableContainer';
  import TableHead from '@mui/material/TableHead';
  import TableRow from '@mui/material/TableRow';
  import Paper from '@mui/material/Paper';
  import { styled } from '@mui/material/styles';



const Rosters = ({ signOut }) => {
    const [selectedSeason, setSelectedSeason] = useState("");
    const [selectedDivision, setSelectedDivision] = useState("");
    const [selectedTeam, setSelectedTeam] = useState("");
    const [selectedTeamName, setSelectedTeamName] = useState("");
    const [currentRoster, setCurrentRoster] = useState([]);
    const [currentTeamNumGames, setCurrentTeamNumGames] = useState(0);
    const [tableColumns, setTableColumns] = useState([]);



    const hStyle = { color: 'orange',};
    const textboxStyle = {
        backgroundColor: 'white',
        border: `1px solid`,
        width: Dimensions.get('window').width / 100 * 60,
        margin: '1rem 0'
    };

    useEffect(() => {
        fetchSeasons();
        fetchDivisions();
        fetchTeams();
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

    async function fetchTeams(season, division) {    
        var apiData = {};
    
        if (season==undefined || season=="") {
            if (division==undefined || division==""){
              apiData = await API.graphql(graphqlOperation(queries.listRegisteredTeams, { filter: { year: { eq: new Date().getFullYear() }}}));
            }
            else{
              apiData = await API.graphql(graphqlOperation(queries.listRegisteredTeams, { filter: { divison: { eq: division }, year: { eq: new Date().getFullYear() }}}));
            }
        }
        else if (division==undefined || division=="") {
          apiData = await API.graphql(graphqlOperation(queries.listRegisteredTeams, { filter: { season: { eq: season }, year: { eq: new Date().getFullYear() }}}));
        }
        else{
            apiData = await API.graphql(graphqlOperation(queries.listRegisteredTeams, { filter: { season: { eq: season }, divison: { eq: division }, year: { eq: new Date().getFullYear() }}}));
        }
    
        const teamsFromAPI = apiData.data.listRegisteredTeams.items;
        createTeams(teamsFromAPI);
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

    function createTeams(teams){    
        var str="<option value=0>SELECT YOUR TEAM</option>";
        for (var i = 0; i < teams.length; i++){
          var team = teams[i];
          str+="<option value=" + team.id + ">" + team.teamname + " - " + team.divison + "</option>";      
        }
        document.getElementById("allteams").innerHTML = str;         
    }

    async function updateDivisionsAndTeams(season) {
        setSelectedSeason(season);        
        fetchDivisions(season);  
        fetchTeams(season);
    }

    async function updateTeams(division) {
        setSelectedDivision(division);        
        fetchTeams(selectedSeason, division);
    }

    async function findTeam(){

        var teamID = document.getElementById("allteams").value;
        if (teamID == 0) {
            alert("Please select a team!");  
            return;    
        }
        
        API.graphql(graphqlOperation(queries.listRegisteredPlayers, { filter: {teamid: { eq: selectedTeam }, onRoster: { eq: true }}})).then(async (response) => {        
            const playersFromAPI = response.data.listRegisteredPlayers.items;
            var token = response.data.listRegisteredPlayers.nextToken;
            
            while (token!=null) {
                var results = await API.graphql(graphqlOperation(queries.listRegisteredPlayers, {nextToken:token, filter: {teamid: { eq: selectedTeam }, onRoster: { eq: true }}}));
                playersFromAPI.push.apply(playersFromAPI, results.data.listRegisteredPlayers.items);
                token = results.data.listRegisteredPlayers.nextToken;
            }            
            
            API.graphql(graphqlOperation(queries.listRegisteredTeams, { filter: {id: { eq: selectedTeam }}})).then((response) => {        
                setSelectedTeamName(response.data.listRegisteredTeams.items[0].teamname);                
                const gamesPlayed = response.data.listRegisteredTeams.items[0].gamesplayed;
                setCurrentTeamNumGames(gamesPlayed);
                createTableInfo(playersFromAPI, gamesPlayed);
            });
        });  
    }

    function createTableInfo(players, gamesPlayed) {                      
        var allPlayers = [];    

        for (var i=0; i<players.length; i++) {
            var player = players[i];
            var person = {name: player.firstname + " " + player.lastname, teamName:player.teamname, position:player.position};
        
            if (gamesPlayed > 0) {                        
                if (player.goals=="" || player.goals==undefined) {
                    var map = [];
                    for (var x=0; x<gamesPlayed;x++) {
                        map.push(0);
                    }
                    for (var x=0; x<gamesPlayed;x++) {
                        map.push(0);
                    }              
                    person.goalsandassists = map;
                }

                else {            
                    var goalsToList = player.goals.split(",");                
                    var assistsToList = player.assists.split(",");
                    var goalsAndAssists = [];
                    for (var x=0; x<gamesPlayed;x++){
                        goalsAndAssists.push(goalsToList[x]);
                        goalsAndAssists.push(assistsToList[x]);
                    }
                                
                    person.goalsandassists = goalsAndAssists;                
                }
            }
            else{
                person.goalsandassists = [];
            }

            allPlayers.push(person);                                
        }
        setCurrentRoster(allPlayers);
        createColumns(gamesPlayed);
    }

    function createColumns(gamesplayed) {
        var columns = [
            {            
              label: 'Name'
            },
            {             
              label: 'Position'
            }
        ];
        
        for (var i=0; i<gamesplayed;i++) {
            var labelGoals = "Week " + (i+1) + " Goals";
            var newColumnGoal = {
                label: labelGoals
            };

            var labelAssists = "Week " + (i+1) + " Assists";
            var newColumnAssist = {
                label: labelAssists
            };

            columns.push(newColumnGoal);
            columns.push(newColumnAssist);
        }

        setTableColumns(columns);
    }


    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
          backgroundColor: "green",
          color: theme.palette.common.white,
          fontSize: 16,
        },
        [`&.${tableCellClasses.body}`]: {
          fontSize: 14,
        },
      }));

      const StyledTableRow = styled(TableRow)(({ theme }) => ({
        '&:nth-of-type(odd)': {
          backgroundColor: theme.palette.action.hover,
        },
        // hide last border
        '&:last-child td, &:last-child th': {
          border: 0,
        },
      }));

    function teamRoster(){
        return (            
            <div>
            <Heading level={3} style={{margin: '1rem 0', color: 'orange'}}>{selectedTeamName}</Heading>                
            <Flex direction="row" justifyContent="center">                
                <TableContainer component={Paper} style={{width: Dimensions.get('window').width / 100 * 60}}>
                    <Table sx={{ maxWidth: Dimensions.get('window').width / 100 * 60}} aria-label="TEAM NAME">
                        <TableHead>
                        <StyledTableRow>
                            {tableColumns.map((headCell) => (
                                <StyledTableCell>                                
                                    {headCell.label}                                
                                </StyledTableCell>
                            ))}
                        </StyledTableRow>
                        </TableHead>
                        <TableBody>
                        {currentRoster.map((player) => (
                            <StyledTableRow                            
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                            <StyledTableCell component="th" scope="row">
                                {player.name}
                            </StyledTableCell>
                            <StyledTableCell >{player.position}</StyledTableCell>
                            {player.goalsandassists.map((goalsAndAssists) => (
                                <StyledTableCell >{goalsAndAssists}</StyledTableCell>
                            ))}                            
                            </StyledTableRow>
                        ))}
                        </TableBody>
                    </Table>
                    </TableContainer>
            </Flex>
            </div>
        
        
        
        );
    }

    function adminPage()   {          
        return (
            <View className="Referee">
                <Heading level={3} style={hStyle}>Select a team to view its roster:</Heading>
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
                        onChange={(e) => updateTeams(e.target.value)}
                        >
                        <option value="Div A">Div A</option>
                        <option value="Div B">Div B</option>
                        <option value="PREM">PREM</option>
                        <option value="COED">COED</option>
                    </SelectField>
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
                    inputStyles={textboxStyle}
                    onChange={(e) => setSelectedTeam(e.target.value)}
                    >                                   
                    <option value="placeholder">placeholder</option>
                    </SelectField>
                </Flex>                                                                    
    
                <Button onClick={findTeam} type="submit" variation="primary">
                Find Team
                </Button>
                {teamRoster()}
                 


            </View>                           
        );
    }

    return adminPage();
};

export default (Rosters);