import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [loginForm, setLoginForm] = useState({
    username: "",
    password: "",
  });

  return (
    <main>
      <h1 className="text-3xl">Log in</h1>

      <form
        className="flex flex-col gap-4"
        onSubmit={async (e) => {
          e.preventDefault();

          const res = await fetch("http://localhost:8080/api/auth/login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(loginForm),
          });

          const p_res = await res.json();

          localStorage.setItem("auth", p_res.token);
          localStorage.setItem("user", p_res.user_id);

          navigate("/home");
        }}
      >
        <label className="">
          Username:
          <input
            type="text"
            value={loginForm.username}
            onChange={(e) =>
              setLoginForm({ ...loginForm, username: e.target.value })
            }
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            value={loginForm.password}
            onChange={(e) =>
              setLoginForm({ ...loginForm, password: e.target.value })
            }
          />
        </label>
        <input
          type="submit"
          className="w-[100px] bg-green-600 rounded cursor-pointer"
          value="Login"
        />
      </form>
    </main>
  );
}

export default Login;
