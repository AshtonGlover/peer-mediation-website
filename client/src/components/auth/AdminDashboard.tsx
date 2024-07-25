import React from 'react';

const AdminDashboard: React.FunctionComponent = () => {
  // Sample data for demonstration purposes
  const userCount = 120;
  const recentActivity = [
    { user: 'John Doe', action: 'Logged in', timestamp: '2024-07-23T12:34:56Z' },
    { user: 'Jane Smith', action: 'Updated profile', timestamp: '2024-07-23T13:14:22Z' },
    { user: 'Alex Johnson', action: 'Logged out', timestamp: '2024-07-23T14:10:30Z' },
  ];

  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>

      <section className="welcome-message">
        <h2>Welcome, Admin!</h2>
        <p>Here’s an overview of the latest activity and user statistics.</p>
      </section>

      <section className="user-stats">
        <h2>User Statistics</h2>
        <p>Total Users: {userCount}</p>
        {/* Add more statistics as needed */}
      </section>

      <section className="recent-activity">
        <h2>Recent Activity</h2>
        <ul>
          {recentActivity.map((activity, index) => (
            <li key={index}>
              <strong>{activity.user}</strong> {activity.action} at {new Date(activity.timestamp).toLocaleString()}
            </li>
          ))}
        </ul>
      </section>

      {/* Additional sections or features can be added here */}
    </div>
  );
};

export default AdminDashboard;