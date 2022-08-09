import { useState } from "react";
import { useLogin } from "../../hooks/useLogin";
import LoginInputs from "./LoginInputs";
import { Link as Route } from "react-router-dom";
//styling
import { Container } from "@mui/system";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EmailTwoTone from "@mui/icons-material/EmailTwoTone";
import {Button, Typography, Link} from "@mui/material";


const Login = () => {
  const [userInput, setUserInput] = useState({ email: "", password: "" });
  const { login, error, isPending } = useLogin();

  const handleSubmit = (e) => {
    e.preventDefault();
    login(userInput.email, userInput.password);
    setUserInput({ email: "", password: "" })
  };

  const inputsArr = [
    { label: "Email ", type: "email", name: "email", value: "email", visibleIcon: <EmailTwoTone />, notVisibleIcon: <EmailTwoTone />, cursor: "none" },
    { label: "Password", type: "password", name: "password", value: "password", visibleIcon: <VisibilityIcon />, notVisibleIcon: <VisibilityOffIcon />, cursor: "pointer" }
  ];

  return (
    <Container
      autoComplete="off"
      sx={{
        bgcolor: "white",
        borderRadius: 5,
        width: 700,
        height: 700,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        boxShadow: 3,
      }}
    >
      <Typography variant="h3" sx={{ color: "black" }}>
        Login
      </Typography>
      ;
      {inputsArr.map((el, index) => (
        <LoginInputs
          key={index}
          el={el}
          userInput={userInput}
          setUserInput={setUserInput}
        />
      ))}
      <Button variant="contained" sx={{ mt: 3 }} onClick={handleSubmit}>
        Login
      </Button>
      <Link component={Route} to="/signup" sx={{ mt: 3, cursor: "pointer" }}>
        Don't have an account?
      </Link>
    </Container>
  );
};

export default Login;
