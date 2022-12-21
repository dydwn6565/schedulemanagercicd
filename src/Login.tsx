import { useState, useRef } from "react";

import LoginAndSignup from "./components/LoginAndSignup";
import { Link } from "react-router-dom";
function Login() {
  const [noUserError, setnoUserError] = useState(false);

  const errorMessage = "Please check your userId and password";
  const linkToHome = useRef<HTMLAnchorElement | null>(null);

  const logInhandler = async (userId: string, password: string) => {
    const fetchedData = await fetch(
      "https://schedulemanagerserver.herokuapp.com",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json;  charset=UTF-8",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET,POST,OPTIONS,DELETE,PUT",
        },
        body: JSON.stringify({
          query: `mutation{
            auth(userId:"${userId}",password:"${password}"){
              usertableid
              accessToken
              refreshToken
            }
          }`,
        }),
      }
    );
    if (fetchedData.status === 200) {
      const jsonData = await fetchedData.json();
      if (
        jsonData.data.auth.accessToken === null ||
        jsonData.data.auth === null
      ) {
        setnoUserError(true);
      } else {
        if (null !== linkToHome.current) {
          localStorage.setItem("accessToken", jsonData.data.auth.accessToken);
          localStorage.setItem("refreshToken", jsonData.data.auth.refreshToken);
          localStorage.setItem("usertableid", jsonData.data.auth.usertableid);

          linkToHome.current.click();
        }
      }
    }
  };
  return (
    <div>
      <>
        <LoginAndSignup
          userInput={"Log in"}
          signUphandler={logInhandler}
          duplicateUserError={noUserError}
          errorMessage={errorMessage}
        />
        <Link ref={linkToHome} to="/" />
      </>
    </div>
  );
}

export default Login;
