import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { HeaderDiv, NaviDiv } from "../components/CssComponent";
function Header() {
  const [logIn, setLogin] = useState(false);

  useEffect(() => {
    const checkLogin = () => {
      if (
        localStorage.getItem("accessToken") !== null ||
        localStorage.getItem("refreshToken") !== null
      ) {
        setLogin(true);
      }
    };
    checkLogin();
  }, []);
  const logoutHandler = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("usertableid");
    setLogin(false);
    window.location.href = "/";
  };

  return (
    <div>
      <HeaderDiv>
        <Link style={{ textDecoration: "none" }} to="/">
          <NaviDiv> Home</NaviDiv>
        </Link>

        <Link style={{ textDecoration: "none" }} to="/date">
          <NaviDiv> Dates Schedule</NaviDiv>
        </Link>

        <Link style={{ textDecoration: "none" }} to="/time">
          <NaviDiv>Time Schedule</NaviDiv>
        </Link>
        {logIn ? (
          <NaviDiv onClick={logoutHandler}>Log out</NaviDiv>
        ) : (
          <>
            <Link style={{ textDecoration: "none" }} to="/login">
              <NaviDiv>Login</NaviDiv>
            </Link>
            <Link style={{ textDecoration: "none" }} to="/signup">
              <NaviDiv>Signup</NaviDiv>
            </Link>
          </>
        )}
      </HeaderDiv>
    </div>
  );
}

export default Header;
