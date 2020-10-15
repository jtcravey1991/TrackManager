import React, { useState } from "react";
import "./style.css";

function LoginForm() {

    return (
        <div class="login-container">
            <div class="login-float">
                <div class="login-flex">
                    <div class="login-title-container">
                        <h1 class="title">Apex TrackManager</h1>
                        <p>&#10004; Scheduled Maintenance<br />&#10004; Calibrations<br />&#10004; Repairs</p>
                    </div>
                    <form class="login-form">
                        <label for="username-input" class="login-label">Username</label>
                        <input class="login-input" type="text" id="username-input" />
                        <label for="password-input" class="login-label">Password</label>
                        <input class="login-input" type="password" id="password-input" />
                        <button class="login-button" type="submit">Login</button>
                    </form>
                </div>
            </div>
        </div>
    )
}