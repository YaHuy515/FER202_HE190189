import React from 'react';
import { MemoryRouter, Routes, Route, Link, useParams, useNavigate, useLocation } from 'react-router-dom';

// Data sources for Exercise 21
export const usersData = [
  { id: 0, firstName: "John", lastName: "Done", age: 25 },
  { id: 1, firstName: "Mary", lastName: "Thompson", age: 35 },
  { id: 2, firstName: "John", lastName: "Smith", age: 30 },
  { id: 3, firstName: "Emily", lastName: "Johnson", age: 25 },
  { id: 4, firstName: "William", lastName: "Davis", age: 34 }
];

export const dishesData = [
  {
    id: 0,
    name: "Uthappizza",
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600&auto=format&fit=crop&q=80",
    category: "mains",
    label: "Hot",
    price: "4.99",
    featured: true,
    description: "A unique combination of Indian Uthappam (pancake) and Italian pizza, topped with Cerignola olives, ripe vine cherry tomatoes, Vidalia onion, Guntur chillies and Buffalo Paneer."
  },
  {
    id: 1,
    name: "Zucchipakoda",
    image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=600&auto=format&fit=crop&q=80",
    category: "appetizer",
    label: "",
    price: "1.99",
    featured: false,
    description: "Deep fried Zucchini coated with mildly spiced Chickpea flour batter accompanied with a sweet-tangy tamarind sauce"
  },
  {
    id: 2,
    name: "Vadonut",
    image: "https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?w=600&auto=format&fit=crop&q=80",
    category: "appetizer",
    label: "New",
    price: "1.99",
    featured: false,
    description: "A quintessential ConFusion experience, is it a vada or is it a donut?"
  },
  {
    id: 3,
    name: "ElaiCheese Cake",
    image: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=600&auto=format&fit=crop&q=80",
    category: "dessert",
    label: "",
    price: "2.99",
    featured: false,
    description: "A delectable, semi-sweet New York Style Cheese Cake, with Graham cracker crust and spiced with Indian cardamoms"
  }
];

