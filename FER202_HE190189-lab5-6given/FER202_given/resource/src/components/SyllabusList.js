import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

function SyllabusList() {
  const [user, setUser] = useState(null);
  const [subjects, setSubjects] = useState([]);
  const [filteredSubjects, setFilteredSubjects] = useState([]);
  const [searchBy, setSearchBy] = useState('code');
  const [keyword, setKeyword] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const savedUser = localStorage.getItem('user') || localStorage.getItem('currentUser');
    if (!savedUser) {
      navigate('/login');
      return;
    }
    setUser(JSON.parse(savedUser));

    const fetchSubjects = async () => {
      try {
        const response = await axios.get('http://localhost:9000/subjects');
        setSubjects(response.data);
        setFilteredSubjects(response.data);
      } catch (err) {
        console.error('Failed to fetch subjects:', err);
      }
    };

    fetchSubjects();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('currentUser');
    navigate('/login');
  };

  const handleSearch = () => {
    if (!keyword.trim()) {
      setFilteredSubjects(subjects);
      return;
    }

    const term = keyword.trim().toLowerCase();
    const result = subjects.filter((subject) => {
      if (searchBy === 'code') {
        return subject.code?.toLowerCase().includes(term);
      } else {
        return subject.name?.toLowerCase().includes(term);
      }
    });
    setFilteredSubjects(result);
  };

  const formatPreRequisites = (preRequisites) => {
    if (!preRequisites) return 'None';
    if (Array.isArray(preRequisites)) {
      if (preRequisites.length === 0) return 'None';
      return preRequisites.join(', ');
    }
    if (typeof preRequisites === 'string' && preRequisites.trim() === '') return 'None';
    return preRequisites;
  };

  return (
    <div>
      {/* Navigation Bar */}
      <nav className="navbar navbar-dark bg-dark px-4 py-2">
        <div className="container-fluid">
          <span className="navbar-brand mb-0 h1">
            FPT Education Learning Materials Portal
          </span>
          <div className="d-flex align-items-center text-white">
            {user && (
              <span className="me-3">
                Hello, {user.fullName} ({user.role})
              </span>
            )}
            <button className="btn btn-secondary btn-sm" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container mt-4">
        <h3 className="mb-4">Syllabus Management</h3>

        {/* Search & Filter */}
        <div className="row g-2 align-items-center mb-4">
          <div className="col-auto">
            <span className="fw-semibold">Search by:</span>
          </div>
          <div className="col-auto">
            <select
              className="form-select form-select-sm"
              value={searchBy}
              onChange={(e) => setSearchBy(e.target.value)}
              style={{ width: '110px' }}
            >
              <option value="code">Code</option>
              <option value="name">Name</option>
            </select>
          </div>
          <div className="col-auto" style={{ width: '280px' }}>
            <input
              type="text"
              className="form-control form-control-sm"
              placeholder="Enter keyword..."
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            />
          </div>
          <div className="col-auto">
            <button className="btn btn-secondary btn-sm px-3" onClick={handleSearch}>
              Search
            </button>
          </div>
        </div>

        {/* Subject Table */}
        <h5 className="mb-3">Subject List</h5>
        <div className="table-responsive">
          <table className="table table-bordered table-striped align-middle">
            <thead className="table-dark">
              <tr>
                <th>Code</th>
                <th>Name</th>
                <th>Curriculum</th>
                <th>Semester</th>
                <th>Credits</th>
                <th>Pre-requisites</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              {filteredSubjects.length > 0 ? (
                filteredSubjects.map((sub) => (
                  <tr key={sub.id}>
                    <td>
                      <Link to={`/subject/${sub.id}`}>{sub.code}</Link>
                    </td>
                    <td>{sub.name}</td>
                    <td>{sub.curriculum}</td>
                    <td>{sub.semester}</td>
                    <td>{sub.credits}</td>
                    <td>{formatPreRequisites(sub.preRequisites)}</td>
                    <td>{sub.description}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-center">
                    No subjects found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default SyllabusList;
