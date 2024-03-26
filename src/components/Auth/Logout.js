import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const LogoutButton = () => {
  const { logout } = useAuth0();

  return (
    <div className="container" style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "50%" }}>
      <button onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })} style={{ color: "white", backgroundColor: "black" }}>
        Log Out
      </button>
    </div>
  );
};

export default LogoutButton;