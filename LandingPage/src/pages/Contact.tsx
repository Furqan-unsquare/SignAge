import ContactHero from '@/components/Contact/ContactHero';
import ContactMethods from '@/components/Contact/ContactMethods';
import ContactCTA from '@/components/Contact/ContactCTA';
import { Helmet } from 'react-helmet';

const Contact = () => {
    return (
        <>
        <Helmet>
        <title>Contact Us | Start Your Custom Order Today</title>
        <meta name="description" content="Welcome to YourBrand. Discover custom t-shirts, bags, caps, and more." />
        <link rel="canonical" href="https://yourdomain.com/" />
        </Helmet>

        <div className="bg-gradient-to-r from-[#EA3C1F] via-[#F26742] to-[#EB3C20]">
            {/* Hero Section */}
            <ContactHero />

            {/* Contact Methods */}
            <ContactMethods />

            {/* Final CTA */}
            <ContactCTA />
        </div>
        </>
    );
};

export default Contact;