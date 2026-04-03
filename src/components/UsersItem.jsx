import { useNavigate } from "react-router-dom";
import { useState } from "react";

export const UsersItem = ({ user, deleteUser, toggleUserStatus }) => {
    const navigate = useNavigate();

    return (
        <div className="user-item-container">
            <div className="user-item-id">{user.id}</div>
            <div className="user-item-name">{user.name}</div>
            <div className="user-item-email">{user.email}</div>
            <div className="user-item-phone">{user.phone}</div>
            <div className="user-item-status">
                <div className="status-container">
                    <div 
                        className={`status-bar ${user.status}`}
                        onClick={() => toggleUserStatus(user.id)}
                        title={`Click to change status (currently ${user.status})`}
                    >
                        <span className="status-text">{user.status === "active" ? "Active" : "Inactive"}</span>
                    </div>
                </div>
            </div>
            <div className="user-item-date">{user.createdAt || "N/A"}</div>
            <div className="user-action-buttons">
                <button className="btn-edit" onClick={() => navigate(`/edit-user/${user.id}`)}>
                    Edit
                </button>
                <button className="btn-delete" onClick={() => deleteUser(user.id)}>
                    Delete
                </button>
            </div>
        </div>
    );
};