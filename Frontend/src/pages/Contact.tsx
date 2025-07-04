import ContactHero from '@/components/Contact/ContactHero';
import ContactMethods from '@/components/Home/ContactMethods';
import ContactCTA from '@/components/Home/ContactCTA';
import { Helmet } from 'react-helmet';

const Contact = () => {
    return (
        <>
        <Helmet>
        <title>Contact Us | Start Your Custom Order Today</title>
        <meta name="description" content="Welcome to YourBrand. Discover custom t-shirts, bags, caps, and more." />
        <link rel="canonical" href="https://yourdomain.com/" />
        </Helmet>

        <div className="bg-[#E63025]">
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