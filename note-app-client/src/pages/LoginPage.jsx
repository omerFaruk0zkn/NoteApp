import React, { useState } from "react";
import { Link } from "react-router-dom";
import API from "../services/api";

const LoginPage = ({ setToken }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [errors, setErrors] = useState({});

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setErrors({});
    try {
      if (!username.trim()) {
        setErrors((prev) => ({
          ...prev,
          username: "Kullanıcı adı boş olamaz.",
        }));
        return;
      }
      if (!password.trim()) {
        setErrors((prev) => ({ ...prev, password: "Şifre boş olamaz." }));
        return;
      }

      const response = await API.post("/Auth/login", { username, password });
      localStorage.setItem("token", response.data.token);
      setToken(response.data.token);
    } catch (error) {
      if (error.response && error.response.data) {
        setError(error.response.data);
      } else {
        alert("Giriş başarısız!");
      }
    }
  };

  return (
    <div className="container">
      <h2>Giriş Yap</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleLogin}>
        <div className="mb-3">
          <label>Kullanıcı Adı</label>
          <input
            type="text"
            className="form-control"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          {errors.username && (
            <div className="text-danger fw-semibold mt-1">
              {errors.username}
            </div>
          )}
        </div>
        <div className="mb-3">
          <label>Şifre</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {errors.password && (
            <div className="text-danger fw-semibold mt-1">
              {errors.password}
            </div>
          )}
        </div>
        <button type="submit" className="btn btn-primary">
          Giriş Yap
        </button>
      </form>
      <p className="mt-2">
        Henüz bir hesabınız yok mu?{" "}
        <Link to="/register" className="text-decoration-none fw-bold">
          Kayıt Ol
        </Link>
      </p>
    </div>
  );
};

export default LoginPage;
