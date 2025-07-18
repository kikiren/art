export default function HomePage() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Hero Section */}
      <section className="text-center px-6 py-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Your Journey, Your Story
        </h1>
        <p className="text-lg mb-6">
          Turn your unforgettable road trip into a beautiful map print.
        </p>
        <a
          href="/builder"
          className="inline-block bg-black text-white px-6 py-3 rounded-full text-lg hover:bg-gray-800 transition"
        >
          Create Your Own Map
        </a>
      </section>

      {/* Example Maps Section */}
      <section className="px-6 py-10 grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
        <img
          src="/examples/map1.jpg"
          alt="Road trip map example"
          className="rounded-2xl shadow-md"
        />
        <img
          src="/examples/map2.jpg"
          alt="Another road trip map"
          className="rounded-2xl shadow-md"
        />
      </section>

      {/* Video Demo Section */}
      <section className="px-6 py-16 bg-gray-100 text-center">
        <h2 className="text-3xl font-semibold mb-6">Watch the Map Builder in Action</h2>
        <div className="aspect-w-16 aspect-h-9 mx-auto max-w-4xl rounded-xl overflow-hidden shadow-lg">
          <iframe
            src="https://www.youtube.com/embed/your-video-id"
            title="Map Builder Demo"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full"
          ></iframe>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="text-center py-10">
        <a
          href="/builder"
          className="inline-block bg-black text-white px-6 py-3 rounded-full text-lg hover:bg-gray-800 transition"
        >
          Start Creating Your Map
        </a>
      </section>
    </div>
  );
}
