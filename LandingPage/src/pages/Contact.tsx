import { Link } from 'react-router-dom';
import ContactHero from '@/components/contact/ContactHero';
import ContactMethods from '@/components/contact/ContactMethods';
import ContactForm from '@/components/contact/ContactForm';
import ContactCTA from '@/components/contact/ContactCTA';

const Contact = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-[#EA3C1F] via-[#F26742] to-[#EB3C20] pt-20">
            {/* Hero Section */}
            <ContactHero />

            {/* Main Content */}
            <section className="py-16">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                        {/* Contact Methods */}
                        <ContactMethods />

                        {/* Contact Form */}
                        <ContactForm />
                    </div>
                </div>
            </section>

            {/* Final CTA */}
            <ContactCTA />
        </div>
    );
};

export default Contact;