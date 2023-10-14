import { Link, Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider.jsx"

export default function DefaultLayout() {
    const { user, token } = useStateContext();

    if (!token) {
        return <Navigate to="/login" />
    }

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
                        User Info
                    </div>
                </header>
                <main>
                    {/* render children by using Outlet*/}
                    <Outlet />
                </main>
            </div>
        </div>
    )
}