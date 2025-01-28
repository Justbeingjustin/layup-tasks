"use client";
import { useState, useEffect } from "react";
import AirplaneControl from "@/components/AirplaneControl";
import LayupSequenceControl from "@/components/LayupSequenceControl";
import { FaPlane } from "react-icons/fa";

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
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-100 flex flex-col">
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
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="160"
            height="30"
            viewBox="0 0 190 32"
            fill="none"
            className="transition-transform duration-200 hover:scale-105"
          >
            <path fill="#0D223A" d="M0 26.24h40.404v4.63H0v-4.63Zm7.277-8.74h33.127v4.93H7.277V17.5Zm5.361-8.75h27.766v5.23H12.638V8.75ZM17.617.01h22.787v5.53H17.617V.01ZM50.4 26.22h19.5v4.63H50.4v-4.63Zm.004-3.77V.032h5.53v22.416h-5.53Zm23.533 8.41L84.972 0h4.641v5.496H88.01L79.712 30.86h-5.775Zm5.582-7.977 1.476-4.256H95.13l1.475 4.256H79.52Zm16.895 7.977L88.116 5.495V0h3.058l11.014 30.86h-5.774Zm15.855 0V18.69L101.448 0h6.031l7.463 13.43h.15L122.556 0h6.03l-10.821 18.691V30.86h-5.496Zm34.482.534c-2.609 0-4.861-.477-6.758-1.433-1.896-.955-3.364-2.288-4.405-3.999-1.026-1.71-1.54-3.707-1.54-5.988V0h5.518v19.525c0 1.426.278 2.673.834 3.743a6.146 6.146 0 0 0 2.459 2.48c1.069.585 2.367.877 3.892.877 1.526 0 2.823-.292 3.893-.877a6.007 6.007 0 0 0 2.437-2.48c.557-1.07.835-2.317.835-3.743V0h5.496v19.974c0 2.267-.514 4.263-1.54 5.988-1.012 1.711-2.467 3.044-4.363 4-1.896.954-4.149 1.432-6.758 1.432Zm23.084-10.735V16.21h7.763c1.996 0 3.536-.506 4.619-1.518 1.098-1.027 1.647-2.466 1.647-4.32v-.043c0-1.867-.549-3.307-1.647-4.32-1.083-1.012-2.623-1.518-4.619-1.518h-7.763V0h9.132c2.081 0 3.906.428 5.474 1.283a9.21 9.21 0 0 1 3.7 3.614c.884 1.54 1.326 3.344 1.326 5.41v.044c0 2.053-.442 3.856-1.326 5.41a9.389 9.389 0 0 1-3.7 3.614c-1.568.856-3.393 1.284-5.474 1.284h-9.132Zm-2.759 10.2V0h5.518v30.86h-5.518Z" />
          </svg>
        </div>
      </div>

      <div className="flex flex-1 min-h-screen pt-[56px] lg:pt-0">
        {/* Sidebar Overlay */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-gray-600 bg-opacity-75 transition-opacity lg:hidden z-20"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        {/* Left Sidebar Navigation */}
        <div className={`fixed lg:sticky lg:flex flex-col w-64 bg-white border-r border-gray-200 
          top-0 h-screen overflow-y-auto
          transform transition-transform duration-300 ease-in-out z-30
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
          <div className="p-4 pt-6 lg:pt-4 h-full overflow-y-auto">
            <div className={`${isSidebarOpen ? 'block' : 'hidden'} lg:block mb-4`}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="160"
                height="30"
                viewBox="0 0 190 32"
                fill="none"
                className="transition-transform duration-200 hover:scale-105"
              >
                <path fill="#0D223A" d="M0 26.24h40.404v4.63H0v-4.63Zm7.277-8.74h33.127v4.93H7.277V17.5Zm5.361-8.75h27.766v5.23H12.638V8.75ZM17.617.01h22.787v5.53H17.617V.01ZM50.4 26.22h19.5v4.63H50.4v-4.63Zm.004-3.77V.032h5.53v22.416h-5.53Zm23.533 8.41L84.972 0h4.641v5.496H88.01L79.712 30.86h-5.775Zm5.582-7.977 1.476-4.256H95.13l1.475 4.256H79.52Zm16.895 7.977L88.116 5.495V0h3.058l11.014 30.86h-5.774Zm15.855 0V18.69L101.448 0h6.031l7.463 13.43h.15L122.556 0h6.03l-10.821 18.691V30.86h-5.496Zm34.482.534c-2.609 0-4.861-.477-6.758-1.433-1.896-.955-3.364-2.288-4.405-3.999-1.026-1.71-1.54-3.707-1.54-5.988V0h5.518v19.525c0 1.426.278 2.673.834 3.743a6.146 6.146 0 0 0 2.459 2.48c1.069.585 2.367.877 3.892.877 1.526 0 2.823-.292 3.893-.877a6.007 6.007 0 0 0 2.437-2.48c.557-1.07.835-2.317.835-3.743V0h5.496v19.974c0 2.267-.514 4.263-1.54 5.988-1.012 1.711-2.467 3.044-4.363 4-1.896.954-4.149 1.432-6.758 1.432Zm23.084-10.735V16.21h7.763c1.996 0 3.536-.506 4.619-1.518 1.098-1.027 1.647-2.466 1.647-4.32v-.043c0-1.867-.549-3.307-1.647-4.32-1.083-1.012-2.623-1.518-4.619-1.518h-7.763V0h9.132c2.081 0 3.906.428 5.474 1.283a9.21 9.21 0 0 1 3.7 3.614c.884 1.54 1.326 3.344 1.326 5.41v.044c0 2.053-.442 3.856-1.326 5.41a9.389 9.389 0 0 1-3.7 3.614c-1.568.856-3.393 1.284-5.474 1.284h-9.132Zm-2.759 10.2V0h5.518v30.86h-5.518Z" />
              </svg>

            </div>

            <nav className="space-y-2">
              <button
                onClick={() => handleTabChange('airplane')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all
                  ${activeTab === 'airplane'
                    ? 'bg-indigo-50 text-blue-500'
                    : 'text-gray-600 hover:bg-gray-50'}`}
              >
                <FaPlane size={20} />
                Airplane Control
              </button>

              <button
                onClick={() => handleTabChange('layup')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all
                  ${activeTab === 'layup'
                    ? 'bg-indigo-50 text-blue-500'
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
              <LayupSequenceControl />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
