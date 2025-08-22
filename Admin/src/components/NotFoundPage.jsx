import { useNavigate } from 'react-router-dom';

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen w-screen flex bg-white">

      <main className="flex-1 my-auto p-4 sm:p-6 md:p-8 overflow-x-hidden">
        <div className="flex-grow flex items-center justify-center px-4">
        <div className="text-center">
          <h1 className="text-7xl font-bold text-green-600 mb-4">404</h1>
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">Page Not Found</h2>
          <p className="text-gray-600 mb-6">The page you’re looking for doesn’t exist.</p>
          <button
            onClick={() => navigate('/dashboard')}
            className="bg-green-600 text-white px-6 py-3 rounded-md hover:bg-green-700 transition"
          >
            Go to Dashboard
          </button>
        </div>
      </div>
      </main>
    </div>
  );
};

export default NotFoundPage;
