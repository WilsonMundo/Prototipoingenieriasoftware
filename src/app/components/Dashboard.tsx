import { Sidebar } from './Sidebar';
import { Navbar } from './Navbar';
import { OverviewCards } from './OverviewCards';
import { LeaguesTable } from './LeaguesTable';
import { UpcomingMatches } from './UpcomingMatches';
import { RankingPreview } from './RankingPreview';
import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';

export function Dashboard() {
  const [userName, setUserName] = useState('Usuario');
  const [showMobileSidebar, setShowMobileSidebar] = useState(false);

  useEffect(() => {
    const storedName = localStorage.getItem('userName');
    if (storedName) {
      setUserName(storedName);
    }
  }, []);

  return (
    <div className="flex h-screen bg-[#0a0e13] dark">
      {/* Desktop Sidebar - Hidden on Mobile */}
      <div className="hidden lg:block">
        <Sidebar activeSection="dashboard" />
      </div>

      {/* Mobile Sidebar Overlay */}
      {showMobileSidebar && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={() => setShowMobileSidebar(false)}
          />
          {/* Sidebar */}
          <div className="fixed inset-y-0 left-0 z-50 lg:hidden">
            <Sidebar activeSection="dashboard" />
          </div>
        </>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Desktop Navbar */}
        <div className="hidden lg:block">
          <Navbar />
        </div>

        {/* Mobile Header */}
        <div className="lg:hidden bg-[#0f1419] border-b border-gray-800 p-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setShowMobileSidebar(true)}
              className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors"
            >
              <Menu className="w-6 h-6" />
            </button>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white text-lg font-bold">🏆</span>
              </div>
              <h1 className="text-lg font-bold text-white">BetLeague</h1>
            </div>
            <div className="w-10" /> {/* Spacer for centering */}
          </div>
        </div>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-6">
          <div className="max-w-7xl mx-auto space-y-6">
            {/* Page Header */}
            <div className="mb-6 lg:mb-8">
              <h1 className="text-2xl lg:text-3xl font-bold text-white mb-2">
                Bienvenido de nuevo, {userName}
              </h1>
              <p className="text-gray-400 text-sm lg:text-base">
                Aquí está tu resumen de apuestas del Mundial 2026
              </p>
            </div>

            {/* Overview Cards */}
            <OverviewCards />

            {/* Two Column Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left Column - Wider */}
              <div className="lg:col-span-2 space-y-6">
                <LeaguesTable />
                <UpcomingMatches />
              </div>

              {/* Right Column - Narrower */}
              <div className="lg:col-span-1">
                <RankingPreview />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}