import React, { useState, useEffect } from "react";
import "./PlayerRegistration.css";
import "@aws-amplify/ui-react/styles.css";
import { API, graphqlOperation } from "aws-amplify";
import {
  Button,
  Flex,
  Heading,
  Text,
  TextField,
  View,
  SelectField,
  CheckboxField,
  withAuthenticator,
} from "@aws-amplify/ui-react";

import * as queries from "./graphql/queries";
import { listRegisteredTeams, listSeasons } from "./graphql/queries";
import {
  createRegisteredPlayers as createRegisteredPlayerMutation
} from "./graphql/mutations";

import { MuiTelInput } from 'mui-tel-input'
import { Dimensions } from "react-native"

const PlayerRegistration = ({ signOut }) => {

  const [value, setValue] = React.useState('')
  const [registrationDone, setRegistrationDone] = React.useState(false);

  const handleChange = (newValue) => {
    setValue(newValue)
  }

  const [teams, setTeams] = useState([]);
  const [seasons, setSeasons] = useState([]);
  const [checked, setChecked] = React.useState(false);
  const [hasError, setHasError] = React.useState(false);
  const [selectedDivision, setSelectedDivision] = useState("");
  const [selectedSeason, setSelectedSeason] = useState("");

  useEffect(() => {
    fetchTeams();
    fetchSeasons();
    fetchDivisions();
  }, []);

  async function fetchTeams(season, division) {    
    var apiData = {};

    if (season==undefined || season=="") {
        return;
    }
    else if (division==undefined || division=="") {
      return;
    }
    else{
        apiData = await API.graphql(graphqlOperation(queries.listRegisteredTeams, { filter: { season: { eq: season }, divison: { eq: division }}}));
    }

    const teamsFromAPI = apiData.data.listRegisteredTeams.items;
    setTeams(teamsFromAPI);
    createTeams(teamsFromAPI);
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
    fetchTeams(season);
  }

  async function updateTeams(division) {
    setTimeout(async () => {
    }, 1000);
    setSelectedDivision(division);        
    fetchTeams(selectedSeason, division);
  }


  async function createTeams(teams){    
      var str="<option value=0>SELECT YOUR TEAM</option>";
      for (var i = 0; i < teams.length; i++){
        var team = teams[i];
        var division = (await API.graphql(graphqlOperation(queries.getDivisions, { id: team.divison}))).data.getDivisions;
        str+="<option value=" + team.id + ">" + team.teamname + " - " + division.division + "</option>";      
      }
      document.getElementById("allteams").innerHTML = str;         
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

  async function createRegisteredPlayer(event) {
    event.preventDefault();    

    if (!checked) {
      setHasError(true);
    } else {
      setHasError(false);
    
    const form = new FormData(event.target);

    var teamID = document.getElementById("allteams").value;
    var position = document.getElementById("position").value;

    if (teamID == 0) {
      alert("Please select a team!");      
    }
    else{

      var teamName = "";
      var division = "";
      var season = "";
      
      for (var i = 0; i < teams.length; i++){
        var team = teams[i];
        if (team.id == teamID){
          teamName = team.teamname;
          division = team.divison;
          season = team.season;
          break;
        }
      }

      API.graphql(graphqlOperation(queries.listRegisteredPlayers, { filter: { firstname: { eq: form.get("fname") }, lastname: { eq: form.get("lname") }, division: {eq: division}}})).then(async (response) => {
        const playersFromAPI = response.data.listRegisteredPlayers.items;
        var token = response.data.listRegisteredPlayers.nextToken;
            
        while (token!=null) {
            var results = await API.graphql(graphqlOperation(queries.listRegisteredPlayers, {filter: { firstname: { eq: form.get("fname") }, lastname: { eq: form.get("lname") }, division: {eq: division}}, nextToken:token}));
            playersFromAPI.push.apply(playersFromAPI, results.data.listRegisteredPlayers.items);
            token = results.data.listRegisteredPlayers.nextToken;
        }

        if (playersFromAPI.length > 0) {
          alert("You have already registered for the specified division");
          return;
        }
        else{
          const data = {
            firstname: form.get("fname"),
            lastname: form.get("lname"),
            teamname: teamName,
            division: division,
            season: season,
            position: position,
            email: form.get("email"),
            teamid: teamID,
            phonenumber: form.get("phone"),
            instagramhandle: form.get("instagram"),
            year: new Date().getFullYear(),
            onRoster: true
          };            
          
          await API.graphql({
            query: createRegisteredPlayerMutation,
            variables: { input: data },
          });                
          
          setRegistrationDone(true);
        }
      });
              
      }
    }
  }

  const divStyle = {marginRight: 'auto', marginLeft: 'auto', marginTop:'1rem', alignItems:'center', textAlign:'left'}
  const hStyle = { 
    color: 'orange',
    width: Dimensions.get('window').width / 100 * 60
  };
  const textboxStyle = {
    backgroundColor: 'white',
    border: `1px solid`,
    width: Dimensions.get('window').width / 100 * 60,
    margin: '1rem 0'
  };

  function playerRegistration() {
    return (
      <div>
        <Flex direction="row" justifyContent="center" alignItems="left">
          <Heading level={3} style={hStyle}>Fill the form Below to be added to your teams roster </Heading> 
        </Flex>
        
        <View as="form" margin="3rem 0" onSubmit={createRegisteredPlayer} style={{width: Dimensions.get('window').width}}>      
            <Flex direction="row" justifyContent="center" alignItems="left">     
              <TextField
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
                name="email"
                placeholder="Email (required)"
                label="Email"
                labelHidden
                variation="quiet"
                required
                inputStyles={textboxStyle}
              />    
            </Flex>      

            <Flex direction="row" justifyContent="center">
              <MuiTelInput inputProps={{style: { textAlign: 'center' }}} id="phone" name="phone" style={textboxStyle} placeholder="PhoneNumber (required)" required value={value} onChange={handleChange} />            
            </Flex>

            <Flex direction="row" justifyContent="center" >
              <SelectField
                id="allseasons"
                name="seasons"
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
                >                                   
              </SelectField>
            </Flex>

            <Flex direction="row" justifyContent="center" >
              <SelectField
                id="position"
                name="position"
                placeholder="SELECT YOUR POSITION"
                label="position"
                labelHidden
                variation="quiet"
                required              
                inputStyles={textboxStyle}             
                >
                <option value="Keeper">Keeper</option>
                <option value="Center back / Defense">Center back / Defense</option>
                <option value="Center Midfield">Center Midfield</option>
                <option value="Right Midfield">Right Midfield</option>
                <option value="Left Midfield">Left Midfield</option>
                <option value="Striker">Striker</option>
              </SelectField>
            </Flex>
            
            
              <Flex direction="row" justifyContent="center" alignItems="left">         
                <div style={divStyle}>
                  <Text style={hStyle}>We like to highlight some of the top players on our Instagram page, if selected we can tag you!
                                                                              At the end of every week we select the top players to appear on the Team Of the Week, Player of the Week and/or The top scorer based on their performance and stats.</Text>
                </div>
              </Flex>
            
              
            <Flex direction="row" justifyContent="center" >
              <TextField
                name="instagram"
                placeholder="Instagram"
                label="instagram"
                labelHidden
                variation="quiet"
                inputStyles={textboxStyle}
              />    
            </Flex>
            
            <Flex direction="row" justifyContent="center" alignItems="left">
              <div style={divStyle}>
                <Text style={hStyle} fontSize="1.4rem">Super League Rules and Regulations (required)</Text>
                <h4 style={hStyle}>League Rules</h4>
                <ul style={hStyle}>         
                  <li>Players will be added to their selected team roster by filling this form.</li>
                  <li>Players cannot register for more than one team’s roster in the same division. </li>
                  <li>Teams can have a maximum of 14 players on their roster.</li>
                  <li>The last day to add any players to the team's roster is before your last league game (game 8). </li>
                  <li>Teams must have at least 5 players from their original roster on the field at all times during the league games. (for COED the minimum requirement is 1 girl and 4 guys from the original team roster).</li>
                  <li>Players not on the roster are still allowed to play league games as long as the requirements above are met. </li>
                  <li>Players will not be allowed to play in playoffs unless they have played at least one game with their team during the season and are not on any other team roster (This rule does not apply to goal keepers).</li>
                  <li>If a player is reported not to meet any of the rules listed above they will be removed from the game upon confirming with the organizers/referee.</li>
                  <li>A team can have a maximum of 2 players that are registered in a higher division roster.</li>
                </ul>

                <h4 style={hStyle}>Playoffs:</h4>
                <ul style={hStyle}>         
                  <li>Only the top 4 teams will qualify to the playoffs, which will be determined based on points > goal difference > goals for > goals against > fair play > Head to head</li>
                  <li>Note if a League has more than 8 teams then the top 6 teams will qualify to play offs, the top 2 teams will go directly to semis, meanwhile the 3rd place team will play against the 6th and the 4th place will play against the 5th place and the winners of those games will qualify to semis in which a draw will be made to determine the semis games (during the semis the top 2 teams will not play each other). </li>
                  <li>Team rosters will be checked before any play offs games to ensure the team is complying with the league rules.</li>
                  <li>Playoff games will go to penalties if tied. If a Playoff game is tied it will end 3 minutes earlier to allow for penalties.</li>
                </ul>

                <h4 style={hStyle}>Forfeits:</h4>
                <ul style={hStyle}>         
                  <li>If any team is 10+ minutes late they will be forfeited based the discretion of the referee. </li>
                  <li>If a team has less than 5 players on the field at the start of the game it will be considered a forfeit based the discretion of the referee. </li>
                  <li>For a team to be forfeited the Referee must be informed and make that decision clear with both captains before the teams can start a game (the game will be considered friendly at that point).</li>
                  <li>If a team is forfeited then the opposing team will automatically be granted a 3-0 win. </li>
                </ul>

                <h4 style={hStyle}>Additional COED specific rules:</h4>
                <ul style={hStyle}>         
                  <li>In the event of having no girls on the field, team will be forfeited.</li>
                  <li>In the event of having 1 girl only, team will have to play a player down.</li>
                </ul>

                <h4 style={hStyle}>Game rules:</h4>
                <ul style={hStyle}>         
                  <li>Games will be 7vs7 and 50min long (25min half).</li>
                  <li>Each team must bring 2 shirts ( a dark and light color) </li>
                  <li>No slide tackles allowed around any other players.</li>
                  <li>Free-kicks will be direct after the half-line (offense) and indirect before the half-line (defense).</li>
                  <li>If a player receives a yellow card, he/she shall be sent off for 2 minutes, a player cannot come back into the game until the 2 minutes have passed even in the case of a goal.</li>
                  <li>If a player receives a red card, he shall be sent off for the rest of the game (if given while playing then the team must play a player down).</li>
                  <li>A player can still receive a yellow or red card even if he is on the side lines.</li>
                  <li>Players will not be allowed to play under the influence of alcohol or recreational drugs.</li>
                  <li>All decision are up to the referee of the game and must be respected by the players.</li>
                  <li>If a player receives two yellow cards in a game or a red card he/she will be suspended for the following game. In situations where a player starts a fight and/or fights back, both players will receive more severe punishment/suspension.</li>
                </ul>

                <h4 style={hStyle}>Photo & Video Release agreement:</h4>
                <p style={hStyle}>By registering in this soccer league and agreeing to this form  I grant permission to Super League Ottawa, the rights of my image, in video or photographs, and of the likeness and sound of my voice as recorded on audio or video tape without payment or any other consideration. I understand that my image may be edited, copied, exhibited, published or distributed and waive the right to inspect or approve the finished product wherein my likeness appears. Additionally, I waive any right to royalties or other compensation arising or related to the use of my image or recording. I also understand that this Photographic, audio or video recordings material may be used for ANY USE which may include but is not limited to:</p>
                <ul style={hStyle}>         
                  <li>Website content</li>
                  <li>Advertisement</li>
                  <li>Online/Internet Videos</li>
                  <li>Media</li>
                  <li>News (Press)</li>
                  <li>Instagram, Facebook and/or YouTube</li>
                </ul>

                <h4 style={hStyle}>Players safety:</h4>
                <ul style={hStyle}>         
                  <li>Dangerous play will NOT be tolerated.</li>
                  <li>There will be ZERO TOLERANCE for any inappropriate language / any aggression towards any of the players, referees, or organizers. If any violation occurs it will be up to the referee and the organizers to apply disciplinary penalties against the players involved such as (game suspension, suspension for the rest of the season or banned) without any refund!</li>
                  <li>If a player engages in any aggressive behavior, it is the TEAM'S responsibility to stop him from carrying on with such behavior otherwise disciplinary penalties will be taken against the whole team.</li>
                </ul>
              </div>
            </Flex>
            
            <Flex direction="row" justifyContent="center" alignItems="left">
              <div style={divStyle}>
                <CheckboxField
                  label={<Text style={hStyle}>I agree to abide the Super league rules and regulations listed above</Text>}
                  name="rar"
                  value="yes"
                  checked={checked}
                  hasError={hasError}              
                  errorMessage={<Text style={{ color: 'red'}}>Please agree to the rules and regulations</Text>}
                  onChange={(e) => setChecked(e.target.checked)}
                />
              </div>
            </Flex>
            <Button type="submit" variation="primary">
              REGISTER
            </Button>
        </View>
      </div>
    );
  }

  return (
    <View className="PlayerRegistration">
    {registrationDone == true ? <div><Heading level={1} style={hStyle}>Thank you for registering!</Heading></div> : playerRegistration()}
    </View>
  );
};

export default (PlayerRegistration);