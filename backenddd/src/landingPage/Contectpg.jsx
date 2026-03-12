export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-20">
      <div className="max-w-4xl w-full bg-white rounded-2xl shadow-lg p-10 border border-gray-200">
        
        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 text-center">
          Contact
        </h1>
        
        {/* Description */}
        <p className="text-lg md:text-xl text-gray-700 leading-relaxed space-y-4">
          I’m a first-year college student and the creator of this app, built to help students find the right partners to study, build, and grow together 🎓🤝
        </p>
        <p className="text-lg md:text-xl text-gray-700 leading-relaxed space-y-4 mt-4">
          This app is all about connecting students who want to collaborate and support each other.
        </p>
        <p className="text-lg md:text-xl text-gray-700 leading-relaxed mt-4">
          If you have any questions or spot a bug, feel free to email me at <a href="mailto:natichere77@gmail.com" className="text-blue-500 underline hover:text-blue-700">natichere77@gmail.com</a>.
        </p>
      </div>
    </div>
  );
}