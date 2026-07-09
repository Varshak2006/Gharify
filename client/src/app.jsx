import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Services from "./pages/Services";
import CustomerDashboard from "./pages/CustomerDashboard";
import ProviderDashboard from "./pages/ProviderDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import AvailableJobs from "./pages/AvailableJobs";
import About from "./pages/About";
import ProviderReviews from "./pages/ProviderReviews";
function App() {
  return (
    <BrowserRouter>
    <Navbar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/services" element={<Services/>} />
        <Route path="/about" element={<About />} />
        <Route
    path="/provider-reviews"
    element={<ProviderReviews/>}
/>
      <Route
            path="/customer-dashboard"
            element={
              <ProtectedRoute allowedRole="customer">
                <CustomerDashboard />
              </ProtectedRoute>
            }
/>
        <Route
  path="/provider-dashboard"
  element={
    <ProtectedRoute allowedRole="provider">
      <ProviderDashboard />
    </ProtectedRoute>
  }
/> <Route
  path="/admin-dashboard"
  element={
    <ProtectedRoute allowedRole="admin">
      <AdminDashboard />
    </ProtectedRoute>
  }
/>    <Route path="/available-jobs" element={<AvailableJobs/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;