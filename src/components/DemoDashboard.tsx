'use client';

import { useState } from 'react';
import { Briefcase, Calendar, MapPin, DollarSign, Eye } from 'lucide-react';

// Demo data for showcase
const demoApplications = [
  {
    id: '1',
    job_title: 'Senior Software Engineer',
    company: 'TechCorp',
    location: 'San Francisco, CA',
    salary: '$120k - $160k',
    job_url: 'https://linkedin.com/jobs/123',
    status: 'interview_scheduled' as const,
    applied_date: '2024-10-15',
    platform: 'linkedin',
    created_at: '2024-10-15T10:00:00Z'
  },
  {
    id: '2', 
    job_title: 'Frontend Developer',
    company: 'StartupXYZ',
    location: 'Remote',
    salary: '$90k - $130k',
    job_url: 'https://indeed.com/jobs/456',
    status: 'applied' as const,
    applied_date: '2024-10-14',
    platform: 'indeed',
    created_at: '2024-10-14T15:30:00Z'
  },
  {
    id: '3',
    job_title: 'Full Stack Engineer', 
    company: 'BigTech Inc',
    location: 'New York, NY',
    salary: '$130k - $180k',
    job_url: 'https://glassdoor.com/jobs/789',
    status: 'offer' as const,
    applied_date: '2024-10-10',
    platform: 'glassdoor',
    created_at: '2024-10-10T09:15:00Z'
  }
];

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

export default function DemoDashboard() {
  const [filter, setFilter] = useState<string>('all');

  const filteredApplications = demoApplications.filter(app => {
    if (filter === 'all') return true;
    return app.status === filter;
  });

  const stats = {
    total: demoApplications.length,
    applied: demoApplications.filter(app => app.status === 'applied').length,
    interviewing: demoApplications.filter(app => 
      ['screening', 'interview_scheduled', 'interviewed'].includes(app.status)
    ).length,
    offers: demoApplications.filter(app => app.status === 'offer').length,
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Demo Banner */}
        <div className="mb-6 bg-blue-50 border border-blue-200 rounded-md p-4">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Calendar className="h-5 w-5 text-blue-400" />
            </div>
            <div className="ml-3">
              <p className="text-sm text-blue-700">
                <strong>Demo Mode:</strong> This is sample data. 
                <a href="/login" className="font-medium underline hover:text-blue-600 ml-1">
                  Sign up free
                </a> to track your real job applications!
              </p>
            </div>
          </div>
        </div>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Job Application Dashboard</h1>
          <p className="text-gray-600">Track and manage your job applications across all platforms</p>
        </div>

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

        {/* Applications List */}
        <div className="bg-white rounded-lg shadow">
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
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-6 text-center">
          <h2 className="text-2xl font-bold text-white mb-2">Ready to Track Your Real Applications?</h2>
          <p className="text-blue-100 mb-4">
            Install our Chrome extension and automatically track jobs across LinkedIn, Indeed, Glassdoor, and more!
          </p>
          <div className="space-x-4">
            <a
              href="/login"
              className="bg-white text-blue-600 px-6 py-2 rounded-md font-semibold hover:bg-gray-100 transition-colors"
            >
              Sign Up Free
            </a>
            <a
              href="https://chrome.google.com/webstore"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-blue-500 text-white px-6 py-2 rounded-md font-semibold hover:bg-blue-400 transition-colors"
            >
              Install Extension
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}