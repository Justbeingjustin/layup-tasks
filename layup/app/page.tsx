"use client";
import { useState, useEffect } from "react";
import AirplaneControl from "@/components/AirplaneControl";

export default function Home() {
  const [activeTab, setActiveTab] = useState<'airplane' | 'layup'>('airplane');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    setIsLoading(false);
  }, []);

  const handleTabChange = (tab: 'airplane' | 'layup') => {
    setIsTransitioning(true);
    setActiveTab(tab);
    setIsSidebarOpen(false); // Close sidebar on mobile after selection
    setTimeout(() => setIsTransitioning(false), 150);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Header */}
      <div className={`lg:hidden bg-white border-b border-gray-200 px-4 py-3 fixed top-0 left-0 right-0 z-30 
        ${isSidebarOpen ? 'hidden' : 'block'}`}>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 -ml-2 rounded-lg hover:bg-gray-50"
          >
            <svg className="w-6 h-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <h1 className="text-xl font-semibold text-gray-900 font-['Outfit']">Manufacturing</h1>
        </div>
      </div>

      <div className="flex min-h-screen pt-[56px] lg:pt-0">
        {/* Sidebar Overlay */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-gray-600 bg-opacity-75 transition-opacity lg:hidden z-20"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        {/* Left Sidebar Navigation */}
        <div className={`fixed lg:relative lg:flex flex-col w-64 bg-white border-r border-gray-200 
          h-[100dvh] lg:h-screen inset-y-0 left-0 
          transform transition-transform duration-300 ease-in-out z-30
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
          <div className="p-4 pt-6 lg:pt-4 h-full overflow-y-auto">
            <div className={`${isSidebarOpen ? 'block' : 'hidden'} lg:block mb-4`}>
              <h1 className="text-xl font-semibold text-gray-900 font-['Outfit']">Layup Parts</h1>
              <p className="text-sm text-gray-500 mt-1">Tasks</p>
            </div>

            <nav className="space-y-2">
              <button
                onClick={() => handleTabChange('airplane')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all
                  ${activeTab === 'airplane'
                    ? 'bg-indigo-50 text-indigo-600'
                    : 'text-gray-600 hover:bg-gray-50'}`}
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
                Airplane Control
              </button>

              <button
                onClick={() => handleTabChange('layup')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all
                  ${activeTab === 'layup'
                    ? 'bg-indigo-50 text-indigo-600'
                    : 'text-gray-600 hover:bg-gray-50'}`}
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
                Layup Sequence
              </button>
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-auto w-full">
          <div className={`p-4 lg:p-8 transition-opacity duration-300 ease-in-out
            ${isLoading || isTransitioning ? 'opacity-0' : 'opacity-100'}`}>

            {activeTab === 'airplane' ? (
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">

                </div>

                <AirplaneControl />
              </div>
            ) : (
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <h2 className="text-2xl font-semibold text-gray-900">Layup Sequence</h2>
                  <button className="w-full sm:w-auto px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700">
                    Start New Sequence
                  </button>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                  <div className="p-6">
                    <h3 className="text-sm font-medium text-gray-600 mb-4">Current Sequence</h3>
                    {[1, 2, 3, 4].map((step) => (
                      <div key={step} className="flex items-center gap-4 py-3 border-b last:border-0">
                        <div className="w-8 h-8 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center font-medium">
                          {step}
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">Step {step}</div>
                          <div className="text-sm text-gray-500">Layer configuration {step}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
