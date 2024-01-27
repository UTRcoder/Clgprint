import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../Components/Navbar'

export default function Login() {
    const [credentials, setCredentials] = useState({ email: "", password: "" })
    let navigate = useNavigate();
    const handleSubmit = async (e) => {

        e.preventDefault();
        const response = await fetch("https://go-food-dgq7.onrender.com/api/loginuser", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: credentials.email, password: credentials.password })
        });
        const json = await response.json()
        console.log(json);

        if (!json.success) {
            alert("Enter valid credentials");
        }
        if (json.success) {
            navigate("/");
            localStorage.setItem("userEmail", credentials.email);
            localStorage.setItem("authToken", json.authToken);
            // console.log(localStorage.getItem("authToken"));
        }
    }
    const onChange = (event) => {
        setCredentials({ ...credentials, [event.target.name]: event.target.value })
    }

    return (
        <>
            <div style={{backgroundImage: 'url("https://images.pexels.com/photos/326278/pexels-photo-326278.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")', height: '100vh', backgroundSize: 'cover' }}>
      <div>
        <Navbar />
      </div>
      <div className='container'>
        <form className='w-50 m-auto mt-5 p-3 border bg-dark border-success rounded' onSubmit={handleSubmit}>
          <div className="m-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                        <input type="email" className="form-control" name='email' value={credentials.email} onChange={onChange} />
                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                        <input type="password" className="form-control" id="exampleInputPassword1" name='password' value={credentials.password} onChange={onChange} />
                    </div>
                    <button type="submit" className="btn btn-success">Submit</button>
                    <Link to="/creatuser" className='m-3 btn btn-danger'>New User</Link>
                </form>
            </div>
    </div>
        </>
    )
}
