import React, {Component, useState} from "react";
import "./SignUp.css";


const LogOutForm = ({onChangeLogout}) => {
    console.log("LogOutForm")
    const [LogStatus, setLogStatus] = useState("NOT_LOGGED_IN");

    const Logout = () => {
        onChangeLogout(LogStatus);
    };
    return (
        <>
            {  LogStatus === "NOT_LOGGED_IN" && Logout() }

        </>
    );
};

export default LogOutForm;