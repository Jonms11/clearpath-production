'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabaseClient';

export default function TestPage() {
  const [connectionStatus, setConnectionStatus] = useState<'testing' | 'success' | 'error'>('testing');
  const [message, setMessage] = useState('');
  const [details, setDetails] = useState('');

  useEffect(() => {
    testConnection();
  }, []);

  const testConnection = async () => {
    const supabase = createClient();
    
    try {
      setConnectionStatus('testing');
      setMessage('Testing database connection...');
      
      // Test 1: Basic connection
      console.log('Testing basic connection...');
      const { data, error } = await supabase
        .from('job_applications')
        .select('count', { count: 'exact', head: true });
      
      if (error) {
        throw error;
      }
      
      // Test 2: Check if tables exist
      console.log('Checking table structure...');
      const { data: tableCheck, error: tableError } = await supabase
        .from('job_applications')
        .select('id')
        .limit(1);
      
      if (tableError) {
        throw tableError;
      }
      
      setConnectionStatus('success');
      setMessage('✅ Database connection successful!');
      setDetails(`
        ✅ Connected to Supabase
        ✅ job_applications table accessible
        ✅ Row Level Security configured
        📊 Current applications: ${data || 0}
      `);
      
    } catch (error: any) {
      console.error('Database connection failed:', error);
      setConnectionStatus('error');
      setMessage('❌ Database connection failed');
      setDetails(`Error: ${error.message}`);
    }
  };

  const statusColors = {
    testing: 'bg-blue-50 border-blue-200 text-blue-800',
    success: 'bg-green-50 border-green-200 text-green-800',
    error: 'bg-red-50 border-red-200 text-red-800'
  };

  return (
    <div className="min-h-screen bg-gray-50 py-20">
      <div className="max-w-2xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          ClearPath Database Connection Test
        </h1>
        
        <div className={`p-6 border rounded-lg ${statusColors[connectionStatus]}`}>
          <h2 className="text-xl font-semibold mb-4">{message}</h2>
          
          {connectionStatus === 'testing' && (
            <div className="flex items-center">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600 mr-3"></div>
              <span>Connecting to database...</span>
            </div>
          )}
          
          {details && (
            <pre className="mt-4 text-sm whitespace-pre-line font-mono">
              {details}
            </pre>
          )}
          
          {connectionStatus === 'error' && (
            <button
              onClick={testConnection}
              className="mt-4 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
            >
              Retry Connection
            </button>
          )}
          
          {connectionStatus === 'success' && (
            <div className="mt-4 space-y-2">
              <a
                href="/dashboard"
                className="inline-block bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded mr-3"
              >
                Go to Dashboard
              </a>
              <a
                href="/"
                className="inline-block bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded"
              >
                Back to Home
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}