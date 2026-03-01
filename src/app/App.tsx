import { Routes, Route, Link, useNavigate } from "react-router-dom";
import { useAppDispatch } from "@app/store";
import { ProtectedRoute } from "@/app/router/ProtectedRoute";
import { useAuth } from "@shared/lib/hooks/useAuth";
import { logOut } from "@entities/user/model/slice";
import DashboardPage from "@/pages/Dashboard";
import LoginPage from "@/pages/Login";
import NotFoundPage from "@/pages/NotFound";
import ProductsPage from "@/pages/Products";
import ProductDetailsPage from "@/pages/ProductDetails";

function App() {
  const { isAuthenticated, user } = useAuth();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logOut());
    navigate("/login");
  };

  return (
    <div>
      <header
        style={{
          padding: "20px",
          borderBottom: "1px solid #ccc",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "30px" }}>
          <h1 style={{ margin: 0 }}>E-commerce Admin</h1>
          {isAuthenticated && (
            <nav>
              <Link to="/" style={{ marginRight: "15px" }}>
                Главная
              </Link>
              <Link to="/products" style={{ marginRight: "15px" }}>
                Товары
              </Link>
              <Link to="/profile" style={{ marginRight: "15px" }}>
                Профиль
              </Link>
              <Link to="/settings">Настройки</Link>
            </nav>
          )}
        </div>

        <div>
          {!isAuthenticated ? (
            <Link to="/login">
              <button
                style={{
                  padding: "8px 16px",
                  backgroundColor: "#0066cc",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              >
                Войти
              </button>
            </Link>
          ) : (
            <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
              <span style={{ fontWeight: "bold" }}>{user?.username}</span>
              <button
                onClick={handleLogout}
                style={{
                  padding: "8px 16px",
                  backgroundColor: "#dc3545",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              >
                Выйти
              </button>
            </div>
          )}
        </div>
      </header>

      <main style={{ padding: "20px" }}>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/products"
            element={
              <ProtectedRoute>
                <ProductsPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/products/:id"
            element={
              <ProtectedRoute>
                <ProductDetailsPage />
              </ProtectedRoute>
            }
          />


          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
