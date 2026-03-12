
import mainpg from './assets/mainbg.jpg';
import whitebg from './assets/white.jpg';
import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";

export default function TheMainPg(){
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

    const [subimt, Setsubimt] = useState([]);
    //two goals: 1. send quick messege saying it's updated 2. clear everything you wrote in the text-box
    //1. if not null do this - i want it to go away after 5 seconds - click --> not null --> messege
    //2. 
    const [showMsg, setShowMsg] = useState(false);

    function uploadpfp(event){
        const file = event.target.files[0];
        if (!file) return;
        // optional: only allow images (kept minimal as requested)
        if (!file.type.startsWith("image/")) return;
        Setpfp(URL.createObjectURL(file));
    }

    useEffect(() => {
        if (subimt.length > 0) {
            setShowMsg(true);

            const timer = setTimeout(() => {
            setShowMsg(false);
            }, 3000);

            return () => clearTimeout(timer); //Clear the messge after 5 second which means 2000 
        }
    }, [subimt]); //First this runs after first render, run whenever subimt changes.

    return(
        <>
            {/* Full-screen background and central layout */}
            <div className="relative min-h-screen w-full bg-black text-white">
                <img 
                    src={mainpg} 
                    className='absolute inset-0 h-full w-full object-cover' 
                    alt="background"
                />

                {/* Layout: on small screens stack vertically, on md+ show three columns (left, center, right) */}
                <div className="relative z-10 max-w-[1200px] mx-auto px-4 py-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
                        {/*grid-cols-1 makes the 3 boxs be one cols when under 760px. md:grid-cols-3 make 3 boxs be 3 cols above 760px  */}

                        {/* LEFT SIDE CARD (stacks above center on small screens) */}
                        <div className="order-1 md:order-1">
                            <div className="w-full md:w-[360px] mx-auto space-y-6">
                                {/* Major Dropdown */}
                                <select
                                    className='w-full px-4 py-3 text-lg
                                        bg-white/20 backdrop-blur-md
                                        text-white rounded-lg outline-none
                                        border border-white/30'
                                    value={major}
                                    onChange={(e) => Setmajor(e.target.value)}
                                >
                                    <option value="">Select Engineering Field</option>
                                    <option className="text-black ">Civil Engineering</option>
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
                                    placeholder="Specific Subject (Example: Circuits, Thermodynamics)"
                                    className='w-full px-4 py-3 text-lg
                                            bg-white/20 backdrop-blur-md
                                            text-white placeholder-white/70
                                            rounded-lg outline-none border border-white/30'
                                    value={subject}
                                    onChange={(e) => Setsubject(e.target.value)}
                                />

                                {/* Note Section */}
                                <textarea
                                    placeholder="Leave a note for more information about what you want to study..."
                                    className='w-full h-[250px] px-4 py-3 text-lg
                                            bg-white/20 backdrop-blur-md
                                            text-white placeholder-white/70
                                            rounded-lg outline-none border border-white/30 resize-none'
                                    value={note}
                                    onChange={(e) => Setnote(e.target.value)}
                                />
                            </div>
                        </div>

                        {/* CENTER CARD */}
                        <div className="order-2 md:order-2 flex justify-center">
                            <div className="relative bg-transparent">
                                {/* White Card */}
                                <img 
                                    src={whitebg} 
                                    className='rounded-xl w-full max-w-[400px] h-auto md:h-[700px] object-cover' 
                                    //w-full means 100% of the parent container It will stretch to fill 
                                    //h-auto automatically scales so the image doesn't get warped 
                                    
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
                                    className="absolute left-1/2 -translate-x-1/2 top-8
                                            px-4 py-2 bg-white/90 backdrop-blur-md 
                                            hover:bg-white text-gray-800 
                                            font-semibold rounded-xl shadow-md 
                                            cursor-pointer text-sm"
                                >
                                    Upload Profile Picture
                                </label> {/*We use label when we are working with file*/}

                                {/* Profile Image Preview */}
                                {pfp && ( //We run this if there is something inside pfp
                                    <img 
                                        src={pfp} 
                                        alt="preview" 
                                        className="absolute rounded-xl object-cover
                                                left-1/2 -translate-x-1/2 top-20
                                                w-[320px] md:w-[390px] h-[420px] md:h-[500px] border-2 border-green"
                                    />
                                )}

                                {/* Inputs container (positioned near the bottom of the card) */}
                                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-[320px] md:w-[360px] space-y-3">
                                    <input
                                        type='text'
                                        placeholder='Username'
                                        className='w-full px-4 py-2 
                                                bg-black/20 backdrop-blur-md
                                                text-white placeholder-white/70
                                                rounded-lg outline-none border border-black/30
                                                focus:border-black'
                                        value={username}
                                        onChange={(e) => Setusername(e.target.value)}
                                    />

                                    <input
                                        type='text'
                                        placeholder='College / University'
                                         className='w-full px-4 py-2 
                                                bg-black/20 backdrop-blur-md
                                                text-white placeholder-white/70
                                                rounded-lg outline-none border border-black/30
                                                focus:border-black'
                                        value={college}
                                        onChange={(e) => Setcollege(e.target.value)}
                                    />

                                    <input
                                        type='text'
                                        placeholder='Year (Freshman, etc)'
                                         className='w-full px-4 py-2 
                                                bg-black/20 backdrop-blur-md
                                                text-white placeholder-white/70
                                                rounded-lg outline-none border border-black/30
                                                focus:border-black'
                                        value={year}
                                        onChange={(e) => Setyear(e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* RIGHT SIDE CARD */}
                        <div className="order-3 md:order-3">
                            <div className="w-full md:w-[360px] mx-auto space-y-6">
                                {/* Specific Day Available */}
                                <input
                                    type="text"
                                    placeholder="Which day are you available?"
                                    className='w-full px-4 py-3 text-lg
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
                                    className='w-full px-4 py-3 text-lg
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
                                    className='w-full px-4 py-3 text-lg
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
                
                {/* Submit button: responsive placement */}
                {/* On small screens the button is centered near the bottom; on md+ placed at bottom-right */}
                <div className="fixed inset-x-0 right-40 bottom-6 flex justify-center md:justify-end md:pr-10 z-20"> 
                    {/*inset-x-0 means right-0 and left-0 so it's fully stretch on left and right side*/}
                    {/*md means this rule only apply to medium and large screen*/}
                    <button
                        className='text-white text-[20px] md:text-[28px] bg-black p-4 md:p-6 rounded-full shadow-lg'
                        onClick={() => {
                            //The code below this check if any of my values have a letter inside them if yes it show the messege it has been updated.
                            if (pfp.length > 0 || username.length > 0  || college.length > 0 || year.length > 0 || major.length > 0  || subject.length > 0  || note.length > 0  || day.length > 0  || time.length > 0  || contact.length > 0 ){
                                Setsubimt(prev => [...prev, {pfp,username,college, year, major, subject, note, day, time, contact} ])
                            }
                        }}
                    >
                        Save
                    </button>
                </div>

                <Link classame='text-red-500 absolute z-1 md:text-[40px] right-50 top-120 fixed bg-black p-4 rounded-full' to="/RealMain"> Next </Link>
                
            

                {/* Message area: responsive position */}
                <div className='fixed right-10 -translate-x-1/2 bottom-24 md:bottom-32 z-30'>
                    <div className='text-green-500 text-[18px] md:text-[20px]'>
                        {showMsg && <h1>Your profile has been updated</h1>} {/*renders only if it's true*/}
                    </div>
                </div>
            </div>
        </>
    )
}