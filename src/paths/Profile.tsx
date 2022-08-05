import { useContext } from "react";
import Login from "./Login";
import { LoginContext } from "../Context/LoginContext";
import { useNavigate } from "react-router-dom";

interface tokenProps {
  token?: boolean;
}
interface setTokenProps {
  setToken?: (token: boolean) => void;
}
interface userNameProps {
  userName?: string;
}

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
      <h2>{userName}</h2>
      <button onClick={() => logout()}>Exit</button>
    </div>
  );
}
