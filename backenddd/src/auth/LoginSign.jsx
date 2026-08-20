//login and sigin 
import { useEffect, useState } from "react";
import lightoff from '../assets/lightoff.jpg';
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import React from 'react'
import {login} from '../api/auth'
import Input from "@mui/material/Input";
import { signup } from "../api/auth";
const BASE_URL = import.meta.env.VITE_API_URL;
export default function LoginSign() {
    const [lusername, Setlusername] = useState("");
    const [lpassword, Setlpassword] = useState("");
    const [susername, Setsusername] = useState("");
    const [spassword, Setspassword] = useState("");

    const [logins, Setlogin] = useState(null);  
    // const [sign, Setsign] = useState([]); not necessary 
    const [loginTried, setLoginTried] = useState(false);

    // function getUsername1(event) { Setlusername(event.target.value); } dead code
    // function getPassword1(event) { Setlpassword(event.target.value); }
    // function getUsername2(event) { Setsusername(event.target.value); }
    // function getPassword2(event) { Setspassword(event.target.value); }

    const navigate = useNavigate();

    useEffect(() => {
        if (logins && logins.access_token ) {
            navigate("/MainPg");
        }
    }, [logins]);

    const Ilogin = function() {
        if (logins && loginTried && !logins.access_token) {
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
            
        try{
            await signup(susername, spassword)

            // navigate after successful signup
            navigate("/MainPg");
        }catch(err){
            console.error(err)
        } 

        
        

      
    };


    const handleCLick2 = async (e) => {
        
        e.preventDefault(); //I explain it above 

        
        // try{
        //     const data2 = await login(lusername, lpassword);
        //        localStorage.setItem("user_id", data2.user_id);//////
        //         localStorage.setItem("username", data2.username);///////
        //         Setlogin(data2);    // ✅ store the response
        // }catch(err){
        //     console.error(err)
        // } finally{
        //        setLoginTried(true);
        // //without this the error will appear all the time.
        // }
        const data2 = await login(lusername, lpassword);

        console.log("LOGIN RESPONSE:", data2);

        localStorage.setItem("user_id", data2.user_id);
        localStorage.setItem("username", data2.username);

        Setlogin(data2);
   

     
     
    }
return (
    <div className="relative w-full h-screen">

        {/* Background */}
        <img
            src={lightoff}
            alt="The background"
            className="w-full h-full object-cover"
        />

        {/* Login Section */}
{/* Login Section */}
        <div className="absolute top-16 left-[12%] text-white flex flex-col space-y-3 w-[260px]
            max-[800px]:top-2 max-[800px]:left-1/2 max-[800px]:-translate-x-1/2 max-[800px]:w-[85%] max-[800px]:max-w-[220px] max-[800px]:space-y-1">
            <h1 className="text-3xl p-3 max-[800px]:text-xl max-[800px]:p-1">
                Login
            </h1>

            <Input
                type="text"
                placeholder="Username"
                value={lusername}
                onChange={(e) => Setlusername(e.target.value)}
                sx={{
                    "& input": {
                        color: "white",
                    }
                }}
            />

            <Input
                type="password"
                placeholder="Password"
                value={lpassword}
                onChange={(e) => Setlpassword(e.target.value)}
                sx={{
                    "& input": {
                        color: "white",
                    }
                }}
            />

            <button
                className="p-3 bg-green-600 hover:bg-green-700 rounded text-white"
                type="button"
                onClick={handleCLick2}
            >
                Done
            </button>
        </div>


        {/* Signup Section */}
        {/* Signup Section */}
        {/* Signup Section */}
        {/* Signup Section */}
        <div className="absolute top-16 right-[12%] text-white flex flex-col space-y-3 w-[260px]
            max-[800px]:top-[190px] max-[800px]:left-1/2 max-[800px]:-translate-x-1/2 max-[800px]:right-auto max-[800px]:w-[85%] max-[800px]:max-w-[220px] max-[800px]:space-y-1">
            <h1 className="text-3xl p-3 max-[800px]:text-xl max-[800px]:p-1">
                Create Account
            </h1>

            <Input
                type="text"
                placeholder="Username"
                value={susername}
                onChange={(e) => Setsusername(e.target.value)}
                sx={{
                    "& input": {
                        color: "white",
                    }
                }}
            />

            <Input
                type="password"
                placeholder="Password"
                value={spassword}
                onChange={(e) => Setspassword(e.target.value)}
                sx={{
                    "& input": {
                        color: "white",
                    }
                }}
            />

            <button
                className="p-3 bg-green-600 hover:bg-green-700 rounded text-white"
                type="button"
                onClick={handleCLick}
            >
                Done
            </button>
        </div>

        {/* Show login error if exists */}
        {Ilogin()}

    </div>
)

}