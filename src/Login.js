import React, {  useState } from "react";
import "./Login.css";
import './SignUp.css'
import img1 from './img/img1.png'

function Login({ setUserId, signUpBtn }) {

    const [warn, setWarn] = useState('')
    const [form, setForm] = useState({ USER_ID: '', PASSWORD: '' })

    const handleInput = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value })
    }

    const handleSubmit = (e) => {
        fetch("/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(
                form
            ),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data)
                if (data) {
                    setWarn('')
                    localStorage.setItem('loginData', form.USER_ID)
                    setUserId(form.USER_ID)
                } else {
                    setWarn('Invalid UserId/Password')
                }
            })
            .catch((error) => {
                setWarn('Unable to fetch!')
                console.error("Error fetching data:", error);
            });
    }

    return (
        <div className="login-box">
            <div className="container-left">
                <div className="slider" >
                    <div className="slider-content" id="first" ><img src={img1} alt="expense manager" /><h1>Manage Your Expenses Smartly</h1></div>
                </div>
            </div>
            <div className="container-right" id="con">
                <div className="heading">Welcome to Personal Expense Manager</div>
                <input type="Text" placeholder="Enter your Id" id="userid" name="USER_ID" className="input" onChange={handleInput}></input>
                <input type="password" placeholder="Enter your password" id="userpassword" name="PASSWORD" className="input" onChange={handleInput}></input>
                <div>{warn}</div>
                <div className="container2">
                    <div id="password" className="text">Forget password?</div>
                    <div className="text" id="click"> Click here</div>
                </div>
                <div className="container3">
                    <button className="button" id="button1" onClick={handleSubmit}>Sign in</button>
                    <button className="button" id="button2" onClick={signUpBtn}>Sign Up</button>
                </div>
            </div>
        </div>
    );


}
export default Login;