import { Sidebar } from './Sidebar';
import { Navbar } from './Navbar';
import { OverviewCards } from './OverviewCards';
import { LeaguesTable } from './LeaguesTable';
import { UpcomingMatches } from './UpcomingMatches';
import { RankingPreview } from './RankingPreview';
import { useEffect, useState } from 'react';

export function Dashboard() {
  const [userName, setUserName] = useState('Usuario');

  useEffect(() => {
    const storedName = localStorage.getItem('userName');
    if (storedName) {
      setUserName(storedName);
    }
  }, []);

  return (
    <div className="flex h-screen bg-[#0a0e13] dark">
      {/* Sidebar */}
      <Sidebar activeSection="dashboard" />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Navbar */}
        <Navbar />

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-7xl mx-auto space-y-6">
            {/* Page Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-white mb-2">
                Bienvenido de nuevo, {userName}
              </h1>
              <p className="text-gray-400">
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
