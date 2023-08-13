/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getRegisteredPlayers = /* GraphQL */ `
  query GetRegisteredPlayers($id: ID!) {
    getRegisteredPlayers(id: $id) {
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
export const listRegisteredPlayers = /* GraphQL */ `
  query ListRegisteredPlayers(
    $filter: ModelRegisteredPlayersFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listRegisteredPlayers(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
      __typename
    }
  }
`;
export const getRegisteredTeams = /* GraphQL */ `
  query GetRegisteredTeams($id: ID!) {
    getRegisteredTeams(id: $id) {
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
export const listRegisteredTeams = /* GraphQL */ `
  query ListRegisteredTeams(
    $filter: ModelRegisteredTeamsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listRegisteredTeams(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        teamname
        season
        divison
        year
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
