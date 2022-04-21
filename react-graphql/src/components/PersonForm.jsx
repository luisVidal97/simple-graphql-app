import { useMutation } from '@apollo/client';
import { useState } from 'react'
import {mutationCreatePerson} from '../gql/mutationCreatePerson'
import './PersonForm.css'
import { queryPeople } from '../gql/queryPeople'


export const PersonForm = () => {

  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');

  const [ createPerson ] = useMutation(mutationCreatePerson, {
    refetchQueries: [ { query: queryPeople} ] // on demand
  });

  const cleanForm = () => {
    setName('');
    setLastName('');
    setPhone('');
    setStreet('');
    setCity('');
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    createPerson({
      variables: {name, lastName, city, phone, street}
    });
    cleanForm();
  }

  return (
    <div>
      <h2>Create Person</h2>
      <form className='form' onSubmit={handleSubmit}>
        <input placeholder='Name' value={name} onChange={ evt => setName(evt.target.value)}/>
        <input placeholder='LastName' value={lastName} onChange={ evt => setLastName(evt.target.value)}/>
        <input placeholder='Phone' value={phone} onChange={ evt => setPhone(evt.target.value)}/>
        <input placeholder='Street' value={street} onChange={ evt => setStreet(evt.target.value)}/>
        <input placeholder='City' value={city} onChange={ evt => setCity(evt.target.value)}/>
        <button>Add person</button>
      </form>
    </div>
  )
}
