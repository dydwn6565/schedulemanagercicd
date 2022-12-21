import { useState, useRef } from "react";
import LoginAndSignup from "./components/LoginAndSignup";
import bcrypt from "bcryptjs";
import { Link } from "react-router-dom";
function SignUp() {
  const [duplicateUserError, setDuplicateUserError] = useState(false);

  const errorMessage = "This user name is taken please type another";

  const linkToLogin = useRef<HTMLAnchorElement | null>(null);
  const signUphandler = async (userId: string, password: string) => {
    const hashedPassword = await bcrypt.hash(password, 10);

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
          query: `mutation {
            createUser(userId:"${userId}",password:"${hashedPassword}"){user{
                userId
                
            }}}`,
        }),
      }
    );
    if (fetchedData.status === 200) {
      const jsonData = await fetchedData.json();
      if (jsonData.data.createUser === null) {
        setDuplicateUserError(true);
      } else {
        if (null !== linkToLogin.current) {
          linkToLogin.current.click();
        }
      }
    }
  };
  return (
    <div>
      <LoginAndSignup
        userInput={"Sign up"}
        signUphandler={signUphandler}
        duplicateUserError={duplicateUserError}
        errorMessage={errorMessage}
      />
      <Link ref={linkToLogin} to="/login" />
    </div>
  );
}

export default SignUp;
