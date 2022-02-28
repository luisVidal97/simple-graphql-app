import { gql } from "@apollo/client";

export const queryPeople = gql`
  query {
    allPeople {
      id
      fullName
    }
  }
`;
