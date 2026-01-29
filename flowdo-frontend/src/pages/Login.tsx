import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import AuthLayout from "../layouts/AuthLayout";
import api from "../services/api";

const Login = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await api.post("token/", {
        username,
        password,
      });

  
      localStorage.setItem("accessToken", response.data.access);

      navigate("/tasks");
    } catch  {
      setError("Invalid username or password");
    }
  };

  return (
    <AuthLayout
      title="FlowDo"
      subtitle="Login to manage your daily tasks"
    >
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {error && <p style={{ color: "red" }}>{error}</p>}

        <button type="submit">Login</button>
      </form>

      <p className="auth-footer">
        Don’t have an account? <Link to="/register">Register</Link>
      </p>
    </AuthLayout>
  );
};

export default Login;
