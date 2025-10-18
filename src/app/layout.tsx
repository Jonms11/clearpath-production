import type { Metadata } from "next";
import Image from "next/image";
import "./globals.css";

export const metadata: Metadata = {
  title: "ClearPath - Job Application Tracker",
  description: "Automatically track your job applications across LinkedIn, Indeed, Glassdoor, and more job boards. Never lose track of an application again.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-white">
        <nav className="border-b border-gray-200 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="flex items-center">
                    <Image 
                      src="/clearpath-logo.png" 
                      alt="ClearPath Logo" 
                      width={32}
                      height={32}
                      className="mr-2"
                    />
                    <h1 className="text-xl font-bold text-blue-600">ClearPath</h1>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <a href="/dashboard" className="text-gray-500 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium">
                  Dashboard
                </a>
                <a href="/login" className="text-gray-500 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium">
                  Sign In
                </a>
                <a href="/privacy" className="text-gray-500 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium">
                  Privacy
                </a>
                <a href="/terms" className="text-gray-500 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium">
                  Terms
                </a>
              </div>
            </div>
          </div>
        </nav>
        {children}
        <footer className="bg-gray-50 border-t border-gray-200">
          <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <p className="text-gray-500 text-sm">
                © 2025 ClearPath. All rights reserved. Built for job seekers, by job seekers.
              </p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}