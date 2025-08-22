import {NeonConfigurator} from "../components/NeonCustom/Herosection"
import { Helmet } from 'react-helmet';

export default function HomePage() {
    return (
    <>
        <Helmet>
        <title>Online Product Designer | Customize Neon Sign & More</title>
        <meta name="description" content="Welcome to YourBrand. Discover custom t-shirts, bags, caps, and more." />
        <link rel="canonical" href="https://yourdomain.com/" />
        </Helmet>
    <div className="min-h-screen">        
        <main>
            <NeonConfigurator />
        </main>        
    </div>
    </>
    )
}
