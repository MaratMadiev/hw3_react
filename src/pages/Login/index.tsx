import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLoginMutation } from "@shared/api/authApi";
import { useAppDispatch } from "@app/store";
import { setCredentials } from "@entities/user/model/slice";
import { useAuth } from "@/shared/lib/hooks/useAuth";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { user } = useAuth();

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [login, { isLoading }] = useLoginMutation();

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    setError("");

    try {
      const user = await login({ username, password }).unwrap();

      // Сохраняем пользователя и токен в Redux
      dispatch(
        setCredentials({
          user,
          token: user.accessToken,
        }),
      );

      // Редирект на главную
      navigate("/");
    } catch (err) {
      setError("Неверный логин или пароль");
      console.error("Login error:", err);
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "50px auto" }}>
      <h2>Вход в систему</h2>

      {error && (
        <div style={{ color: "red", marginBottom: "15px" }}>{error}</div>
      )}

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "15px" }}>
          <label style={{ display: "block", marginBottom: "5px" }}>
            Username:
          </label>
          <input
            type="text"
            placeholder="Введите логин"
            onChange={(e) => setUsername(e.target.value)}
            style={{ width: "100%", padding: "8px" }}
            disabled={isLoading}
          />
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label style={{ display: "block", marginBottom: "5px" }}>
            Password:
          </label>
          <input
            type="password"
            placeholder="Введите пароль"
            onChange={(e) => setPassword(e.target.value)}
            style={{ width: "100%", padding: "8px" }}
            disabled={isLoading}
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          style={{
            width: "100%",
            padding: "10px",
            backgroundColor: "#0066cc",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: isLoading ? "not-allowed" : "pointer",
          }}
        >
          {isLoading ? "Вход..." : "Войти"}
        </button>
      </form>

      <p style={{ marginTop: "20px", fontSize: "14px", color: "#666" }}>
        Логин и пароль ну точно не: emilys / emilyspass
      </p>

      <button
        onClick={() => {
          console.log(user);
        }}
      >
        {"ДЕБАГ"}
      </button>
    </div>
  );
};

export default LoginPage;
