import React, { useContext, useEffect, useState } from "react";
import TinderCard from "react-tinder-card"; 
import './tinder.css';
import { Link } from "react-router-dom";
import { useLongPoll } from "../hooks/useLongPoll";
import {Sendswipe} from '../api/Swipe';
import { Getmatchingpeople } from "../api/Swipe";
import ProfileCards from "../cmp/ProfileCards"
import SwipeCard from "../cmp/SwipeCard"
import {IdContext} from '../cmp/AuthContext'
const BASE_URL = import.meta.env.VITE_API_URL;
function TinderCards() {
    const [people, setPeople] = useState([]);
    const [lastSwipe, setLastSwipe] = useState(null); 
    const [lastLeft, setLastLeft] = useState(null);
    const [matchNotif, setMatchNotif] = useState(null);

    // get user id from localStorage
    const userId = useContext(IdContext); 

    // "Use my useLongPoll helper to keep checking the backend for a new message, and give me whatever message it finds."
    const message = useLongPoll(`${BASE_URL}/poll/${userId}`);
   
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
                const data = await Getmatchingpeople(major, userId);
                setPeople(data);
            } catch (err) {
                console.error(err);
            }
        }
        dbback();
    }, []);

    async function handleSwipe(direction, person, userId) {
        setLastSwipe({ username: person.username, direction });
        setTimeout(() => setLastSwipe(null), 1000);

        try {
            await Sendswipe(direction, person, userId);
        } catch (err) {
            console.error(err);
        }
    }
    function handleCardLeftScreen(username) {
        setLastLeft(username);
        setPeople((prev) => prev.filter((p) => p.username !== username));
    }


    const [matchHistory, setMatchHistory] = useState([]);

        useEffect(() => {
            if (message?.type === "match") {
                setMatchNotif(`You matched with user ${message.with}!`);
                setMatchHistory((prev) => [...prev, message.with]);
                setTimeout(() => setMatchNotif(null), 4000);
            }
        }, [message]);
    return (
        <div className="tinderCards">
            {matchHistory.length > 0 && (
                <div className="match-history">
                    <h4>Your Matches</h4>
                    <ul>
                        {matchHistory.map((id, index) => (
                            <li key={index}>Matched with user {id}</li>
                        ))}
                    </ul>
                </div>
            )}

            {matchNotif && (
                <div style={{ /* ...unchanged... */ }}>
                    {matchNotif}
                </div>
            )}

            {lastSwipe?.direction === "left" && (
                <div className="side-icon side-icon-left">❌</div>
            )}
            {lastSwipe?.direction === "right" && (
                <div className="side-icon side-icon-right">✔️</div>
            )}

            <div className="tinderCards__cardContainer">
                {people.map((person) => (
                    <div key={person.id}>
                        <SwipeCard person={person} handleSwipe={handleSwipe} setLastLeft={handleCardLeftScreen} userId={userId} />
                    </div>
                ))}
            </div>
        </div>
    );
}
export default TinderCards;

