'use client';

import { useState, useEffect, useCallback } from 'react';
import { createClient } from '@/lib/supabaseClient';
import { Briefcase, Calendar, MapPin, DollarSign, Eye, Trash2 } from 'lucide-react';
import EmailIntegration from './EmailIntegration';
import EmailAnalyzer from './EmailAnalyzer';

interface JobApplication {
  id: string;
  job_title: string;
  company: string;
  location?: string;
  salary?: string;
  job_url?: string;
  status: 'applied' | 'viewed' | 'screening' | 'interview_scheduled' | 'interviewed' | 'offer' | 'rejected' | 'withdrawn';
  applied_date: string;
  platform?: string;
  notes?: string;
  created_at: string;
}

const statusColors = {
  applied: 'bg-blue-100 text-blue-800',
  viewed: 'bg-yellow-100 text-yellow-800',
  screening: 'bg-purple-100 text-purple-800',
  interview_scheduled: 'bg-indigo-100 text-indigo-800',
  interviewed: 'bg-orange-100 text-orange-800',
  offer: 'bg-green-100 text-green-800',
  rejected: 'bg-red-100 text-red-800',
  withdrawn: 'bg-gray-100 text-gray-800',
};

const platformEmojis = {
  linkedin: '💼',
  indeed: '🔍',
  glassdoor: '🏢',
  lever: '⚖️',
  greenhouse: '🌱',
  workday: '📅',
  ashby: '🚀',
  workable: '⚙️',
  bamboohr: '🎋'
};

