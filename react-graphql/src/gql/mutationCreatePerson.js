import { gql } from "@apollo/client";

export const mutationCreatePerson = gql`
  mutation CreatePerson(
    $name: String!
    $lastName: String!
    $phone: String
    $street: String!
    $city: String!
  ){
    addPerson(
      name: $name
      lastName: $lastName
      phone: $phone
      street: $street
      city: $city 
    ){
      id
      fullName
      address {
        city
        street
      }
      phone
    }
  }
`;