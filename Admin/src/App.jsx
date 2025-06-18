import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/login';
import DashboardPage from './pages/dashboard';
import RequireAuth from './component/auth';
import PricingPage from './pages/Pricing';
import OrderListPage from './pages/order';

import EnquiryListPage from './pages/enquiry';



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<RequireAuth><DashboardPage /></RequireAuth>} />
        <Route path="/pricing" element={<RequireAuth><PricingPage /></RequireAuth>} />
        <Route path="/order" element={<RequireAuth><OrderListPage /></RequireAuth>} />
        <Route path="/enquiry" element={<RequireAuth><EnquiryListPage /></RequireAuth>} />

        {/* other routes */}
      </Routes>
    </Router>
  );
}
export default App;
