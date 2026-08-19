import math from '../assets/math.jpg';
import logo from '../assets/logo.jpg';
import { Link } from "react-router-dom";

export default function RealLandPage() {
  return (
    <>
      {/* Inline CSS for animations */}
      <style>
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

        {/* Background image */}
        <img
          src={math}
          alt="background"
          className="w-full h-full object-cover absolute top-0 left-0"
        />

        {/* Overlay */}
        <div className="absolute top-0 left-0 w-full h-full bg-black/50"></div>


        {/* Navbar */}
        <nav
          className="
            absolute top-4 left-1/2 -translate-x-1/2
            bg-white/95 rounded-xl
            px-4 sm:px-6 md:px-12
            py-2 sm:py-3
            shadow-md
            w-[90%] max-w-[700px]
            flex items-center justify-between
            gap-3 sm:gap-6
            border-2 border-transparent
            hover:border-blue-400
            transition-all duration-500
            hover:shadow-[0_0_20px_rgba(0,123,255,0.6)]
          "
        >
          {/* Logo */}
          <img
            src={logo}
            alt="logo"
            className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16"
          />

          {/* Website name */}
          <div className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800">
            StudyMate
          </div>

          {/* Links */}
          <ul className="flex gap-3 sm:gap-5 md:gap-8 font-semibold text-black text-sm sm:text-base md:text-lg">
            <li>
              <Link
                to="/about"
                className="hover:text-yellow-500 transition-colors"
              >
                About
              </Link>
            </li>

            <li>
              <Link
                to="/contact"
                className="hover:text-yellow-500 transition-colors"
              >
                Contact
              </Link>
            </li>
          </ul>
        </nav>


        {/* Main Content */}
        <div
          className="
            absolute
            top-[25%] sm:top-[28%] md:top-40
            left-1/2
            -translate-x-1/2
            text-center
            animate-float
            px-5
            w-full
          "
        >

          {/* Headline */}
          <h1
            className="
              text-4xl
              sm:text-5xl
              md:text-[5.5rem]
              text-white
              font-extrabold
              drop-shadow-lg
              leading-tight
            "
          >
            Ace Engineering Together
          </h1>

          {/* Description */}
          <p
            className="
              mt-4
              text-base
              sm:text-lg
              md:text-2xl
              text-white/90
              max-w-xl
              mx-auto
            "
          >
            The right study partner changes everything.
            Find someone to learn with, stay motivated,
            and succeed together.
          </p>

          {/* Start Button */}
          <Link
            to="/LoginSign"
            className="
              inline-block
              mt-8
              sm:mt-10
              md:mt-15
              px-6
              sm:px-8
              py-3
              sm:py-4
              bg-yellow-400
              text-black
              font-bold
              text-lg
              sm:text-xl
              rounded-lg
              hover:scale-105
              transition-transform duration-300
              shadow-md
            "
          >
            Start
          </Link>
        </div>


        {/* Floating connected dots */}
        <div className="absolute w-full h-full top-0 left-0 pointer-events-none">

          <div className="absolute w-2 h-2 bg-white rounded-full top-20 left-5 sm:left-10 animate-float"></div>

          <div className="absolute w-2 h-2 bg-white rounded-full top-60 left-1/3 animate-float"></div>

          <div className="absolute w-2 h-2 bg-white rounded-full top-40 right-1/4 animate-float"></div>

          <div className="absolute w-2 h-2 bg-white rounded-full top-72 right-5 sm:right-10 animate-float"></div>

        </div>

      </div>
    </>
  );
}