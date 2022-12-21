import React, { useState } from "react";
import {
  DivFlex,
  Icons,
  LoginButton,
  UserAuthContainer,
  UserAuthContainerOuline,
  UserAuthErrorDiv,
  UserAuthHeader,
  UserIDInput,
} from "../components/CssComponent";
import Header from "../components/Header";
import { FaRegUserCircle } from "react-icons/fa";
import { VscUnlock } from "react-icons/vsc";
import { GrLogin } from "react-icons/gr";
interface ChildPropsType {
  userInput: string | undefined;
  signUphandler: (userId: string, password: string) => void;
  duplicateUserError: boolean | undefined;
  errorMessage: string;
}

function LoginAndSignup({
  userInput,
  signUphandler,
  duplicateUserError,
  errorMessage,
}: ChildPropsType) {
  const [userId, setUserId] = useState<string | undefined>();
  const [password, setPassword] = useState<string | undefined>();
  const [userIdError, setUserIdError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const userIdHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserId(event.target.value);
  };
  const userPasswordHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const submitHandler = () => {
    setUserIdError(false);
    setPasswordError(false);
    if (userId?.length !== undefined && userId?.length <= 5) {
      setUserIdError(true);
    }
    if (password?.length !== undefined && password?.length <= 5) {
      setPasswordError(true);
    }
    if (
      userId?.length !== undefined &&
      userId?.length > 5 &&
      password?.length !== undefined &&
      password?.length > 5
    ) {
      signUphandler(userId, password);
    }
  };
  return (
    <div>
      <Header />
      <UserAuthContainerOuline>
        <UserAuthContainer>
          <UserAuthHeader>{userInput}</UserAuthHeader>
          <DivFlex>
            <Icons>
              <FaRegUserCircle />
            </Icons>
            <UserIDInput type="text" onChange={userIdHandler} />
          </DivFlex>
          {userIdError && (
            <UserAuthErrorDiv>
              Please type more than 5 character
            </UserAuthErrorDiv>
          )}
          <DivFlex>
            <Icons>
              <VscUnlock />
            </Icons>
            {userInput === "Log in" ? (
              <UserIDInput type="password" onChange={userPasswordHandler} />
            ) : (
              <UserIDInput type="text" onChange={userPasswordHandler} />
            )}
          </DivFlex>
          {passwordError && (
            <UserAuthErrorDiv>
              Please type more than 5 character
            </UserAuthErrorDiv>
          )}
          <DivFlex>
            <Icons>
              <GrLogin />
            </Icons>

            <LoginButton onClick={submitHandler}>{userInput}</LoginButton>
          </DivFlex>
          {duplicateUserError && (
            <UserAuthErrorDiv>{errorMessage}</UserAuthErrorDiv>
          )}
        </UserAuthContainer>
      </UserAuthContainerOuline>
    </div>
  );
}

export default LoginAndSignup;
