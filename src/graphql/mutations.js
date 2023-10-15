/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createDivisions = /* GraphQL */ `
  mutation CreateDivisions(
    $input: CreateDivisionsInput!
    $condition: ModelDivisionsConditionInput
  ) {
    createDivisions(input: $input, condition: $condition) {
      id
      season
      division
      year
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const updateDivisions = /* GraphQL */ `
  mutation UpdateDivisions(
    $input: UpdateDivisionsInput!
    $condition: ModelDivisionsConditionInput
  ) {
    updateDivisions(input: $input, condition: $condition) {
      id
      season
      division
      year
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const deleteDivisions = /* GraphQL */ `
  mutation DeleteDivisions(
    $input: DeleteDivisionsInput!
    $condition: ModelDivisionsConditionInput
  ) {
    deleteDivisions(input: $input, condition: $condition) {
      id
      season
      division
      year
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const createMatches = /* GraphQL */ `
  mutation CreateMatches(
    $input: CreateMatchesInput!
    $condition: ModelMatchesConditionInput
  ) {
    createMatches(input: $input, condition: $condition) {
      id
      hometeam
      awayteam
      hometeamscore
      awayteamscore
      season
      division
      year
      referee
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const updateMatches = /* GraphQL */ `
  mutation UpdateMatches(
    $input: UpdateMatchesInput!
    $condition: ModelMatchesConditionInput
  ) {
    updateMatches(input: $input, condition: $condition) {
      id
      hometeam
      awayteam
      hometeamscore
      awayteamscore
      season
      division
      year
      referee
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const deleteMatches = /* GraphQL */ `
  mutation DeleteMatches(
    $input: DeleteMatchesInput!
    $condition: ModelMatchesConditionInput
  ) {
    deleteMatches(input: $input, condition: $condition) {
      id
      hometeam
      awayteam
      hometeamscore
      awayteamscore
      season
      division
      year
      referee
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const createSeasons = /* GraphQL */ `
  mutation CreateSeasons(
    $input: CreateSeasonsInput!
    $condition: ModelSeasonsConditionInput
  ) {
    createSeasons(input: $input, condition: $condition) {
      id
      season
      year
      startdate
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const updateSeasons = /* GraphQL */ `
  mutation UpdateSeasons(
    $input: UpdateSeasonsInput!
    $condition: ModelSeasonsConditionInput
  ) {
    updateSeasons(input: $input, condition: $condition) {
      id
      season
      year
      startdate
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const deleteSeasons = /* GraphQL */ `
  mutation DeleteSeasons(
    $input: DeleteSeasonsInput!
    $condition: ModelSeasonsConditionInput
  ) {
    deleteSeasons(input: $input, condition: $condition) {
      id
      season
      year
      startdate
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const createRefs = /* GraphQL */ `
  mutation CreateRefs(
    $input: CreateRefsInput!
    $condition: ModelRefsConditionInput
  ) {
    createRefs(input: $input, condition: $condition) {
      id
      firstname
      lastname
      phonenumber
      email
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const updateRefs = /* GraphQL */ `
  mutation UpdateRefs(
    $input: UpdateRefsInput!
    $condition: ModelRefsConditionInput
  ) {
    updateRefs(input: $input, condition: $condition) {
      id
      firstname
      lastname
      phonenumber
      email
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const deleteRefs = /* GraphQL */ `
  mutation DeleteRefs(
    $input: DeleteRefsInput!
    $condition: ModelRefsConditionInput
  ) {
    deleteRefs(input: $input, condition: $condition) {
      id
      firstname
      lastname
      phonenumber
      email
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const createRegisteredPlayers = /* GraphQL */ `
  mutation CreateRegisteredPlayers(
    $input: CreateRegisteredPlayersInput!
    $condition: ModelRegisteredPlayersConditionInput
  ) {
    createRegisteredPlayers(input: $input, condition: $condition) {
      id
      firstname
      lastname
      teamname
      division
      season
      position
      captain
      email
      phonenumber
      instagramhandle
      teamid
      goals
      assists
      contributions
      totalgoals
      totalassists
      totalcontributions
      year
      onRoster
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const updateRegisteredPlayers = /* GraphQL */ `
  mutation UpdateRegisteredPlayers(
    $input: UpdateRegisteredPlayersInput!
    $condition: ModelRegisteredPlayersConditionInput
  ) {
    updateRegisteredPlayers(input: $input, condition: $condition) {
      id
      firstname
      lastname
      teamname
      division
      season
      position
      captain
      email
      phonenumber
      instagramhandle
      teamid
      goals
      assists
      contributions
      totalgoals
      totalassists
      totalcontributions
      year
      onRoster
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const deleteRegisteredPlayers = /* GraphQL */ `
  mutation DeleteRegisteredPlayers(
    $input: DeleteRegisteredPlayersInput!
    $condition: ModelRegisteredPlayersConditionInput
  ) {
    deleteRegisteredPlayers(input: $input, condition: $condition) {
      id
      firstname
      lastname
      teamname
      division
      season
      position
      captain
      email
      phonenumber
      instagramhandle
      teamid
      goals
      assists
      contributions
      totalgoals
      totalassists
      totalcontributions
      year
      onRoster
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const createRegisteredTeams = /* GraphQL */ `
  mutation CreateRegisteredTeams(
    $input: CreateRegisteredTeamsInput!
    $condition: ModelRegisteredTeamsConditionInput
  ) {
    createRegisteredTeams(input: $input, condition: $condition) {
      id
      teamname
      season
      divison
      year
      gamesplayed
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const updateRegisteredTeams = /* GraphQL */ `
  mutation UpdateRegisteredTeams(
    $input: UpdateRegisteredTeamsInput!
    $condition: ModelRegisteredTeamsConditionInput
  ) {
    updateRegisteredTeams(input: $input, condition: $condition) {
      id
      teamname
      season
      divison
      year
      gamesplayed
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const deleteRegisteredTeams = /* GraphQL */ `
  mutation DeleteRegisteredTeams(
    $input: DeleteRegisteredTeamsInput!
    $condition: ModelRegisteredTeamsConditionInput
  ) {
    deleteRegisteredTeams(input: $input, condition: $condition) {
      id
      teamname
      season
      divison
      year
      gamesplayed
      createdAt
      updatedAt
      __typename
    }
  }
`;
