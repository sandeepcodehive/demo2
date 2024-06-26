import React from 'react'
import { Link } from 'react-router-dom';
import { useAuth0 } from "@auth0/auth0-react";

function Sidebar() {
    const { logout } = useAuth0();

    return (
        <>
            < li className="nav-item" >
                <Link className="nav-link" to="/home" style={{ color: "white" }}>Chat</Link>
            </li >
            <li className="nav-item">
                <Link className="nav-link" to="/dataset" style={{ color: "white" }}>Datasets</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to="/setting" style={{ color: "white" }}>Setting</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to="/profile" style={{ color: "white" }}>Profile</Link>
            </li>
            <li className="nav-item">
                <button className='nav-link' onClick={() => logout()} style={{ color: "white" }}>Log out</button>
            </li>

        </>
    )
}

export default Sidebar