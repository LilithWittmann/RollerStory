import gql from "graphql-tag";

export const MAP_OVERVIEW = gql`
  {
    latestMap {
      geojson
    }
  }
`;
