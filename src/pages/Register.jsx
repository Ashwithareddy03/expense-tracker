import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({name:"", email:"", password:""});
  const submit = async e => {
    e.preventDefault();
    try { const r = await axios.post("http://localhost:5000/api/users/register", form); alert(r.data.message); navigate("/login"); }
    catch(e) { alert(e.response?.data?.message || "Registration failed"); }
  };
  return <div className="auth-page"><form className="auth-card" onSubmit={submit}><h1>Expense Tracker</h1><h2>Create Account</h2>
    <input placeholder="Full name" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} required/>
    <input type="email" placeholder="Email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} required/>
    <input type="password" placeholder="Password" value={form.password} onChange={e=>setForm({...form,password:e.target.value})} required/>
    <button className="primary" type="submit">Register</button><p>Already have an account? <Link to="/login">Login</Link></p>
  </form></div>;
}
