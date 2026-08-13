import React from 'react'

export default function ProfileCards({person}) {
  return (
    <>
        <h3>{person.username}</h3>
        <p>{person.college}</p>
        <p>{person.year}</p>
    </>
    
  )
}
