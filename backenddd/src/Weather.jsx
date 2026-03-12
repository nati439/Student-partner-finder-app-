// import {  useEffect, useState } from "react"
// export default function Weather(){
//     const [store, SetStore] = useState(""); 
//     const [timing, SetTime] = useState([]);

//         useEffect(() => {
//         const fetchWeather = async () => {
//             const res = await fetch("https://api.open-meteo.com/v1/forecast?latitude=39.0997&longitude=-94.5786&daily=sunrise,sunset,rain_sum,showers_sum&hourly=temperature_2m,weather_code,rain,showers,snowfall");
//             const data = await res.json();
//             SetStore(data);
//         }; 
//         fetchWeather();
    

//         }, []);

//         if(store != null && store != undefined){
//             if(store.hourly != null && store.hourly != undefined ){
//                 if(store.hourly.time != null && store.hourly.time != undefined){
//                     const times2 = store.hourly.time
//                     SetTime(times2)
//                     console.log("Data exists")
//                 }else{console.log("store.hourly.time is null or undefined")}
//             }else{console.log("Store.hourly is null or undefined")}
//         }else{console.log("Store is null or undefined")}

        
      
//     return(
//         <>
//             <ul>
//                 {timing.map((t, index) => (
//                     <li key={index}>{t}</li>
//                 ))}
            
//             </ul>
//         </>
//     )
// };