import { useState } from "react";
import { useNavigate } from "react-router-dom";


const ContentHub = () => {
  const [activeTab, setActiveTab] = useState<"caseStudies" | "projects" | "insights">("caseStudies");
  const navigate = useNavigate();

  // Sample data - replace with your actual content
  const content = {
    caseStudies: [
      {
        id: 1,
        title: "Local Retail Transformation",
        description: "How we helped a neighborhood boutique increase online sales by 250%",
        image: "https://i.pinimg.com/736x/92/31/70/923170f9c5aa85f25ccc40d6c5eef375.jpg",
        client: "Maple Street Boutique",
      },
      {
        id: 2,
        title: "Community Restaurant Revival",
        description: "Digital overhaul for a beloved local eatery post-pandemic",
        image: "https://i.pinimg.com/736x/6f/ae/4f/6fae4fe9fc66c7c8c186f94557ff6c42.jpg",
        client: "The Corner Bistro",
        results: ["300% online orders", "90% customer retention", "Expanded to catering"]
      }
    ],
    projects: [
      {
        id: 1,
        title: "Sustainable Packaging Initiative",
        description: "Developed eco-friendly solutions for 12 local businesses",
        image: "/packaging-project.jpg",
        categories: ["Sustainability", "Product Design"],
        partners: ["EcoPack", "Local Artisans Guild"]
      },
      {
        id: 2,
        title: "Neighborhood App Development",
        description: "Created a hyperlocal community platform connecting 50+ businesses",
        image: "/app-project.jpg",
        categories: ["Technology", "Community"],
        partners: ["City Council", "Small Business Association"]
      }
    ],
    insights: [
      {
        id: 1,
        title: "2024 Local Commerce Trends",
        description: "Key findings from our annual neighborhood business survey",
        image: "/trends-insight.jpg",
        stats: ["72% prefer shopping local", "58% want more digital options", "3.5x growth in hybrid models"]
      },
      {
        id: 2,
        title: "The Hyperlocal Advantage",
        description: "Why community-focused businesses outperform chains in customer loyalty",
        image: "/local-advantage.jpg",
        stats: ["4.8x repeat customers", "92% positive sentiment", "35% higher average spend"]
      }
    ]
  };

  return (
    <section className="pb-20 bg-gradient-to-r from-[#EA3C1F] via-[#F26742] to-[#EB3C20] ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold text-[#FDCA07] mb-4">
            Success Stories & Insights
          </h2>
          <p className="md:text-xl text-white/90 max-w-3xl mx-auto">
            Explore how we're helping local businesses thrive through innovation and community focus
          </p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex bg-white/10 backdrop-blur-sm rounded-lg p-1">
            {[
              { id: "caseStudies", label: "Client Case Studies" },
              { id: "projects", label: "Project Showcases" },
              { id: "insights", label: "Industry Insights" }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`md:px-6 py-3 rounded-md md:text-lg font-medium transition-all ${activeTab === tab.id ? 'bg-[#FDCA07] text-[#EA3C1F]' : 'text-white hover:text-[#FDCA07]'}`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {content[activeTab].map((item) => (
            <div key={item.id} className="bg-white/10 backdrop-blur-sm rounded-xl overflow-hidden border border-white/10 hover:border-[#FDCA07] transition-all duration-300">
              {/* Image Placeholder - Replace with your actual images */}
              <div className="h-64 bg-gray-800 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"><img
                className="w-full h-full object-cover" 
                src={item.image} alt="" />
                </div>
              </div>
              
              <div className="p-6">
                  <h3 className="text-lg md:text-2xl font-bold text-white">{item.title}</h3>
                  <p className="md:text-xl text-[#FDCA07]">{item.client || item.categories?.join(" • ") || `${item.stats?.length} Key Findings`}</p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="bg-[#FDCA07] rounded-xl p-8 md:p-12 text-center relative overflow-hidden">
          <div className="absolute -top-20 -right-20 w-40 h-40 bg-[#EA3C1F] rounded-full opacity-20"></div>
          <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-[#EA3C1F] rounded-full opacity-20"></div>
          
          <div className="relative z-10 max-w-3xl mx-auto">
            <h3 className="text-3xl md:text-4xl font-bold text-[#EA3C1F] mb-4">
              Ready to start your success story?
            </h3>
            <p className="text-[#EA3C1F]/90 md:text-xl mb-8">
              Let's discuss how we can help your business thrive with our local expertise and innovative solutions.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button
              onClick={() => navigate("/custom#customize")}
              className="px-8 py-4 bg-[#EA3C1F] text-white font-bold rounded-lg hover:bg-[#c53219] transition-colors">
                Start Designing 
              </button>
              <button
              onClick={() => navigate("/blog")} 
              className="px-8 py-4 bg-white text-[#EA3C1F] font-bold rounded-lg hover:bg-gray-100 transition-colors">
                View All Case Studies
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContentHub;