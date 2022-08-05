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

type Styling = {
  isDisabled?: Boolean;
};

interface setTokenProps {
  setToken?: (token: boolean) => void;
}

interface setUsernameProps {
  setUserName?: (username: string) => void;
}

interface userNameProps {
  userName?: string;
}
const registeredUser = {
  username: "steve.jobs@example.com",
  password: "password",
};

const Input = styled.input`
  font-size: 16px;
  weight: 400;
  padding-left: 20px;
  line-height: 19.09px;
  color: #232323;
  background-color: rgb(245, 245, 245);
  border-radius: 8px;
  height: 60px;
  text-align: left;
`;

const SubmitButton = styled.input`
  background-color: ${(props: Styling) =>
    props.isDisabled ? "#99A9FF" : "#4a67ff"};
  border-radius: 8px;
  height: 60px;
  font-weight: 700;
  font-family: "Helvetica Neue";
  font-style: normal;
  font-size: 18px;
  line-height: 22px;
  color: white;
  margin-top: 24px;
  cursor: pointer;
`;

const ErrorMsg = styled.span`
  align-self: start;
  font-size: 14px;
  line-height: 17px;
  color: #e26f6f;
`;

const Label = styled.label`
  align-self: start;
`;

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

export default function Login() {
  const { setToken = () => {} }: setTokenProps = useContext(LoginContext);
  const { setUserName = () => {} }: setUsernameProps = useContext(LoginContext);
  const { userName }: userNameProps = useContext(LoginContext);

  const [isDisabled, setIsDisabled] = useState(false);
  const [isError, setIsError] = useState(false);

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
        setIsError(false);
        let path: string = `/profile`;
        navigate(path);
        console.log(data);
      } else {
        setUserName(data.username);
        setIsDisabled(false);
        setIsError(true);
      }
    }, 2500);
  };

  return (
    <div>
      <Title>ONLY.</Title>
      <div
        className={
          isError ? "errorMessageContainer toggle" : "errorMessageContainer"
        }
      >
        <div className="errorSign">!</div>
        <div className="errorMessage">
          Пользователь {userName} не существует
        </div>
      </div>
      <form className="formContainer" onSubmit={handleSubmit(onSubmit)}>
        <Label htmlFor="username">Логин</Label>
        <Input id="username" {...register("username", { required: true })} />
        {errors.username && <ErrorMsg>Обязательное поле</ErrorMsg>}
        <Label htmlFor="password">Пароль</Label>
        <Input id="password" {...register("password", { required: true })} />
        {errors.password && <ErrorMsg>Обязательное поле</ErrorMsg>}
        <div className="fpswd-container">
          <input type="checkbox" id="fpswd" name="pswd" value="password" />
          <label htmlFor="fpswd">Запомнить пароль</label>
        </div>
        <SubmitButton
          type="submit"
          isDisabled={isDisabled}
          disabled={isDisabled}
        />
      </form>
    </div>
  );
}
