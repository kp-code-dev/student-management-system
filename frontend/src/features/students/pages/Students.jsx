import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  getAllStudents,
  createStudent,
  updateStudent,
  deleteStudent,
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
  const [selectedCourse, setSelectedCourse] = useState("all");
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

  const handleOpenAdd = () => {
    setEditingStudent(null);
    setFormData(initialForm);
    setFormError("");
    setShowModal(true);
  };

  const handleOpenEdit = (student) => {
    setEditingStudent(student);
    setFormData({
      name: student.name || "",
      email: student.email || "",
      course: student.course || "",
      phone: student.phone || "",
    });
    setFormError("");
    setShowModal(true);
  };

  const handleDelete = async (student) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete ${student.name}?`
    );
    if (!confirmed) return;

    try {
      await deleteStudent(student.id);
      toast.success(`Student "${student.name}" deleted successfully!`);
      await fetchStudents();
    } catch (err) {
      toast.error(err.message || "Unable to delete student.");
    }
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
        toast.success(`Student "${studentData.name}" updated successfully!`);
      } else {
        await createStudent(studentData);
        toast.success(`Student "${studentData.name}" added successfully!`);
      }

      setFormData(initialForm);
      setEditingStudent(null);
      setShowModal(false);
      await fetchStudents();
    } catch (err) {
      setFormError(err.message || "Unable to save student.");
      toast.error(err.message || "Unable to save student.");
    } finally {
      setSaving(false);
    }
  };

  const coursesList = Array.from(
    new Set(students.map((s) => s.course?.trim()).filter(Boolean))
  );

  const filteredStudents = students.filter((student) => {
    const matchesSearch = `${student.name} ${student.email} ${student.course} ${student.phone} ${student.id}`
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCourse =
      selectedCourse === "all" ||
      student.course?.trim().toLowerCase() === selectedCourse.toLowerCase();

    return matchesSearch && matchesCourse;
  });

  return (
    <div className="space-y-6">
      {/* 1. Header Section (Executive Spatial Acrylic Bar) */}
      <section className="frosted-panel relative flex flex-col justify-between gap-4 overflow-hidden rounded-3xl p-6 lg:flex-row lg:items-center">
        <div className="pointer-events-none absolute -bottom-10 -right-10 h-64 w-64 rounded-full bg-indigo-500/10 blur-3xl" />

        <div className="flex flex-col">
          <div className="mb-1 flex items-center gap-2">
            <span className="font-mono text-[11px] font-semibold uppercase tracking-widest text-[#7bd0ff]">
              Registry Dept
            </span>
            <span className="h-1.5 w-1.5 rounded-full bg-[#7bd0ff] shadow-[0_0_8px_#7bd0ff]" />
            <span className="rounded-full border border-white/[0.08] bg-white/[0.05] px-2 py-0.5 font-mono text-[11px] text-slate-400">
              {students.length} Records
            </span>
          </div>

          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-white">
            Students Directory
          </h1>

          <p className="mt-1 text-[13px] text-slate-300">
            Manage matriculated student records, course enrollments, and academic details.
          </p>
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          <button
            onClick={handleOpenAdd}
            type="button"
            className="group relative inline-flex cursor-pointer items-center gap-2 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 px-5 py-2.5 text-[13px] font-bold text-slate-950 shadow-[0_0_25px_rgba(245,158,11,0.45)] transition-all hover:scale-105 hover:shadow-[0_0_35px_rgba(245,158,11,0.7)] active:scale-95"
          >
            <span className="material-symbols-outlined font-bold text-[18px] transition-transform group-hover:rotate-90">
              person_add
            </span>
            <span>+ Add Student</span>
          </button>
        </div>
      </section>

      {/* 2. Top Metric Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="frosted-panel rounded-2xl p-4 flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-cyan-500/15 border border-cyan-400/30 text-cyan-300 flex items-center justify-center">
            <span className="material-symbols-outlined text-[20px]">group</span>
          </div>
          <div>
            <div className="font-mono text-[10px] uppercase tracking-wider text-slate-400">Total Enrolled</div>
            <div className="text-xl font-bold text-white">{students.length}</div>
          </div>
        </div>

        <div className="frosted-panel rounded-2xl p-4 flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-indigo-500/15 border border-indigo-400/30 text-indigo-300 flex items-center justify-center">
            <span className="material-symbols-outlined text-[20px]">menu_book</span>
          </div>
          <div>
            <div className="font-mono text-[10px] uppercase tracking-wider text-slate-400">Total Courses</div>
            <div className="text-xl font-bold text-white">{coursesList.length}</div>
          </div>
        </div>

        <div className="frosted-panel rounded-2xl p-4 flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-emerald-500/15 border border-emerald-400/30 text-emerald-300 flex items-center justify-center">
            <span className="material-symbols-outlined text-[20px]">verified</span>
          </div>
          <div>
            <div className="font-mono text-[10px] uppercase tracking-wider text-slate-400">Registry Status</div>
            <div className="text-xl font-bold text-emerald-300">Synchronized</div>
          </div>
        </div>

        <div className="frosted-panel rounded-2xl p-4 flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-amber-500/15 border border-amber-400/30 text-amber-300 flex items-center justify-center">
            <span className="material-symbols-outlined text-[20px]">filter_list</span>
          </div>
          <div>
            <div className="font-mono text-[10px] uppercase tracking-wider text-slate-400">Matching Results</div>
            <div className="text-xl font-bold text-white">{filteredStudents.length}</div>
          </div>
        </div>
      </div>

      {/* 3. Search and Course Filter Bar */}
      <section className="frosted-panel flex flex-col sm:flex-row items-center justify-between gap-4 rounded-2xl p-4">
        <div className="relative w-full sm:max-w-md">
          <span className="material-symbols-outlined pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-[18px]">
            search
          </span>
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, email, course or ID..."
            className="w-full rounded-full border border-white/10 bg-white/[0.05] py-2 pl-10 pr-4 text-xs text-white placeholder:text-slate-400 outline-none focus:border-cyan-400/50 focus:bg-white/[0.08]"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <span className="font-mono text-xs text-slate-400 shrink-0">Filter Course:</span>
          <select
            value={selectedCourse}
            onChange={(e) => setSelectedCourse(e.target.value)}
            className="rounded-full border border-white/10 bg-[#1c1f29] px-4 py-2 text-xs text-white outline-none cursor-pointer"
          >
            <option value="all">All Courses</option>
            {coursesList.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
      </section>

      {/* 4. Glass Table */}
      <section className="frosted-panel relative overflow-hidden rounded-3xl p-5 md:p-6">
        {loading ? (
          <p className="py-16 text-center text-xs text-slate-400">
            Fetching student registry...
          </p>
        ) : error ? (
          <div className="py-12 text-center text-xs text-red-400">
            {error}
          </div>
        ) : filteredStudents.length === 0 ? (
          <div className="py-16 text-center text-slate-400">
            <span className="material-symbols-outlined text-4xl text-slate-500 mb-2">person_off</span>
            <p className="text-sm font-semibold text-slate-300">No students found</p>
            <p className="text-xs text-slate-500 mt-1">Try adjusting your search criteria or add a new student.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[700px] text-left border-collapse">
              <thead>
                <tr className="border-b border-white/[0.08] bg-white/[0.02] font-mono text-[11px] uppercase tracking-wider text-slate-400">
                  <th className="py-3.5 pl-4 pr-3 font-semibold">Student</th>
                  <th className="py-3.5 px-3 font-semibold">Student ID</th>
                  <th className="py-3.5 px-3 font-semibold">Course</th>
                  <th className="py-3.5 px-3 font-semibold">Phone</th>
                  <th className="py-3.5 pr-4 pl-3 font-semibold text-right">Actions</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-white/[0.04] text-xs">
                {filteredStudents.map((student) => {
                  const initials = student.name
                    ? student.name
                        .split(" ")
                        .map((n) => n[0])
                        .slice(0, 2)
                        .join("")
                        .toUpperCase()
                    : "ST";

                  return (
                    <tr
                      key={student.id}
                      className="group transition-colors hover:bg-white/[0.04]"
                    >
                      <td className="py-3.5 pl-4 pr-3">
                        <div className="flex items-center gap-3">
                          <div className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#8083ff] to-[#7bd0ff] text-xs font-bold text-[#0a0e17] shadow-md">
                            {initials}
                            <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-[#7bd0ff] shadow-[0_0_6px_#7bd0ff]" />
                          </div>
                          <div className="flex flex-col min-w-0">
                            <span className="font-semibold text-white transition-colors group-hover:text-[#7bd0ff]">
                              {student.name}
                            </span>
                            <span className="font-mono text-[11px] text-slate-400">
                              {student.email}
                            </span>
                          </div>
                        </div>
                      </td>

                      <td className="py-3.5 px-3">
                        <span className="rounded border border-white/10 bg-[#0a0e17]/80 px-2.5 py-1 font-mono text-xs font-semibold text-[#7bd0ff]">
                          #{student.id}
                        </span>
                      </td>

                      <td className="py-3.5 px-3">
                        <div className="flex items-center gap-1.5 text-slate-200">
                          <span className="material-symbols-outlined text-[16px] text-[#c0c1ff]">
                            terminal
                          </span>
                          <span className="font-medium">
                            {student.course || "General"}
                          </span>
                        </div>
                      </td>

                      <td className="py-3.5 px-3 font-mono text-slate-400">
                        {student.phone || "—"}
                      </td>

                      <td className="py-3.5 pr-4 pl-3 text-right">
                        <div className="inline-flex items-center gap-1.5">
                          <button
                            onClick={() => handleOpenEdit(student)}
                            title="Edit Student"
                            className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04] text-slate-300 transition hover:bg-cyan-500/20 hover:text-cyan-300"
                          >
                            <span className="material-symbols-outlined text-[16px]">
                              edit
                            </span>
                          </button>
                          <button
                            onClick={() => handleDelete(student)}
                            title="Delete Student"
                            className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04] text-slate-300 transition hover:bg-red-500/20 hover:text-red-400"
                          >
                            <span className="material-symbols-outlined text-[16px]">
                              delete
                            </span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {/* 5. Aether Glass Dialog / Modal for Add & Edit */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0a0e17]/75 p-4 backdrop-blur-md overflow-y-auto">
          <div className="relative w-full max-w-lg rounded-2xl border border-white/20 bg-[#1c1f29]/90 p-6 shadow-2xl backdrop-blur-2xl">
            {/* Top specular glow */}
            <div className="pointer-events-none absolute -top-16 -right-16 h-48 w-48 rounded-full bg-gradient-to-br from-[#8083ff]/30 to-[#7bd0ff]/20 blur-2xl" />

            <div className="flex items-start justify-between border-b border-white/10 pb-4">
              <div>
                <div className="inline-flex items-center gap-1.5 rounded-full border border-[#8083ff]/30 bg-[#8083ff]/20 px-2 py-0.5 font-mono text-[10px] text-[#c0c1ff]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#8083ff] animate-ping" />
                  <span>StudentFormDialog</span>
                </div>
                <h2 className="mt-1.5 text-xl font-bold tracking-tight text-white">
                  {editingStudent ? "Edit Student Record" : "Add New Student"}
                </h2>
                <p className="text-xs text-slate-400">
                  Enter student matriculation details for the academic registry.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/[0.05] text-slate-400 hover:bg-white/10 hover:text-white transition"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>

            <form onSubmit={handleSubmit} className="mt-5 space-y-4">
              <div className="space-y-1">
                <label className="font-mono text-[11px] uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[14px] text-[#7bd0ff]">badge</span>
                  Full Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="e.g. Aarav Sharma"
                  required
                  className="w-full rounded-xl border border-white/15 bg-[#0a0e17]/80 px-4 py-2.5 text-xs text-white placeholder:text-slate-500 outline-none focus:border-[#7bd0ff] focus:ring-1 focus:ring-[#7bd0ff]/40"
                />
              </div>

              <div className="space-y-1">
                <label className="font-mono text-[11px] uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[14px] text-[#c0c1ff]">alternate_email</span>
                  Institutional Email *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="student@studenthub.ac"
                  required
                  className="w-full rounded-xl border border-white/15 bg-[#0a0e17]/80 px-4 py-2.5 text-xs text-white placeholder:text-slate-500 outline-none focus:border-[#7bd0ff] focus:ring-1 focus:ring-[#7bd0ff]/40"
                />
              </div>

              <div className="space-y-1">
                <label className="font-mono text-[11px] uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[14px] text-[#7bd0ff]">menu_book</span>
                  Course Program
                </label>
                <input
                  type="text"
                  name="course"
                  value={formData.course}
                  onChange={handleInputChange}
                  placeholder="e.g. Computer Science, MCA, Data Science"
                  className="w-full rounded-xl border border-white/15 bg-[#0a0e17]/80 px-4 py-2.5 text-xs text-white placeholder:text-slate-500 outline-none focus:border-[#7bd0ff] focus:ring-1 focus:ring-[#7bd0ff]/40"
                />
              </div>

              <div className="space-y-1">
                <label className="font-mono text-[11px] uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[14px] text-[#c0c1ff]">call</span>
                  Contact Phone
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="+1 (555) 000-0000"
                  className="w-full rounded-xl border border-white/15 bg-[#0a0e17]/80 px-4 py-2.5 text-xs text-white placeholder:text-slate-500 outline-none focus:border-[#7bd0ff] focus:ring-1 focus:ring-[#7bd0ff]/40"
                />
              </div>

              {formError && (
                <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-xs text-red-300 flex items-center gap-2">
                  <span className="material-symbols-outlined text-base text-red-400">error</span>
                  <span>{formError}</span>
                </div>
              )}

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="rounded-full border border-white/15 px-5 py-2 text-xs font-semibold text-slate-300 hover:bg-white/10 hover:text-white transition"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={saving}
                  className="rounded-full bg-gradient-to-r from-amber-500 to-orange-500 px-6 py-2 text-xs font-bold text-slate-950 shadow-[0_0_20px_rgba(245,158,11,0.4)] hover:shadow-[0_0_30px_rgba(245,158,11,0.6)] active:scale-95 transition disabled:opacity-60"
                >
                  {saving
                    ? "Saving..."
                    : editingStudent
                    ? "Update Student"
                    : "Save Student"}
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
