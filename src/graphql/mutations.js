/* eslint-disable */
// this is an auto generated file. This will be overwritten

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
      createdAt
      updatedAt
      __typename
    }
  }
`;
