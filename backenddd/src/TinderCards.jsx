import React, { useState } from "react";
import TinderCard from "react-tinder-card"; //ready-made swipeable card component
import './tinder.css';
// import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
// import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ClearIcon from '@mui/icons-material/Clear';
function TinderCards(){
    const [direction, setDirection] = useState(""); //store the direction the card was swip
    const [activeUser, setActiveUser] = useState(""); //store the name of the person who swipe the card.
    const [people, setpeople] = useState([ ////This is where we will put all the students at.
    
        {


            username: 'nati',
            college: 'MIT',
            year: 'freshment',


            url: 'https://upload.wikimedia.org/wikipedia/commons/9/95/The_White_House_-_54409525537_%28cropped%29.jpg'


        }
,
        {
            username: 'bruk',
            college: 'Harver',
            year: 'freshment',
            url: 'https://www.airofin.com/cdn/shop/articles/goggins.jpg?v=1600810012'
        }


]);


    return(
        <div>
           
         
            <div className="tinderCards__cardContainer">
                {people.map(person =>(
                    <TinderCard
                        className="swipe"
                        key={person.username} //this is something uniuqe for every person.
                        preventSwipe={['up', 'down']} //the apps made to go up and down and right and left. This cancels the up and down.
                        swipeRequirementType="position"
                        onSwipe={(dir) => { //Get the direction and the name
                            setDirection(dir);
                            setActiveUser(person.username);
                        }}
                        onCardLeftScreen={() => { //Restart the useState that holds the name and the direction.
                                setDirection("");
                                setActiveUser("");
                            }}
                       
                        //flickOnSwipe={false} make it so when i swipe it always comes back to center.




                    >
                       
                        <div style={{backgroundImage: `url(${person.url})`}} className="card">
                            <h3 className="person__username">{person.username}</h3>
                            <h3 className="person__college">{person.college}</h3>
                            <h3 className="person__year">{person.year}</h3>
                            {/* <ArrowForwardIcon fontSize="large" className="arrow"/>
                            <ArrowBackIcon fontSize="large" className="arrow__2"/> */}
                        </div>
                        <div className="buttons">
                            {/* only put x or check mark if both direction and the name matches  */}
                            {activeUser === person.username && direction === "left" && (
                                <span className="x">❌</span>
                            )}


                            {activeUser === person.username && direction === "right" && (
                                <span className="check">✔️</span>
                           
                            )}
                           
                        </div>
                       
                     
                    </TinderCard>
                   
                ))}
            </div>
        </div>
    );
}
export default TinderCards;
