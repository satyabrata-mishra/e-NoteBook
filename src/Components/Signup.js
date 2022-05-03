import { useState } from "react"
import React from 'react'
import { useNavigate } from "react-router-dom"

export default function Signup(props) {
  const [credentials, setcredentials] = useState({ name: "", email: "", password: "", cpassword: "" })
  const onchange = (e) => {
    setcredentials({ ...credentials, [e.target.name]: e.target.value })
  }
  let navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (credentials.password === credentials.cpassword) {
      const response = await fetch("http://localhost:5000/api/auth/signup", {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name: credentials.name, email: credentials.email, password: credentials.password })
      }).then(async function (response) {
        if (response.status !== 200) {
          props.showAlert("Invalid Signup Details.", "danger");
        }
        else {
          const json = await response.json();
          localStorage.setItem("token", json.token);
          navigate("/");
          props.showAlert("Account Created Successfully.", "success");
        }
      });
    }
    else{
      props.showAlert("Please verify your password again.", "danger");
    }
  }
  return (
    <div className='container my-5'>
      <h3>Create an account to continue with iNotebook</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group my-2">
          <label htmlFor="name">Name</label>
          <input onChange={onchange} value={credentials.name} type="text" className="form-control" id="name" name="name" aria-describedby="emailHelp" placeholder="Enter Name" required />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email address</label>
          <input onChange={onchange} value={credentials.email} type="email" className="form-control" id="email" name="email" aria-describedby="emailHelp" placeholder="Enter email" required />
          <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
        </div>
        <div className="form-group my-2">
          <label htmlFor="password">Password</label>
          <input onChange={onchange} value={credentials.password} type="password" className="form-control" id="password" name="password" placeholder="Password" minLength={5} required />
        </div>
        <div className="form-group my-2">
          <label htmlFor="cpassword">Confirm Password</label>
          <input onChange={onchange} value={credentials.cpassword} type="password" className="form-control" id="cpassword" name="cpassword" placeholder="Confirm Password" minLength={5} required />
        </div>
        <button type="submit" className="btn btn-primary">Create Account</button>
      </form>
    </div>
  )
}
