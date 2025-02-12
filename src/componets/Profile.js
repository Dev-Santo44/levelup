import React from 'react'
import { auth } from "../services/firebase/firebase";
import { signOut } from "firebase/auth";
function Profile() {
    return (
        <div>
            <h1>Profile here</h1>
            <button onClick={() => signOut(auth)} className="btn">Sign Out</button>
        </div>
    )
}

export default Profile