// --- Subcomponents for Part 1: Users Route Params Demo ---
function UserList() {
  return (
    <div className="text-start">
      <h5 className="fw-bold text-dark mb-3">User Directory</h5>
      <div className="list-group">
        {usersData.map((user) => (
          <Link
            key={user.id}
            to={`/users/${user.id}`}
            className="list-group-item list-group-item-action d-flex justify-content-between align-items-center py-3 fs-5 text-primary text-decoration-none"
          >
            <span>{user.firstName} {user.lastName}</span>
            <span className="badge bg-light text-secondary border font-monospace fs-6">
              /users/{user.id}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}

function UserDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const user = usersData.find((u) => u.id === parseInt(id, 10));

  if (!user) {
    return (
      <div className="alert alert-warning text-center">
        <h5>User Not Found (ID: {id})</h5>
        <button onClick={() => navigate('/users')} className="btn btn-sm btn-outline-dark mt-2">
          &larr; Back to Users
        </button>
      </div>
    );
  }

  return (
    <div className="text-start">
      {/* Exact format as requested in the screenshot: John Smith : 30 */}
      <div className="d-flex align-items-center justify-content-between bg-light p-3 rounded border mb-3">
        <div className="font-monospace text-muted small">
          <i className="bi bi-globe me-1"></i>URL Route: <strong>localhost:3000/users/{id}</strong>
        </div>
        <button onClick={() => navigate('/users')} className="btn btn-sm btn-outline-secondary">
          &larr; Back to Users
        </button>
      </div>

      <div className="card border shadow-sm p-4 text-center bg-white">
        <h1 className="fw-bold text-dark mb-2">
          {user.firstName} {user.lastName} : {user.age}
        </h1>
        <p className="text-muted mb-0">
          User Resource ID parameter extracted: <code>useParams().id = {id}</code>
        </p>
      </div>
    </div>
  );
}

// --- Subcomponents for Part 2: Restaurant Dishes Route Params Demo ---
function RestaurantNavbar() {
  const location = useLocation();

  return (
    <nav className="navbar navbar-expand navbar-dark bg-dark px-3 py-2 rounded mb-3">
      <div className="container-fluid">
        <Link to="/" className="navbar-brand fw-bold text-warning fs-5">
          Logo
        </Link>
        <ul className="navbar-nav ms-auto gap-2">
          <li className="nav-item">
            <Link
              to="/"
              className={`nav-link px-3 py-1 rounded ${
                location.pathname === '/' || location.pathname.startsWith('/dishes')
                  ? 'active bg-secondary text-white'
                  : 'text-light'
              }`}
            >
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/about"
              className={`nav-link px-3 py-1 rounded ${
                location.pathname === '/about' ? 'active bg-secondary text-white' : 'text-light'
              }`}
            >
              About
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/contact"
              className={`nav-link px-3 py-1 rounded ${
                location.pathname === '/contact' ? 'active bg-secondary text-white' : 'text-light'
              }`}
            >
              Contact
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

function DishList() {
  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5 className="fw-bold text-dark mb-0">Restaurant Menu (Home)</h5>
        <span className="badge bg-info text-dark">Click dish to view ResourceID details</span>
      </div>

      <div className="row g-3">
        {dishesData.map((dish) => (
          <div className="col-12 col-sm-6" key={dish.id}>
            <div className="card h-100 shadow-sm border overflow-hidden">
              <div style={{ height: '180px', overflow: 'hidden', backgroundColor: '#f1f5f9' }}>
                <img
                  src={dish.image}
                  alt={dish.name}
                  className="w-100 h-100"
                  style={{ objectFit: 'cover', transition: 'transform 0.3s ease' }}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                />
              </div>
              <div className="card-body p-3 d-flex flex-column justify-content-between text-start">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <Link
                    to={`/dishes/${dish.id}`}
                    className="fw-bold text-primary text-decoration-none fs-6"
                  >
                    {dish.name}
                  </Link>
                  <div>
                    {dish.label && (
                      <span className="badge bg-danger me-1">{dish.label}</span>
                    )}
                    <span className="badge bg-success">${dish.price}</span>
                  </div>
                </div>
                <p className="card-text text-muted small mb-2" style={{
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden'
                }}>
                  {dish.description}
                </p>
                <Link
                  to={`/dishes/${dish.id}`}
                  className="btn btn-sm btn-outline-primary mt-auto text-decoration-none"
                >
                  View Details &rarr;
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function DishDetail() {
  const { dishId } = useParams();
  const navigate = useNavigate();
  const dish = dishesData.find((d) => d.id === parseInt(dishId, 10));

  if (!dish) {
    return (
      <div className="alert alert-warning text-center">
        <h5>Dish Not Found (ID: {dishId})</h5>
        <button onClick={() => navigate('/')} className="btn btn-sm btn-outline-dark mt-2">
          &larr; Back to Menu
        </button>
      </div>
    );
  }

  return (
    <div className="text-start">
      <div className="d-flex align-items-center justify-content-between bg-light p-2 px-3 rounded border mb-3">
        <div className="font-monospace text-muted small">
          <i className="bi bi-link-45deg me-1"></i>URL Route: <strong>localhost:3000/dishes/{dishId}</strong>
        </div>
        <button onClick={() => navigate('/')} className="btn btn-sm btn-outline-secondary">
          &larr; Back to Menu
        </button>
      </div>

      <div className="card shadow-sm border overflow-hidden">
        <div className="row g-0">
          <div className="col-md-5">
            <img
              src={dish.image}
              alt={dish.name}
              className="img-fluid h-100 w-100"
              style={{ objectFit: 'cover', minHeight: '260px' }}
            />
          </div>
          <div className="col-md-7">
            <div className="card-body p-4 d-flex flex-column justify-content-between h-100">
              <div>
                <div className="d-flex justify-content-between align-items-start mb-2">
                  <h3 className="fw-bold text-dark mb-0">{dish.name}</h3>
                  <span className="fs-5 fw-bold text-success">${dish.price}</span>
                </div>
                <div className="mb-3">
                  <span className="badge bg-secondary me-2 text-uppercase">{dish.category}</span>
                  {dish.label && <span className="badge bg-danger me-2">{dish.label}</span>}
                  {dish.featured && <span className="badge bg-warning text-dark">Featured</span>}
                </div>
                <hr className="my-2" />
                <p className="text-secondary mb-3">{dish.description}</p>
              </div>

              <div className="p-3 bg-light rounded border text-muted small">
                <strong>Resource ID Param:</strong> <code>dishId = {dishId}</code> | <strong>Category:</strong> {dish.category}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function AboutPage() {
  return (
    <div className="p-4 bg-light rounded border text-start">
      <h4 className="fw-bold text-dark">About Our Restaurant</h4>
      <p className="text-secondary mb-0">
        We offer a rich dining experience blending classic recipes with innovative fusion cooking.
      </p>
    </div>
  );
}

function ContactPage() {
  return (
    <div className="p-4 bg-light rounded border text-start">
      <h4 className="fw-bold text-dark">Contact Us</h4>
      <p className="text-secondary mb-0">
        Hotline: 1900-123-456 | Address: FPT University Campus.
      </p>
    </div>
  );
}

function Exercise21() {
  return (
    <div className="container py-4" style={{ maxWidth: '960px' }}>
      {/* Header Card */}
      <div className="card shadow-sm mb-4 border" style={{ backgroundColor: '#ffffff' }}>
        <div className="card-body p-4">
          <h2 className="fw-bold text-dark mb-2">Exercise 21: Route (ResourceID)</h2>
          <hr style={{ borderTop: '2px solid #0f172a', margin: '10px 0 16px' }} />
          <h5 className="fst-italic text-secondary">Objectives and Outcomes</h5>
          <p className="text-muted mb-0">
            Route parameters allow you to define dynamic segments in your route paths that can be accessed as props within the rendered component.
          </p>
        </div>
      </div>

      {/* Part 1: Users Route Parameters */}
      <div className="card shadow-sm mb-4 border" style={{ backgroundColor: '#ffffff' }}>
        <div className="card-body p-4">
          <h4 className="fw-bold text-dark mb-2">
            1. List of Users & Details upon clicking User's ID
          </h4>
          <p className="text-secondary mb-3">
            Bấm vào bất kỳ người dùng nào trong danh sách để xem chi tiết theo dạng <code>John Smith : 30</code> tại route <code>/users/:id</code>:
          </p>

          <div className="card border rounded overflow-hidden">
            <div className="card-header d-flex justify-content-between align-items-center bg-light border-bottom px-3 py-2">
              <span className="fw-bold text-secondary" style={{ fontSize: '0.85rem' }}>
                DEMO 1: USER DETAILS VIA ROUTE PARAM (:id)
              </span>
              <span className="badge bg-primary">useParams()</span>
            </div>
            <div className="card-body p-4" style={{ backgroundColor: '#f8fafc' }}>
              <MemoryRouter initialEntries={['/users']}>
                <Routes>
                  <Route path="/" element={<UserList />} />
                  <Route path="/users" element={<UserList />} />
                  <Route path="/users/:id" element={<UserDetail />} />
                </Routes>
              </MemoryRouter>
            </div>
          </div>
        </div>
      </div>

      {/* Part 2: Restaurant Dishes Route Parameters */}
      <div className="card shadow-sm mb-4 border" style={{ backgroundColor: '#ffffff' }}>
        <div className="card-body p-4">
          <h4 className="fw-bold text-dark mb-2">
            2. List of Dishes & Display Details upon clicking Dish's ID
          </h4>
          <p className="text-secondary mb-3">
            Giao diện nhà hàng với danh mục món ăn (Uthappizza, Zucchipakoda, Vadonut, ElaiCheese Cake) và trang chi tiết món ăn theo ID:
          </p>

          <div className="card border rounded overflow-hidden">
            <div className="card-header d-flex justify-content-between align-items-center bg-light border-bottom px-3 py-2">
              <span className="fw-bold text-secondary" style={{ fontSize: '0.85rem' }}>
                DEMO 2: DISH DETAILS VIA ROUTE PARAM (:dishId)
              </span>
              <span className="badge bg-success">Full Restaurant Menu</span>
            </div>
            <div className="card-body p-4" style={{ backgroundColor: '#f8fafc' }}>
              <MemoryRouter initialEntries={['/']}>
                <RestaurantNavbar />
                <Routes>
                  <Route path="/" element={<DishList />} />
                  <Route path="/dishes/:dishId" element={<DishDetail />} />
                  <Route path="/about" element={<AboutPage />} />
                  <Route path="/contact" element={<ContactPage />} />
                </Routes>
              </MemoryRouter>
            </div>
          </div>
        </div>
      </div>

      {/* Conclusion Card */}
      <div className="card shadow-sm border text-center" style={{ backgroundColor: '#ffffff' }}>
        <div className="card-body p-4">
          <h5 className="fst-italic text-secondary">Conclusion</h5>
          <p className="text-muted mb-0" style={{ fontSize: '0.95rem' }}>
            In conclusion, handling resource IDs in routes with React Router can be accomplished using route parameters.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Exercise21;
