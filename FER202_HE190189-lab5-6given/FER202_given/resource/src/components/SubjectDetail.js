import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function SubjectDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [subject, setSubject] = useState({
    code: '',
    name: '',
    curriculum: '',
    semester: '',
    credits: '',
    preRequisites: [],
    description: '',
  });

  const [preRequisitesInput, setPreRequisitesInput] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem('user') || localStorage.getItem('currentUser');
    if (!savedUser) {
      navigate('/login');
      return;
    }

    const fetchSubject = async () => {
      try {
        const response = await axios.get(`http://localhost:9000/subjects/${id}`);
        const data = response.data;
        setSubject(data);

        if (Array.isArray(data.preRequisites)) {
          setPreRequisitesInput(data.preRequisites.join(', '));
        } else if (data.preRequisites) {
          setPreRequisitesInput(data.preRequisites);
        } else {
          setPreRequisitesInput('');
        }
        setLoading(false);
      } catch (err) {
        console.error('Failed to fetch subject details:', err);
        setLoading(false);
      }
    };

    fetchSubject();
  }, [id, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSubject((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleEditSave = async () => {
    if (!isEditing) {
      setIsEditing(true);
      return;
    }

    // Save changes
    let parsedPreReqs = [];
    if (
      preRequisitesInput.trim() !== '' &&
      preRequisitesInput.trim().toLowerCase() !== 'none'
    ) {
      const delimiter = preRequisitesInput.includes(',') ? ',' : ';';
      parsedPreReqs = preRequisitesInput
        .split(delimiter)
        .map((s) => s.trim())
        .filter(Boolean);
    }

    const updatedData = {
      ...subject,
      semester: Number(subject.semester) || 0,
      credits: Number(subject.credits) || 0,
      preRequisites: parsedPreReqs,
    };

    try {
      await axios.put(`http://localhost:9000/subjects/${id}`, updatedData);
      setSubject(updatedData);
      setPreRequisitesInput(parsedPreReqs.join(', '));
      setIsEditing(false);
    } catch (err) {
      console.error('Failed to update subject:', err);
    }
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      'Are you sure you want to delete this subject?'
    );
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:9000/subjects/${id}`);
      navigate('/syllabus');
    } catch (err) {
      console.error('Failed to delete subject:', err);
    }
  };

  if (loading) {
    return (
      <div className="container mt-5 text-center">
        <p>Loading subject details...</p>
      </div>
    );
  }

  return (
    <div>
      {/* Header Bar */}
      <div className="bg-light p-3 border-bottom mb-4">
        <div className="container-fluid d-flex justify-content-between align-items-center">
          <h5 className="mb-0">Subject Detail Management</h5>
          <button
            className="btn btn-secondary btn-sm"
            onClick={() => navigate('/syllabus')}
          >
            Back to List
          </button>
        </div>
      </div>

      {/* Subject Information Form */}
      <div className="container pb-5">
        <div className="card mx-auto shadow-sm" style={{ maxWidth: '520px' }}>
          <div className="card-body p-4">
            <h5 className="card-title fw-bold mb-4">Subject Information</h5>

            <div className="mb-3">
              <label className="form-label fw-semibold">Code</label>
              <input
                type="text"
                className={`form-control form-control-sm ${!isEditing ? 'bg-light' : ''}`}
                name="code"
                value={subject.code || ''}
                onChange={handleChange}
                readOnly={!isEditing}
              />
            </div>

            <div className="mb-3">
              <label className="form-label fw-semibold">Name</label>
              <input
                type="text"
                className={`form-control form-control-sm ${!isEditing ? 'bg-light' : ''}`}
                name="name"
                value={subject.name || ''}
                onChange={handleChange}
                readOnly={!isEditing}
              />
            </div>

            <div className="mb-3">
              <label className="form-label fw-semibold">Curriculum</label>
              <input
                type="text"
                className={`form-control form-control-sm ${!isEditing ? 'bg-light' : ''}`}
                name="curriculum"
                value={subject.curriculum || ''}
                onChange={handleChange}
                readOnly={!isEditing}
              />
            </div>

            <div className="mb-3">
              <label className="form-label fw-semibold">Semester</label>
              <input
                type="number"
                className={`form-control form-control-sm ${!isEditing ? 'bg-light' : ''}`}
                name="semester"
                value={subject.semester ?? ''}
                onChange={handleChange}
                readOnly={!isEditing}
              />
            </div>

            <div className="mb-3">
              <label className="form-label fw-semibold">Credits</label>
              <input
                type="number"
                className={`form-control form-control-sm ${!isEditing ? 'bg-light' : ''}`}
                name="credits"
                value={subject.credits ?? ''}
                onChange={handleChange}
                readOnly={!isEditing}
              />
            </div>

            <div className="mb-3">
              <label className="form-label fw-semibold">
                Pre-requisites (cách nhau bởi dấu phẩy)
              </label>
              <input
                type="text"
                className={`form-control form-control-sm ${!isEditing ? 'bg-light' : ''}`}
                value={preRequisitesInput}
                onChange={(e) => setPreRequisitesInput(e.target.value)}
                readOnly={!isEditing}
              />
            </div>

            <div className="mb-4">
              <label className="form-label fw-semibold">Description</label>
              <textarea
                className={`form-control form-control-sm ${!isEditing ? 'bg-light' : ''}`}
                rows={3}
                name="description"
                value={subject.description || ''}
                onChange={handleChange}
                readOnly={!isEditing}
              />
            </div>

            {/* Action Toolbar */}
            <div className="d-flex justify-content-between">
              <button
                type="button"
                className="btn btn-secondary btn-sm px-4"
                onClick={handleEditSave}
              >
                {isEditing ? 'Save' : 'Edit'}
              </button>
              <button
                type="button"
                className="btn btn-secondary btn-sm px-4"
                onClick={handleDelete}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SubjectDetail;
