export default function AboutUs() {
  return (
    <section className="bg-white px-6 py-20 max-w-4xl mx-auto text-gray-900">
      <h2 className="text-3xl font-bold mb-6 text-center">About Us</h2>

      <div className="text-lg leading-relaxed space-y-6">
        <p>
          Hi, we're James and Kiki — partners in life, road trips, and now this little business.
        </p>
        <p>
          Over the past few years, we've taken countless drives together: across national parks, along wild coastlines, through small towns we'd never heard of. Some trips were carefully planned, others totally spontaneous. But each one left us with memories we never wanted to forget.
        </p>
        <p>
          <strong>Art of the Road Trip</strong> started as a personal project — just a way to remember the paths we'd taken. But when friends started asking for custom maps of their own adventures, we realized this idea could matter to others, too.
        </p>
        <p>
          Now, we help people like you turn your travels into beautiful, print-ready keepsakes — the kind you'll actually want to hang on your wall. Designed with intention. Built with love.
        </p>
        <p>
          Thanks for being here. We hope our little corner of the internet inspires your next adventure — or helps you remember a great one.
        </p>
      </div>

      {/* Timeline */}
      <div className="mt-16">
        <h3 className="text-2xl font-semibold mb-8 text-center">Our Journey</h3>
        <div className="space-y-12 border-l-2 border-gray-300 pl-6">
          <div className="relative">
            <div className="absolute -left-8 top-0 w-4 h-4 bg-blue-500 rounded-full border-2 border-white shadow-md"></div>
            <h4 className="text-xl font-medium mb-4">2021</h4>
            <p className="text-gray-700 mb-4">Our first road trip together — a loop through the Southwest in a rented campervan.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div className="relative overflow-hidden rounded-lg shadow-md">
                <img 
                  src="/images/van-camping.jpg" 
                  alt="James and Kiki camping in their converted minivan in the desert" 
                  className="w-full h-48 object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-20"></div>
              </div>
              <div className="relative overflow-hidden rounded-lg shadow-md">
                <img 
                  src="/images/desert-portrait.jpg" 
                  alt="James and Kiki smiling on red rock formation in desert landscape" 
                  className="w-full h-48 object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-20"></div>
              </div>
            </div>
          </div>
          
          <div className="relative">
            <div className="absolute -left-8 top-0 w-4 h-4 bg-orange-500 rounded-full border-2 border-white shadow-md"></div>
            <h4 className="text-xl font-medium mb-4">2023</h4>
            <p className="text-gray-700 mb-4">We built our first custom map to remember a trip from Oregon to Yellowstone — and shared it with friends.</p>
            <div className="mt-4">
              <div className="relative overflow-hidden rounded-lg shadow-md">
                <img 
                  src="/images/road-trip-map.jpg" 
                  alt="Map showing James and Kiki's road trips across the United States with color-coded routes" 
                  className="w-full h-64 object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-20"></div>
              </div>
            </div>
          </div>
          
          <div className="relative">
            <div className="absolute -left-8 top-0 w-4 h-4 bg-green-500 rounded-full border-2 border-white shadow-md"></div>
            <h4 className="text-xl font-medium mb-4">2025</h4>
            <p className="text-gray-700 mb-4">We launched <strong>Art of the Road Trip</strong> to help others turn their adventures into art.</p>
            <div className="mt-4">
              <div className="relative overflow-hidden rounded-lg shadow-md">
                <img 
                  src="/images/van-working.jpg" 
                  alt="Kiki working on laptop in the converted van interior" 
                  className="w-full h-64 object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-20"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

  
  