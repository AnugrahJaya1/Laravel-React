import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import axiosClient from "../axios-client";

export default function UserForm() {
    // get id from param
    const { id } = useParams()
    // get data info
    const [user, setUser] = useState({
        id: null,
        name: '',
        email: '',
        password: '',
        password_confirmation: ''
    })

    const [loading, setLoading] = useState(false)

    // set error message
    const [errors, setErrors] = useState(null)

    if (id) {
        useEffect(() => {
            setLoading(true)
            axiosClient.get(`/users/${id}`)
                .then(({ data }) => {
                    setLoading(false)
                    setUser(data)
                })
                .catch(() => {
                    setLoading(false)
                })
        }, [])
    }

    const onSubmit = (ev) => {
        ev.preventDefault();
    }

    return (
        // fragment
        <>
            {user.id && <h1>Update User: {user.name}</h1>}
            {!user.id && <h1>New User</h1>}
            <div className="card animated fadeInDown">
                {loading && (
                    <div className="text-center">Loading...</div>
                )}

                {/* show error if exist */}
                {
                    errors && <div className="alert">
                        {Object.keys(errors).map(key => (
                            <p key={key}>{errors[key][0]}</p>
                        ))}
                    </div>
                }

                {/* form */}
                {!loading && (
                    <form onSubmit={onSubmit}>
                        <input value={user.name} onChange={ev => setUsers({ ...user, name: ev.target.value })} placeholder="Name" />
                        <input value={user.email} onChange={ev => setUsers({ ...user, email: ev.target.value })} placeholder="Email" />
                        <input onChange={ev => setUsers({ ...user, password: ev.target.value })} placeholder="Password" />
                        <input onChange={ev => setUsers({ ...user, password_confirmation: ev.target.value })} placeholder="Password Confirmation" />
                        <button className="btn">Save</button>
                    </form>
                )}
            </div>
        </>
    )
}