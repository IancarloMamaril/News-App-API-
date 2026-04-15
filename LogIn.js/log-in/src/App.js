import { useState } from "react";
import "./App.css";

export default function App() {
  const [login, setIsLogin] = useState(true);
  const [user, setUser] = useState(null);

  const [u, setU] = useState("");
  const [p, setP] = useState("");

  function submit() {
    if (!login) {
      setUser({ u, p });
      alert("Registered!");
      setIsLogin(true);
    } else {
      if (user && u === user.u && p === user.p) {
        alert("Successfully logged in");
      } else {
        alert("Please try again.");
      }
    }
  }

  return (
    <div>
      <h2>{login ? "Login" : "Register"}</h2>

      <p>Username</p>
      <input onChange={(e) => setU(e.target.value)} />

      <p>Password</p>
      <input type="password" onChange={(e) => setP(e.target.value)} />

      <button onClick={submit}>
        {login ? "Login" : "Register"}
      </button>

      <p onClick={() => setIsLogin(!login)}>
        {login ? "Register" : "Login"}
      </p>
    </div>
  );
}