/* eslint-disable */
// this is an auto generated file. This will be overwritten

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
