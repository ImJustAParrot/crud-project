import { UsersItem } from "./UsersItem";
import { useState } from "react";

export const UsersList = ({ users, deleteUser, toggleUserStatus }) => {
    const [searchTerm, setSearchTerm] = useState("");

    const filteredUsers = users.filter(user =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.phone.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.status.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const [userToDelete, setUserToDelete] = useState(null);

    const totalClients = users.length;
    const activeClients = users.filter(user => user.status === "active").length;
    const inactiveClients = users.filter(user => user.status === "inactive").length;

    return (
        <div>
            <div className="stats-container">
                <div className="stat-card total">
                    <div className="stat-icon">👥</div>
                    <div className="stat-content">
                        <div className="stat-value">{totalClients}</div>
                        <div className="stat-label">Total Clients</div>
                    </div>
                </div>
                <div className="stat-card active">
                    <div className="stat-icon">✅</div>
                    <div className="stat-content">
                        <div className="stat-value">{activeClients}</div>
                        <div className="stat-label">Active Clients</div>
                    </div>
                </div>
                <div className="stat-card inactive">
                    <div className="stat-icon">⛔</div>
                    <div className="stat-content">
                        <div className="stat-value">{inactiveClients}</div>
                        <div className="stat-label">Inactive Clients</div>
                    </div>
                </div>
            </div>

            <div className="search-wrapper">
                <div className="search-container">
                    <input
                        type="text"
                        placeholder="Search by name, email, phone or status..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="search-input"
                    />
                    {searchTerm && (
                        <button className="clear-search" onClick={() => setSearchTerm("")}>
                            ✕
                        </button>
                    )}
                </div>
                <div className="results-counter">
                    <span className="counter-number">{filteredUsers.length}</span>
                    <span className="counter-text">
                        {filteredUsers.length === 1 ? "result" : "results"}
                    </span>
                    {searchTerm && (
                        <span className="counter-filter-badge">
                            🔍 filtered
                        </span>
                    )}
                </div>
            </div>

            <div className="users-head">
                <div className="header-id">Id</div>
                <div className="header-name">Name</div>
                <div className="header-email">Email</div>
                <div className="header-phone">Phone</div>
                <div className="header-status">Status</div>
                <div className="header-date">Date</div>
                <div className="header-actions">Actions</div>
            </div>

            <div className="user-list-container">
                {filteredUsers.length === 0 ? (
                    <div className="no-results">
                        {searchTerm ? "No clients found matching your search" : "No clients added yet"}
                    </div>
                ) : (
                    filteredUsers.map(user => (
                        <UsersItem
                            key={user.id}
                            user={user}
                            deleteUser={() => setUserToDelete(user)}
                            toggleUserStatus={toggleUserStatus}
                        />
                    ))
                )}
            </div>
            {userToDelete && (
                <div className="confirm-overlay">
                    <div className="confirm-dialog">
                    <p>
                        Are you sure you want to delete <strong>{userToDelete.name}</strong>?
                    </p>
                    <div className="confirm-buttons">
                        <button
                        className="confirm-yes"
                        onClick={() => {
                            deleteUser(userToDelete.id);
                            setUserToDelete(null);
                        }}
                        >
                        Yes
                        </button>
                        <button
                        className="confirm-no"
                        onClick={() => setUserToDelete(null)}
                        >
                        No
                        </button>
                    </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UsersList;