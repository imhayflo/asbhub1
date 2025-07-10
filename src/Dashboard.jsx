import { useAuth } from "./AuthContext";

export default function Dashboard() {
  const { user } = useAuth();

  return (
    <div>
      <h1>Dashboard</h1>
      {user ? (
        <p>Welcome, {user.email}</p>
      ) : (
        <p>You must be logged in to view this.</p>
      )}
    </div>
  );
}
