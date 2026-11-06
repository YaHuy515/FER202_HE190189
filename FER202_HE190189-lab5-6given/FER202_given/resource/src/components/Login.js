import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await axios.get('http://localhost:9000/accounts');
      const accounts = response.data;
      const account = accounts.find(
        (acc) =>
          acc.email?.toLowerCase() === email.trim().toLowerCase() &&
          acc.password === password
      );

      if (!account) {
        setError('Invalid email or password');
        return;
      }

      if (account.status === 'Inactive') {
        setError('Tài khoản đã bị khóa');
        return;
      }

      localStorage.setItem('user', JSON.stringify(account));
      localStorage.setItem('currentUser', JSON.stringify(account));
      navigate('/syllabus');
    } catch (err) {
      setError('Unable to connect to mock API server');
    }
  };

  return (
    <div className="container min-vh-100 d-flex justify-content-center align-items-center">
      <div className="card shadow-sm" style={{ width: '100%', maxWidth: '420px' }}>
        <div className="card-body p-4">
          <h3 className="card-title text-center mb-4">Sign In</h3>

          {error && <div className="alert alert-danger">{error}</div>}

          <form onSubmit={handleLogin}>
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                placeholder="Email of student or lecturer"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="btn btn-primary w-100 mt-2">
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
