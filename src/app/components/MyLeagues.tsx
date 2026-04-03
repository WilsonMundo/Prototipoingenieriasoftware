import { useState } from 'react';
import { useNavigate } from 'react-router';
import { 
  Search, 
  Filter, 
  Menu, 
  Users, 
  Trophy, 
  DollarSign,
  TrendingUp,
  Plus,
  ChevronRight
} from 'lucide-react';
import { Sidebar } from './Sidebar';
import { Navbar } from './Navbar';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { cn } from './ui/utils';

type LeagueType = 'bet' | 'fun';
type LeagueStatus = 'activa' | 'pendiente' | 'finalizada';
type FilterType = 'all' | 'bet' | 'fun' | 'active' | 'finished';

interface League {
  id: number;
  name: string;
  type: LeagueType;
  status: LeagueStatus;
  participants: number;
  yourRank: number | null;
  totalPlayers: number;
  prize?: string;
  progress: number;
  image?: string;
}

const mockLeagues: League[] = [
  {
    id: 1,
    name: 'Liga de Campeones',
    type: 'bet',
    status: 'activa',
    participants: 24,
    yourRank: 3,
    totalPlayers: 24,
    prize: '$500',
    progress: 75,
  },
  {
    id: 2,
    name: 'Mundial de Oficina',
    type: 'fun',
    status: 'activa',
    participants: 12,
    yourRank: 1,
    totalPlayers: 12,
    progress: 85,
  },
  {
    id: 3,
    name: 'Amigos y Familia',
    type: 'fun',
    status: 'activa',
    participants: 8,
    yourRank: 5,
    totalPlayers: 10,
    progress: 60,
  },
  {
    id: 4,
    name: 'Maestros Globales',
    type: 'bet',
    status: 'activa',
    participants: 156,
    yourRank: 42,
    totalPlayers: 200,
    prize: '$2000',
    progress: 90,
  },
  {
    id: 5,
    name: 'Guerreros del Fin de Semana',
    type: 'bet',
    status: 'pendiente',
    participants: 48,
    yourRank: null,
    totalPlayers: 50,
    prize: '$300',
    progress: 0,
  },
  {
    id: 6,
    name: 'Liga Universitaria',
    type: 'fun',
    status: 'activa',
    participants: 32,
    yourRank: 8,
    totalPlayers: 32,
    progress: 70,
  },
  {
    id: 7,
    name: 'Copa América 2026',
    type: 'bet',
    status: 'finalizada',
    participants: 64,
    yourRank: 12,
    totalPlayers: 64,
    prize: '$1000',
    progress: 100,
  },
  {
    id: 8,
    name: 'Vecindario FC',
    type: 'fun',
    status: 'activa',
    participants: 6,
    yourRank: 2,
    totalPlayers: 8,
    progress: 50,
  },
  {
    id: 9,
    name: 'Elite Global',
    type: 'bet',
    status: 'activa',
    participants: 500,
    yourRank: 145,
    totalPlayers: 500,
    prize: '$5000',
    progress: 80,
  },
  {
    id: 10,
    name: 'Predicciones Locas',
    type: 'fun',
    status: 'finalizada',
    participants: 20,
    yourRank: 7,
    totalPlayers: 20,
    progress: 100,
  },
  {
    id: 11,
    name: 'Pro League 2026',
    type: 'bet',
    status: 'pendiente',
    participants: 100,
    yourRank: null,
    totalPlayers: 150,
    prize: '$800',
    progress: 0,
  },
  {
    id: 12,
    name: 'Familia García',
    type: 'fun',
    status: 'activa',
    participants: 5,
    yourRank: 1,
    totalPlayers: 5,
    progress: 95,
  },
];

const filters = [
  { id: 'all', label: 'Todas' },
  { id: 'bet', label: 'Apuesta' },
  { id: 'fun', label: 'Diversión' },
  { id: 'active', label: 'Activas' },
  { id: 'finished', label: 'Finalizadas' },
];

