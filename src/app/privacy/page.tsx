'use client';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-sm p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Privacy Policy</h1>
          
          <div className="prose max-w-none">
            <p className="text-gray-600 mb-6">
              <strong>Last Updated:</strong> October 17, 2025
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Our Commitment to Privacy</h2>
              <p className="text-gray-600 mb-4">
                ClearPath is designed with privacy as a core principle. We believe job seekers should have full control 
                over their application data without compromising their privacy.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">What Data We Collect</h2>
              
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                <h3 className="font-semibold text-blue-900 mb-2">✅ Data We DO Collect (Personal Use Only)</h3>
                <ul className="list-disc list-inside text-blue-800 space-y-1">
                  <li>Job titles, company names, and locations from job postings you visit</li>
                  <li>Application status and dates you provide</li>
                  <li>Notes and reminders you add to your applications</li>
                  <li>Email subject lines and metadata for status tracking (with your consent)</li>
                </ul>
              </div>

              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <h3 className="font-semibold text-red-900 mb-2">❌ Data We DO NOT Collect</h3>
                <ul className="list-disc list-inside text-red-800 space-y-1">
                  <li>Personal messages, conversations, or private communications</li>
                  <li>Resume content, cover letters, or application documents</li>
                  <li>Login credentials or authentication tokens for job platforms</li>
                  <li>Browsing history outside of job-related pages</li>
                  <li>Financial information, salary negotiations, or sensitive personal data</li>
                </ul>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">How We Collect Data</h2>
              
              <div className="space-y-4">
                <div className="border-l-4 border-green-500 pl-4">
                  <h3 className="font-semibold text-gray-900">🔍 Browser Extension</h3>
                  <p className="text-gray-600">
                    Our Chrome extension only activates when you visit job posting pages. It extracts publicly 
                    visible job information to help you track your applications.
                  </p>
                </div>

                <div className="border-l-4 border-blue-500 pl-4">
                  <h3 className="font-semibold text-gray-900">📧 Email Integration (Optional)</h3>
                  <p className="text-gray-600">
                    With your explicit consent, we can analyze email headers and subject lines to detect 
                    application status updates. We never read email content.
                  </p>
                </div>

                <div className="border-l-4 border-purple-500 pl-4">
                  <h3 className="font-semibold text-gray-900">📝 Manual Entry</h3>
                  <p className="text-gray-600">
                    You can manually add job applications, notes, and status updates through our dashboard.
                  </p>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Your Privacy Rights</h2>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2">🔧 Control</h3>
                  <p className="text-gray-600 text-sm">
                    Enable/disable tracking for specific job boards, control notifications, and manage data collection preferences.
                  </p>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2">📥 Export</h3>
                  <p className="text-gray-600 text-sm">
                    Download all your job application data in CSV or JSON format at any time.
                  </p>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2">🗑️ Delete</h3>
                  <p className="text-gray-600 text-sm">
                    Permanently delete your account and all associated data with one click.
                  </p>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2">🔍 Transparency</h3>
                  <p className="text-gray-600 text-sm">
                    View exactly what data we have about you and how it is being used.
                  </p>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Contact & Updates</h2>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-600 mb-3">
                  We will notify you of any material changes to this privacy policy. For questions or concerns:
                </p>
                <ul className="text-gray-600 space-y-1">
                  <li><strong>Email:</strong> privacy@clearpath.app</li>
                  <li><strong>Support:</strong> support@clearpath.app</li>
                </ul>
              </div>
            </section>

            <div className="border-t pt-6">
              <p className="text-sm text-gray-500">
                This privacy policy is effective as of October 17, 2025. We review and update it regularly 
                to ensure compliance with applicable privacy laws and to reflect changes in our practices.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}