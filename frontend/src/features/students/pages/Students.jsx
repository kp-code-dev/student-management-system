
import { useEffect, useState } from "react";
import {
  FiUsers,
  FiPlus,
  FiSearch,
  FiX,
} from "react-icons/fi";

import PageHeader from "@/components/shared/PageHeader";

import {
  getAllStudents,
  createStudent,
  updateStudent,
  deleteStudent
} from "@/features/students/studentService";

const initialForm = {
  name: "",
  email: "",
  course: "",
  phone: "",
};

function Students() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);
  const [formData, setFormData] = useState(initialForm);
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState("");

  const fetchStudents = async () => {
    try {
      setError("");
      const data = await getAllStudents();
      setStudents(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err.message || "Unable to load students.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleEdit = (student) => {
  setEditingStudent(student);

  setFormData({
    name: student.name || "",
    email: student.email || "",
    course: student.course || "",
    phone: student.phone || "",
  });

  setFormError("");
  setShowModal(true);
  
  const handleDelete = async (student) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete ${student.name}?`
    );

    if (!confirmed) return;

    try {
      await deleteStudent(student.id);
      await fetchStudents();
    } catch (err) {
      alert(err.message || "Unable to delete student.");
    }
  };
};

  
   const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError("");
    
    if (!formData.name.trim() || !formData.email.trim()) {
        setFormError("Name and email are required.");
        return;
    }
    
    const studentData = {
        name: formData.name.trim(),
        email: formData.email.trim(),
        course: formData.course.trim(),
        phone: formData.phone.trim(),
    };
    
    try {
        setSaving(true);
        
        if (editingStudent) {
            await updateStudent(editingStudent.id, studentData);
        } else {
            await createStudent(studentData);
        }

        setFormData(initialForm);
        setEditingStudent(null);
        setShowModal(false);

        await fetchStudents();
        } catch (err) {
            setFormError(err.message || "Unable to save student.");
        } finally {
            setSaving(false);
        }
    };


  const filteredStudents = students.filter((student) =>
    `${student.name} ${student.email} ${student.course} ${student.phone}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="space-y-7">
      <PageHeader
        title="Students"
        description="Manage and view all registered students."
        action={
          <button
            onClick={() => {
                setEditingStudent(null);
                setFormData(initialForm);
                setFormError("");
                setShowModal(true);
            }}
            className="flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
          >
            <FiPlus size={17} />
            Add Student
          </button>
        }
      />

      <section className="rounded-2xl border border-white/80 bg-white/75 p-5 shadow-sm backdrop-blur-xl">
        <div className="mb-5 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <FiUsers className="text-blue-600" size={20} />
            <h2 className="font-bold text-slate-800">
              All Students ({students.length})
            </h2>
          </div>

          <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3">
            <FiSearch className="text-slate-400" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search students..."
              className="h-10 w-52 bg-transparent text-sm outline-none"
            />
          </div>
        </div>

        {loading ? (
          <p className="py-10 text-center text-slate-500">
            Loading students...
          </p>
        ) : error ? (
          <p className="py-10 text-center text-red-500">
            {error}
          </p>
        ) : filteredStudents.length === 0 ? (
          <p className="py-10 text-center text-slate-500">
            No students found.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[650px] text-left">
              <thead>
                <tr className="border-b border-slate-100 text-xs text-slate-400">
                  <th className="p-3">Student</th>
                  <th className="p-3">Email</th>
                  <th className="p-3">Course</th>
                  <th className="p-3">Phone</th>
                  <th className="p-3 text-center">Actions</th>
                </tr>
              </thead>

              <tbody>
                {filteredStudents.map((student) => (
                  <tr
                    key={student.id}
                    className="border-b border-slate-50 last:border-0 hover:bg-slate-50/70"
                  >
                    <td className="p-3">
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-100 font-bold text-blue-700">
                          {student.name?.charAt(0)?.toUpperCase()}
                        </div>
                        <span className="text-sm font-semibold text-slate-800">
                          {student.name}
                        </span>
                      </div>
                    </td>

                    <td className="p-3 text-sm text-slate-600">
                      {student.email}
                    </td>

                    <td className="p-3 text-sm text-slate-600">
                      {student.course || "—"}
                    </td>

                    <td className="p-3 text-sm text-slate-600">
                      {student.phone || "—"}
                    </td>

                    <td className="p-3">
                    <div className="flex items-center justify-center gap-2">
                        <button
                            onClick={() => handleEdit(student)}
                            className="rounded-lg bg-blue-50 px-3 py-2 text-xs font-semibold text-blue-600 hover:bg-blue-100"
                            >
                            Edit
                        </button>

                        <button
                            onClick={() => handleDelete(student)}
                            className="rounded-lg bg-red-50 px-3 py-2 text-xs font-semibold text-red-600 hover:bg-red-100"
                            >
                            Delete
                        </button>
                    </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {/* Add Student Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-2xl border border-white/70 bg-white p-6 shadow-2xl">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-slate-800">
                    {editingStudent ? "Edit Student" : "Add New Student"}
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  Enter student information below.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100"
              >
                <FiX size={21} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Student Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter full name"
                  required
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="student@example.com"
                  required
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Course
                </label>
                <input
                  type="text"
                  name="course"
                  value={formData.course}
                  onChange={handleInputChange}
                  placeholder="e.g. MCA"
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="Enter phone number"
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              {formError && (
                <p className="rounded-lg bg-red-50 p-3 text-sm text-red-600">
                  {formError}
                </p>
              )}

              <div className="flex justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-600 hover:bg-slate-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={saving}
                  className="rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {saving ? "Saving..." : editingStudent ? "Update Student" : "Save Student"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Students;
