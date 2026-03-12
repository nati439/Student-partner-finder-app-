import { StrictMode } from 'react'
import { BrowserRouter } from "react-router-dom";
import { createRoot } from 'react-dom/client'
import InputSumit from './inputSumit.jsx'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)

//You can think of main.jsx as the translator or bridge between React (JavaScript components) and the browser
// (which only understands HTML, CSS, and JS). 