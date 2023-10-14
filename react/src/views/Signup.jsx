import { useRef } from "react";
import { Link } from "react-router-dom";
import axiosClient from "../axios-client";
import { useStateContext } from "../contexts/ContextProvider";

export default function Signup() {
    // allows persist data between renders
    const nameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmationRef = useRef();

    // state context
    const {setUser, setToken} = useStateContext()

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

        
        // make req to server
        axiosClient.post('/signup', payload)
            .then(({data})=>{ // response
                setUser(data.user)
                setToken(data.token)
            })
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