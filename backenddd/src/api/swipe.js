const BASE_URL =import.meta.env.VITE_API_URL;
export async function Sendswipe(direction, person, userId){
    if (direction === "right") {
        const res = await fetch("http://127.0.0.1:8000/swipe", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                swiper_id: Number(userId),
                swiped_id: person.id,
                direction: "right"
            })
        });

        const data = await res.json();
        console.log("SWIPE RESPONSE:", data);
    }
}
export async function Getmatchingpeople(major, userId) {
    const response = await fetch(`${BASE_URL}/matching/${major}/${userId}`);
    const json = await response.json();
    const data = json.users ? json.users : json;
    return data;
}