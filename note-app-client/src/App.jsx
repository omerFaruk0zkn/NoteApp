import { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import API from "./services/api";
import Navbar from "./components/Navbar";

// Pages
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import NotesPage from "./pages/NotesPage";
import AddOrEditNotePage from "./pages/AddOrEditNotePage";

function App() {
  const [notes, setNotes] = useState([]);
  const [editingNote, setEditingNote] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token"));

  const isLoggedIn = Boolean(token);

  const fetchNotes = async () => {
    try {
      const response = await API.get("/Notes");
      setNotes(response.data);
    } catch (error) {
      console.error("Notlar Yüklenirken bir hata oluştu:", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
  };

  return (
    <Router>
      <Navbar isLoggedIn={isLoggedIn} onLogout={handleLogout} />
      <Routes>
        <Route
          path="/"
          element={
            isLoggedIn ? (
              <NotesPage
                isLoggedIn={isLoggedIn}
                notes={notes}
                fetchNotes={fetchNotes}
                setEditingNote={setEditingNote}
              />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/add-note"
          element={
            isLoggedIn ? (
              <AddOrEditNotePage
                fetchNotes={fetchNotes}
                editingNote={editingNote}
                setEditingNote={setEditingNote}
              />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/login"
          element={
            !isLoggedIn ? (
              <LoginPage setToken={setToken} />
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/register"
          element={!isLoggedIn ? <RegisterPage /> : <Navigate to="/" />}
        />
        <Route
          path="*"
          element={<Navigate to={isLoggedIn ? "/" : "/login"} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