export function MyLeagues() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  // Filter leagues based on active filter and search
  const filteredLeagues = mockLeagues.filter((league) => {
    // Search filter
    const matchesSearch = league.name.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Type/Status filter
    let matchesFilter = true;
    if (activeFilter === 'bet') matchesFilter = league.type === 'bet';
    if (activeFilter === 'fun') matchesFilter = league.type === 'fun';
    if (activeFilter === 'active') matchesFilter = league.status === 'activa';
    if (activeFilter === 'finished') matchesFilter = league.status === 'finalizada';
    
    return matchesSearch && matchesFilter;
  });

  const handleViewLeague = (leagueId: number) => {
    navigate(`/leagues/${leagueId}`);
  };

  return (
    <div className="flex h-screen bg-[#0a0e13] dark">
      {/* Desktop Sidebar */}
      <div className="hidden lg:block">
        <Sidebar activeSection="my-leagues" />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Desktop Navbar */}
        <div className="hidden lg:block">
          <Navbar />
        </div>

        {/* Mobile Header */}
        <div className="lg:hidden bg-[#0f1419] border-b border-gray-800 p-4">
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors"
            >
              <Menu className="w-6 h-6" />
            </button>
            <h1 className="text-xl font-bold text-white">Mis Ligas</h1>
            <button className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors">
              <Filter className="w-6 h-6" />
            </button>
          </div>

          {/* Mobile Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              type="text"
              placeholder="Buscar ligas..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-500 focus:border-emerald-500/50 focus:ring-emerald-500/20"
            />
          </div>
        </div>

        {/* Desktop Search & Header */}
        <div className="hidden lg:block p-6 pb-0">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-3xl font-bold text-white mb-2">Mis Ligas</h1>
                <p className="text-gray-400">Gestiona y participa en tus ligas del Mundial 2026</p>
              </div>
              <Button
                onClick={() => navigate('/leagues/create')}
                className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white"
              >
                <Plus className="w-5 h-5 mr-2" />
                Crear Liga
              </Button>
            </div>

            {/* Desktop Search */}
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Buscar ligas..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-500 focus:border-emerald-500/50 focus:ring-emerald-500/20"
              />
            </div>
          </div>
        </div>

        {/* Filters - Horizontal Scroll */}
        <div className="border-b border-gray-800 bg-[#0f1419] sticky top-0 z-10">
          <div className="px-4 lg:px-6 py-4 max-w-7xl lg:mx-auto">
            <div className="flex gap-2 overflow-x-auto scrollbar-hide">
              {filters.map((filter) => (
                <button
                  key={filter.id}
                  onClick={() => setActiveFilter(filter.id as FilterType)}
                  className={cn(
                    "px-4 py-2 rounded-lg font-medium transition-all whitespace-nowrap",
                    activeFilter === filter.id
                      ? "bg-gradient-to-r from-emerald-500/20 to-blue-600/20 text-white border border-emerald-500/30"
                      : "bg-gray-800/50 text-gray-400 hover:text-white hover:bg-gray-800"
                  )}
                >
                  {filter.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-6">
          <div className="max-w-7xl mx-auto">
            {/* Empty State */}
            {filteredLeagues.length === 0 && (
              <div className="flex flex-col items-center justify-center py-16 px-4">
                <div className="w-20 h-20 bg-gray-800/50 rounded-full flex items-center justify-center mb-4">
                  <Trophy className="w-10 h-10 text-gray-600" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  {searchQuery ? 'No se encontraron ligas' : 'No hay ligas disponibles'}
                </h3>
                <p className="text-gray-400 text-center max-w-sm mb-6">
                  {searchQuery
                    ? 'Intenta con otro término de búsqueda'
                    : 'Crea tu primera liga o únete a una existente para comenzar'}
                </p>
                {!searchQuery && (
                  <Button
                    onClick={() => navigate('/leagues/create')}
                    className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white"
                  >
                    <Plus className="w-5 h-5 mr-2" />
                    Crear Liga
                  </Button>
                )}
              </div>
            )}

            {/* Mobile Card View */}
            <div className="lg:hidden space-y-4">
              {filteredLeagues.map((league) => (
                <Card key={league.id} className="bg-gray-800/50 border-gray-700 overflow-hidden">
                  <CardContent className="p-4">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h3 className="font-semibold text-white text-lg mb-2">{league.name}</h3>
                        <div className="flex gap-2 flex-wrap">
                          <Badge
                            variant={league.type === 'bet' ? 'default' : 'secondary'}
                            className={
                              league.type === 'bet'
                                ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
                                : 'bg-blue-500/20 text-blue-400 border-blue-500/30'
                            }
                          >
                            {league.type === 'bet' ? 'APUESTA' : 'DIVERSIÓN'}
                          </Badge>
                          <Badge
                            className={cn(
                              league.status === 'activa'
                                ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
                                : league.status === 'pendiente'
                                ? 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
                                : 'bg-gray-500/20 text-gray-400 border-gray-500/30'
                            )}
                          >
                            {league.status}
                          </Badge>
                        </div>
                      </div>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 gap-3 mb-4">
                      <div className="bg-gray-900/50 rounded-lg p-3">
                        <div className="flex items-center gap-2 text-gray-400 text-sm mb-1">
                          <Users className="w-4 h-4" />
                          <span>Jugadores</span>
                        </div>
                        <p className="text-white font-semibold">
                          {league.participants}/{league.totalPlayers}
                        </p>
                      </div>
                      
                      <div className="bg-gray-900/50 rounded-lg p-3">
                        <div className="flex items-center gap-2 text-gray-400 text-sm mb-1">
                          <Trophy className="w-4 h-4" />
                          <span>Tu Posición</span>
                        </div>
                        <p className="text-white font-semibold">
                          {league.yourRank ? `#${league.yourRank}` : '-'}
                        </p>
                      </div>
                    </div>

                    {/* Prize */}
                    {league.prize && (
                      <div className="bg-gradient-to-r from-emerald-500/10 to-blue-600/10 border border-emerald-500/20 rounded-lg p-3 mb-4">
                        <div className="flex items-center gap-2">
                          <DollarSign className="w-5 h-5 text-emerald-400" />
                          <span className="text-emerald-400 font-semibold">Premio: {league.prize}</span>
                        </div>
                      </div>
                    )}

                    {/* Progress Bar */}
                    <div className="mb-4">
                      <div className="flex items-center justify-between text-sm mb-2">
                        <span className="text-gray-400">Progreso</span>
                        <span className="text-gray-300 font-medium">{league.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-emerald-500 to-teal-600 h-2 rounded-full transition-all"
                          style={{ width: `${league.progress}%` }}
                        />
                      </div>
                    </div>

                    {/* Action Button */}
                    <Button
                      onClick={() => handleViewLeague(league.id)}
                      className="w-full bg-gray-700 hover:bg-gray-600 text-white"
                    >
                      Ver Liga
                      <ChevronRight className="w-4 h-4 ml-2" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Desktop Grid View */}
            <div className="hidden lg:grid lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredLeagues.map((league) => (
                <Card key={league.id} className="bg-gray-800/50 border-gray-700 overflow-hidden hover:border-emerald-500/30 transition-all">
                  <CardContent className="p-6">
                    {/* Header */}
                    <div className="mb-4">
                      <h3 className="font-semibold text-white text-xl mb-3">{league.name}</h3>
                      <div className="flex gap-2 flex-wrap">
                        <Badge
                          variant={league.type === 'bet' ? 'default' : 'secondary'}
                          className={
                            league.type === 'bet'
                              ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
                              : 'bg-blue-500/20 text-blue-400 border-blue-500/30'
                          }
                        >
                          {league.type === 'bet' ? 'APUESTA' : 'DIVERSIÓN'}
                        </Badge>
                        <Badge
                          className={cn(
                            league.status === 'activa'
                              ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
                              : league.status === 'pendiente'
                              ? 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
                              : 'bg-gray-500/20 text-gray-400 border-gray-500/30'
                          )}
                        >
                          {league.status}
                        </Badge>
                      </div>
                    </div>

                    {/* Stats */}
                    <div className="space-y-3 mb-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-gray-400">
                          <Users className="w-4 h-4" />
                          <span>Participantes</span>
                        </div>
                        <span className="text-white font-semibold">
                          {league.participants}/{league.totalPlayers}
                        </span>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-gray-400">
                          <Trophy className="w-4 h-4" />
                          <span>Tu Posición</span>
                        </div>
                        <span className="text-emerald-400 font-semibold">
                          {league.yourRank ? `#${league.yourRank}` : '-'}
                        </span>
                      </div>

                      {league.prize && (
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2 text-gray-400">
                            <DollarSign className="w-4 h-4" />
                            <span>Premio</span>
                          </div>
                          <span className="text-emerald-400 font-semibold">{league.prize}</span>
                        </div>
                      )}
                    </div>

                    {/* Progress Bar */}
                    <div className="mb-4">
                      <div className="flex items-center justify-between text-sm mb-2">
                        <span className="text-gray-400">Progreso</span>
                        <span className="text-gray-300 font-medium">{league.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-emerald-500 to-teal-600 h-2 rounded-full transition-all"
                          style={{ width: `${league.progress}%` }}
                        />
                      </div>
                    </div>

                    {/* Action Button */}
                    <Button
                      onClick={() => handleViewLeague(league.id)}
                      className="w-full bg-gradient-to-r from-gray-700 to-gray-600 hover:from-emerald-500/20 hover:to-blue-600/20 text-white border border-gray-600 hover:border-emerald-500/30"
                    >
                      Ver Liga
                      <ChevronRight className="w-4 h-4 ml-2" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </main>
      </div>

      {/* Mobile FAB */}
      <button
        onClick={() => navigate('/leagues/create')}
        className="lg:hidden fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 rounded-full shadow-lg flex items-center justify-center text-white z-50"
      >
        <Plus className="w-6 h-6" />
      </button>
    </div>
  );
}
