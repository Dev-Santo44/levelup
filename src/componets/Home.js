import React from 'react'
import { Link } from 'react-router-dom'
import '../styles/btn.css'
import Logo from '../assets/Logo.png'
import '../styles/Home.css'
function Home() {

    return (

        <div>
            <div className='logoContainer'>
                <img src={Logo} alt='Logo'/>
            </div>
            <div>
                <h1>Welcome to Leveling System!</h1>
                <p>I Am The Record Of Your Struggles, The Evidence Of Your Resistance, And The Reward Of Your Sufferings.</p>
                <p>Level Up Your skills and become strong enough to protect your job in this AI world</p> 
                <button className='btn'><Link to="/cources">Let's Start...</Link></button>
            </div>
        </div>
    )
}

export default Home
