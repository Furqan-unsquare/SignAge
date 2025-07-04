import { ArrowLeft } from 'lucide-react'
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div className="min-h-screen bg-[#E63025] flex flex-col items-center justify-center p-6 text-center">
      <div className="max-w-md mx-auto">
        {/* Error Code */}
        <h1 className="text-8xl font-black text-white mb-4">404</h1>
        
        {/* Message */}
        <h2 className="text-2xl font-bold text-white mb-6">Page Not Found</h2>
        <p className="text-white/90 mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        
        {/* Home Button */}
        <Link to="/" 
          className="inline-flex items-center gap-2 bg-white text-[#EA3C1F] hover:bg-gray-100 font-medium px-6 py-3 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Return Home
        </Link>
      </div>
    </div>
  )
}

export default NotFoundPage