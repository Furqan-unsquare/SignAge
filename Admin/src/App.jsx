import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/Login';
import DashboardPage from './pages/Dashboard';
import RequireAuth from './component/auth';
import PricingPage from './pages/Pricing';
import OrderListPage from './pages/Order';

import EnquiryListPage from './pages/Enquiry';
import AdminGallery from './pages/AdminGallery';
import NotFoundPage from './component/NotFoundPage';



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<RequireAuth><DashboardPage /></RequireAuth>} />
        <Route path="/pricing" element={<RequireAuth><PricingPage /></RequireAuth>} />
        <Route path="/orders" element={<RequireAuth><OrderListPage /></RequireAuth>} />
        <Route path="/galery" element={<RequireAuth><AdminGallery /></RequireAuth>} />
        <Route path="/enquiry" element={<RequireAuth><EnquiryListPage /></RequireAuth>} />
        
        {/* 404 Not Found */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}
export default App;
