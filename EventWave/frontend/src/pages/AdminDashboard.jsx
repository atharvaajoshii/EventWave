function AdminDashboard() {

    const role = localStorage.getItem("role");

    return (
        <div>
            <h1>Admin Dashboard</h1>
            <p>Logged in as {role}</p>
        </div>
    );
}

export default AdminDashboard;