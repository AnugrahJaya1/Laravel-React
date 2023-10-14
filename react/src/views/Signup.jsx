import { useRef, useState } from "react";
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

    // set error message
    const [errors, setErrors] =  useState(null)

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
            .catch(err => {
                const response = err.response;
                if(response && response.status === 422){
                    console.log(response.data.errors)
                    setErrors(response.data.errors)
                }
            })
    }

    return (
        <form onSubmit={onSubmit}>
            <h1 className="title">
                Signup for free
            </h1>
            {/* show error if exist */}
            {
                errors && <div className="alert">
                    {Object.keys(errors).map(key => (
                        <p key={key}>{errors[key][0]}</p>
                    ))}
                </div>
            }
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