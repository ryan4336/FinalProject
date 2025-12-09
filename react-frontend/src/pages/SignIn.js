import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUserByEmail, createUser } from "../api";

export default function SignIn({ onSignedIn }) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(null);
  const nav = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true); setErr(null);
    try {
      const res = await getUserByEmail(email);
      const found = Array.isArray(res.data) ? res.data[0] : res.data;
      if (found) { onSignedIn(found); nav("/tasks"); }
      else { const createRes = await createUser({ email }); onSignedIn(createRes.data); nav("/tasks"); }
    } catch (error) { setErr(error.message || "Sign in failed"); }
    finally { setLoading(false); }
  };

  return (
    <div>
      <div className="card">
        <h2>Sign in</h2>
        <p className="small">Enter your email. If it's new, we'll create an account for you.</p>

        <form onSubmit={submit}>
          <div className="form-row">
            <input name="email" type="email" placeholder="you@example.com" value={email} onChange={(e)=>setEmail(e.target.value)} required />
            <button className="btn" type="submit" disabled={loading}>{loading ? "Signing..." : "Sign In"}</button>
          </div>
          {err && <div style={{color:"red"}}>{err}</div>}
        </form>
      </div>
    </div>
  );
}
