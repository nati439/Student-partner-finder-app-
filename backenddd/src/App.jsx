import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
// import { useLongPoll } from "./useLongPoll";
import RealLandPage from "./landingPage/realLandPage";
import Contectpg from "./landingPage/contectpg";
import About from "./landingPage/about";
import LoginSign from "./auth/LoginSign";
import TheMainPg from "./profile/TheMainPgs";
import RealMain from "./RealMainpg";
import Header from "./Header";
import TinderCards from "./swipe/TinderCards";
import {IdContext} from './context/AuthContext'

function App(){
  
  const [id, setids] = useState("")
  useEffect(() => {
    const ids = localStorage.getItem("user_id")
    setids(ids)
  }, [])
  
//   const message = useLongPoll("http://localhost:8000/poll");
//   const [input, setInput] = useState("");

//   async function sendMessage() {
//     await fetch("http://localhost:8000/send", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ message: input }),
//     });
//     setInput("");
//   }

  // async function addRow(namee, majorr, subjectt) { //async allows you to use await inside, so you can wait for the backend response
  //   const response = await fetch("http://127.0.0.1:8000/add-row", { //fetch() sends a network request to your backend at /add-row
  //     method: "POST", //tells the server this is a POST request (we are sending data)
  //     headers: { "Content-Type": "application/json" }, //tells the server that the body is JSON. This is lable about the data and code bewlow is the real data.
  //     body: JSON.stringify({ namee, majorr, subjectt}) //Conver the name to json format so it can traver through the network. 
  //   });
  //   const data = await response.json();
  //   // Wait for the server to finish sending the data, Convert it from
  //   //  JSON text → JavaScript object
  //   console.log(data);
  //   //Prints the response from the backend to the browser console
  // }

  return(
    <>
      {/* Long polling UI — remove or move this wherever you want */}
      {/* <div>
        <p>Latest message: {message ? JSON.stringify(message) : "waiting..."}</p>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message"
        />
        <button onClick={sendMessage}>Send</button>
      </div> */}

      {/* <BrowserRouter> */}
        <IdContext.Provider value={id}>
              <Routes>
          
                  <Route path="/" element={<RealLandPage />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/contact" element={<Contectpg/>}/>
                  <Route path="/LoginSign" element={<LoginSign/>}/>
                  <Route path="/MainPg" element={<TheMainPg/>}/>
                  <Route path="/RealMain" element={<RealMain/>}/>  
                  {/* <Route path="/Header" element={<Header/>}/> */}
                  {/* <Route path="/Weather" element={<Weather/>}/>   */}
                
                  <Route path="/TinderCards" element={
                    <> 
                      <Header/> 
                      <TinderCards/>
                    </>
                  }
                  />

              </Routes>
                  
        </IdContext.Provider>
        
      {/* </BrowserRouter> */}
    </>
  );
}
export default App;