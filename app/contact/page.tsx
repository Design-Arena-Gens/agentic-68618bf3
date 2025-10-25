import { Mail, Phone, MapPin } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function Contact() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <div className="bg-gradient-to-r from-pink-100 to-purple-100 py-12 px-4">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              Contact Us
            </h1>
            <p className="text-lg text-gray-700">
              We'd love to hear from you
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Get in Touch</h2>
              <p className="text-gray-700 mb-8">
                Have a question about our cakes or need help with a custom order? We're here to help! Reach out to us using any of the methods below.
              </p>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Phone className="text-pink-600" size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-1">Phone</h3>
                    <p className="text-gray-600">(555) 123-4567</p>
                    <p className="text-sm text-gray-500">Mon-Sat: 9am-6pm</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Mail className="text-pink-600" size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-1">Email</h3>
                    <p className="text-gray-600">hello@sweetdelights.com</p>
                    <p className="text-sm text-gray-500">We'll respond within 24 hours</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <MapPin className="text-pink-600" size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-1">Location</h3>
                    <p className="text-gray-600">123 Bakery Street</p>
                    <p className="text-gray-600">Sweet City, SC 12345</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <div className="bg-white rounded-lg shadow-md p-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Send us a Message</h2>
                <form className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                      Name
                    </label>
                    <input
                      id="name"
                      type="text"
                      className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                      Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-semibold text-gray-700 mb-2">
                      Subject
                    </label>
                    <input
                      id="subject"
                      type="text"
                      className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
                      Message
                    </label>
                    <textarea
                      id="message"
                      rows={5}
                      className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
                      required
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-pink-600 text-white px-6 py-3 rounded-md hover:bg-pink-700 transition-colors"
                  >
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
