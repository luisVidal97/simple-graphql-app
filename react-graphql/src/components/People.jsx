import React from 'react'
import { Person } from './Person'

export const People = ({people}) => {

  return (
    <div>
      <h2>People</h2>
      { people.map( person => <Person key={person.id} human={person} />) 
      }
    </div>
  )
}
