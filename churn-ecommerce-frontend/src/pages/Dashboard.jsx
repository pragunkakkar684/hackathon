import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getInactiveUsers } from "../api";
import styles from "./Dashboard.module.css";

const Dashboard = () => {
  const [inactiveUsers, setInactiveUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchInactiveUsers = async () => {
      try {
        const users = await getInactiveUsers();
        setInactiveUsers(users);
      } catch (error) {
        console.error("Error fetching inactive users:", error);
      }
      setLoading(false);
    };

    fetchInactiveUsers();
  }, []);

  return (
    <div className={styles.dashboardContainer}>
      <nav className={styles.navbar}>
        <h2>Dashboard</h2>
        <button onClick={() => navigate("/login")}>Logout</button>
      </nav>

      <div className={styles.content}>
        <div className={styles.card}>
          <h3>Total Inactive Users</h3>
          {loading ? <p>Loading...</p> : <h1>{inactiveUsers.length}</h1>}
        </div>

        <div className={styles.card}>
          <h3>Recent Inactive Users</h3>
          {loading ? (
            <p>Loading...</p>
          ) : inactiveUsers.length > 0 ? (
            <ul>
              {inactiveUsers.slice(0, 5).map((user, index) => (
                <li key={index}>{user.name} - {user.email}</li>
              ))}
            </ul>
          ) : (
            <p>No inactive users.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
