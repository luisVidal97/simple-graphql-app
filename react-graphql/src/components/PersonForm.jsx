import { useState } from 'react'
import {mutationCreatePerson} from '../gql/mutationCreatePerson'

export const PersonForm = () => {

  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');

  const cleanForm = () => {
    setName('');
    setLastName('');
    setPhone('');
    setStreet('');
    setCity('');
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    cleanForm();
  }

  return (
    <div>
      <h2>Create Person</h2>
    </div>
  )
}
