import { gql } from "../__generated__";

export const indexQuery = gql(`query Index {
  user {
    id
    role
    config {
      storeName
      storeId
    }
  }
  deal {
    lastRefresh
    deals {
      dealUuid
      imageUrl
      offerPropositionId
      count
      shortName
      name
      validFromUtc
      validToUtc
    }
  }
}
`);
