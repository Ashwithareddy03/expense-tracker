import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
export default function Dashboard(){
  const nav=useNavigate(), user=JSON.parse(localStorage.getItem("user")||"null");
  const [expenses,setExpenses]=useState([]),[income,setIncome]=useState([]);
  const load=async()=>{if(!user)return; const [e,i]=await Promise.all([axios.get(`http://localhost:5000/api/expenses/${user._id}`),axios.get(`http://localhost:5000/api/income/${user._id}`)]);setExpenses(e.data);setIncome(i.data);};
  useEffect(()=>{load()},[]);
  if(!user) return <NavigateToLogin nav={nav}/>;
  const totalE=expenses.reduce((s,x)=>s+Number(x.amount),0), totalI=income.reduce((s,x)=>s+Number(x.amount),0);
  const logout=()=>{localStorage.removeItem("user");nav("/login")};
  return <div className="app"><header><div><h1>Expense Tracker</h1><p>Welcome, {user.name} 👋</p></div><button onClick={logout}>Logout</button></header>
    <nav><Link to="/dashboard">Dashboard</Link><Link to="/add-income">Add Income</Link><Link to="/add-expense">Add Expense</Link><Link to="/transactions">Transactions</Link><Link to="/budget">Budget</Link><Link to="/reports">Reports</Link></nav>
    <main><div className="cards"><Card title="Total Income" value={totalI}/><Card title="Total Expenses" value={totalE}/><Card title="Balance" value={totalI-totalE}/></div>
      <div className="actions"><Link className="action" to="/add-income">＋ Add Income</Link><Link className="action" to="/add-expense">＋ Add Expense</Link><Link className="action" to="/reports">📊 View Reports</Link></div>
      <section className="panel"><h2>Recent Expenses</h2>{expenses.slice(0,5).map(x=><div className="row" key={x._id}><span>{x.category}<small>{new Date(x.date).toLocaleDateString()}</small></span><b>₹{x.amount}</b></div>)}{!expenses.length&&<p>No expenses yet.</p>}</section>
    </main></div>
}
function Card({title,value}){return <div className="card"><span>{title}</span><strong>₹{value.toLocaleString()}</strong></div>}
function NavigateToLogin({nav}){useEffect(()=>nav("/login"),[nav]);return null}
