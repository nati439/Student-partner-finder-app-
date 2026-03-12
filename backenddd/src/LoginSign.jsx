import { useEffect, useState } from "react";
import lightoff from './assets/lightoff.jpg';
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export default function LoginSign() {
    const [lusername, Setlusername] = useState("");
    const [lpassword, Setlpassword] = useState("");
    const [susername, Setsusername] = useState("");
    const [spassword, Setspassword] = useState("");

    const [login, Setlogin] = useState(null);
    const [sign, Setsign] = useState([]);
    const [loginTried, setLoginTried] = useState(false);

    function getUsername1(event) { Setlusername(event.target.value); }
    function getPassword1(event) { Setlpassword(event.target.value); }
    function getUsername2(event) { Setsusername(event.target.value); }
    function getPassword2(event) { Setspassword(event.target.value); }

    const navigate = useNavigate();

    // Run this when login state changes
    useEffect(() => {
        if (login && login.access_token) {
            // Login means we received a response. Login.access_token means we got the token.
            navigate("/MainPg");
        }
    }, [login]);

    const Ilogin = function() {
        if (loginTried && login && !login.access_token) {
            // loginTried means user clicked login. Login means we received a response.
            return (
                <div className="text-red-500 absolute top-96 right-225 z-10">
                    Incorrect password or username
                </div>
            );
        }
    }

    const handleCLick = async (e) => {
        e.preventDefault(); 
        
        //code abnove; So when we do form brower normally reload the page. That will interrupt my fetching request so this stop it from doing that. 
    

        const res = await fetch("http://localhost:8000/auth/signup", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username: susername, password: spassword })
        });

        const data = await res.json();
        Setsign(data);

        // navigate after successful signup
        navigate("/start");
    };

    const handleCLick2 = async (e) => {
        e.preventDefault(); //I explain it above 

        const res2 = await fetch("http://127.0.0.1:8000/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username: lusername, password: lpassword })
        });

        const data2 = await res2.json();
        Setlogin(data2); // ✅ store the response
        setLoginTried(true);
    }

    return (
        <div className="relative w-full h-screen">
            {/* Background */}
            <img src={lightoff} alt="The background" className="w-full h-full object-cover" />

            {/* Login Section */}
            <div className="absolute top-20 left-100 text-white flex flex-col space-y-4">
                <h1 className="text-4xl p-5">Login</h1>
                <input 
                    type="text"
                    className="p-4 rounded bg-gray-800 text-white placeholder-gray-400"
                    placeholder="Username"
                    value={lusername}
                    onChange={(e) => Setlusername(e.target.value)}
                />
                <input 
                    type="password"
                    className="p-4 rounded bg-gray-800 text-white placeholder-gray-400"
                    placeholder="Password"
                    value={lpassword}
                    onChange={(e) => Setlpassword(e.target.value)}
                />
                <button 
                    className="p-4 bg-green-600 hover:bg-green-700 rounded text-white"
                    type="button"
                    onClick={handleCLick2}
                >
                    Done
                </button>
            </div>

            {/* Signup Section */}
            <div className="absolute top-20 right-100 text-white flex flex-col space-y-4">
                <h1 className="text-4xl p-5">Create Account</h1>
                <input 
                    type="text"
                    className="p-4 rounded bg-gray-800 text-white placeholder-gray-400"
                    placeholder="Username"
                    value={susername}
                    onChange={(e) => Setsusername(e.target.value)}
                />
                <input 
                    type="password"
                    className="p-4 rounded bg-gray-800 text-white placeholder-gray-400"
                    placeholder="Password"
                    value={spassword}
                    onChange={(e) => Setspassword(e.target.value)}
                />
                <button 
                    className="p-4 bg-green-600 hover:bg-green-700 rounded text-white"
                    type="button"
                    onClick={handleCLick}
                >
                    Done
                </button>
            </div>

            {/* Show login error if exists */}
            {Ilogin()}
        </div>
    );
};