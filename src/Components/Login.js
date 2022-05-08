import { useState } from "react"
import React from 'react'
import { useNavigate } from "react-router-dom";

export default function Login(props) {
    const [credentials, setcredentials] = useState({ email: "", password: "" })
    const onChange = (e) => {
        setcredentials({ ...credentials, [e.target.name]: e.target.value })
    }
    let navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/auth/login", {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: credentials.email, password: credentials.password })
        }).then(async function (response) {
            if (response.status !== 200) {
                props.showAlert("Invalid Credentials.", "danger");
            }
            else {
                const json = await response.json();
                localStorage.setItem("token", json.token);
                localStorage.setItem("name", json.name);
                navigate("/");
                props.showAlert("Logged In Successfully.", "success");
            }
        });
    }
    return (
        <div className='container my-5'>
            <h3>Login to continue with iNotebook</h3>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="email">Email address</label>
                    <input type="email" className="form-control" onChange={onChange} value={credentials.email} name='email' id="email" aria-describedby="emailHelp" placeholder="Enter email" />
                    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>
                <div className="form-group my-2">
                    <label htmlFor="password">Password</label>
                    <input type="password" className="form-control" onChange={onChange} value={credentials.password} name='password' id="password" placeholder="Password" />
                </div>
                <button type="submit" className="btn btn-primary">Login</button>
            </form>
        </div>
    )
}
