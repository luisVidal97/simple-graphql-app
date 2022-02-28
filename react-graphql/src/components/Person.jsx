import './Person.css'
import { useLazyQuery } from '@apollo/client'
import { queryFindPerson } from '../gql/queryFindPerson'
import { useEffect, useState } from 'react';

export const Person = ({human}) => {

  const [ getPerson, result ] = useLazyQuery(queryFindPerson);
  const [ person, setPerson ] = useState(human);

  const handleGetPerson = () => {
    getPerson({variables: { fullName: person.fullName } });
  }

  useEffect(() =>{
    if(result?.data?.findPerson){
      setPerson(result.data.findPerson);
    }

  }, [result]);

  return (
    <div className='card' onClick={handleGetPerson}>
      <h2>{person.fullName}</h2>
      <p>ID: {person.id}</p>
      { !!person.phone &&  <p>Phone: {person.phone}</p> }
      {
        person.address && <>
          <p>Address</p>
          <ul>
            <li>Street {person.street}</li>
            <li>City {person.city}</li>
          </ul>
        </>
      }
    </div>
  )
}
