import { useState } from "react";
import { Link } from "react-router-dom";

export default function Login() {
    const emailRef = useRef();
    const passwordRef = useRef();

    // set error message
    const [errors, setErrors] =  useState(null)

    // ev = event
    const onSubmit = (ev) => {
        ev.preventDefault();
    }

    return (
        <form onSubmit={onSubmit}>
            <h1 className="title">
                Login into your account
            </h1>
            <input type="email" placeholder="Email" />
            <input type="password" placeholder="Password" />
            <button className="btn btn-block">Login</button>
            <p className="message">
                Not Register? <Link to="/signup">Create an account</Link>
            </p>
        </form>
    )
}