import React, { useState, useEffect } from "react";
import "./Referee.css";
import "@aws-amplify/ui-react/styles.css";
import {
  Button,
  Flex,
  View
} from "@aws-amplify/ui-react";
import * as queries from "./graphql/queries";
import CalculateStats from "./CalculateStats";
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { DataGrid, GridToolbar, gridClasses} from "@mui/x-data-grid";
import { alpha, styled } from '@mui/material/styles';
import { API, graphqlOperation} from "aws-amplify";
import { Dimensions } from "react-native"

const Admin = ({ signOut }) => {
    const [value, setValue] = React.useState(0);
    const [rows, setRows] = React.useState([]);

    const columns = [
        { field: "id", hide: true },
        { field: "fname", headerName: "First Name", width: 150 },
        { field: "lname", headerName: "Last Name", width: 150 },
        { field: "teamname", headerName: "Team Name", width: 150 },
        { field: "season", headerName: "Season", width: 150 },
        { field: "division", headerName: "Division", width: 150 },
        { field: "year", headerName: "Year", width: 150 },
        { field: "onroster", headerName: "Is On Roster", width: 150 }
    ];

    var selectedPlayers = [];

    useEffect(() => {
        fetchPlayers();         
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

    async function fetchPlayers() {
        API.graphql(graphqlOperation(queries.listRegisteredPlayers)).then((response) => {
            const playersFromAPI = response.data.listRegisteredPlayers.items;
            createPlayersTable(playersFromAPI);
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

        setRows(allRows);
        /*
        const rows = [
        { id: 1, col1: "Hello", col2: "World" },
        { id: 2, col1: "MUI X", col2: "is awesome" },
        { id: 3, col1: "Material UI", col2: "is amazing" },
        { id: 4, col1: "MUI", col2: "" },
        { id: 5, col1: "Joy UI", col2: "is awesome" },
        { id: 6, col1: "MUI Base", col2: "is amazing" }
        ];
        */
    }            

    const handleChange = (event, newValue) => {
        // event.type can be equal to focus with selectionFollowsFocus.
        if (
          event.type !== 'click' ||
          (event.type === 'click' && samePageLinkNavigation(event))
        ) {
          setValue(newValue);          
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
    }

    function adminOptions() {
        return (
            <div>
                <Box className="Refereee" sx={{ width: '100%', backgroundColor: 'orange', margin:'' }}>
                    <Tabs value={value} onChange={handleChange} aria-label="nav tabs example">
                        <LinkTab  label="Calculate Player Stats"/>
                        <LinkTab label="Remove Players"/>                        
                    </Tabs>
                </Box>
                
                {value == 0 ? <CalculateStats/> : 
                <div style={{ height: Dimensions.get('window').height / 100 * 60, width: "100%" }}>
                    <StyledDataGrid onRowSelectionModelChange={handleRowSelection} checkboxSelection disableColumnFilter disableColumnMenu disableDensitySelector disableColumnSelector rows={rows} columns={columns} slots={{ toolbar: GridToolbar }}
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

              </div>
              }

            </div>
        );
    }

    return adminOptions();
};

export default (Admin);