export default function Dashboard() {
  const [applications, setApplications] = useState<JobApplication[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>('all');
  const [error, setError] = useState<string>('');
  const supabase = createClient();

  // Check authentication
  useEffect(() => {
    const checkAuth = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        window.location.href = '/login';
        return;
      }
      
      // Set authentication status for Chrome extension (if available)
      if (typeof window !== 'undefined' && 'chrome' in window && (window as typeof window & { chrome: { storage: { local: { set: (data: Record<string, unknown>) => void } } } }).chrome?.storage) {
        (window as typeof window & { chrome: { storage: { local: { set: (data: Record<string, unknown>) => void } } } }).chrome.storage.local.set({
          user_authenticated: true,
          user_id: user.id,
          user_email: user.email
        });
      }
    };
    checkAuth();
  }, [supabase]);

  const loadApplications = useCallback(async () => {
    try {
      setLoading(true);
      setError('');
      
      const { data, error: fetchError } = await supabase
        .from('job_applications')
        .select('*')
        .order('application_date', { ascending: false });

      if (fetchError) throw fetchError;
      setApplications(data || []);
    } catch (error: unknown) {
      console.error('Error loading applications:', error);
      setError(error instanceof Error ? error.message : 'Failed to load applications');
    } finally {
      setLoading(false);
    }
  }, [supabase]);

  useEffect(() => {
    loadApplications();
  }, [loadApplications]);

  const handleDeleteApplication = async (id: string) => {
    if (!confirm('Are you sure you want to delete this application?')) {
      return;
    }

    try {
      const { error } = await supabase
        .from('job_applications')
        .delete()
        .eq('id', id);

      if (error) throw error;
      
      setApplications(prev => prev.filter(app => app.id !== id));
    } catch (error: unknown) {
      console.error('Error deleting application:', error);
      setError(error instanceof Error ? error.message : 'Failed to delete application');
    }
  };

  const updateApplicationStatus = async (id: string, newStatus: string) => {
    try {
      const { error } = await supabase
        .from('job_applications')
        .update({ status: newStatus })
        .eq('id', id);

      if (error) throw error;
      
      setApplications(prev => 
        prev.map(app => 
          app.id === id ? { ...app, status: newStatus as JobApplication['status'] } : app
        )
      );
    } catch (error: unknown) {
      console.error('Error updating status:', error);
      setError(error instanceof Error ? error.message : 'Failed to update status');
    }
  };

  const filteredApplications = applications.filter(app => {
    if (filter === 'all') return true;
    return app.status === filter;
  });

  const stats = {
    total: applications.length,
    applied: applications.filter(app => app.status === 'applied').length,
    interviewing: applications.filter(app => 
      ['screening', 'interview_scheduled', 'interviewed'].includes(app.status)
    ).length,
    offers: applications.filter(app => app.status === 'offer').length,
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your job applications...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Job Application Dashboard</h1>
          <p className="text-gray-600">Track and manage your job applications across all platforms</p>
        </div>

        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 rounded-md p-4">
            <p className="text-red-600">{error}</p>
          </div>
        )}

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <Briefcase className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Total Applications</p>
                <p className="text-2xl font-semibold text-gray-900">{stats.total}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <Calendar className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Applied</p>
                <p className="text-2xl font-semibold text-gray-900">{stats.applied}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <Eye className="h-8 w-8 text-yellow-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Interviewing</p>
                <p className="text-2xl font-semibold text-gray-900">{stats.interviewing}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <DollarSign className="h-8 w-8 text-purple-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Offers</p>
                <p className="text-2xl font-semibold text-gray-900">{stats.offers}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow mb-6 p-4">
          <div className="flex flex-wrap gap-2">
            {['all', 'applied', 'viewed', 'screening', 'interview_scheduled', 'interviewed', 'offer', 'rejected'].map((status) => (
              <button
                key={status}
                onClick={() => setFilter(status)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  filter === status
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {status === 'all' ? 'All Applications' : status.charAt(0).toUpperCase() + status.slice(1).replace('_', ' ')}
              </button>
            ))}
          </div>
        </div>

        {/* Email Integration Section */}
        <EmailAnalyzer />
        <EmailIntegration />

        {/* Applications List */}
        <div className="bg-white rounded-lg shadow">
          {filteredApplications.length === 0 ? (
            <div className="text-center py-12">
              <Briefcase className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">No applications found</h3>
              <p className="mt-1 text-sm text-gray-500">
                {filter === 'all' 
                  ? 'Install the ClearPath Chrome extension to start tracking jobs automatically!'
                  : `No applications with status "${filter}" found.`
                }
              </p>
            </div>
          ) : (
            <div className="overflow-hidden">
              <div className="divide-y divide-gray-200">
                {filteredApplications.map((application) => (
                  <div key={application.id} className="p-6 hover:bg-gray-50">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h3 className="text-lg font-semibold text-gray-900">
                            {application.job_title}
                          </h3>
                          {application.platform && (
                            <span className="text-lg">
                              {platformEmojis[application.platform as keyof typeof platformEmojis] || '💼'}
                            </span>
                          )}
                        </div>
                        
                        <div className="flex items-center space-x-4 text-sm text-gray-500 mb-2">
                          <span className="flex items-center">
                            <Briefcase className="h-4 w-4 mr-1" />
                            {application.company}
                          </span>
                          {application.location && (
                            <span className="flex items-center">
                              <MapPin className="h-4 w-4 mr-1" />
                              {application.location}
                            </span>
                          )}
                          {application.salary && (
                            <span className="flex items-center">
                              <DollarSign className="h-4 w-4 mr-1" />
                              {application.salary}
                            </span>
                          )}
                        </div>

                        <div className="flex items-center space-x-4">
                          <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                            statusColors[application.status]
                          }`}>
                            {application.status.charAt(0).toUpperCase() + application.status.slice(1).replace('_', ' ')}
                          </span>
                          
                          <span className="text-sm text-gray-500">
                            Applied: {new Date(application.applied_date).toLocaleDateString()}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">
                        <select
                          value={application.status}
                          onChange={(e) => updateApplicationStatus(application.id, e.target.value)}
                          className="text-sm border border-gray-300 rounded-md px-2 py-1"
                        >
                          <option value="applied">Applied</option>
                          <option value="viewed">Viewed</option>
                          <option value="screening">Screening</option>
                          <option value="interview_scheduled">Interview Scheduled</option>
                          <option value="interviewed">Interviewed</option>
                          <option value="offer">Offer</option>
                          <option value="rejected">Rejected</option>
                          <option value="withdrawn">Withdrawn</option>
                        </select>

                        {application.job_url && (
                          <a
                            href={application.job_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:text-blue-800"
                          >
                            <Eye className="h-5 w-5" />
                          </a>
                        )}

                        <button
                          onClick={() => handleDeleteApplication(application.id)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}