import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
// components/admin/AdminLogin.jsx
const AdminLogin = () => {
    const [credentials, setCredentials] = useState({ username: '', password: '' });
    const { login } = useAuth();

    const navigate = useNavigate();
  
    const handleLogin = async (e) => {
        e.preventDefault();
        const success = login(credentials.username, credentials.password);
        if (success) {
          navigate('/admin/dashboard');
        } else {
          alert('Invalid credentials');
        }
      };
  
    return (
      <form className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
        <h2 className="text-2xl mb-4">Admin Login</h2>
        <input
          type="text"
          placeholder="Username"
          className="w-full p-2 mb-4 border rounded"
          onChange={(e) => setCredentials({...credentials, username: e.target.value})}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 mb-4 border rounded"
          onChange={(e) => setCredentials({...credentials, password: e.target.value})}
        />
        <button 
          onClick={handleLogin}
          className="w-full bg-black text-white py-2 rounded"
        >
          Login
        </button>
      </form>
    );
  };
  

  export default AdminLogin;