import { useState } from "react";
//styling
import { InputAdornment, FormControl, InputLabel, OutlinedInput } from "@mui/material";



const LoginInputs = ({ el: { index, label, name, type, value,  visibleIcon, notVisibleIcon, cursor }, userInput, setUserInput }) => {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    //  change password type, when user clicks on password icon to view password
    const changePasswordType = type === "password" ? "text" : type;

    const loginHandleChange = (e) => {
        setUserInput({ ...userInput, [e.target.name]: e.target.value });
    };

    const toggleShowPassword = () => setIsPasswordVisible(!isPasswordVisible);

    return (
        <FormControl sx={{ m: 1, width: 300 }} key={index}>
            <InputLabel htmlFor={name}>{label}</InputLabel>
            <OutlinedInput
                aria-label="ariaLabel"
                name={name}
                value={userInput[value]}
                onChange={loginHandleChange}
                label={label}
                type={isPasswordVisible ? changePasswordType : type}
                startAdornment={
                    <InputAdornment
                        position="start"
                        sx={{ cursor: cursor, border: "none" }}
                        onClick={toggleShowPassword}
                    >
                        {isPasswordVisible ? visibleIcon : notVisibleIcon}
                    </InputAdornment>
                }
            />
        </FormControl>
    );
};

export default LoginInputs;
