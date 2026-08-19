// import { useEffect, useRef, useState } from "react";

// export function useLongPoll(url) {
//   const [data, setData] = useState(null);
//   const abortRef = useRef(null);

//   useEffect(() => {
//     let active = true;

//     async function poll() {
//       while (active) {
//         abortRef.current = new AbortController();
//         try {
//           const res = await fetch(url, {
//             signal: abortRef.current.signal,
//           });
//           const json = await res.json();

//           if (json.status === "ok" && json.data) {
//             setData(json.data);
//           }
//         } catch (err) {
//           if (err.name === "AbortError") break;
//           await new Promise((r) => setTimeout(r, 2000));
//         }
//       }
//     }

//     poll();

//     return () => {
//       active = false;
//       abortRef.current?.abort();
//     };
//   }, [url]);

//   return data;
// }

// //big picture: think like this --> “Keep knocking on the server’s door until it finally gives me something new.”
// //