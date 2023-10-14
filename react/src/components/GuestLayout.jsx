import { Outlet } from "react-router-dom";

export default function GuestLayout(){
    return (
        <div>
            {/* render login/signup by using Outlet*/}
            <Outlet />
        </div>
    )
}