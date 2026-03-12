import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function InputSumit({ addRow }) { 
    // We put addRow there so we can use it inside InputSumit.

    // state to store the values typed by the user
    const [namee, setNamee] = useState("");
    const [majorr, setMajorr] = useState("");
    const [subjectt, setSubjextt] = useState("");
    const [pfp, Setpfp] = useState("");


    const navigate = useNavigate();


    const [clicks, setClicks] = useState([]);
    // state to keep track of all submitted entries locally 

    function readIt(event) {
        setMajorr(event.target.value);
    }
    // Updates the 'major' value as user types

    function readIt1(event1) {
        setNamee(event1.target.value);
    }
    // Updates the 'name' value as user types

    function readIt2(event2) {
        setSubjextt(event2.target.value);
    }
    // Updates the 'subject' value as user types

    function readPic(event3){
        const file = event3.target.files[0]; //Store the first file user selected 
        if (!file) return; //If no file was selcted than stop the function 
        Setpfp(URL.createObjectURL(file)); // store the image in Setpfp. It gives it temporanry address inside your brower. 
    }

    function handleSubmit() {
        setClicks([...clicks, { majorr, namee, subjectt }]);
        addRow(namee, majorr, subjectt);
        navigate("/MainPg"); // This automaticly send the user to MainPg. 
    }

    const [rows, setRows] = useState([]);
    // state to store the rows fetched from the backend

    useEffect(() => { 
        // Fetch data from backend once when component mounts
        async function fetchData() { 
            // Tells js: “This function will do something that takes time (like fetching data),
            // and I want to wait for it without freezing everything else.”
        
            const response = await fetch("http://127.0.0.1:8000/check-db"); 
            // Send the request to my backend and await response
        
            const data = await response.json(); 
            // Convert it from JSON text → JavaScript object
            setRows(data.rows);
            // Save fetched rows in state
        }
        fetchData();
        // Calls the fetchData function immediately. triggers network request and updates the state.
    }, []); 
    // [] means: run this effect once, when the component mounts.
    
    // The bigger picture: “When the App component loads, it sends one request to /check-db,
    // gets the data returned, and stores it in state so the UI can show it.”

    return (
        <div className="min-h-screen bg-gray-900 text-gray-200 p-15 flex flex-col items-center">
            
            <div className="mb-6">
                {pfp && ( //Means only show img if pfp is not null and has value. 
                    <img 
                        src={pfp} 
                        alt="preview" 
                        className="w-32 h-32 rounded-full object-cover border-2 border-blue-500"
                    />
                )}
            </div>

            <div className="flex flex-col gap-4 w-full max-w-md">
                {/* Create inputs */}
                <input
                    type="text"
                    placeholder="Enter name"
                    className="p-3 rounded-lg bg-gray-800 border border-gray-700 text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={namee} //This is good becasue it means react is in control meaning we get user text and we can do many things to it before it comes in this line of code.
                    onChange={(e) => setNamee(e.target.value)}  //This change setNamee when ever things get typed. e is just info about what happened. 
                />
                <input
                    type="text"
                    placeholder="Enter major"
                    className="p-3 rounded-lg bg-gray-800 border border-gray-700 text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={majorr}
                    onChange={(e) => setMajorr(e.target.value)}  
                />
                <input
                    type="text"
                    placeholder="Enter subject"
                    className="p-3 rounded-lg bg-gray-800 border border-gray-700 text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={subjectt}
                    onChange={(e) => setSubjextt(e.target.value)}  
                />
                <input
                    type="file"
                    className="text-gray-200"
                    style={{ display: "none" }} //It tells the browser not to display the element at all.
                    id="fileInput"
                    onChange={readPic}
                />
                {/*label describe or label a form input, like a text box, checkbox, or file input. not nesseary we can use div but good practice*/}
                {/*htmlFor only works inside label. connects the label to the input with the matching id */}
                <label htmlFor="fileInput" className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg cursor-pointer"> 
                    
                    Upload Profile Picture
                </label>
                
            </div>

            <div className="mt-6">
                <button  
                    className="px-6 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 transition-colors cursor-pointer"
                    onClick={handleSubmit}
                >
                    Submit
                </button>
            </div>
            

            {/* <div className="mt-8 w-full max-w-md space-y-4"> 
                {clicks.map((click, index) => (
                    <div key={index} className="p-4 bg-gray-800 rounded-lg border border-gray-700">
                        <div><span className="font-semibold">Name:</span> {click.namee}</div>
                        <div><span className="font-semibold">Major:</span> {click.majorr}</div>
                        <div><span className="font-semibold">Subject:</span> {click.subjectt}</div>
                    </div>
                ))}
            </div> */}
        </div>
    );
}