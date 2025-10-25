import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function About() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <div className="bg-gradient-to-r from-pink-100 to-purple-100 py-12 px-4">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              About Sweet Delights
            </h1>
            <p className="text-lg text-gray-700">
              Crafting delicious memories since 2020
            </p>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 py-16">
          <div className="prose prose-lg">
            <p className="text-gray-700 mb-6">
              Welcome to Sweet Delights, your premier destination for handcrafted, artisanal cakes that make every occasion special. Founded in 2020, we have been dedicated to bringing joy and sweetness to our community through our delicious creations.
            </p>
            
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Our Story</h2>
            <p className="text-gray-700 mb-6">
              What started as a passion for baking in a small home kitchen has grown into a thriving cake shop serving hundreds of happy customers. Our founder, inspired by family recipes and a love for creating beautiful desserts, set out to make high-quality, custom cakes accessible to everyone.
            </p>

            <h2 className="text-2xl font-bold text-gray-800 mb-4">Our Promise</h2>
            <p className="text-gray-700 mb-6">
              We use only the finest ingredients, from premium Belgian chocolate to fresh, locally-sourced dairy products. Every cake is made to order, ensuring maximum freshness and quality. Our team of skilled bakers and decorators work tirelessly to bring your vision to life, whether it's a simple birthday cake or an elaborate wedding centerpiece.
            </p>

            <h2 className="text-2xl font-bold text-gray-800 mb-4">Why Choose Us</h2>
            <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2">
              <li>100% made-to-order cakes using premium ingredients</li>
              <li>Extensive customization options for every occasion</li>
              <li>Expert bakers with years of experience</li>
              <li>Flexible delivery and pickup options</li>
              <li>Commitment to customer satisfaction</li>
            </ul>

            <p className="text-gray-700">
              Thank you for choosing Sweet Delights. We look forward to being part of your special moments!
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
