import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  getAllFaculty,
  createFaculty,
  updateFaculty,
  deleteFaculty,
} from "@/features/faculty/facultyService";

const initialForm = {
  name: "",
  email: "",
  facultyId: "",
  department: "",
  temporaryPassword: "",
  phone: "",
};

function Faculty() {
  const [facultyList, setFacultyList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedDept, setSelectedDept] = useState("all");
  const [error, setError] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [editingFaculty, setEditingFaculty] = useState(null);
  const [formData, setFormData] = useState(initialForm);
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState("");

  // Delete modal state
  const [facultyToDelete, setFacultyToDelete] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const fetchFaculty = async () => {
    try {
      setError("");
      const data = await getAllFaculty();
      setFacultyList(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err.message || "Unable to load faculty list.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFaculty();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleOpenAdd = () => {
    setEditingFaculty(null);
    setFormData(initialForm);
    setFormError("");
    setShowModal(true);
    console.log("Faculty Form Data:", formData);
  };

  const handleOpenEdit = (faculty) => {
    setEditingFaculty(faculty);
    setFormData({
      name: faculty.name || "",
      email: faculty.email || "",
      facultyId: faculty.facultyId || "",
      department: faculty.department || "",
      temporaryPassword: "",
      phone: faculty.phone || "",
    });
    setFormError("");
    setShowModal(true);
  };

  const handleOpenDelete = (faculty) => {
    setFacultyToDelete(faculty);
  };

  const handleConfirmDelete = async () => {
    if (!facultyToDelete) return;

    try {
      setDeleting(true);
      await deleteFaculty(facultyToDelete.id);
      toast.success(`Faculty member "${facultyToDelete.name}" removed successfully!`);
      setFacultyToDelete(null);
      await fetchFaculty();
    } catch (err) {
      toast.error(err.message || "Unable to remove faculty.");
    } finally {
      setDeleting(false);
    }
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError("");

    if (!formData.name.trim()) {
      setFormError("Full Name is required.");
      return;
    }
    if (!formData.email.trim()) {
      setFormError("Email Address is required.");
      return;
    }
    if (!formData.facultyId.trim()) {
      setFormError("Faculty ID is required.");
      return;
    }
    if (!formData.department.trim()) {
      setFormError("Department is required.");
      return;
    }

    const payload = {
      ...formData,
      temporaryPassword: formData.temporaryPassword.trim() || null,
    };

    try {
      setSaving(true);

      if (editingFaculty) {
        await updateFaculty(editingFaculty.id, payload);
        toast.success(`Faculty "${formData.name}" updated successfully!`);
      } else {
        await createFaculty(payload);
        toast.success(`New Faculty "${formData.name}" added successfully!`);
      }

      setShowModal(false);
      setFormData(initialForm);
      setEditingFaculty(null);
      await fetchFaculty();

    } catch (err) {
      setFormError(err.message || "Failed to save faculty details.");
    } finally {
      setSaving(false);
    }
  };


  // Extract unique departments for filter
  const departments = [
    ...new Set(facultyList.map((f) => f.department).filter(Boolean)),
  ];

  // Search and filter: by name, email, or facultyId
  const filteredFaculty = facultyList.filter((faculty) => {
    const q = search.toLowerCase();
    const matchesSearch =
      (faculty.name && faculty.name.toLowerCase().includes(q)) ||
      (faculty.email && faculty.email.toLowerCase().includes(q)) ||
      (faculty.facultyId && faculty.facultyId.toLowerCase().includes(q));

    const matchesDept =
      selectedDept === "all" || faculty.department === selectedDept;

    return matchesSearch && matchesDept;
  });

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header with Title and Add Button */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <span className="font-mono text-xs tracking-wider text-cyan-400 uppercase">
            Administration • Faculty Portal
          </span>
          <h1 className="mt-1 text-2xl font-bold tracking-tight text-white sm:text-3xl">
            Faculty Directory
          </h1>
          <p className="mt-1 text-sm text-slate-400">
            Register new faculty, update details, search by ID or department, and manage teaching staff.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-cyan-500 to-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-[0_0_20px_rgba(34,211,238,0.3)] transition-all duration-300 hover:from-cyan-400 hover:to-indigo-500 hover:shadow-[0_0_25px_rgba(34,211,238,0.5)] active:scale-95"
        >
          <span className="material-symbols-outlined text-lg">person_add</span>
          Add New Faculty
        </button>
      </div>

      {/* Search, Filter, and Stats Bar */}
      <div className="flex flex-col gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-4 backdrop-blur-xl sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1">
          <span className="material-symbols-outlined absolute top-1/2 left-3.5 -translate-y-1/2 text-slate-400">
            search
          </span>
          <input
            type="text"
            placeholder="Search Faculty by name, email, or Faculty ID..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border border-white/10 bg-black/30 py-2.5 pr-4 pl-10 text-sm text-white placeholder-slate-500 transition-all focus:border-cyan-400/50 focus:bg-black/50 focus:outline-none focus:ring-2 focus:ring-cyan-400/20"
          />
        </div>

        <div className="flex items-center gap-3">
          <select
            value={selectedDept}
            onChange={(e) => setSelectedDept(e.target.value)}
            className="rounded-xl border border-white/10 bg-slate-900/80 px-3.5 py-2.5 text-sm text-slate-200 focus:border-cyan-400/50 focus:outline-none"
          >
            <option value="all">All Departments</option>
            {departments.map((dept) => (
              <option key={dept} value={dept}>
                {dept}
              </option>
            ))}
          </select>

          <span className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs font-mono text-cyan-300">
            {filteredFaculty.length} Faculty
          </span>
        </div>
      </div>

      {/* Main Content / Table */}
      {error && (
        <div className="rounded-2xl border border-rose-500/20 bg-rose-500/10 p-4 text-sm text-rose-300">
          {error}
        </div>
      )}

      {loading ? (
        <div className="flex min-h-[300px] items-center justify-center rounded-3xl border border-white/10 bg-white/[0.02]">
          <div className="flex flex-col items-center gap-3">
            <span className="material-symbols-outlined animate-spin text-3xl text-cyan-400">
              progress_activity
            </span>
            <span className="text-sm font-medium text-slate-400">Loading faculty directory...</span>
          </div>
        </div>
      ) : filteredFaculty.length === 0 ? (
        <div className="flex min-h-[300px] flex-col items-center justify-center rounded-3xl border border-white/10 bg-white/[0.02] p-8 text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/5 text-slate-400">
            <span className="material-symbols-outlined text-3xl">badge</span>
          </div>
          <h3 className="mt-4 text-base font-semibold text-white">No Faculty Found</h3>
          <p className="mt-1 max-w-sm text-sm text-slate-400">
            {search || selectedDept !== "all"
              ? "No faculty members match your search criteria. Try resetting filters."
              : "Get started by adding your first faculty member."}
          </p>
          <button
            onClick={handleOpenAdd}
            className="mt-4 inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold text-white hover:bg-white/10"
          >
            <span className="material-symbols-outlined text-sm">add</span>
            Add Faculty
          </button>
        </div>
      ) : (
        <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.02] shadow-2xl backdrop-blur-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-300">
              <thead className="border-b border-white/10 bg-white/[0.03] text-xs font-medium tracking-wider text-slate-400 uppercase">
                <tr>
                  <th className="py-4 pr-4 pl-6">Faculty Member</th>
                  <th className="px-4 py-4">Faculty ID</th>
                  <th className="px-4 py-4">Department</th>
                  <th className="px-4 py-4">Contact Phone</th>
                  <th className="py-4 pr-6 pl-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 font-normal">
                {filteredFaculty.map((faculty) => (
                  <tr
                    key={faculty.id}
                    className="group transition-colors hover:bg-white/[0.04]"
                  >
                    <td className="py-4 pr-4 pl-6">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-gradient-to-br from-indigo-500/20 to-cyan-500/20 text-sm font-bold text-cyan-300">
                          {faculty.name ? faculty.name.charAt(0).toUpperCase() : "F"}
                        </div>
                        <div>
                          <div className="font-semibold text-white group-hover:text-cyan-300 transition-colors">
                            {faculty.name}
                          </div>
                          <div className="text-xs text-slate-400">{faculty.email}</div>
                        </div>
                      </div>
                    </td>

                    <td className="px-4 py-4">
                      <span className="inline-flex items-center rounded-lg border border-cyan-400/20 bg-cyan-400/10 px-2.5 py-1 font-mono text-xs font-semibold text-cyan-300">
                        {faculty.facultyId}
                      </span>
                    </td>

                    <td className="px-4 py-4">
                      <span className="inline-flex items-center rounded-lg border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-slate-300">
                        {faculty.department}
                      </span>
                    </td>

                    <td className="px-4 py-4 font-mono text-xs text-slate-400">
                      {faculty.phone || "—"}
                    </td>

                    <td className="py-4 pr-6 pl-4 text-right">
                      <div className="inline-flex items-center gap-1">
                        <button
                          onClick={() => handleOpenEdit(faculty)}
                          title="Edit Faculty Details"
                          className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-slate-300 transition-all hover:border-cyan-400/50 hover:bg-cyan-500/20 hover:text-cyan-200"
                        >
                          <span className="material-symbols-outlined text-base">edit</span>
                        </button>
                        <button
                          onClick={() => handleOpenDelete(faculty)}
                          title="Delete Faculty"
                          className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-rose-400 transition-all hover:border-rose-400/50 hover:bg-rose-500/20 hover:text-rose-200"
                        >
                          <span className="material-symbols-outlined text-base">delete</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Add / Edit Faculty Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-lg rounded-3xl border border-white/15 bg-slate-950/95 p-6 shadow-2xl backdrop-blur-2xl sm:p-8">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <h3 className="text-lg font-bold text-white">
                  {editingFaculty ? "Edit Faculty Details" : "Add New Faculty"}
                </h3>
                <p className="text-xs text-slate-400">
                  {editingFaculty
                    ? "Update faculty profile and department information."
                    : "Register new teaching faculty and optionally generate an Admin account."}
                </p>
              </div>
              <button
                onClick={() => setShowModal(false)}
                className="rounded-xl p-1 text-slate-400 hover:bg-white/10 hover:text-white"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            {formError && (
              <div className="mt-4 rounded-xl border border-rose-500/20 bg-rose-500/10 p-3 text-xs text-rose-300">
                {formError}
              </div>
            )}

            <form onSubmit={handleSubmit} className="mt-5 space-y-4">
              <div>
                <label className="block text-xs font-semibold tracking-wider text-slate-300 uppercase">
                  Full Name <span className="text-cyan-400">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="e.g. Dr. Ramesh Sharma"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="mt-1.5 w-full rounded-xl border border-white/10 bg-white/5 px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:border-cyan-400/50 focus:outline-none focus:ring-2 focus:ring-cyan-400/20"
                />
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-semibold tracking-wider text-slate-300 uppercase">
                    Faculty ID <span className="text-cyan-400">*</span>
                  </label>
                  <input
                    type="text"
                    name="facultyId"
                    placeholder="e.g. FAC-2026-001"
                    value={formData.facultyId}
                    onChange={handleInputChange}
                    required
                    className="mt-1.5 w-full rounded-xl border border-white/10 bg-white/5 px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:border-cyan-400/50 focus:outline-none focus:ring-2 focus:ring-cyan-400/20"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold tracking-wider text-slate-300 uppercase">
                    Department <span className="text-cyan-400">*</span>
                  </label>
                  <input
                    type="text"
                    name="department"
                    placeholder="e.g. Computer Applications"
                    value={formData.department}
                    onChange={handleInputChange}
                    required
                    className="mt-1.5 w-full rounded-xl border border-white/10 bg-white/5 px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:border-cyan-400/50 focus:outline-none focus:ring-2 focus:ring-cyan-400/20"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold tracking-wider text-slate-300 uppercase">
                  Email Address <span className="text-cyan-400">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="e.g. ramesh.sharma@studenthub.edu"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="mt-1.5 w-full rounded-xl border border-white/10 bg-white/5 px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:border-cyan-400/50 focus:outline-none focus:ring-2 focus:ring-cyan-400/20"
                />
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-semibold tracking-wider text-slate-300 uppercase">
                    Contact Phone
                  </label>
                  <input
                    type="text"
                    name="phone"
                    placeholder="+91 98765 43210"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="mt-1.5 w-full rounded-xl border border-white/10 bg-white/5 px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:border-cyan-400/50 focus:outline-none focus:ring-2 focus:ring-cyan-400/20"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold tracking-wider text-slate-300 uppercase">
                    Temporary Password {editingFaculty ? "(Optional)" : <span className="text-cyan-400">*</span>}
                  </label>
                  <input
                    type="password"
                    name="temporaryPassword"
                    placeholder={editingFaculty ? "Leave empty to keep unchanged" : "Min 6 characters"}
                    value={formData.temporaryPassword}
                    onChange={handleInputChange}
                    className="mt-1.5 w-full rounded-xl border border-white/10 bg-white/5 px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:border-cyan-400/50 focus:outline-none focus:ring-2 focus:ring-cyan-400/20"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="rounded-xl border border-white/10 px-4 py-2.5 text-xs font-semibold text-slate-300 hover:bg-white/5"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 px-5 py-2.5 text-xs font-semibold text-white shadow-lg shadow-cyan-500/20 transition-all hover:brightness-110 disabled:opacity-50"
                >
                  {saving && (
                    <span className="material-symbols-outlined animate-spin text-sm">
                      progress_activity
                    </span>
                  )}
                  {editingFaculty ? "Save Changes" : "Add Faculty"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {facultyToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-md rounded-3xl border border-rose-500/20 bg-slate-950/95 p-6 shadow-2xl backdrop-blur-2xl">
            <div className="flex items-center gap-3 text-rose-400">
              <span className="material-symbols-outlined text-2xl">warning</span>
              <h3 className="text-lg font-bold text-white">Delete Faculty Member</h3>
            </div>
            <p className="mt-3 text-sm text-slate-300">
              Are you sure you want to remove <span className="font-semibold text-white">"{facultyToDelete.name}"</span> ({facultyToDelete.facultyId})? This action cannot be undone.
            </p>
            <div className="mt-6 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setFacultyToDelete(null)}
                className="rounded-xl border border-white/10 px-4 py-2 text-xs font-semibold text-slate-300 hover:bg-white/5"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={deleting}
                onClick={handleConfirmDelete}
                className="inline-flex items-center gap-2 rounded-xl bg-rose-500 px-4 py-2 text-xs font-semibold text-white shadow-lg shadow-rose-500/20 hover:bg-rose-600 disabled:opacity-50"
              >
                {deleting && (
                  <span className="material-symbols-outlined animate-spin text-sm">
                    progress_activity
                  </span>
                )}
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Faculty;

