import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ClearPath - Job Application Tracker",
  description: "Automatically track your job applications across LinkedIn, Indeed, Glassdoor, and more job boards. Never lose track of an application again.",
  icons: {
    icon: '/favicon.ico',
  }
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
                    <img 
                      src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAADYUlEQVR4nN2Wy2sddRTHP98zMzc3j0uSSpLGVklDqo2PFny1URcVNxZxoagruytuXLnzEXzsBIsbF0UQ/BNcBXShK4VqK2pAbbDFUgqSGpMQbZt7MzPHxczcSe69Sa/QLvQw/C5z5tzz/Z3v9/wecndupdktzf6/AAg7etdjANyRus9V7ZSs1bd0zd/5sn7+z9QkcGiOO5unztRt9vYTPSP9W4JbAb64EM8tJH0R4ADKmmxLp2UJWmGdc0vxkTuClw5FOwGsx0Qh4Ra3CgwhBHie3HEV4IKK63rc2vStADIwSurLX8tfC2Ec4lRJSmhEhjuYW5tmnXSR3IrMUnNK+UylxGkk9EfcM6qZPcF9Izr1XfzzUro5eHsACZOa3Vuwks0+cRqJjw/o2GRwaMwmh9QbcfJ0vLDiYaDYvb0b2gEylpoFlPrWEwZ7dGI6ePaucGElHevTRsqrn21cWPFqKDzjtgsAAikDKAfWE2b22muHg7F+ffRjcmyf7e7X8bmNS2v0VgTgLpNurIEkE6bNc6mnvHjA3jgcVkPOLadP3mkHR2z2q/i3Nforcoq+SruoQEKZBkVoPeGpffbWTBgav656NdSBXfq74d8sejUCQw6SO7IOK79tLxLkFQgpReM1e/2RIDRS591vkzNXHIidBJSFWdYXrXVvByAZzWcDnpnUaK+yUi5fZbgHoFbRngElKiIFhqxdgjYAkcUpG8NAD43mMZWAF6ZsuCogEM/vN6eo1VQQ2w1FKhrOCEwDlfxLIF653x4cyVM8PWFH96qeYs0i1BVFWXRmpGKtUX78/Zqf+ildvO5AaMw+bJODarjU5Ko1XacDR6UMSuH8Wrn+a5HmLvkH87lnvE8nH7XbB2h4zmpXIqMMBInAdPpKuZgHIt58wD6/7J9ezH13D+nDx21ykPo2h1MnkbP1KCFFAfPLLKyWRcyM6eVpvfeDf72YO/cP6pOj9thuJR007ryblpuEoOG8P+9HxsrqU4gCZs/6cxP0huAExtQgZ/6g/Q7UCpBuPqoEEInvlzm7VP5Voseop3y8kDvdMRF3s1XcO0wt4mqScZU7vdxec2uksMnp4FCLdHBXK4Lab3a/rPrFvyjP/BtZFujORI3poS4Abq799292OwHcFO52AvgXt8bt7R93cBEM0/3TfQAAAABJRU5ErkJggg=="
                      alt="ClearPath Logo" 
                      className="h-8 w-8 mr-2"
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