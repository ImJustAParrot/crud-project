import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

export const UsersForm = ({ addUser, users, updateUser }) => {

    const [form, setForm] = useState({
        name: "",
        email: "",
        phone: ""
    });

    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        if (id && users && users.length > 0) {
            const userFound = users.find(u => u.id === Number(id));
            if (userFound) {
                const { name, email, phone } = userFound;
                setForm({ name, email, phone });
            }
        }
    }, [id, users]);

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (id) {
            const userFound = users.find(u => u.id === Number(id));
            const updatedUser = { 
                ...form, 
                id: Number(id), 
                status: userFound.status,
                createdAt: userFound.createdAt
            };
            updateUser(updatedUser);
        } else {
            addUser(form);
        }

        navigate("/");
    };

    return (
        <div>
            <h1 className="users-title user-form">
                {id ? "Edit Client" : "Add Client"}
            </h1>

            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={form.name}
                    onChange={handleChange}
                    minLength={2}
                    required
                />

                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={form.email}
                    onChange={handleChange}
                    required
                />

                <input
                    type="text"
                    name="phone"
                    placeholder="Phone"
                    value={form.phone}
                    onChange={handleChange}
                    required
                />

                <button type="submit">
                    {id ? "Update" : "Add"}
                </button>
            </form>
        </div>
    );
};

export default UsersForm;