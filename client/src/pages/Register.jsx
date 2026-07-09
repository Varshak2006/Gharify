import { useState } from "react";
import API from "../services/api";
import "./Register.css";
export default function Register(){
 const [formData,setFormdData]=useState({
    name:"",
    email:"",
    password:"",
    role:"customer",
    serviceType:"",
    phone:"",
    city:"",
    experience:"",
    profileImage:""
 });
 const handleChange=(e)=>{
    setFormdData({
        ...formData,
        [e.target.name]:e.target.value
    });
 };
 const handleSubmit=async(e)=>{
    e.preventDefault();
    try{
        const res=await API.post(
            "/auth/register",
            formData
        );
        alert(res.data.message);

    }
    catch(error){
        alert(error.response?.data?.message || "Error");
    }
 };
 return (
  <div className="register-container">
    <div className="register-card">

      <h1>Register</h1>
      
      <form onSubmit={handleSubmit}>
<input
type="file"
accept="image/*"
className="register-input"
onChange={async(e)=>{
  const file=e.target.files[0];
  if(!file) return;
  const imageData=new FormData();
  imageData.append("image",file);
  try{
    const res=await API.post(
      "/upload",
      imageData,
      {
        headers:{
          "Content-Type":"multipart/form-data"
        }
      }
    );
    setFormdData({
      ...formData,
      profileImage:res.data.imageUrl
    });
    alert("Image uploaded");
  }catch(err){
    console.log(err);
    alert("Upload Failed");
  }
}}/>

        <input
          type="text"
          name="name"
          placeholder="Enter Name"
          className="register-input"
          onChange={handleChange}
        />

        <input
          type="email"
          name="email"
          placeholder="Enter Email"
          className="register-input"
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Enter Password"
          className="register-input"
          onChange={handleChange}
        />

        <select
          name="role"
          className="register-select"
          onChange={handleChange}
        >
          <option value="customer">
            Customer
          </option>

          <option value="provider">
            Provider
          </option>
        </select>
{formData.role === "provider" && (
  <>
  <select
    name="serviceType"
    className="register-select"
    onChange={handleChange}
    // value={formData.serviceType}
  >
    <option value="">Select Service</option>

    <option value="Electrician">Electrician</option>
    <option value="Plumber">Plumber</option>
    <option value="Home Tutor">Home Tutor</option>
    <option value="Cook">Cook</option>
    <option value="Baby Sitter">Baby Sitter</option>
    <option value="Cleaning">Cleaning</option>
    <option value="Care Taker">Care Taker</option>
    <option value="Painter">Painter</option>
    <option value="Mechanic">Mechanic</option>
    <option value="Helper">Helper</option>
    <option value="Laundry">Laundry</option>
    <option value="Pest Control">Pest Control</option>
  </select>
 
 <input
        type="text"
        name="city"
        placeholder="City"
        className="register-input"
        onChange={handleChange}
    />

    <input
        type="text"
        name="experience"
        placeholder="Experience (Example: 5 Years)"
        className="register-input"
        onChange={handleChange}
    />
</>
)}
        <button
          type="submit"
          className="register-btn"
        >
          Register
        </button>

      </form>

    </div>
  </div>
);
}