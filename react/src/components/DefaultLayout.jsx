import { Outlet } from "react-router-dom";

export default function DefaultLayout(){
    return (
        <div>
             {/* render children by using Outlet*/}
             <Outlet />
        </div>
    )
}