export async function Sendswipe(direction, person, userId){
    if (direction === "right") {
            await fetch("http://127.0.0.1:8000/swipe", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    swiper_id: Number(userId),
                    swiped_id: person.id, // make sure your person object has an id
                    direction: "right"
                })
            });
    }
}

export async function Getmatchingpeople(major){
    
            const response = await fetch(`http://127.0.0.1:8000/matching/${major}`);
            //will change the url fetch 
            const json = await response.json();
            const data = json.users ? json.users : json;
            return data
            
        
}