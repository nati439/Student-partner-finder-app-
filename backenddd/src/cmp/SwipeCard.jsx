import React from 'react'
import ProfileCards from './ProfileCards';
import TinderCard from 'react-tinder-card';
export default function SwipeCard({person, lastSwipe, handleSwipe, setLastLeft, userId}) {
  return (
    <>
      <TinderCard
                        className="swipe" 
                        key={person.id}
                        //change username to id
                        preventSwipe={["up", "down"]}
                        onSwipe={(dir) => handleSwipe(dir, person, userId)}
                        onCardLeftScreen={() => setLastLeft(person.username)}
                    >
                      
                        <div 
                                    style={{ backgroundImage: `url(${person.pfp})` }} 
                                    className="card"
                                >
                                    <div><ProfileCards person={person} /></div> 
                                    {/* tells React to render the component with person as a prop. We just telling react to treat this as React component.*/}
                                   
                                </div>
        
                                <div className="buttons">
                                    {lastSwipe?.username === person.username && lastSwipe?.direction === "left" && (
                                        <span className="x">❌</span>
                                    )}
                                    {lastSwipe?.username === person.username && lastSwipe?.direction === "right" && (
                                        <span className="check">✔️</span>
                                    )}
                                </div>

                      
                    </TinderCard>
    
    </>
  )
}
