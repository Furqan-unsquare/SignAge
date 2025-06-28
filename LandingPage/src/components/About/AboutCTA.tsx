import { useNavigate } from "react-router-dom";

const ContentHub = () => {
  const navigate = useNavigate();

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
      }
    ]
  };

  return (
    <section className="py-20 bg-gradient-to-r from-[#EA3C1F] via-[#F26742] to-[#EB3C20]">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-extrabold text-[#FDCA07] mb-2">
            Success Stories
          </h2>
          <p className="text-white/90 text-lg max-w-xl mx-auto">
            Real impact. Real businesses. See how our solutions transformed brands.
          </p>
        </div>

        {/* Content Cards */}
        <div className="grid md:grid-cols-2 gap-8 mb-20">
          {content.caseStudies.map((item) => (
            <div
              key={item.id}
              className="bg-white/10 backdrop-blur-lg rounded-xl overflow-hidden border border-white/10 hover:border-[#FDCA07] transition-all duration-300 shadow-lg"
            >
              <div className="h-60 w-full overflow-hidden relative">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>
              <div className="p-6 space-y-2">
                <h3 className="text-xl font-bold text-white">{item.title}</h3>
                <p className="text-[#FDCA07] font-medium">{item.client}</p>
                <p className="text-white/80 text-sm">{item.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="bg-[#FDCA07] rounded-2xl p-10 md:p-14 text-center shadow-xl relative overflow-hidden">
          <div className="absolute -top-12 -right-12 w-32 h-32 bg-[#EA3C1F] rounded-full opacity-10"></div>
          <div className="absolute -bottom-12 -left-12 w-32 h-32 bg-[#EA3C1F] rounded-full opacity-10"></div>

          <div className="relative z-10">
            <h3 className="text-2xl md:text-4xl font-bold text-[#EA3C1F] mb-4">
              Ready to start your success story?
            </h3>
            <p className="text-[#EA3C1F]/90 text-base md:text-lg mb-6">
              Let’s build something amazing for your business.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button
                onClick={() => navigate("/custom#customize")}
                className="px-6 py-3 bg-[#EA3C1F] text-white font-bold rounded-lg hover:bg-[#c4321a] transition"
              >
                Start Designing
              </button>
              <button
                onClick={() => navigate("/blog")}
                className="px-6 py-3 bg-white text-[#EA3C1F] font-bold rounded-lg hover:bg-gray-100 transition"
              >
                View Case Studies
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContentHub;
