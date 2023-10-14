import { useRef } from "react";
import { Link } from "react-router-dom";

export default function Signup() {
    // allows persist data between renders
    const nameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmationRef = useRef();

    // ev = event
    const onSubmit = (ev) => {
        ev.preventDefault();

        const payload = {
            name: nameRef.current.value,
            email:emailRef.current.value,
            password:passwordRef.current.value,
            // not use camel case -> for laravel
            password_confirmation:passwordConfirmationRef.current.value,
        }
    }

    return (
        <form onSubmit={onSubmit}>
            <h1 className="title">
                Signup for free
            </h1>
            <input ref={nameRef} type="text" placeholder="Full Name" />
            <input ref={emailRef} type="email" placeholder="Email Address" />
            <input ref={passwordRef} type="password" placeholder="Password" />
            <input ref={passwordConfirmationRef} type="password" placeholder="Password Confirmation" />
            <button className="btn btn-block">Signup</button>
            <p className="message">
                Already Register? <Link to="/login">Sign in</Link>
            </p>
        </form>
    )
}