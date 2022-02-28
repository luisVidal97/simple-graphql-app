import { gql } from "@apollo/client";


export const queryFindPerson = gql`
  query findPersonByFullName($fullName: String!){
    findPerson(fullName: $fullName){
      fullName
      address {
        street
        city
      }
      phone
      id
    }
  }
`;