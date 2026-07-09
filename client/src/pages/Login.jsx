import { useState } from "react";
import {useNavigate} from "react-router-dom";
import API from "../services/api";
import "./Login.css";
export default function Login() {
const navigate=useNavigate();
const [formData,setFormData]=useState({
    email:"",
    password:""
});
const handleChange=(e)=>{
    setFormData({
        ...formData,
        [e.target.name]:e.target.value
    });
};
const handleSubmit=async(e)=>{
    e.preventDefault();
    try{
        const res=await API.post(
            "/auth/login",
            formData
        );
        localStorage.setItem(
            "token",
            res.data.token
        );
        alert("login successful");
        localStorage.setItem("token",res.data.token);
        localStorage.setItem("role",res.data.role);
        localStorage.setItem("name",res.data.name);
        localStorage.setItem("userId", res.data.userId);
        if(res.data.role==="customer"){
            navigate("/customer-dashboard");
        }
        else if(res.data.role==="provider"){
            navigate("/provider-dashboard");
        }
        else{
            navigate("/admin-dashboard");
        }
        console.log(res.data);
    }catch(error){
        alert(
            error.response?.data?.message || "Login failed"
        );
    }
};


  return (
  <div className="login-container">
    <div className="login-card">

      <h1>Login</h1>

      <form onSubmit={handleSubmit}>

        <input
          type="email"
          name="email"
          placeholder="Enter Email"
          className="login-input"
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Enter Password"
          className="login-input"
          onChange={handleChange}
        />

        <button
          type="submit"
          className="login-btn"
        >
          Login
        </button>

      </form>

    </div>
  </div>
);
}