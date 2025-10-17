'use client';

import dynamic from 'next/dynamic';

const DynamicDashboard = dynamic(() => import('@/components/Dashboard'), {
  ssr: false,
  loading: () => <div className="flex justify-center items-center min-h-screen">Loading...</div>
});

export default function DashboardPage() {
  return <DynamicDashboard />;
}