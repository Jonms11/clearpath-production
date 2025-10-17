// Test database connection
import { createClient } from '@/lib/supabaseClient';

export default async function TestConnection() {
  const supabase = createClient();
  
  try {
    // Test basic connection
    const { data, error } = await supabase
      .from('job_applications')
      .select('count', { count: 'exact', head: true });
    
    if (error) {
      console.error('Database connection error:', error);
      return (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
          <h3 className="text-red-800 font-semibold">Database Connection Failed</h3>
          <p className="text-red-600">{error.message}</p>
        </div>
      );
    }
    
    return (
      <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
        <h3 className="text-green-800 font-semibold">✅ Database Connected Successfully!</h3>
        <p className="text-green-600">
          Connection to job_applications table established. 
          Found {data?.length || 0} applications.
        </p>
      </div>
    );
  } catch (error) {
    console.error('Connection test failed:', error);
    return (
      <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
        <h3 className="text-red-800 font-semibold">Connection Test Failed</h3>
        <p className="text-red-600">Check console for details</p>
      </div>
    );
  }
}