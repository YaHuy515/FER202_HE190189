import React from 'react';
import { MemoryRouter, Routes, Route, Link, useParams } from 'react-router-dom';
import { Navbar, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';

// Route components as described in the curriculum
const Home = () => (
  <div className="py-4 text-center">
    <h3 className="fw-bold text-primary">Home Component</h3>
    <p className="text-secondary">Welcome to the Home view of Exercise 22.</p>
  </div>
);

const About = () => (
  <div className="py-4 text-center">
    <h3 className="fw-bold text-success">About Component</h3>
    <p className="text-secondary">This is the About component view.</p>
  </div>
);

const Contact = () => (
  <div className="py-4 text-center">
    <h3 className="fw-bold text-warning">Contact Component</h3>
    <p className="text-secondary">Feel free to contact us anytime.</p>
  </div>
);

const Profile = () => {
  const { username } = useParams();
  return (
    <div className="py-4 text-center">
      <h3 className="fw-bold text-info">Profile Component</h3>
      <p className="text-secondary">
        {username ? (
          <span>
            Current Profile User: <strong>{username}</strong> (Optional Param detected: <code>:username = {username}</code>)
          </span>
        ) : (
          <span>Viewing default Profile (No optional parameter specified).</span>
        )}
      </p>
    </div>
  );
};

const CustomNavbar = () => {
  return (
    <Navbar color="dark" dark expand="md" className="rounded px-3 mb-3 shadow-sm">
      <NavbarBrand tag={Link} to="/" className="fw-bold text-warning fs-5">
        Logo
      </NavbarBrand>
      <Nav className="me-auto d-flex flex-wrap gap-1" navbar>
        <NavItem>
          <NavLink tag={Link} to="/" className="text-light px-3 py-1 rounded">
            Home
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink tag={Link} to="/about" className="text-light px-3 py-1 rounded">
            About
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink tag={Link} to="/contact" className="text-light px-3 py-1 rounded">
            Contact
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink tag={Link} to="/profile" className="text-light px-3 py-1 rounded">
            Profile
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink tag={Link} to="/profile/HE190189" className="text-info px-3 py-1 rounded">
            Profile (/HE190189)
          </NavLink>
        </NavItem>
      </Nav>
    </Navbar>
  );
};

function Exercise22() {
  return (
    <div className="container py-4" style={{ maxWidth: '960px' }}>
      {/* Header Card */}
      <div className="card shadow-sm mb-4 border" style={{ backgroundColor: '#ffffff' }}>
        <div className="card-body p-4">
          <h2 className="fw-bold text-dark mb-2">Exercise 22: Demo about Optional parameters and Link</h2>
          <hr style={{ borderTop: '2px solid #0f172a', margin: '10px 0 16px' }} />
          <h5 className="fst-italic text-secondary">Objectives and Outcomes</h5>
          <p className="text-muted mb-0">
            This exercise is a demo that showcases how to use optional parameters and the Link component in React using{' '}
            <code>react-router-dom</code> version 6. In this example, we'll create a simple navigation menu with links that can accept optional parameters.
          </p>
        </div>
      </div>

      {/* Exercises Description Card */}
      <div className="card shadow-sm mb-4 border" style={{ backgroundColor: '#ffffff' }}>
        <div className="card-body p-4">
          <h4 className="fw-bold text-dark mb-3">Exercises</h4>
          <p className="text-secondary mb-3">
            Cài đặt các gói phụ thuộc cần thiết:
          </p>
          <pre className="p-3 rounded text-light bg-dark mb-3" style={{ fontSize: '0.88rem' }}>
{`"react-router-dom": "^6.16.0"
"reactstrap": "^9.2.0"`}
          </pre>

          <p className="text-secondary mb-2">
            Tạo thanh điều hướng <code>CustomNavbar</code> sử dụng các component của <code>reactstrap</code> (<code>Navbar</code>, <code>NavbarBrand</code>, <code>Nav</code>, <code>NavItem</code>, <code>NavLink</code>) kết hợp cùng thuộc tính <code>tag={'{Link}'}</code> để định tuyến với <code>react-router-dom</code>.
          </p>

          <div className="alert alert-info py-2 px-3 mb-4" style={{ fontSize: '0.9rem' }}>
            <strong>💡 Hướng dẫn thử nghiệm:</strong>
            <ul className="mb-0 mt-1 ps-3">
              <li>Click vào các mục trên thanh <strong>Navbar</strong> (Logo, Home, About, Contact, Profile, Profile (/HE190189)).</li>
              <li>Quan sát component tương ứng được render mượt mà ngay bên dưới mà không làm reload toàn bộ trang.</li>
            </ul>
          </div>

          {/* Live Output Container */}
          <div className="card border rounded overflow-hidden">
            <div className="card-header d-flex justify-content-between align-items-center bg-light border-bottom px-3 py-2">
              <span className="fw-bold text-secondary" style={{ fontSize: '0.85rem' }}>
                LIVE OUTPUT - REACTSTRAP NAVBAR & ROUTER DEMO
              </span>
              <span className="badge bg-primary">react-router-dom v6 + reactstrap</span>
            </div>

            <div className="card-body p-4" style={{ backgroundColor: '#f8fafc' }}>
              <MemoryRouter initialEntries={['/']}>
                <CustomNavbar />
                <div className="p-4 rounded border bg-white shadow-sm" style={{ minHeight: '150px' }}>
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/profile/:username" element={<Profile />} />
                  </Routes>
                </div>
              </MemoryRouter>
            </div>
          </div>
        </div>
      </div>

      {/* Code Details Card */}
      <div className="card shadow-sm mb-4 border" style={{ backgroundColor: '#ffffff' }}>
        <div className="card-body p-4">
          <h5 className="fw-bold text-dark mb-3">CustomNavbar & App Component Code</h5>
          <pre className="p-3 rounded text-light bg-dark" style={{ fontSize: '0.85rem', overflowX: 'auto' }}>
{`const CustomNavbar = () => {
  return (
    <Navbar color="dark" dark expand="md">
      <NavbarBrand tag={Link} to="/">Logo</NavbarBrand>
      <Nav className="mr-auto" navbar>
        <NavItem>
          <NavLink tag={Link} to="/">Home</NavLink>
        </NavItem>
        <NavItem>
          <NavLink tag={Link} to="/about">About</NavLink>
        </NavItem>
        <NavItem>
          <NavLink tag={Link} to="/contact">Contact</NavLink>
        </NavItem>
      </Nav>
    </Navbar>
  );
};

const App = () => {
  return (
    <Router>
      <CustomNavbar />
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/profile/:username?" element={<Profile />} />
      </Routes>
    </Router>
  );
};`}
          </pre>
        </div>
      </div>

      {/* Conclusion Card */}
      <div className="card shadow-sm border text-center" style={{ backgroundColor: '#ffffff' }}>
        <div className="card-body p-4">
          <h5 className="fst-italic text-secondary">Conclusion</h5>
          <p className="text-muted mb-0" style={{ fontSize: '0.95rem' }}>
            This demo demonstrates how to use optional parameters and the Link component in React using react-router-dom version 6.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Exercise22;
