import math from '../assets/math.jpg';
import logo from '../assets/logo.jpg';
import { Link } from "react-router-dom";

export default function RealLandPage() {
  return (
    <>
      {/* Inline CSS for animations */}
      <style>
        {/* those are just here to make website look good.  */}
        {`
        
          @keyframes swing {
            0% { transform: rotate(0deg); }
            25% { transform: rotate(1deg); }
            50% { transform: rotate(-1deg); }
            75% { transform: rotate(1deg); }
            100% { transform: rotate(0deg); }
          }
          .animate-swing {
            animation: swing 30s infinite ease-in-out;
            transform-origin: top center;
          }

          @keyframes float {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-10px); }
          }
          .animate-float {
            animation: float 20s ease-in-out infinite;
          }

    
          
        `}
      </style>

      <div className="relative w-full h-screen bg-gray-900 overflow-hidden">
        {/* Background image with overlay */}
        <img src={math} alt="background" className="w-full h-full object-cover absolute top-0 left-0" />
        <div className="absolute top-0 left-0 w-full h-full bg-black/50"></div>

        {/* Navbar */}
      <nav className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-white/95 rounded-xl px-12 py-3 shadow-md w-[700px] flex gap-12 items-center justify-between
               border-2 border-transparent hover:border-blue-400 transition-all duration-500
               hover:shadow-[0_0_20px_rgba(0,123,255,0.6)]">
          <img src={logo} alt="logo" className="w-16 h-16" />
          <div className="text-2xl font-bold text-gray-800">StudyMate</div>
          <ul className="flex gap-8 font-semibold text-black-800 text-lg">
            <li>
              <Link to="/about" className="hover:text-yellow-500 transition-colors">About</Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-yellow-500 transition-colors">Contact</Link>
            </li>
          </ul>
        </nav>

        {/* Main Headline */}
        <div className="absolute top-40 left-1/2 transform -translate-x-1/2 text-center animate-float px-4">
          <h1 className="text-[4.5rem] md:text-[5.5rem] text-white font-extrabold drop-shadow-lg leading-snug">
            Ace Engineering Together
          </h1>
          <p className="mt-4 text-xl md:text-2xl text-white/90 max-w-xl mx-auto">
            The right study partner changes everything. Find someone to learn with, stay motivated, and succeed together.
          </p>
          <Link to="/login" className="inline-block mt-15 px-8 py-4 bg-yellow-400 text-black font-bold text-xl rounded-lg hover:scale-105 transition-transform duration-300 shadow-md">
            Start
          </Link>
        </div>

        {/* Floating Swinging White Card */}
       

        {/* Spaceship floating on left side, bigger and repositioned */}
       

        {/* Floating "connected dots" */}
        <div className="absolute w-full h-full top-0 left-0 pointer-events-none">
          <div className="absolute w-2 h-2 bg-white rounded-full top-20 left-10 animate-float delay-1000"></div>
          <div className="absolute w-2 h-2 bg-white rounded-full top-60 left-1/3 animate-float delay-2000"></div>
          <div className="absolute w-2 h-2 bg-white rounded-full top-40 right-1/4 animate-float delay-3000"></div>
          <div className="absolute w-2 h-2 bg-white rounded-full top-72 right-10 animate-float delay-4000"></div>
        </div>
      </div>
    </>
  );
}