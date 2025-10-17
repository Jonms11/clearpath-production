export default function HomePage() {
  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Never Lose Track of a Job Application Again
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            ClearPath automatically tracks your job applications across LinkedIn, Indeed, 
            Glassdoor, and more. Get organized, stay informed, land your dream job.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="#install"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors"
            >
              Install Chrome Extension
            </a>
            
            <a
              href="/dashboard"
              className="border-2 border-blue-600 text-blue-600 hover:bg-blue-50 px-8 py-4 rounded-lg font-semibold text-lg transition-colors"
            >
              View Dashboard Demo
            </a>
          </div>
        </div>
      </div>
      
      <div id="install" className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            Get Started in 2 Minutes
          </h2>
          
          <div className="bg-white rounded-lg p-8 shadow-sm">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Chrome Extension</h3>
            <p className="text-gray-600 mb-6">
              Available for Chrome. Firefox and Safari coming soon!
            </p>
            
            <a
              href="https://chrome.google.com/webstore"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              Install from Chrome Web Store
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
