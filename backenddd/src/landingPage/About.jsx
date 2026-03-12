export default function About() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-20">
      <div className="max-w-4xl w-full bg-white rounded-2xl shadow-lg p-10 border border-gray-200">
        
        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 text-center">
          About This App
        </h1>
        
        {/* Description */}
        <p className="text-lg md:text-xl text-gray-700 leading-relaxed space-y-4">
          This app is a student partner finder created to help college students connect with others to study and work together.
        </p>
        <p className="text-lg md:text-xl text-gray-700 leading-relaxed space-y-4 mt-4">
          I built it because, as a quiet person, I found it difficult to find someone to study with and wanted an easier way to connect.
        </p>
        <p className="text-lg md:text-xl text-gray-700 leading-relaxed mt-4">
          The app was created by a 19-year-old college student with the goal of making collaboration simpler and more comfortable for students.
        </p>
      </div>
    </div>
  );
}