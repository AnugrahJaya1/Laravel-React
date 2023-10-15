import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import axiosClient from "../axios-client";
import { useStateContext } from "../contexts/ContextProvider";

export default function Login() {
    const emailRef = useRef();
    const passwordRef = useRef();

    // state context
    const { setUser, setToken } = useStateContext()

    // set error message
    const [errors, setErrors] = useState(null)

    // ev = event
    const onSubmit = (ev) => {
        ev.preventDefault();

        const payload = {
            email: emailRef.current.value,
            password: passwordRef.current.value,
        }

        console.log(payload);

        // make req to server
        axiosClient.post('/login', payload)
            .then(({ data }) => { // response
                setUser(data.user)
                setToken(data.token)
            })
            .catch(err => {
                const response = err.response;
                if (response && response.status === 422) {
                    setErrors(response.data.errors)
                }
            })
    }

    return (
        <form onSubmit={onSubmit}>
            <h1 className="title">
                Login into your account
            </h1>
            {/* show error if exist */}
            {
                errors && <div className="alert">
                    {Object.keys(errors).map(key => (
                        <p key={key}>{errors[key][0]}</p>
                    ))}
                </div>
            }
            <input ref={emailRef} type="email" placeholder="Email" />
            <input ref={passwordRef} type="password" placeholder="Password" />
            <button className="btn btn-block">Login</button>
            <p className="message">
                Not Register? <Link to="/signup">Create an account</Link>
            </p>
        </form>
    )
}