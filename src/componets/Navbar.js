import React from 'react'
import '../styles/Navbar.css'
import HomeSharpIcon from '@mui/icons-material/HomeSharp';
import PlayCircleOutlineSharpIcon from '@mui/icons-material/PlayCircleOutlineSharp';
import AddCircleSharpIcon from '@mui/icons-material/AddCircleSharp';
import '../styles/btn.css';

import { auth } from "../services/firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useState, useEffect } from "react";

function Navbar() {
    const [user, setUser] = useState(null);
    
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });
        return () => unsubscribe();
    }, []);

    return (
        <div className='Navbar'>
            <div className='logo'>Level up</div>
            <div className='icons'>
                <div className='contain'>
                    <a href='/'>
                        <HomeSharpIcon sx={{ fontSize: 25 }} />
                        Home</a>
                </div>
                <div className='contain'>
                    <a href='/learning'>
                        <PlayCircleOutlineSharpIcon />
                        Learning</a>
                </div>
                <div className='contain'>
                    <a href='/cources'><AddCircleSharpIcon />Cources</a>
                </div>
            </div>
            <div className='avatar'>
                {user ? <><a href="/profile" >
                    <span>Welcome, {user.displayName || "User"}! </span>
                </a></> : <a href="/signin">
                    <button className='btn'>Login</button>
                </a>}


            </div>
        </div>
    )
}

export default Navbar;
