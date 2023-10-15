import { Link, Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider.jsx"
import { useEffect } from "react";
import axiosClient from "../axios-client.js";

export default function DefaultLayout() {
    const { user, token, setUser, setToken, notification } = useStateContext();

    if (!token) {
        return <Navigate to="/login" />
    }

    // ev = event
    const onLogout = (ev) => {
        ev.preventDefault

        axiosClient.post('/logout')
            .then(() => {
                setUser({})
                setToken(null)
            })
    }

    // retrieve user info
    useEffect(() => {
        axiosClient.get('/user')
            .then(({ data }) => { // response
                setUser(data)
            })
    }, [])

    return (
        <div id="defaultLayout">
            {/* side bar */}
            <aside>
                <Link to="/dashboard">Dashboard</Link>
                <Link to="/users">Users</Link>
            </aside>

            <div className="content">
                <header>
                    <div>
                        Header
                    </div>
                    <div>
                        {user.name}
                        <a href="#" onClick={onLogout} className="btn-logout">Logout</a>
                    </div>
                </header>
                <main>
                    {/* render children by using Outlet*/}
                    <Outlet />
                </main>
            </div>
            {/* add notification if exist */}
            {notification &&
                <div className="notification">
                    {notification}
                </div>
            }
        </div>
    )
}