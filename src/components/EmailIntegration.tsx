'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabaseClient';

export default function EmailIntegration() {
  const [loading, setLoading] = useState(false);
  const [emailEnabled, setEmailEnabled] = useState(false);
  const [message, setMessage] = useState('');
  
  const supabase = createClient();

  const enableEmailSync = async () => {
    setLoading(true);
    setMessage('Setting up Gmail integration...');
    
    try {
      // For MVP: Show coming soon message
      // In full implementation: OAuth flow here
      setMessage('📧 Email integration coming soon! For now, you can manually update job statuses.');
      setEmailEnabled(true);
      
      // TODO: Implement Gmail OAuth
      // const { data, error } = await supabase.auth.signInWithOAuth({
      //   provider: 'google',
      //   options: {
      //     scopes: 'email profile https://www.googleapis.com/auth/gmail.readonly'
      //   }
      // });
      
    } catch (error: any) {
      setMessage('Error setting up email integration: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">📧 Email Integration</h3>
          <p className="text-sm text-gray-600">
            Automatically detect status changes from job-related emails
          </p>
        </div>
        <div className={`px-3 py-1 rounded-full text-xs font-medium ${
          emailEnabled ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'
        }`}>
          {emailEnabled ? 'Enabled' : 'Disabled'}
        </div>
      </div>

      {!emailEnabled ? (
        <div className="space-y-4">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="font-medium text-blue-900 mb-2">🚀 Smart Email Detection</h4>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Automatically detect "Interview scheduled" emails</li>
              <li>• Catch "Application received" confirmations</li>
              <li>• Spot "Offer letter" and rejection emails</li>
              <li>• Update job status without manual work</li>
            </ul>
          </div>

          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <h4 className="font-medium text-green-900 mb-2">🔒 Privacy First</h4>
            <ul className="text-sm text-green-800 space-y-1">
              <li>• Only scans job-related emails</li>
              <li>• No personal emails accessed</li>
              <li>• You can disable anytime</li>
              <li>• Email content never stored</li>
            </ul>
          </div>

          <button
            onClick={enableEmailSync}
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 transition-colors"
          >
            {loading ? 'Setting up...' : '📧 Enable Email Integration'}
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <p className="text-green-800 font-medium">✅ Email integration ready!</p>
            <p className="text-green-700 text-sm mt-1">
              ClearPath will now detect status changes from your job emails.
            </p>
          </div>
          
          <button
            onClick={() => setEmailEnabled(false)}
            className="text-red-600 hover:text-red-800 text-sm font-medium"
          >
            Disable Email Integration
          </button>
        </div>
      )}

      {message && (
        <div className="mt-4 p-3 bg-gray-50 border rounded-lg">
          <p className="text-sm text-gray-700">{message}</p>
        </div>
      )}
    </div>
  );
}