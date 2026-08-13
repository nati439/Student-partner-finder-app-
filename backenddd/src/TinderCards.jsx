// import React, { useEffect, useState } from "react";
// import TinderCard from "react-tinder-card"; 
// import './tinder.css';
// import { Link } from "react-router-dom";
// import { useLongPoll } from "./useLongPoll";
// import {Sendswipe} from './api/swipe';
// import { Getmatchingpeople } from "./api/swipe";
// import {ProfileCards} from "./cmp/ProfileCards"
// import {SwipeCard} from './cmp/SwipeCard'
// function TinderCards() {
//     const [people, setPeople] = useState([]);
//     const [lastSwipe, setLastSwipe] = useState(null); 
//     const [lastLeft, setLastLeft] = useState(null);
//     const [matchNotif, setMatchNotif] = useState(null);

//     // get user id from localStorage
//     const userId = localStorage.getItem("user_id"); 

//     // "Use my useLongPoll helper to keep checking the backend for a new message, and give me whatever message it finds."
//     const message = useLongPoll(`http://127.0.0.1:8000/poll/${userId}`);

//     // when a match comes in, show it
//     useEffect(() => {
//         if (message?.type === "match") {
//             setMatchNotif(`You matched with user ${message.with}!`);
//             setTimeout(() => setMatchNotif(null), 4000); // hide after 4 seconds
//         }
//     }, [message]);

//     useEffect(() => {
//         const major = localStorage.getItem("major");
//         if (!major) return;

//         async function dbback() {
//             try {
//                 const data = await Getmatchingpeople(major);
//                 setPeople(data);
//             } catch (err) {
//                 console.error(err);
//             }
//         }
//         dbback();
//     }, []);

//     async function handleSwipe(direction, person, userId) {
//         setLastSwipe({ username: person.username, direction });

        
//              Sendswipe(direction, person, userId)
        
       
        
//     }
    

//     return (
//         <div className="tinderCards">

//             {/* match notification */}
//             {matchNotif && (
//                 <div style={{
//                     position: "fixed", top: 20, left: "50%", transform: "translateX(-50%)",
//                     background: "green", color: "white", padding: "16px 32px",
//                     borderRadius: "12px", fontSize: "20px", zIndex: 999
//                 }}>
//                     {matchNotif}
//                 </div>
//             )}

//             <div className="tinderCards__cardContainer">
//                 {people.map((person) => (
                    
//                         <div key={person.id}>  <SwipeCard person={person}  lastSwipe={lastSwipe} handleSwipe={handleSwipe} setLastLeft={setLastLeft} userId={userId}/></div>

//                 ))}
//             </div>
//         </div>
//     );
// }

// export default TinderCards;

// // import React, { useEffect, useState } from "react";
// // import TinderCard from "react-tinder-card"; 
// // import './tinder.css';
// // import { Link } from "react-router-dom";

// // function TinderCards() {
// //     const [people, setPeople] = useState([]);
// //     const [lastSwipe, setLastSwipe] = useState(null); 
// //     const [lastLeft, setLastLeft] = useState(null);   
// //     //“I have an empty list… I’m waiting for the backend to send me people.”
    
    
// //     useEffect(() => {
// //          const major = localStorage.getItem("major");
// //          if (!major) return;
// //         //“Run this ONLY once when the component first loads.”
// //         async function dbback() {
// //             try {
                
// //                 const response = await fetch(`http://127.0.0.1:8000/matching/${major}`);
// //                 const json = await response.json();
// //                 //You convert it to JSON
                
// //                 // CRITICAL: Ensure this matches your backend structure
// //                 // If backend sends { users: [...] }, use json.users
// //                 // If backend sends [...], use json
// //                 const data = json.users ? json.users : json;
// //                 //“Does this JSON response have a users property?”
// //                 //Your backend might return data in two different shapes:
// //                 //1. {"users":[{"username" : "John"}, {"username": "Sarah"}]} so json.users works
// //                 //2. [{"username":"John"}, {"username":"Sarah"}] so json.users doesn't work so have to do json. 
// //                 setPeople(data);
// //             } catch (err) {
// //                 console.error("Fetch error:", err);
// //             }
// //         }
// //         dbback();
// //     }, []);

// //     //show me the cards of only people i have same major as. 
// //     //go in backend and do if statement and only to show the cards only major matches

// //     // const swiped = (direction, nameToDelete) => {
// //     //     console.log("removing: " + nameToDelete);
// //     // };

// //     // //Remove user's when swipe left

// //     // const outOfFrame = (name) => {
// //     //     console.log(name + " left the screen!");
// //     // };

// //     //this function is called inside 'return' when the card leaves the screen.

// //     return (
// //         <div className="tinderCards">
// //             <div className="tinderCards__cardContainer">
// //                 {people.map((person) => (
// //                     <TinderCard
// //                         className="swipe" 
// //                         key={person.username}
// //                         preventSwipe={["up", "down"]} //makes it so the hard doesn't swipe up and down.
// //                         onSwipe={(dir) => setLastSwipe({ username: person.username, direction: dir })}                        //onSwipe fires when card is swipe and return to you the direction it was swiped at. 
// //                         //It calls the function swipes and tell it the direction and the name of the person who is swiped 
// //                         onCardLeftScreen={() => setLastLeft(person.username)}
            
// //                         //This gives you info when card leaves the screen. 
// //                     >
// //                         <div 
// //                             style={{ backgroundImage: `url(${person.pfp})` }} 
// //                             className="card"
// //                         >
// //                             <h3>{person.username}</h3>
// //                             <p>{person.college}</p>
// //                             <p>{person.year}</p>
// //                         </div>

// //                         <div className="buttons">
// //                             {lastSwipe?.username === person.username && lastSwipe?.direction === "left" && (
// //                                 //? --> “If lastSwipe exists, then access .username otherwise don’t crash.”

// //                                 <span className="x">❌</span>
// //                             )}

// //                             {lastSwipe?.username === person.username && lastSwipe?.direction === "right" && (
// //                                 <span className="check">✔️</span>
// //                             )}
                           
// //                         </div>
// //                     </TinderCard>
                    
// //                 ))}
// //             </div>
// //         </div>
// //     );
// // }

// // export default TinderCards;