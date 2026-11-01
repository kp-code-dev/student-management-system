import { useEffect, useState } from 'react'
import './App.css'

const API_URL = `${import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api"}/students`

const getAuthHeaders = () => ({
  Authorization: `Bearer ${localStorage.getItem('token')}`,
})

const emptyForm = {
  name: '',
  email: '',
  course: '',
  phone: '',
}

function App() {
  const [students, setStudents] = useState([])
  const [formData, setFormData] = useState(emptyForm)
  const [editingId, setEditingId] = useState(null)
  const [showForm, setShowForm] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [saving, setSaving] = useState(false)
  const [search, setSearch] = useState('')

  // Fetch all students from Spring Boot backend
  const fetchStudents = async () => {
    try {
      setLoading(true)
      setError('')

      const response = await fetch(API_URL, {
        headers: {
        'Content-Type': 'application/json',
          ...getAuthHeaders(),
        },
      })

      if (!response.ok) {
        throw new Error('Unable to fetch students')
      }

      const data = await response.json()
      setStudents(data)
    } catch (err) {
      setError(err.message || 'Backend connection failed')
    } finally {
      setLoading(false)
    }
  }

  // Load students when the dashboard opens
  useEffect(() => {
    fetchStudents()
  }, [])

  // Handle form input changes
  const handleChange = (event) => {
    const { name, value } = event.target

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }))
  }

  // Open the form for adding a new student
  const handleAddClick = () => {
    setEditingId(null)
    setFormData(emptyForm)
    setShowForm(true)
  }

  // Open the form with existing student details
  const handleEditClick = (student) => {
    setEditingId(student.id)
    setFormData({
      name: student.name || '',
      email: student.email || '',
      course: student.course || '',
      phone: student.phone || '',
    })
    setShowForm(true)
  }

  // Save a new student or update an existing student
  const handleSubmit = async (event) => {
    event.preventDefault()

    try {
      setSaving(true)
      setError('')

      const isEditing = editingId !== null

      const response = await fetch(
        isEditing ? `${API_URL}/${editingId}` : API_URL,
        {
          method: isEditing ? 'PUT' : 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        },
      )

      if (!response.ok) {
        const message = await response.text()
        throw new Error(message || 'Unable to save student')
      }

      setShowForm(false)
      setFormData(emptyForm)
      setEditingId(null)

      await fetchStudents()
    } catch (err) {
      setError(err.message || 'Something went wrong')
    } finally {
      setSaving(false)
    }
  }

  // Delete a student using their ID
  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      'Are you sure you want to delete this student?',
    )

    if (!confirmed) return

    try {
      setError('')

      const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders(),
      })

      if (!response.ok) {
        throw new Error('Unable to delete student')
      }

      await fetchStudents()
    } catch (err) {
      setError(err.message || 'Delete failed')
    }
  }

  // Filter students by name, email, or course
  const filteredStudents = students.filter((student) => {
    const searchText = search.toLowerCase()

    return (
      student.name?.toLowerCase().includes(searchText) ||
      student.email?.toLowerCase().includes(searchText) ||
      student.course?.toLowerCase().includes(searchText)
    )
  })

  return (
    <div className="app-layout">
      {/* Sidebar navigation */}
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-icon">S</div>
          <div>
            <h2>StudentHub</h2>
            <span>Management System</span>
          </div>
        </div>

        <div className="sidebar-section">
          <p className="sidebar-label">MENU</p>

          <button className="nav-item active">
            <span>▦</span>
            Dashboard
          </button>

          <button className="nav-item" onClick={handleAddClick}>
            <span>＋</span>
            Add Student
          </button>
        </div>

        <div className="sidebar-bottom">
          <div className="profile-avatar">KP</div>
          <div className="profile-info">
            <strong>Admin</strong>
            <span>Administrator</span>
          </div>
        </div>
      </aside>

      {/* Main dashboard */}
      <main className="main-content">
        <header className="topbar">
          <div>
            <p className="breadcrumb">Pages / Dashboard</p>
            <h1>Student Dashboard</h1>
          </div>

          <button className="primary-button" onClick={handleAddClick}>
            <span>＋</span> Add Student
          </button>
        </header>

        {/* Dashboard overview */}
        <section className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon purple">♙</div>
            <div>
              <p>Total Students</p>
              <h2>{students.length}</h2>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon blue">▤</div>
            <div>
              <p>Displayed Students</p>
              <h2>{filteredStudents.length}</h2>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon green">✓</div>
            <div>
              <p>Database Status</p>
              <h2 className="status-text">
                {error ? 'Error' : loading ? 'Loading' : 'Connected'}
              </h2>
            </div>
          </div>
        </section>

        {/* Students table */}
        <section className="table-card">
          <div className="table-header">
            <div>
              <h2>All Students</h2>
              <p>Manage your student records</p>
            </div>

            <input
              type="search"
              className="search-input"
              placeholder="Search students..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
          </div>

          {error && (
            <div className="error-message">
              {error}
              <button onClick={fetchStudents}>Retry</button>
            </div>
          )}

          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>STUDENT</th>
                  <th>EMAIL</th>
                  <th>COURSE</th>
                  <th>PHONE</th>
                  <th>ACTIONS</th>
                </tr>
              </thead>

              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="6" className="empty-state">
                      Loading students...
                    </td>
                  </tr>
                ) : filteredStudents.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="empty-state">
                      {search
                        ? 'No matching students found.'
                        : 'No students found. Add your first student!'}
                    </td>
                  </tr>
                ) : (
                  filteredStudents.map((student) => (
                    <tr key={student.id}>
                      <td>#{student.id}</td>

                      <td>
                        <div className="student-name">
                          <div className="student-avatar">
                            {student.name?.charAt(0).toUpperCase()}
                          </div>
                          <strong>{student.name}</strong>
                        </div>
                      </td>

                      <td>{student.email}</td>

                      <td>
                        <span className="course-badge">
                          {student.course || 'N/A'}
                        </span>
                      </td>

                      <td>{student.phone || 'N/A'}</td>

                      <td>
                        <div className="action-buttons">
                          <button
                            className="edit-button"
                            onClick={() => handleEditClick(student)}
                          >
                            Edit
                          </button>

                          <button
                            className="delete-button"
                            onClick={() => handleDelete(student.id)}
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          <div className="table-footer">
            Showing {filteredStudents.length} of {students.length} students
          </div>
        </section>

        <footer className="footer">
          StudentHub · Student Management System
        </footer>
      </main>

      {/* Add and edit student modal */}
      {showForm && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <div>
                <h2>{editingId ? 'Edit Student' : 'Add New Student'}</h2>
                <p>Enter the student details below.</p>
              </div>

              <button
                className="close-button"
                onClick={() => setShowForm(false)}
              >
                ×
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <label>
                Full Name
                <input
                  type="text"
                  name="name"
                  placeholder="Enter student name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </label>

              <label>
                Email Address
                <input
                  type="email"
                  name="email"
                  placeholder="Enter email address"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </label>

              <label>
                Course
                <input
                  type="text"
                  name="course"
                  placeholder="e.g. MCA"
                  value={formData.course}
                  onChange={handleChange}
                />
              </label>

              <label>
                Phone Number
                <input
                  type="tel"
                  name="phone"
                  placeholder="Enter phone number"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </label>

              <div className="modal-actions">
                <button
                  type="button"
                  className="cancel-button"
                  onClick={() => setShowForm(false)}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="primary-button"
                  disabled={saving}
                >
                  {saving
                    ? 'Saving...'
                    : editingId
                      ? 'Update Student'
                      : 'Save Student'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default App