import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { getUsernameFromToken } from "../utils/getUsernameFromToken";

const Navbar = ({ isLoggedIn, onLogout }) => {
  const navigate = useNavigate();
  const username = getUsernameFromToken();

  const handleLogout = () => {
    onLogout();
    navigate("/login");
  };

  const closeNavbar = () => {
    const navbarToggler = document.getElementById("navbarToggler");
    if (navbarToggler) {
      navbarToggler.click();
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light">
      <div className="container">
        <div className="d-flex align-items-center gap-3">
          <Link
            className="navbar-brand fw-semibold"
            to="/"
            onClick={closeNavbar}
          >
            Not Tutma Uygulaması
          </Link>
          {isLoggedIn && (
            <div className="d-none d-lg-flex align-items-center gap-3 mt-1">
              <NavLink
                className={({ isActive }) =>
                  isActive ? "nav-link fw-bold" : "nav-link"
                }
                to="/"
                onClick={closeNavbar}
              >
                Notlar
              </NavLink>
              <NavLink
                className={({ isActive }) =>
                  isActive ? "nav-link fw-bold" : "nav-link"
                }
                to="/add-note"
                onClick={closeNavbar}
              >
                Not Ekle
              </NavLink>
            </div>
          )}
        </div>
        <button
          className="navbar-toggler"
          type="button"
          id="navbarToggler"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            {isLoggedIn ? (
              <div className="d-flex flex-column flex-lg-row align-items-center gap-2">
                <li className="d-block d-lg-none">
                  <NavLink
                    className={({ isActive }) =>
                      isActive ? "nav-link fw-bold" : "nav-link"
                    }
                    to="/"
                    onClick={closeNavbar}
                  >
                    Notlar
                  </NavLink>
                </li>
                <li className="d-block d-lg-none">
                  <NavLink
                    className={({ isActive }) =>
                      isActive ? "nav-link fw-bold" : "nav-link"
                    }
                    to="/add-note"
                    onClick={closeNavbar}
                  >
                    Not Ekle
                  </NavLink>
                </li>
                <li className="d-flex align-items-center fw-semibold fst-italic nav-item">
                  Hoşgeldin
                  <span
                    className="d-flex justify-content-center align-items-center bg-warning px-2 py-1 rounded-5 fw-semibold fst-italic ms-1"
                    style={{ color: "purple" }}
                  >
                    {username}
                  </span>
                </li>
                <li className="nav-item">
                  <button
                    className="btn btn-danger btn-sm nav-link"
                    onClick={() => {
                      handleLogout();
                      closeNavbar();
                    }}
                  >
                    Çıkış Yap
                  </button>
                </li>
              </div>
            ) : (
              <>
                <li className="nav-item">
                  <NavLink
                    className={({ isActive }) =>
                      isActive ? "nav-link fw-bold" : "nav-link"
                    }
                    to="/login"
                    onClick={closeNavbar}
                  >
                    Giriş Yap
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    className={({ isActive }) =>
                      isActive ? "nav-link fw-bold" : "nav-link"
                    }
                    to="/register"
                    onClick={closeNavbar}
                  >
                    Kayıt Ol
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
