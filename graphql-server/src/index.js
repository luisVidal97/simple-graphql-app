import { gql, UserInputError, ApolloServer } from 'apollo-server';
import {v1 as uuid} from 'uuid';
import axios from 'axios';

/* 
 Graphql only accepts POST and only has an endpoint, in this case localhost:4000 where
 all requests are done.
*/

// NOTE: Defining schema with its corresponding types 
const typeDefs = gql`
  enum YesNo {
    YES
    NO
  }

  type Address {
    city: String!
    street: String
  }

  type Person {
    name: String!
    lastName: String!
    fullName: String!
    phone: String
    id: ID!
    address: Address!
  }

  type Query {
    peopleCount: Int!
    allPeople(phone: YesNo): [Person]!
    findPerson(fullName: String!): Person
  }

  type Mutation {
    addPerson(
      name: String!
      lastName: String!
      phone: String
      street: String!
      city: String!
    ): Person!

    editPhone(
      fullName: String!
      phone: String!
    ): Person
  }
`;

const people =  [
  {
    "id": 4300,
    "name": "Pepito",
    "lastName": "Perez",
    "phone": 3175698771,
    "city": "Evonnestad",
    "street": "Bahringer Spur"
  },
  {
    "id": 2507,
    "name": "Juanez",
    "lastName": "Gonzales",
    "phone": 3175698772,
    "city": "Janaside",
    "street": "Charla Plaza"
  },
  {
    "id": 5047,
    "name": "Elver",
    "lastName": "Martinez",
    "city": "North Hueyfort",
    "street": "Rau Lodge"
  }
];

const resolvers = {
  Query: {
    peopleCount: () => people.length,
    allPeople: async(_, args) => {
      // const { data: people } = await axios.get('http://localhost:4001/people');

      if(!args.phone) return people;
      const byPhone = (person) => args.phone === "YES"? !!person.phone : !person.phone;
      return  people.filter( byPhone );
    },
    findPerson: async(_, args) => {
      const { fullName } = args;
      const { data: people } = await axios.get('http://localhost:4001/people');
      return people.find(p => `${p.name} ${p.lastName}` === fullName);
    },
  },
  Mutation: {
    addPerson: (root, args) => {
      const exists = people.some(p => p.name === args.name && p.lastName === args.lastName);
      if(exists){
        throw new UserInputError('Name must be unique!', {
          invalidArgs: { name: args.name, lastName: args.lastName },
        });
      }
      console.log({args})
      const person = {...args, id: uuid()};
      people.push(person);
      return person;
    },
    editPhone: (_, args) => {
      const personIndex = people.findIndex(p => `${p.name} ${p.lastName}` === args.fullName );
      if(personIndex === -1) return null;

      const updatedPerson = {...people[personIndex], phone: args.phone};
      people[personIndex] = updatedPerson;
      return updatedPerson;
    }
  },
  // NOTE: This allows to create calculations instead of doing in front
  Person: {
    fullName: (root) => `${root.name} ${root.lastName}`,
    address: (root) => ({ street: root.street, city: root.city }),
  }
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
