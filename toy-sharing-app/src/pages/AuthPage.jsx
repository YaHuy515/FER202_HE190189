/**
 * 🔐 COMPONENT: AuthPage (Trang Đăng Nhập / Đăng Ký)
 * ------------------------------------------------------------------
 * 🎯 Chức năng: Xử lý Đăng nhập và Đăng ký tài khoản (có ô Xác nhận MK)
 */

import React, { useState } from 'react';
import axios from 'axios';

const API_USERS = 'http://localhost:9999/users';

function AuthPage({ onLoginSuccess, showToast }) {
  const [isLogin, setIsLogin] = useState(true);

  // Inputs state
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState(''); // 👈 State cho Xác nhận MK
  const [displayName, setDisplayName] = useState('');

  // Error/Loading state
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setLoading(true);

    const userVal = username.trim().toLowerCase();
    const passVal = password.trim();

    if (!userVal || !passVal) {
      setErrorMsg('Vui lòng nhập đầy đủ tài khoản và mật khẩu!');
      setLoading(false);
      return;
    }

    try {
      if (isLogin) {
        // --- LUỒNG ĐĂNG NHẬP ---
        if (userVal === 'admin') {
          if (passVal === '123') {
            onLoginSuccess({
              id: 'admin-id',
              username: 'admin',
              displayName: 'Quản Trị Viên (Admin)',
              role: 'admin'
            });
            return;
          } else {
            setErrorMsg('Mật khẩu Admin không chính xác!');
            setLoading(false);
            return;
          }
        }

        const response = await axios.get(`${API_USERS}?username=${userVal}`);
        const user = response.data[0];

        if (!user || user.password !== passVal) {
          setErrorMsg('Tài khoản hoặc mật khẩu không chính xác!');
        } else {
          onLoginSuccess(user);
        }
      } else {
        // --- LUỒNG ĐĂNG KÝ ---
        const nameVal = displayName.trim();
        const confirmPassVal = confirmPassword.trim();

        if (!nameVal) {
          setErrorMsg('Vui lòng nhập tên hiển thị!');
          setLoading(false);
          return;
        }

        // 🟢 Kiểm tra Mật khẩu & Mật khẩu xác nhận
        if (passVal !== confirmPassVal) {
          setErrorMsg('Mật khẩu xác nhận không trùng khớp!');
          setLoading(false);
          return;
        }

        if (userVal === 'admin') {
          setErrorMsg('Không thể đăng ký tài khoản với tên "admin"!');
          setLoading(false);
          return;
        }

        const checkExist = await axios.get(`${API_USERS}?username=${userVal}`);
        if (checkExist.data.length > 0) {
          setErrorMsg('Tên tài khoản này đã tồn tại!');
          setLoading(false);
          return;
        }

        const newUser = {
          id: 'user-' + Date.now(),
          username: userVal,
          password: passVal,
          displayName: nameVal,
          role: 'parent'
        };

        const response = await axios.post(API_USERS, newUser);
        if (showToast) showToast('Đăng ký tài khoản thành công!', 'success');
        onLoginSuccess(response.data);
      }
    } catch (err) {
      console.error(err);
      setErrorMsg('Lỗi kết nối máy chủ API! Hãy đảm bảo json-server đang chạy ở cổng 9999.');
    } finally {
      setLoading(false);
    }
  };

  const toggleTab = (loginTab) => {
    setIsLogin(loginTab);
    setErrorMsg('');
    setUsername('');
    setPassword('');
    setConfirmPassword('');
    setDisplayName('');
  };

  return (
    <div className="auth-wrapper" style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '80vh',
      width: '100%',
      animation: 'fadeIn 0.5s ease-out'
    }}>
      <div className="glass-panel auth-card" style={{
        width: '100%',
        maxWidth: '450px',
        padding: '36px',
        borderRadius: 'var(--radius-lg)',
        boxShadow: 'var(--shadow-lg)'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
          <span style={{ fontSize: '48px', animation: 'float 3s infinite' }}>🧸</span>
          <h2 style={{ fontSize: '26px', fontWeight: '800', background: 'var(--primary-gradient)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginTop: '10px' }}>
            Chào Mừng Đến ToyShare
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginTop: '4px' }}>
            Hệ thống quản lý và chia sẻ đồ chơi của trẻ em
          </p>
        </div>

        {/* Tab Header */}
        <div className="role-selector" style={{ display: 'flex', marginBottom: '24px', width: '100%' }}>
          <button
            type="button"
            className={`role-btn ${isLogin ? 'active' : ''}`}
            onClick={() => toggleTab(true)}
            style={{ flex: 1, justifyContent: 'center' }}
          >
            🔑 Đăng Nhập
          </button>
          <button
            type="button"
            className={`role-btn ${!isLogin ? 'active' : ''}`}
            onClick={() => toggleTab(false)}
            style={{ flex: 1, justifyContent: 'center' }}
          >
            📝 Đăng Ký
          </button>
        </div>

        {/* Thông báo lỗi nếu có */}
        {errorMsg && (
          <div className="badge badge-danger" style={{
            width: '100%',
            padding: '12px',
            marginBottom: '16px',
            borderRadius: 'var(--radius-sm)',
            textTransform: 'none',
            fontSize: '13px',
            display: 'block',
            textAlign: 'center',
            boxSizing: 'border-box'
          }}>
            ⚠️ {errorMsg}
          </div>
        )}

        {/* Form Đăng Nhập / Đăng Ký */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div className="form-group">
            <label htmlFor="auth-username">Tên tài khoản</label>
            <input
              id="auth-username"
              type="text"
              className="form-control"
              value={username}
              onChange={e => setUsername(e.target.value)}
              placeholder="Nhập tên tài khoản..."
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="auth-password">Mật khẩu</label>
            <input
              id="auth-password"
              type="password"
              className="form-control"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Nhập mật khẩu..."
              required
            />
          </div>

          {/* 🟢 Ô XÁC NHẬN MẬT KHẨU (Chỉ hiển thị khi bấm sang Tab Đăng Ký) */}
          {!isLogin && (
            <div className="form-group">
              <label htmlFor="auth-confirm-password">Xác nhận mật khẩu</label>
              <input
                id="auth-confirm-password"
                type="password"
                className="form-control"
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
                placeholder="Nhập lại mật khẩu..."
                required={!isLogin}
              />
            </div>
          )}

          {!isLogin && (
            <div className="form-group">
              <label htmlFor="auth-displayname">Tên hiển thị</label>
              <input
                id="auth-displayname"
                type="text"
                className="form-control"
                value={displayName}
                onChange={e => setDisplayName(e.target.value)}
                placeholder="Nhập tên hiển thị (VD: Nguyễn Văn A)..."
                required={!isLogin}
              />
            </div>
          )}

          <button
            type="submit"
            className="btn btn-primary"
            disabled={loading}
            style={{ width: '100%', padding: '12px', marginTop: '10px' }}
          >
            {loading ? 'Đang xử lý...' : isLogin ? 'Đăng Nhập 🚀' : 'Đăng Ký 📝'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default AuthPage;