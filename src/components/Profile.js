import React from 'react'
import { useAuth0 } from "@auth0/auth0-react";



function Profile() {
    const { user } = useAuth0();
    return (
        <div>
            <img src={user.picture} alt={user.name} style={{width:"100px",height:"100px",borderRadius:"50%"}}/>
            <h2>Name:{user.name}</h2>
            <h2>Email:{user.email}</h2>
        </div>

    )
}

export default Profile