'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabaseClient';

interface StatusSuggestion {
  status: string;
  confidence: number;
  evidence: string[];
}

interface JobMatch {
  id: string;
  job_title: string;
  company: string;
  current_status: string;
  confidence: number;
}

export default function EmailAnalyzer() {
  const [emailContent, setEmailContent] = useState('');
  const [analyzing, setAnalyzing] = useState(false);
  const [results, setResults] = useState<{
    statusSuggestion: StatusSuggestion | null;
    jobMatches: JobMatch[];
  } | null>(null);

  const analyzeEmail = async () => {
    if (!emailContent.trim()) return;
    
    setAnalyzing(true);
    
    try {
      // Analyze email content for status keywords
      const statusSuggestion = analyzeEmailForStatus(emailContent);
      
      // Try to match to existing job applications
      const jobMatches = await findMatchingJobs(emailContent);
      
      setResults({
        statusSuggestion,
        jobMatches
      });
    } catch (error) {
      console.error('Email analysis error:', error);
    } finally {
      setAnalyzing(false);
    }
  };

  const analyzeEmailForStatus = (content: string): StatusSuggestion | null => {
    const text = content.toLowerCase();
    
    // Status detection patterns
    const patterns = {
      viewed: {
        keywords: ['application received', 'thank you for your application', 'application has been reviewed', 'we have received'],
        weight: 0.8
      },
      screening: {
        keywords: ['phone screening', 'initial call', 'recruiter call', 'brief conversation', 'screening interview'],
        weight: 0.9
      },
      interview_scheduled: {
        keywords: ['interview scheduled', 'meeting invitation', 'calendar invite', 'interview confirmation', 'zoom meeting', 'teams meeting'],
        weight: 0.95
      },
      interviewed: {
        keywords: ['thank you for interviewing', 'enjoyed our conversation', 'following up on our interview', 'next steps after'],
        weight: 0.85
      },
      offer: {
        keywords: ['offer letter', 'job offer', 'congratulations', 'pleased to offer', 'compensation package', 'offer of employment'],
        weight: 0.98
      },
      rejected: {
        keywords: ['unfortunately', 'other candidates', 'not selected', 'position filled', 'decided to move forward', 'will keep your resume'],
        weight: 0.9
      }
    };

    let bestMatch: StatusSuggestion | null = null;

    for (const [status, config] of Object.entries(patterns)) {
      const evidence = config.keywords.filter(keyword => text.includes(keyword));
      
      if (evidence.length > 0) {
        const confidence = Math.min(0.99, config.weight * (evidence.length / config.keywords.length) + 0.1);
        
        if (!bestMatch || confidence > bestMatch.confidence) {
          bestMatch = {
            status,
            confidence,
            evidence
          };
        }
      }
    }

    return bestMatch;
  };

  const findMatchingJobs = async (content: string): Promise<JobMatch[]> => {
    const supabase = createClient();
    
    try {
      // Get user's job applications
      const { data: jobs, error } = await supabase
        .from('job_applications')
        .select('id, job_title, company, status')
        .order('application_date', { ascending: false })
        .limit(20);

      if (error || !jobs) return [];

      const text = content.toLowerCase();
      const matches: JobMatch[] = [];

      jobs.forEach(job => {
        let confidence = 0;
        
        // Check for company name match
        if (text.includes(job.company.toLowerCase())) {
          confidence += 0.6;
        }
        
        // Check for job title keywords
        const titleWords = job.job_title.toLowerCase().split(' ');
        const titleMatches = titleWords.filter((word: string) => 
          word.length > 3 && text.includes(word)
        );
        confidence += (titleMatches.length / titleWords.length) * 0.4;

        if (confidence > 0.3) {
          matches.push({
            id: job.id,
            job_title: job.job_title,
            company: job.company,
            current_status: job.status || 'applied',
            confidence: Math.min(0.99, confidence)
          });
        }
      });

      return matches.sort((a, b) => b.confidence - a.confidence);
    } catch (error) {
      console.error('Job matching error:', error);
      return [];
    }
  };

  const updateJobStatus = async (jobId: string, newStatus: string) => {
    const supabase = createClient();
    
    try {
      const { error } = await supabase
        .from('job_applications')
        .update({ 
          status: newStatus,
          updated_at: new Date().toISOString()
        })
        .eq('id', jobId);

      if (error) throw error;

      // Clear results and email content
      setResults(null);
      setEmailContent('');
      
      alert('✅ Job status updated successfully!');
    } catch (error) {
      console.error('Update error:', error);
      alert('❌ Failed to update job status');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">📧 Email Analyzer</h3>
        <p className="text-sm text-gray-600">
          Paste job-related emails here to automatically detect status changes
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <label htmlFor="emailContent" className="block text-sm font-medium text-gray-700 mb-2">
            Email Content
          </label>
          <textarea
            id="emailContent"
            value={emailContent}
            onChange={(e) => setEmailContent(e.target.value)}
            className="w-full h-32 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Paste your job-related email here (subject line + body)..."
          />
        </div>

        <button
          onClick={analyzeEmail}
          disabled={!emailContent.trim() || analyzing}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {analyzing ? '🔍 Analyzing...' : '🔍 Analyze Email'}
        </button>

        {results && (
          <div className="space-y-4 pt-4 border-t">
            {/* Status Detection Results */}
            {results.statusSuggestion ? (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-medium text-blue-900 mb-2">📊 Status Detected</h4>
                <div className="text-sm space-y-1">
                  <p>
                    <strong>Status:</strong> {results.statusSuggestion.status.replace('_', ' ').toUpperCase()}
                  </p>
                  <p>
                    <strong>Confidence:</strong> {Math.round(results.statusSuggestion.confidence * 100)}%
                  </p>
                  <p>
                    <strong>Evidence:</strong> {results.statusSuggestion.evidence.join(', ')}
                  </p>
                </div>
              </div>
            ) : (
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <p className="text-gray-600 text-sm">No clear status change detected in this email.</p>
              </div>
            )}

            {/* Job Matching Results */}
            {results.jobMatches.length > 0 ? (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h4 className="font-medium text-green-900 mb-3">🎯 Matching Jobs</h4>
                <div className="space-y-3">
                  {results.jobMatches.slice(0, 3).map((job) => (
                    <div key={job.id} className="bg-white p-3 rounded border">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <p className="font-medium text-gray-900">{job.job_title}</p>
                          <p className="text-sm text-gray-600">{job.company}</p>
                          <p className="text-xs text-gray-500">
                            Current: {job.current_status.replace('_', ' ')} • 
                            Match: {Math.round(job.confidence * 100)}%
                          </p>
                        </div>
                        {results.statusSuggestion && (
                          <button
                            onClick={() => updateJobStatus(job.id, results.statusSuggestion!.status)}
                            className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700 transition-colors"
                          >
                            Update to {results.statusSuggestion.status.replace('_', ' ')}
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <p className="text-yellow-800 text-sm">
                  🤔 Couldn't match this email to any of your tracked jobs. 
                  Make sure the company name or job title appears in the email.
                </p>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="mt-4 p-3 bg-gray-50 rounded-lg">
        <p className="text-xs text-gray-600">
          💡 <strong>Tip:</strong> Include both the subject line and email body for best results. 
          The analyzer looks for keywords like "interview scheduled", "offer letter", "unfortunately", etc.
        </p>
      </div>
    </div>
  );
}