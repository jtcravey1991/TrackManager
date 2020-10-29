import React, { useState } from "react";
import "./style.css";

function LoginForm() {
    // use states for login form
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const [emptyFieldError, setEmptyFieldError] = useState(false);

    // event captures for login form
    const usernameValue = (event) => {
        setUsername(event.target.value);
    };
    const passwordValue = (event) => {
        setPassword(event.target.value);
    };

    // checks if username or password inputs are empty
    const emptyFieldValidator = () => {
        if (username && password) {
            setEmptyFieldError(false)
        } else {
            setEmptyFieldError(true);
        }
    };

    // event handler for form submit
    const submitLogin = (event) => {
        event.preventDefault();
        emptyFieldValidator();
        if (emptyFieldError) {
            return;
        }


    }

    return (
        <div className="login-container">
            <div className="login-float">
                <div className="login-flex">
                    <div className="login-title-container">
                        <h1 className="title">Apex TrackManager</h1>
                        <p>&#10004; Scheduled Maintenance<br />&#10004; Calibrations<br />&#10004; Repairs</p>
                    </div>
                    <form className="login-form">
                        <label for="username-input" className="login-label">Username</label>
                        <input
                            className="login-input"
                            type="text"
                            id="username-input"
                            name="username"
                            onChange={usernameValue}
                        />
                        <label for="password-input" className="login-label">Password</label>
                        <input
                            className="login-input"
                            type="password"
                            id="password-input"
                            name="password"
                            onChange={passwordValue}
                        />
                        <button
                            className="login-button"
                            type="submit"
                            onClick={submitLogin}
                        >
                            Login
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default LoginForm;