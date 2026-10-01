import React from "react";
import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({email:"",password:""});
  const submit = async e => {
    e.preventDefault();
    try { const r=await axios.post("http://localhost:5000/api/users/login",form); localStorage.setItem("user",JSON.stringify(r.data.user)); navigate("/dashboard"); }
    catch(e){ alert(e.response?.data?.message || "Login failed"); }
  };
  return <div className="auth-page"><form className="auth-card" onSubmit={submit}><h1>Expense Tracker</h1><h2>Welcome Back</h2>
    <input type="email" placeholder="Email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} required/>
    <input type="password" placeholder="Password" value={form.password} onChange={e=>setForm({...form,password:e.target.value})} required/>
    <button className="primary" type="submit">Login</button><p>New user? <Link to="/register">Create account</Link></p>
  </form></div>;
}
