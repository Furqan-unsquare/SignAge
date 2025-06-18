import ContactHero from '@/components/Contact/ContactHero';
import ContactMethods from '@/components/Contact/ContactMethods';
import ContactCTA from '@/components/Contact/ContactCTA';

const Contact = () => {
    return (
        <div className="bg-gradient-to-r from-[#EA3C1F] via-[#F26742] to-[#EB3C20]">
            {/* Hero Section */}
            <ContactHero />

            {/* Contact Methods */}
            <ContactMethods />

            {/* Final CTA */}
            <ContactCTA />
        </div>
    );
};

export default Contact;