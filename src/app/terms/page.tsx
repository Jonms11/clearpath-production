'use client';

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-sm p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Terms of Service</h1>
          
          <div className="prose max-w-none">
            <p className="text-gray-600 mb-6">
              <strong>Last Updated:</strong> October 17, 2025
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Acceptance of Terms</h2>
              <p className="text-gray-600 mb-4">
                By using ClearPath, you agree to these Terms of Service. 
                If you do not agree, please do not use our Service.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Description of Service</h2>
              <p className="text-gray-600 mb-4">
                ClearPath is a personal job application tracking tool that helps you:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-1 mb-4">
                <li>Track job applications across multiple platforms</li>
                <li>Monitor application status through email analysis</li>
                <li>Organize your job search with notes and reminders</li>
                <li>Export your application data for personal use</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. Permitted Use</h2>
              
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
                <h3 className="font-semibold text-green-900 mb-2">✅ You MAY:</h3>
                <ul className="list-disc list-inside text-green-800 space-y-1">
                  <li>Use ClearPath for personal job search tracking</li>
                  <li>Install our browser extension on your personal devices</li>
                  <li>Export your own application data</li>
                  <li>Share anonymized insights about your job search experience</li>
                </ul>
              </div>

              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <h3 className="font-semibold text-red-900 mb-2">❌ You MAY NOT:</h3>
                <ul className="list-disc list-inside text-red-800 space-y-1">
                  <li>Use ClearPath for commercial recruiting or mass data collection</li>
                  <li>Attempt to reverse engineer or modify our browser extension</li>
                  <li>Share your account credentials with others</li>
                  <li>Use automated tools to scrape or overwhelm our services</li>
                  <li>Violate any applicable laws or third-party terms of service</li>
                </ul>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Account Responsibility</h2>
              <p className="text-gray-600 mb-4">
                You are responsible for:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-1 mb-4">
                <li>Maintaining the security of your account credentials</li>
                <li>All activities that occur under your account</li>
                <li>Ensuring your use complies with applicable laws</li>
                <li>Respecting the terms of service of job platforms you visit</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Service Availability</h2>
              <p className="text-gray-600 mb-4">
                While we strive for high availability, ClearPath is provided as-is without guarantees of:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-1 mb-4">
                <li>Continuous, uninterrupted access</li>
                <li>Compatibility with all websites or future platform changes</li>
                <li>Perfect accuracy of automatically extracted job data</li>
                <li>Permanent data retention (though we aim for reliability)</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Data and Privacy</h2>
              <p className="text-gray-600 mb-4">
                Your privacy is important to us. Please review our Privacy Policy, which governs how we collect, 
                use, and protect your data. Key points:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-1 mb-4">
                <li>We only collect job application data necessary for tracking</li>
                <li>Your data remains private and is not sold to third parties</li>
                <li>You can export or delete your data at any time</li>
                <li>We use industry-standard security measures</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Limitation of Liability</h2>
              <p className="text-gray-600 mb-4">
                ClearPath and its creators are not liable for:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-1 mb-4">
                <li>Job application outcomes or employment decisions</li>
                <li>Data loss due to technical issues or user error</li>
                <li>Changes to job platform websites that affect our service</li>
                <li>Any indirect, consequential, or punitive damages</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Termination</h2>
              <p className="text-gray-600 mb-4">
                Either party may terminate this agreement at any time:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-1 mb-4">
                <li>You may stop using ClearPath and delete your account anytime</li>
                <li>We may suspend or terminate accounts for terms violations</li>
                <li>Upon termination, your data will be deleted per our Privacy Policy</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. Changes to Terms</h2>
              <p className="text-gray-600 mb-4">
                We may update these terms occasionally. We will notify users of material changes through:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-1 mb-4">
                <li>Email notifications to registered users</li>
                <li>In-app notifications in our dashboard</li>
                <li>Updates to this page with revised effective dates</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">10. Contact Information</h2>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-600 mb-3">
                  For questions about these terms or our service:
                </p>
                <ul className="text-gray-600 space-y-1">
                  <li><strong>Email:</strong> support@clearpath.app</li>
                  <li><strong>Legal:</strong> legal@clearpath.app</li>
                </ul>
              </div>
            </section>

            <div className="border-t pt-6">
              <p className="text-sm text-gray-500">
                These terms are effective as of October 17, 2025. By continuing to use ClearPath 
                after any revisions, you agree to the updated terms.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}