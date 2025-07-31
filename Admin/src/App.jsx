import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/login';
import DashboardPage from './pages/dashboard';
import RequireAuth from './components/auth';
import ItemManagement from './pages/ItemManagement';
import OrderListPage from './pages/order';
import Blog from './pages/Blog';
import EnquiryListPage from './pages/enquiry';
import Gallery from './pages/Gallery';
import NotFoundPage from './components/NotFoundPage';
import RegistrationForm from './pages/RegistrationForm';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegistrationForm />} />
        <Route path="/dashboard" element={<RequireAuth><DashboardPage /></RequireAuth>} />
        <Route path="/management" element={<RequireAuth><ItemManagement /></RequireAuth>} />
        <Route path="/orders" element={<RequireAuth><OrderListPage /></RequireAuth>} />
        <Route path="/blog" element={<RequireAuth><Blog /></RequireAuth>} />
        <Route path="/gallery" element={<RequireAuth><Gallery /></RequireAuth>} />
        <Route path="/enquiry" element={<RequireAuth><EnquiryListPage /></RequireAuth>} />
        
        {/* 404 Not Found */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}
export default App;
