import React, { useContext } from 'react'
import { AuthContext } from '../../../context/AuthContext'

export default function Profile() {
    const { user } = useContext(AuthContext);
    return (
        <main className="container my-5 d-flex justify-content-center">
            <div className="card shadow-lg border-0 rounded" style={{ width: "350px" }}>
                <div className="card-body text-center">
                    <img
                        src={user.imageUrl || "https://via.placeholder.com/150"}
                        alt="User Avatar"
                        className="rounded-circle mb-4"
                        style={{ width: "120px", height: "120px", objectFit: "cover", border: "4px solid #ddd" }}
                    />
                    <h3 className="card-title text-dark fw-bold">{user.name || "User Name"}</h3>
                    <p className="card-text text-muted">{user.email || "user@example.com"}</p>
                    <p className={`badge ${user.status === "Active" ? "bg-success" : "bg-secondary"} py-2 px-3`}>
                        {user.status || "Status Unknown"}
                    </p>
                </div>
            </div>
        </main>

    )
}
