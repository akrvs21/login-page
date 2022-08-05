import { useContext } from "react";
import Login from "./Login";
import { LoginContext } from "../Context/LoginContext";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

interface tokenProps {
  token?: boolean;
}
interface setTokenProps {
  setToken?: (token: boolean) => void;
}
interface userNameProps {
  userName?: string;
}
const Title = styled.h1`
  position: relative;
  width: 180px;
  height: 78px;
  top: 40px;
  font-family: "Helvetica Neue";
  font-style: normal;
  font-weight: 700;
  font-size: 64px;
  line-height: 78px;
  margin: auto;
  color: #000000;
`;

const Message = styled.h2`
  position: relative;
  margin: auto;
  top: 200px;
  font-family: "Helvetica Neue";
  font-style: normal;
  font-weight: 400;
  font-size: 40px;
  color: #000000;
`;

const Button = styled.button`
  position: relative;
  width: 200px;
  height: 60px;
  margin: auto;
  top: 250px;
  background: #f5f5f5;
  border-radius: 8px;
  font-size: 18px;
  font-weight: 700;
  border: none;
  cursor: pointer;
`;

export default function Profile() {
  let navigate = useNavigate();
  const { token }: tokenProps = useContext(LoginContext);
  const { setToken = () => {} }: setTokenProps = useContext(LoginContext);
  const { userName }: userNameProps = useContext(LoginContext);
  const logout = () => {
    let path: string = `/login`;
    navigate(path);
    setToken(false);
  };

  if (!token) {
    return <Login />;
  }
  return (
    <div>
      <Title>ONLY.</Title>
      <Message>Здравстуйте, <span style={{fontWeight: "bold"}}>{userName}</span></Message>
      <Button onClick={() => logout()}>Выйти</Button>
    </div>
  );
}
