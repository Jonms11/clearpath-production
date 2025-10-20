'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabaseClient';

export default function TestOAuth() {
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const supabase = createClient();

  const testGoogleAuth = async () => {
    setLoading(true);
    setResult('Testing Google OAuth...');

    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/dashboard`
        }
      });

      if (error) {
        setResult(`❌ Error: ${error.message}\n\nFull error: ${JSON.stringify(error, null, 2)}`);
      } else {
        setResult(`✅ OAuth initiated successfully!\n\nData: ${JSON.stringify(data, null, 2)}`);
      }
    } catch (err) {
      setResult(`💥 Exception: ${err instanceof Error ? err.message : 'Unknown error'}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">🔧 OAuth Testing Page</h1>
          
          <div className="space-y-4">
            <button
              onClick={testGoogleAuth}
              disabled={loading}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? 'Testing...' : 'Test Google OAuth'}
            </button>

            {result && (
              <div className="bg-gray-100 border rounded-lg p-4">
                <h3 className="font-semibold mb-2">Result:</h3>
                <pre className="whitespace-pre-wrap text-sm">{result}</pre>
              </div>
            )}

            <div className="text-sm text-gray-600 space-y-2">
              <p><strong>What this test does:</strong></p>
              <ul className="list-disc list-inside space-y-1">
                <li>Attempts to initiate Google OAuth flow</li>
                <li>Shows detailed error messages</li>
                <li>Helps identify what needs to be configured</li>
              </ul>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <h4 className="font-semibold text-yellow-800">Expected Results:</h4>
              <ul className="text-sm text-yellow-700 mt-2 space-y-1">
                <li><strong>If OAuth not configured:</strong> "OAuth client not found" error</li>
                <li><strong>If partially configured:</strong> "Redirect URI mismatch" error</li>
                <li><strong>If working:</strong> Redirects to Google login page</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}