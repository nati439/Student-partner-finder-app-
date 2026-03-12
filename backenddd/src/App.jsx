import { Routes, Route } from "react-router-dom";
import InputSumit from "./inputSumit";
import RealLandPage from "./landingPage/realLandPage";
import Contectpg from "./landingPage/contectpg";
import About from "./landingPage/about";
import LoginSign from "./LoginSign";
import TheMainPg from "./TheMainPg";
import RealMain from "./RealMainpg";
import Header from "./Header";
import TinderCards from "./TinderCards";
// import Header from "./Hearder";
function App(){
  async function addRow(namee, majorr, subjectt) { //async allows you to use await inside, so you can wait for the backend response
    const response = await fetch("http://127.0.0.1:8000/add-row", { //fetch() sends a network request to your backend at /add-row
      method: "POST", //tells the server this is a POST request (we are sending data)
      headers: { "Content-Type": "application/json" }, //tells the server that the body is JSON. This is lable about the data and code bewlow is the real data.
      body: JSON.stringify({ namee, majorr, subjectt}) //Conver the name to json format so it can traver through the network. 
    });
    const data = await response.json();
    // Wait for the server to finish sending the data, Convert it from
      //  JSON text → JavaScript object
    console.log(data);

    //Prints the response from the backend to the browser console
  // The bigger picture is: You click a button → the frontend sends what you typed to /add-row → the backend 
  // saves it → the backend sends a response back → the frontend reads it.
  }

  return(
    <>
      
      {/* <BrowserRouter> */}
        <Routes>
          {/* <InputSumit addRow={addRow}/> 
          //Okey you don't import this becasue it's owned by App.jsx. You pass it as props.  */}

          <Route path="/" element={<RealLandPage />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contectpg/>}/>
          <Route path="/start" element={<InputSumit addRow={addRow} />} />
          <Route path="/LoginSign" element={<LoginSign/>}/>
          <Route path="/MainPg" element={<TheMainPg/>}/>
          <Route path="/RealMain" element={<RealMain/>}/>  
          {/* <Route path="/Header" element={<Header/>}/> */}
          {/* <Route path="/Weather" element={<Weather/>}/>   */}
         
          <Route path="TinderCards" element={
            
            <> 
              <Header/> 
            
              <TinderCards/>
            </>
          }
          />

        </Routes>
      {/* </BrowserRouter> */}
    </>
      
  );
}
export default App;
