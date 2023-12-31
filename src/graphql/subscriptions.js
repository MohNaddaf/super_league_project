/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateSuspension = /* GraphQL */ `
  subscription OnCreateSuspension(
    $filter: ModelSubscriptionSuspensionFilterInput
  ) {
    onCreateSuspension(filter: $filter) {
      id
      suspensionGameLength
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onUpdateSuspension = /* GraphQL */ `
  subscription OnUpdateSuspension(
    $filter: ModelSubscriptionSuspensionFilterInput
  ) {
    onUpdateSuspension(filter: $filter) {
      id
      suspensionGameLength
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onDeleteSuspension = /* GraphQL */ `
  subscription OnDeleteSuspension(
    $filter: ModelSubscriptionSuspensionFilterInput
  ) {
    onDeleteSuspension(filter: $filter) {
      id
      suspensionGameLength
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onCreateDivisions = /* GraphQL */ `
  subscription OnCreateDivisions(
    $filter: ModelSubscriptionDivisionsFilterInput
  ) {
    onCreateDivisions(filter: $filter) {
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
export const onUpdateDivisions = /* GraphQL */ `
  subscription OnUpdateDivisions(
    $filter: ModelSubscriptionDivisionsFilterInput
  ) {
    onUpdateDivisions(filter: $filter) {
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
export const onDeleteDivisions = /* GraphQL */ `
  subscription OnDeleteDivisions(
    $filter: ModelSubscriptionDivisionsFilterInput
  ) {
    onDeleteDivisions(filter: $filter) {
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
export const onCreateMatches = /* GraphQL */ `
  subscription OnCreateMatches($filter: ModelSubscriptionMatchesFilterInput) {
    onCreateMatches(filter: $filter) {
      id
      hometeam
      awayteam
      hometeamscore
      awayteamscore
      season
      division
      year
      referee
      gamenumber
      hometeamgamenumber
      awayteamgamenumber
      gamedate
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onUpdateMatches = /* GraphQL */ `
  subscription OnUpdateMatches($filter: ModelSubscriptionMatchesFilterInput) {
    onUpdateMatches(filter: $filter) {
      id
      hometeam
      awayteam
      hometeamscore
      awayteamscore
      season
      division
      year
      referee
      gamenumber
      hometeamgamenumber
      awayteamgamenumber
      gamedate
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onDeleteMatches = /* GraphQL */ `
  subscription OnDeleteMatches($filter: ModelSubscriptionMatchesFilterInput) {
    onDeleteMatches(filter: $filter) {
      id
      hometeam
      awayteam
      hometeamscore
      awayteamscore
      season
      division
      year
      referee
      gamenumber
      hometeamgamenumber
      awayteamgamenumber
      gamedate
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onCreateSeasons = /* GraphQL */ `
  subscription OnCreateSeasons($filter: ModelSubscriptionSeasonsFilterInput) {
    onCreateSeasons(filter: $filter) {
      id
      season
      year
      startdate
      isseasonactive
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
      isseasonactive
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
      isseasonactive
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
      phonenumber
      email
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
      phonenumber
      email
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
      phonenumber
      email
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
      year
      onRoster
      suspendedUntilGameNumber
      yellowCards
      redCards
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
      year
      onRoster
      suspendedUntilGameNumber
      yellowCards
      redCards
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
      year
      onRoster
      suspendedUntilGameNumber
      yellowCards
      redCards
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
      gamesplayed
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
      gamesplayed
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
      gamesplayed
      createdAt
      updatedAt
      __typename
    }
  }
`;
