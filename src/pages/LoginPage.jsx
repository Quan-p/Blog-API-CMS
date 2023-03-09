import React from "react";

const LoginPage = () => {
    return (
        <div>
            <h2>Welcome to Login Page</h2>
            <form>
                <label>Username:
                    <input type='text' />
                </label>
                <label>Password:
                    <input type='password' />
                </label>
                <input type="submit" value="Submit"></input>
            </form>
        </div>
    )
};

export default LoginPage;
