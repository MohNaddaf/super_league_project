/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getMatches = /* GraphQL */ `
  query GetMatches($id: ID!) {
    getMatches(id: $id) {
      id
      hometeam
      awayteam
      hometeamscore
      awayteamscore
      season
      division
      year
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const listMatches = /* GraphQL */ `
  query ListMatches(
    $filter: ModelMatchesFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listMatches(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        hometeam
        awayteam
        hometeamscore
        awayteamscore
        season
        division
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
export const getSeasons = /* GraphQL */ `
  query GetSeasons($id: ID!) {
    getSeasons(id: $id) {
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
export const listSeasons = /* GraphQL */ `
  query ListSeasons(
    $filter: ModelSeasonsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listSeasons(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        season
        year
        startdate
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getRefs = /* GraphQL */ `
  query GetRefs($id: ID!) {
    getRefs(id: $id) {
      id
      firstname
      lastname
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const listRefs = /* GraphQL */ `
  query ListRefs(
    $filter: ModelRefsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listRefs(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        firstname
        lastname
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
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
      gamesplayed
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
        gamesplayed
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
