import React, { useEffect, useState } from "react";
import TinderCard from "react-tinder-card"; 
import './tinder.css';
import { Link } from "react-router-dom";
import { useLongPoll } from "./useLongPoll";
import {Sendswipe} from './api/swipe';
import { Getmatchingpeople } from "./api/swipe";
import {ProfileCards} from "./cmp/ProfileCards"
import {SwipeCard} from './cmp/SwipeCard'
function TinderCards() {
    const [people, setPeople] = useState([]);
    const [lastSwipe, setLastSwipe] = useState(null); 
    const [lastLeft, setLastLeft] = useState(null);
    const [matchNotif, setMatchNotif] = useState(null);

    // get user id from localStorage
    const userId = localStorage.getItem("user_id"); 

    // "Use my useLongPoll helper to keep checking the backend for a new message, and give me whatever message it finds."
    const message = useLongPoll(`http://127.0.0.1:8000/poll/${userId}`);

    // when a match comes in, show it
    useEffect(() => {
        if (message?.type === "match") {
            setMatchNotif(`You matched with user ${message.with}!`);
            setTimeout(() => setMatchNotif(null), 4000); // hide after 4 seconds
        }
    }, [message]);

    useEffect(() => {
        const major = localStorage.getItem("major");
        if (!major) return;

        async function dbback() {
            try {
                const data = await Getmatchingpeople(major);
                setPeople(data);
            } catch (err) {
                console.error(err);
            }
        }
        dbback();
    }, []);

    async function handleSwipe(direction, person, userId) {
        setLastSwipe({ username: person.username, direction });

        
             Sendswipe(direction, person, userId)
        
       
        
    }
    

    return (
        <div className="tinderCards">

            {/* match notification */}
            {matchNotif && (
                <div style={{
                    position: "fixed", top: 20, left: "50%", transform: "translateX(-50%)",
                    background: "green", color: "white", padding: "16px 32px",
                    borderRadius: "12px", fontSize: "20px", zIndex: 999
                }}>
                    {matchNotif}
                </div>
            )}

            <div className="tinderCards__cardContainer">
                {people.map((person) => (
                    
                        <div key={person.id}>  <SwipeCard person={person}  lastSwipe={lastSwipe} handleSwipe={handleSwipe} setLastLeft={setLastLeft} userId={userId}/></div>

                ))}
            </div>
        </div>
    );
}

export default TinderCards;

