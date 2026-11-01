
import { useNavigate } from "react-router-dom";
import { FiAlertCircle, FiArrowLeft } from "react-icons/fi";

function NotFound() {
  const navigate = useNavigate();

  const handleGoBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate("/login", { replace: true });
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
      <div className="max-w-md text-center">
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-blue-50 text-blue-600">
          <FiAlertCircle size={38} />
        </div>

        <h1 className="text-7xl font-extrabold text-slate-900">
          404
        </h1>

        <h2 className="mt-4 text-2xl font-bold text-slate-800">
          Page Not Found
        </h2>

        <p className="mt-3 text-sm leading-6 text-slate-500">
          Sorry, the page you are looking for doesn't exist
          or has been moved.
        </p>

        <button
          onClick={handleGoBack}
          className="mt-7 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
        >
          <FiArrowLeft size={17} />
          Go Back
        </button>
      </div>
    </div>
  );
}

export default NotFound;
