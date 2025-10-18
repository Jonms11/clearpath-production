'use client';

import { useEffect } from 'react';
import { createClient } from '@/lib/supabaseClient';

export default function AuthCallback() {
  const supabase = createClient();

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        // Get the auth session
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('Auth callback error:', error);
          window.location.href = '/login?error=' + encodeURIComponent(error.message);
          return;
        }

        if (session?.user) {
          // Set authentication status for Chrome extension (if available)
          if (typeof window !== 'undefined' && (window as any).chrome?.storage) {
            (window as any).chrome.storage.local.set({
              user_authenticated: true,
              user_id: session.user.id,
              user_email: session.user.email
            });
          }
          
          // Redirect to dashboard
          window.location.href = '/dashboard';
        } else {
          // No session, redirect to login
          window.location.href = '/login';
        }
      } catch (error) {
        console.error('Auth callback error:', error);
        window.location.href = '/login';
      }
    };

    handleAuthCallback();
  }, [supabase]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
        <p className="mt-4 text-gray-600">Completing sign in...</p>
      </div>
    </div>
  );
}