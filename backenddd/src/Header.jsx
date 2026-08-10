import React from 'react';
import { Link } from 'react-router-dom';
import logo from "./assets/logo.jpg";
import "./Header.css";
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import PersonIcon from '@mui/icons-material/Person';
import IconButton from '@mui/material/IconButton';


function Header(){
    return(
        <div className='header'>
            <IconButton>
                <Link to="/MainPg"><PersonIcon className="header__icon" fontSize='large'/> </Link>
            </IconButton>
            <img className='header__logo' src={logo} alt='logo picture'/>


            <IconButton>
                <QuestionAnswerIcon className="header__icon" fontSize='large'/>
            </IconButton>
                
        
           
        </div>
    );
}


export default Header;
