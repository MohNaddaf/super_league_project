export const listRosters = /* GraphQL */ `
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
        position                
        goals
        assists    
        __typename
      }
      nextToken
      __typename
    }
  }
`;