/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateSeasons = /* GraphQL */ `
  subscription OnCreateSeasons($filter: ModelSubscriptionSeasonsFilterInput) {
    onCreateSeasons(filter: $filter) {
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
export const onUpdateSeasons = /* GraphQL */ `
  subscription OnUpdateSeasons($filter: ModelSubscriptionSeasonsFilterInput) {
    onUpdateSeasons(filter: $filter) {
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
export const onDeleteSeasons = /* GraphQL */ `
  subscription OnDeleteSeasons($filter: ModelSubscriptionSeasonsFilterInput) {
    onDeleteSeasons(filter: $filter) {
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
export const onCreateRefs = /* GraphQL */ `
  subscription OnCreateRefs($filter: ModelSubscriptionRefsFilterInput) {
    onCreateRefs(filter: $filter) {
      id
      firstname
      lastname
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onUpdateRefs = /* GraphQL */ `
  subscription OnUpdateRefs($filter: ModelSubscriptionRefsFilterInput) {
    onUpdateRefs(filter: $filter) {
      id
      firstname
      lastname
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onDeleteRefs = /* GraphQL */ `
  subscription OnDeleteRefs($filter: ModelSubscriptionRefsFilterInput) {
    onDeleteRefs(filter: $filter) {
      id
      firstname
      lastname
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onCreateRegisteredPlayers = /* GraphQL */ `
  subscription OnCreateRegisteredPlayers(
    $filter: ModelSubscriptionRegisteredPlayersFilterInput
  ) {
    onCreateRegisteredPlayers(filter: $filter) {
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
export const onUpdateRegisteredPlayers = /* GraphQL */ `
  subscription OnUpdateRegisteredPlayers(
    $filter: ModelSubscriptionRegisteredPlayersFilterInput
  ) {
    onUpdateRegisteredPlayers(filter: $filter) {
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
export const onDeleteRegisteredPlayers = /* GraphQL */ `
  subscription OnDeleteRegisteredPlayers(
    $filter: ModelSubscriptionRegisteredPlayersFilterInput
  ) {
    onDeleteRegisteredPlayers(filter: $filter) {
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
export const onCreateRegisteredTeams = /* GraphQL */ `
  subscription OnCreateRegisteredTeams(
    $filter: ModelSubscriptionRegisteredTeamsFilterInput
  ) {
    onCreateRegisteredTeams(filter: $filter) {
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
export const onUpdateRegisteredTeams = /* GraphQL */ `
  subscription OnUpdateRegisteredTeams(
    $filter: ModelSubscriptionRegisteredTeamsFilterInput
  ) {
    onUpdateRegisteredTeams(filter: $filter) {
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
export const onDeleteRegisteredTeams = /* GraphQL */ `
  subscription OnDeleteRegisteredTeams(
    $filter: ModelSubscriptionRegisteredTeamsFilterInput
  ) {
    onDeleteRegisteredTeams(filter: $filter) {
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
