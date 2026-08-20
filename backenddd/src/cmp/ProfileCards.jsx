// import React from 'react'

// export default function ProfileCards({person}) {
//   return (
//     <>
//         <h3>{person.username}</h3>
//         <p>{person.college}</p>
//         <p>{person.year}</p>
//     </>
    
//   )
// }


import React from 'react'

export default function ProfileCards({ person }) {
  return (
    <div className="card__info">
      <h3 className="person__username">{person.username}</h3>
      <p className="person__college">{person.college}</p>
      <p className="person__year">{person.year}</p>
    </div>
  )
}