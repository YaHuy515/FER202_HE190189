import React, { useState } from 'react';
import { MemoryRouter, Routes, useNavigate, useLocation } from 'react-router-dom';
import { renderRoutes } from './routes';
import NavigationMenu from './NavigationMenu';

// Interactive Router Controller component to test URLs inside MemoryRouter
function RouterDemoContent() {
  const navigate = useNavigate();
  const location = useLocation();
  const [customUserId, setCustomUserId] = useState('');

  const handleCustomNavigate = (e) => {
    e.preventDefault();
    if (customUserId.trim()) {
      navigate(`/users/${encodeURIComponent(customUserId.trim())}`);
      setCustomUserId('');
    }
  };

  return (
    <div>
      {/* Navigation Menu Component */}
      <NavigationMenu />

      {/* Quick Param Testing Bar */}
      <div className="card p-3 mb-3 bg-light border">
        <div className="row align-items-center g-2">
          <div className="col-auto">
            <span className="fw-semibold text-secondary small">
              <i className="bi bi-link-45deg me-1"></i>Current Path:
            </span>{' '}
            <span className="badge bg-secondary font-monospace px-2 py-1">
              {location.pathname}
            </span>
          </div>
          <div className="col">
            <form onSubmit={handleCustomNavigate} className="d-flex gap-2">
              <input
                type="text"
                className="form-control form-control-sm"
                placeholder="Nhập User ID tùy ý (ví dụ: student_2026, JohnDoe)..."
                value={customUserId}
                onChange={(e) => setCustomUserId(e.target.value)}
              />
              <button type="submit" className="btn btn-sm btn-primary text-nowrap">
                Go to /users/:userId
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Dynamic Routes Rendering */}
      <div
        className="p-4 rounded border bg-white shadow-sm text-center"
        style={{ minHeight: '160px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}
      >
        <div className="text-secondary small mb-2 text-uppercase fw-bold letter-spacing-1">
          Rendered Page Component:
        </div>
        <div className="text-dark">
          <Routes>{renderRoutes()}</Routes>
        </div>
      </div>
    </div>
  );
}

function Exercise20() {
  return (
    <div className="container py-4" style={{ maxWidth: '960px' }}>
      {/* Header Card */}
      <div className="card shadow-sm mb-4 border" style={{ backgroundColor: '#ffffff' }}>
        <div className="card-body p-4">
          <h2 className="fw-bold text-dark mb-2">Exercise 20: Decoupling Route</h2>
          <hr style={{ borderTop: '2px solid #0f172a', margin: '10px 0 16px' }} />
          <h5 className="fst-italic text-secondary">Objectives and Outcomes</h5>
          <p className="text-muted mb-0">
            Decoupling route declarations can help organize your codebase and make it more maintainable.
            This exercise is a demo that showcases how to decouple route declarations in React using{' '}
            <code>react-router-dom</code>.
          </p>
        </div>
      </div>

      {/* Exercises Description Card */}
      <div className="card shadow-sm mb-4 border" style={{ backgroundColor: '#ffffff' }}>
        <div className="card-body p-4">
          <h4 className="fw-bold text-dark mb-3">Exercises</h4>
          <ul className="text-secondary mb-3" style={{ paddingLeft: '20px' }}>
            <li className="mb-2">
              <strong>Step 1</strong> &mdash; Create a new file called <code>routes.js</code> defining an array of route objects (<code>routes</code>) and an exported <code>renderRoutes()</code> function mapping routes to <code>&lt;Route /&gt;</code> elements.
            </li>
            <li className="mb-2">
              <strong>Step 2</strong> &mdash; Create <code>NavigationMenu.js</code> with links to different paths (<code>/</code>, <code>/products</code>, <code>/about</code>, <code>/contact</code>, <code>/users/:userId?</code>).
            </li>
            <li className="mb-2">
              <strong>Step 3</strong> &mdash; Update the application component to use decoupled route declarations via <code>&lt;Routes&gt;{'{renderRoutes()}'}&lt;/Routes&gt;</code>.
            </li>
          </ul>

          <div className="alert alert-info py-2 px-3 mb-4" style={{ fontSize: '0.9rem' }}>
            <strong>💡 Hướng dẫn kiểm tra & trải nghiệm:</strong>
            <ul className="mb-0 mt-1 ps-3">
              <li>Click vào các mục trong <strong>Navigation Menu</strong> (Home, Products, About, Contact, User Profile) để chuyển trang nhanh chóng.</li>
              <li>Thử nhập mã ID người dùng tùy chọn vào ô <strong>User ID</strong> bên dưới và bấm nút <em>Go to /users/:userId</em> để kiểm tra dynamic route param.</li>
            </ul>
          </div>

          {/* Live Output Container */}
          <div className="card border rounded overflow-hidden">
            <div className="card-header d-flex justify-content-between align-items-center bg-light border-bottom px-3 py-2">
              <span className="fw-bold text-secondary" style={{ fontSize: '0.85rem' }}>
                LIVE OUTPUT - DECOUPLED ROUTE DEMO
              </span>
              <span className="badge bg-primary">react-router-dom</span>
            </div>

            <div className="card-body p-4" style={{ backgroundColor: '#f8fafc' }}>
              <MemoryRouter initialEntries={['/']}>
                <RouterDemoContent />
              </MemoryRouter>
            </div>
          </div>
        </div>
      </div>

      {/* Code Overview Card */}
      <div className="card shadow-sm mb-4 border" style={{ backgroundColor: '#ffffff' }}>
        <div className="card-body p-4">
          <h5 className="fw-bold text-dark mb-3">Decoupled Route Definition Code (routes.js)</h5>
          <pre
            className="p-3 rounded text-light bg-dark"
            style={{ fontSize: '0.85rem', overflowX: 'auto' }}
          >
{`export const routes = [
  { path: '/', component: () => <h1>Home Page</h1>, exact: true },
  { path: '/products', component: () => <h1>Products Page</h1> },
  { path: '/about', component: () => <h1>About Page</h1> },
  { path: '/contact', component: () => <h1>Contact Page</h1> },
  { path: '/users/:userId?', component: ({ params }) => <h1>User Profile: {params.userId}</h1> }
];

export const renderRoutes = () => {
  return routes.map((route, index) => (
    <Route key={index} path={route.path} element={<route.component />} exact={route.exact} />
  ));
};`}
          </pre>
        </div>
      </div>

      {/* Conclusion Card */}
      <div className="card shadow-sm border text-center" style={{ backgroundColor: '#ffffff' }}>
        <div className="card-body p-4">
          <h5 className="fst-italic text-secondary">Conclusion</h5>
          <p className="text-muted mb-0" style={{ fontSize: '0.95rem' }}>
            This demo showcases how to decouple route declarations in React using react-router-dom. It helps organize your codebase and makes it more maintainable.
            By using React Router, you can create a seamless navigation experience within your React application, rendering different components based on the current URL. It helps in organizing your application into distinct views/pages and provides a clean and structured way to handle routing.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Exercise20;
