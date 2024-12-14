import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../services/api";

const RegisterPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  const handleRegister = async (e) => {
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

      await API.post("/Auth/register", { username, password });
      alert("Kayıt başarılı.");
      navigate("/login");
    } catch (error) {
      if (error.response && error.response.data) {
        setError(error.response.data);
      } else {
        alert("Kayıt başarısız!");
      }
    }
  };

  return (
    <div className="container">
      <h2>Kayıt Ol</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleRegister}>
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
          Kayıt Ol
        </button>
      </form>
      <p className="mt-2">
        Mevcut bir hesabınız var mı?{" "}
        <Link to="/login" className="text-decoration-none fw-bold">
          Giriş Yap
        </Link>
      </p>
    </div>
  );
};

export default RegisterPage;
