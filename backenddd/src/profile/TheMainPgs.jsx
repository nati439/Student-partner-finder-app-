
import mainpg from '../assets/mainbg.jpg';
import whitebg from '../assets/white.jpg';
import { useState, useEffect, useContext } from 'react';
import { Link } from "react-router-dom";
import { tinderfetch } from '../api/Profile';
import { uploadpfps } from '../api/Profile';
//b/c tinderfetch is a export function. you can do this to use it in here
import { IdContext } from '../cmp/AuthContext';

export default function TheMainPgs(){
    const userId = useContext(IdContext);
    console.log("MAIN PAGE USER ID:", userId);
    const BASE_URL = import.meta.env.VITE_API_URL;
    const [pfp, Setpfp] = useState("");
    const [username, Setusername] = useState("");
    const [college, Setcollege] = useState("");
    const [year, Setyear] = useState("");
    const [major, Setmajor] = useState("");
    const [subject, Setsubject] = useState("");
    const [note, Setnote] = useState("");
    const [day, Setday] = useState("");
    const [time, Settime] = useState("");
    const [contact, Setcontact] = useState("");

    // const [subimt, Setsubimt] = useState([]);
    const [user, Setuser] = useState({});
    const [subjects, Setsubjects] = useState({});
    const [times, Settimes] = useState({});
    
    //two goals: 1. send quick messege saying it's updated 2. clear everything you wrote in the text-box
    //1. if not null do this - i want it to go away after 5 seconds - click --> not null --> messege
    //2. 
    const [showMsg, setShowMsg] = useState(false);

    async function uploadpfp(event) {
        const file = event.target.files[0];
        if (!file) return;

        try {
            const url = await uploadpfps(file);
            Setpfp(url);
        } catch (err) {
            console.error(err);
        }
    }



    //every time page re-render send data to backend 
    // useEffect 
    // fetch 
    // Add the fetch value to the usestate. The one that supposed to hold the value when first user get to website and put there info 
    


    //It stores a value in the browser so it doesn’t disappear when you refresh

        useEffect(() => {
            // console.log("🔥 useEffect started");

            // const username = localStorage.getItem("username");
            // const college = localStorage.getItem("college");

           
//"http://127.0.0.1:8000/retrieve"
            // if (!username) {
            //     console.log("⛔ No username found — stopping fetch");
            //     return;
            // }

            // if (!college) {
            //     console.log("⛔ No username found — stopping fetch");
            //     return;
            // }
            

            async function fetchdata() {
                // console.log("📡 Fetching user:", username);

                const res = await fetch(`${BASE_URL}/users/${userId}`);
                // console.log("📥 Response status:", res.status);

                const data = await res.json();
                // console.log("📦 Data received:", data);
                
                if (!data) {
                    console.log("No profile exists yet for user:", userId);
                    return;
                }

                Setcollege(data.college);
                Setcontact(data.contact);
                Setnote(data.note);
                Setday(data.day);
                Setpfp(data.pfp);
                Setsubject(data.subject);
                Setusername(data.username);
                Setyear(data.year);
                Settime(data.time);
                Setmajor(data.major);

                console.log("✅ State updated");
            }

            fetchdata();
        }, [userId]);

        //useeffect 
        // send fetch at /retrieve?major=something
        //make it run every time major change
        
        // useEffect (() => {
        //     async function getmajor(){
        //         const getdata = await fetch(`http://127.0.0.1:8000/matching/${major}`)
                
        //     }

        //     getmajor();
        // }, [])

        // useEffect(() => {
        //     console.log("STORED USERNAME:", localStorage.getItem("username"));

        //     const username = localStorage.getItem("username");

        //     if (!username) return;

        //     // fetch here...
        // }, []);
            
   //It’s wrong because it fires on any small change instead of a deliberate submit action, which leads to unintended requests.
// Here’s your **full corrected version with only necessary fixes applied** (no restructuring, just fixes):


// useEffect(() => {
//     console.log("STATE user:", user);
//     console.log("STATE subject:", subject);
//     console.log("STATE time:", time);
// }, [user, subject, time]);


    function dmessege(){
        setShowMsg(true);
        const timer = setTimeout(() => {
            setShowMsg(false);
        }, 3000);

        return () => clearTimeout(timer);
    }
    

    // useEffect(() => {
    //     const payload = {}
    //     if (subimt.length > 0) {
    //         setShowMsg(true);

    //         const timer = setTimeout(() => {
    //         setShowMsg(false);
    //         }, 3000);

    //         return () => clearTimeout(timer); //Clear the messge after 5 second which means 2000 
    //     }
    // }, [subimt]); //First this runs after first render, run whenever subimt changes.

    // useEffect(() =>  {
    //     async function fetchData(){
    //         if(subimt.length > 0){
    //             const thedate = await fetch("http://127.0.0.1:8000/tinder" ,{
    //                 method: "POST",
    //                 headers: {"Content-Type": "application/json"},
    //                 body: JSON.stringify({subimt})
    //             });

    //             const thejson = await thedate.json();

                
                
                
    //         }
    //     }

    //     fetchData()
       
    // },[subimt])
    // console.log("pfp:", pfp);

    useEffect( () => {
        localStorage.setItem("major", major);
    })
      
    
return (
    <>
        {/* Full-screen background and central layout */}
        <div className="relative min-h-screen w-full bg-black text-white">
            <img 
                src={mainpg} 
                className='absolute inset-0 h-full w-full object-cover' 
                alt="background"
            />

            {/* Layout: Grid restricted to 3 columns side by side */}
            <div className="relative z-10 max-w-[1000px] mx-auto px-4 py-6">
                <div className="grid grid-cols-3 gap-4 items-start">

                    {/* LEFT SIDE CARD */}
                    <div>
                        <div className="w-full space-y-3">
                            {/* Major Dropdown */}
                            <select
                                className='w-full px-3 py-2 text-sm
                                    bg-white/20 backdrop-blur-md
                                    text-white rounded-lg outline-none
                                    border border-white/30'
                                value={major}
                                onChange={(e) => Setmajor(e.target.value)}
                            >
                                <option value="">Select Engineering Field</option>
                                <option className="text-black">Civil Engineering</option>
                                <option className="text-black">Mechanical Engineering</option>
                                <option className="text-black">Electrical Engineering</option>
                                <option className="text-black">Computer Engineering</option>
                                <option className="text-black">Software Engineering</option>
                                <option className="text-black">Chemical Engineering</option>
                                <option className="text-black">Aerospace Engineering</option>
                                <option className="text-black">Biomedical Engineering</option>
                                <option className="text-black">Industrial Engineering</option>
                                <option className="text-black">Environmental Engineering</option>
                            </select>

                            {/* Specific Subject */}
                            <input
                                type="text"
                                placeholder="Specific Subject (e.g. Circuits)"
                                className='w-full px-3 py-2 text-sm
                                        bg-white/20 backdrop-blur-md
                                        text-white placeholder-white/70
                                        rounded-lg outline-none border border-white/30'
                                value={subject}
                                onChange={(e) => Setsubject(e.target.value)}
                            />

                            {/* Note Section */}
                            <textarea
                                placeholder="Leave a note for study details..."
                                className='w-full h-[120px] px-3 py-2 text-sm
                                        bg-white/20 backdrop-blur-md
                                        text-white placeholder-white/70
                                        rounded-lg outline-none border border-white/30 resize-none'
                                value={note}
                                onChange={(e) => Setnote(e.target.value)}
                            />
                        </div>
                    </div>

                    {/* CENTER CARD */}
                    <div className="flex justify-center">
                        <div className="relative bg-transparent w-full max-w-[280px]">
                            {/* White Card */}
                            <img 
                                src={whitebg} 
                                className='rounded-xl w-full h-[450px] object-cover' 
                                alt="user info background" 
                            />

                            {/* Hidden File Input */}
                            <input
                                type="file"
                                className="hidden"
                                id="fileInput"
                                onChange={uploadpfp}
                            />

                            {/* Upload Button */}
                            <label 
                                htmlFor="fileInput" 
                                className="absolute left-1/2 -translate-x-1/2 top-4
                                        px-3 py-1.5 bg-white/90 backdrop-blur-md 
                                        hover:bg-white text-gray-800 
                                        font-semibold rounded-lg shadow-md 
                                        cursor-pointer text-xs whitespace-nowrap"
                            >
                                Upload Profile Picture
                            </label>

                            {/* Profile Image Preview */}
                            {pfp && (
                                <img 
                                    src={pfp} 
                                    alt="preview" 
                                    className="absolute rounded-lg object-cover
                                            left-1/2 -translate-x-1/2 top-14
                                            w-[220px] h-[230px] border-2 border-green-500"
                                />
                            )}

                            {/* Inputs container */}
                            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-[85%] space-y-2">
                                <input
                                    type='text'
                                    placeholder='Username'
                                    className='w-full px-3 py-1.5 text-xs
                                            bg-black/20 backdrop-blur-md
                                            text-white placeholder-white/70
                                            rounded-md outline-none border border-black/30
                                            focus:border-black'
                                    value={username}
                                    onChange={(e) => Setusername(e.target.value)}
                                />

                                <input
                                    type='text'
                                    placeholder='College / University'
                                    className='w-full px-3 py-1.5 text-xs
                                            bg-black/20 backdrop-blur-md
                                            text-white placeholder-white/70
                                            rounded-md outline-none border border-black/30
                                            focus:border-black'
                                    value={college}
                                    onChange={(e) => Setcollege(e.target.value)}
                                />

                                <input
                                    type='text'
                                    placeholder='Year (Freshman, etc)'
                                    className='w-full px-3 py-1.5 text-xs
                                            bg-black/20 backdrop-blur-md
                                            text-white placeholder-white/70
                                            rounded-md outline-none border border-black/30
                                            focus:border-black'
                                    value={year}
                                    onChange={(e) => Setyear(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>

                    {/* RIGHT SIDE CARD */}
                    <div>
                        <div className="w-full space-y-3">
                            {/* Specific Day Available */}
                            <input
                                type="text"
                                placeholder="Which day are you available?"
                                className='w-full px-3 py-2 text-sm
                                        bg-white/20 backdrop-blur-md
                                        text-white placeholder-white/70
                                        rounded-lg outline-none border border-white/30'
                                value={day}
                                onChange={(e) => Setday(e.target.value)}
                            />

                            {/* Time Available */}
                            <input
                                type="text"
                                placeholder="Time (e.g., 2 PM - 5 PM)"
                                className='w-full px-3 py-2 text-sm
                                        bg-white/20 backdrop-blur-md
                                        text-white placeholder-white/70
                                        rounded-lg outline-none border border-white/30'
                                value={time}
                                onChange={(e) => Settime(e.target.value)}
                            />

                            {/* Contact Info */}
                            <input
                                type="text"
                                placeholder="Phone / Email / Social Media"
                                className='w-full px-3 py-2 text-sm
                                        bg-white/20 backdrop-blur-md
                                        text-white placeholder-white/70
                                        rounded-lg outline-none border border-white/30'
                                value={contact}
                                onChange={(e) => Setcontact(e.target.value)}
                            />
                        </div>
                    </div>
                </div>
            </div>
            
            {/* Submit button section */}
            <div className="fixed right-8 bottom-6 flex items-center gap-3 z-20"> 
                <button
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg text-sm"
                    onClick={() => {
                        localStorage.setItem("username", username);
                        localStorage.setItem("college", college);
                        localStorage.setItem("year", year);

                        dmessege();

                        if (pfp.length > 0 || username.length > 0 || college.length > 0 || year.length > 0) {
                            Setuser({ pfp, username, college, year });
                        }

                        if (major.length > 0 || subject.length > 0 || note.length > 0) {
                            Setsubjects({ major, subject, note });
                        }

                        if (day.length > 0 || time.length > 0 || contact.length > 0) {
                            Settimes({ day, time, contact });
                        }
                        
                        console.log("USER ID:", userId);
                        const payload = {
                            user_id: userId,
                            user: { pfp, username, college, year },
                            subject: { major, subject, note },
                            time: { day, time, contact },
                        };


            

                        async function readTinder() {
                            console.log("PAYLOAD BEING SENT:", payload);

                            const store = await tinderfetch(payload);

                            console.log("RESPONSE:", store);
                        }

                        readTinder();
                    }}
                >
                    Save
                </button>
                <Link to="/TinderCards" className="px-4 py-2 bg-gray-700 hover:bg-gray-800 text-white font-medium rounded-lg text-sm">Next</Link>
            </div>

            {/* Message area */}
            <div className='fixed right-8 bottom-16 z-30'>
                <div className='text-green-400 text-sm'>
                    {showMsg && <span>Your profile has been updated</span>}
                </div>
            </div>
        </div>
    </>
)
}