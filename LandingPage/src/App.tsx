import { Toaster } from "@/components/UI/toaster";
import { TooltipProvider } from "@/components/UI/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Blog from "./components/Blog/BlogList";
import ArticleDetail from "./components/Blog/ArticleDetail";

import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Work from "./pages/Work";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/Contact";
import Custom from "./pages/Custom";
import NeonCustom from "./pages/NeonCustom";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />

      <BrowserRouter>
        <Navbar />

        <main className="min-h-screen">
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/work" element={<Work />} />
            <Route path="/NeonCustom" element={<NeonCustom />} />
            <Route path="/custom" element={<Custom />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:id" element={<ArticleDetail />} />
            <Route path="/contact-us" element={<ContactUs />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>

        <Footer />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
