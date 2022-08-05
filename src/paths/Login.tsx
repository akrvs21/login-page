import { useForm, SubmitHandler } from "react-hook-form";
import "../login.css";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoginContext } from "../Context/LoginContext";
import styled from "styled-components";
type Inputs = {
  username: string;
  password: string;
};

interface setTokenProps {
  setToken?: (token: boolean) => void;
}

interface setUsernameProps {
  setUserName?: (username: string) => void;
}

const registeredUser = {
  username: "steve.jobs@example.com",
  password: "password",
};

const Input = styled.input`
  padding: 0.5em;
  margin: 0.5em;
`;

export default function Login() {
  const { setToken = () => {} }: setTokenProps = useContext(LoginContext);
  const { setUserName = () => {} }: setUsernameProps = useContext(LoginContext);

  const [isDisabled, setIsDisabled] = useState(false);

  let navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    setIsDisabled(true);
    setTimeout(() => {
      if (JSON.stringify(data) === JSON.stringify(registeredUser)) {
        setToken(true);
        setUserName(data.username);
        setIsDisabled(false);
        let path: string = `/profile`;
        navigate(path);
        console.log(data);
      } else {
        alert("no such user");
        setIsDisabled(false);
      }
    }, 2500);
  };

  return (
    <div>
      <h1>Login page</h1>
      <form className="formContainer" onSubmit={handleSubmit(onSubmit)}>
        <input {...register("username", { required: true })} />
        {errors.username && <span>This field is required</span>}
        <input {...register("password", { required: true })} />
        {errors.password && <span>This field is required</span>}
        <label>Запомнить пароль</label>
        <input type="checkbox" id="pswd" name="pswd" value="password" />
        <Input type="submit" disabled={isDisabled} />
      </form>
    </div>
  );
}
