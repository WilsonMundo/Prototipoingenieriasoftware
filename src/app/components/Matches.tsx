import { useState } from 'react';
import { 
  Calendar,
  Clock,
  MapPin,
  Search,
  Target,
  TrendingUp,
  Users,
  Play
} from 'lucide-react';
import { Sidebar } from './Sidebar';
import { Navbar } from './Navbar';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { cn } from './ui/utils';

type MatchPhase = 'group' | 'round-16' | 'quarter' | 'semi' | 'final';
type MatchStatus = 'upcoming' | 'live' | 'finished';

interface Match {
  id: number;
  teamA: {
    name: string;
    flag: string;
    score?: number;
  };
  teamB: {
    name: string;
    flag: string;
    score?: number;
  };
  date: string;
  time: string;
  stadium: string;
  city: string;
  phase: MatchPhase;
  group?: string;
  status: MatchStatus;
  predictors?: number;
  hasPrediction?: boolean;
}

const mockMatches: Match[] = [
  {
    id: 1,
    teamA: { name: 'USA', flag: '🇺🇸' },
    teamB: { name: 'México', flag: '🇲🇽' },
    date: '2026-06-11',
    time: '18:00',
    stadium: 'MetLife Stadium',
    city: 'Nueva York',
    phase: 'group',
    group: 'A',
    status: 'live',
    predictors: 1245,
    hasPrediction: true,
  },
  {
    id: 2,
    teamA: { name: 'Brasil', flag: '🇧🇷' },
    teamB: { name: 'Argentina', flag: '🇦🇷' },
    date: '2026-06-20',
    time: '16:00',
    stadium: 'SoFi Stadium',
    city: 'Los Ángeles',
    phase: 'group',
    group: 'C',
    status: 'upcoming',
    predictors: 3456,
    hasPrediction: false,
  },
  {
    id: 3,
    teamA: { name: 'España', flag: '🇪🇸', score: 3 },
    teamB: { name: 'Alemania', flag: '🇩🇪', score: 2 },
    date: '2026-06-15',
    time: '19:00',
    stadium: 'AT&T Stadium',
    city: 'Dallas',
    phase: 'group',
    group: 'B',
    status: 'finished',
    predictors: 2890,
    hasPrediction: true,
  },
  {
    id: 4,
    teamA: { name: 'Francia', flag: '🇫🇷', score: 2 },
    teamB: { name: 'Portugal', flag: '🇵🇹', score: 1 },
    date: '2026-06-16',
    time: '14:00',
    stadium: 'BC Place',
    city: 'Vancouver',
    phase: 'group',
    group: 'D',
    status: 'finished',
    predictors: 2345,
    hasPrediction: true,
  },
  {
    id: 5,
    teamA: { name: 'Inglaterra', flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿' },
    teamB: { name: 'Italia', flag: '🇮🇹' },
    date: '2026-06-22',
    time: '20:00',
    stadium: 'Mercedes-Benz Stadium',
    city: 'Atlanta',
    phase: 'group',
    group: 'E',
    status: 'upcoming',
    predictors: 2678,
    hasPrediction: true,
  },
  {
    id: 6,
    teamA: { name: 'Países Bajos', flag: '🇳🇱' },
    teamB: { name: 'Bélgica', flag: '🇧🇪' },
    date: '2026-06-23',
    time: '15:00',
    stadium: 'BMO Field',
    city: 'Toronto',
    phase: 'group',
    group: 'F',
    status: 'upcoming',
    predictors: 1890,
  },
  {
    id: 7,
    teamA: { name: 'Colombia', flag: '🇨🇴' },
    teamB: { name: 'Uruguay', flag: '🇺🇾' },
    date: '2026-06-24',
    time: '18:30',
    stadium: 'Estadio Azteca',
    city: 'Ciudad de México',
    phase: 'group',
    group: 'G',
    status: 'upcoming',
    predictors: 1567,
  },
  {
    id: 8,
    teamA: { name: 'Japón', flag: '🇯🇵' },
    teamB: { name: 'Corea del Sur', flag: '🇰🇷' },
    date: '2026-06-25',
    time: '13:00',
    stadium: 'Levi\'s Stadium',
    city: 'San Francisco',
    phase: 'group',
    group: 'H',
    status: 'upcoming',
    predictors: 1234,
    hasPrediction: true,
  },
  {
    id: 9,
    teamA: { name: 'TBD', flag: '🏆' },
    teamB: { name: 'TBD', flag: '🏆' },
    date: '2026-07-05',
    time: '16:00',
    stadium: 'MetLife Stadium',
    city: 'Nueva York',
    phase: 'round-16',
    status: 'upcoming',
    predictors: 856,
  },
  {
    id: 10,
    teamA: { name: 'TBD', flag: '🏆' },
    teamB: { name: 'TBD', flag: '🏆' },
    date: '2026-07-10',
    time: '18:00',
    stadium: 'SoFi Stadium',
    city: 'Los Ángeles',
    phase: 'quarter',
    status: 'upcoming',
    predictors: 645,
  },
  {
    id: 11,
    teamA: { name: 'TBD', flag: '🏆' },
    teamB: { name: 'TBD', flag: '🏆' },
    date: '2026-07-14',
    time: '19:00',
    stadium: 'AT&T Stadium',
    city: 'Dallas',
    phase: 'semi',
    status: 'upcoming',
    predictors: 423,
  },
  {
    id: 12,
    teamA: { name: 'TBD', flag: '🏆' },
    teamB: { name: 'TBD', flag: '🏆' },
    date: '2026-07-19',
    time: '15:00',
    stadium: 'MetLife Stadium',
    city: 'Nueva York',
    phase: 'final',
    status: 'upcoming',
    predictors: 1567,
  },
];

const phaseLabels: Record<MatchPhase, string> = {
  group: 'Fase de Grupos',
  'round-16': 'Octavos de Final',
  quarter: 'Cuartos de Final',
  semi: 'Semifinal',
  final: 'Final',
};

export function Matches() {
  const [matches] = useState(mockMatches);
  const [searchQuery, setSearchQuery] = useState('');
  const [phaseFilter, setPhaseFilter] = useState<MatchPhase | 'all'>('all');

  const filteredMatches = matches.filter((match) => {
    const matchesSearch = 
      match.teamA.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      match.teamB.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      match.city.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesPhase = phaseFilter === 'all' || match.phase === phaseFilter;
    
    return matchesSearch && matchesPhase;
  });

  const upcomingCount = matches.filter(m => m.status === 'upcoming').length;
  const liveCount = matches.filter(m => m.status === 'live').length;

  return (
    <div className="flex h-screen bg-[#0a0e13] dark">
      {/* Desktop Sidebar */}
      <div className="hidden lg:block">
        <Sidebar activeSection="matches" />
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
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
                <Calendar className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">Partidos</h1>
                <p className="text-sm text-gray-400">
                  {liveCount > 0 && `${liveCount} en vivo • `}{upcomingCount} próximos
                </p>
              </div>
            </div>
          </div>

          {/* Mobile Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              type="text"
              placeholder="Buscar partidos..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-500 focus:border-green-500/50 focus:ring-green-500/20"
            />
          </div>
        </div>

        {/* Desktop Header */}
        <div className="hidden lg:block p-6 pb-0">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-3xl font-bold text-white mb-2">Partidos del Mundial 2026</h1>
                <p className="text-gray-400">
                  Calendario completo de partidos •{' '}
                  {liveCount > 0 && (
                    <span className="text-red-400 font-medium">{liveCount} en vivo</span>
                  )}
                  {liveCount > 0 && ' • '}
                  <span className="text-emerald-400 font-medium">{upcomingCount} próximos</span>
                </p>
              </div>
            </div>

            {/* Desktop Search */}
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Buscar partidos, equipos o ciudades..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-500 focus:border-green-500/50 focus:ring-green-500/20"
              />
            </div>
          </div>
        </div>

        {/* Phase Filters */}
        <div className="border-b border-gray-800 bg-[#0f1419] sticky top-0 z-10">
          <div className="px-4 lg:px-6 py-4 max-w-7xl lg:mx-auto">
            <div className="flex gap-2 overflow-x-auto scrollbar-hide">
              <button
                onClick={() => setPhaseFilter('all')}
                className={cn(
                  "px-4 py-2 rounded-lg font-medium transition-all whitespace-nowrap",
                  phaseFilter === 'all'
                    ? "bg-gradient-to-r from-green-500/20 to-emerald-600/20 text-white border border-green-500/30"
                    : "bg-gray-800/50 text-gray-400 hover:text-white hover:bg-gray-800"
                )}
              >
                Todos
              </button>
              {(['group', 'round-16', 'quarter', 'semi', 'final'] as MatchPhase[]).map((phase) => (
                <button
                  key={phase}
                  onClick={() => setPhaseFilter(phase)}
                  className={cn(
                    "px-4 py-2 rounded-lg font-medium transition-all whitespace-nowrap",
                    phaseFilter === phase
                      ? "bg-gradient-to-r from-green-500/20 to-emerald-600/20 text-white border border-green-500/30"
                      : "bg-gray-800/50 text-gray-400 hover:text-white hover:bg-gray-800"
                  )}
                >
                  {phaseLabels[phase]}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-6">
          <div className="max-w-7xl mx-auto space-y-4">
            {filteredMatches.length === 0 && (
              <div className="flex flex-col items-center justify-center py-16 px-4">
                <div className="w-20 h-20 bg-gray-800/50 rounded-full flex items-center justify-center mb-4">
                  <Calendar className="w-10 h-10 text-gray-600" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">No hay partidos</h3>
                <p className="text-gray-400 text-center max-w-sm">
                  No se encontraron partidos con ese criterio
                </p>
              </div>
            )}

            {filteredMatches.map((match) => (
              <Card 
                key={match.id} 
                className={cn(
                  "bg-gray-800/50 border-gray-700 overflow-hidden transition-all",
                  match.status === 'live' && "border-red-500/50 shadow-lg shadow-red-500/20"
                )}
              >
                <CardContent className="p-4 lg:p-6">
                  <div className="flex flex-col lg:flex-row gap-4">
                    {/* Left Section - Match Info */}
                    <div className="flex-1">
                      {/* Header with Phase and Status */}
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                          <Badge className="bg-gray-700 text-gray-300 border-gray-600">
                            {phaseLabels[match.phase]}
                            {match.group && ` - Grupo ${match.group}`}
                          </Badge>
                          {match.status === 'live' && (
                            <Badge className="bg-red-500/20 text-red-400 border-red-500/30 animate-pulse">
                              <Play className="w-3 h-3 mr-1 fill-current" />
                              EN VIVO
                            </Badge>
                          )}
                          {match.status === 'finished' && (
                            <Badge className="bg-gray-600/20 text-gray-400 border-gray-600/30">
                              Finalizado
                            </Badge>
                          )}
                        </div>
                        {match.predictors !== undefined && (
                          <div className="flex items-center gap-1 text-sm text-gray-400">
                            <Users className="w-4 h-4" />
                            <span>{match.predictors}</span>
                          </div>
                        )}
                      </div>

                      {/* Teams */}
                      <div className="flex items-center gap-4 mb-4">
                        <div className="flex-1 text-center lg:text-left">
                          <div className="flex items-center justify-center lg:justify-start gap-3 mb-2">
                            <div className="text-4xl lg:text-5xl">{match.teamA.flag}</div>
                            <div>
                              <p className="text-white font-bold text-lg lg:text-xl">{match.teamA.name}</p>
                            </div>
                          </div>
                        </div>

                        <div className="text-center min-w-[80px]">
                          {match.status === 'finished' ? (
                            <div className="bg-gray-900/50 rounded-lg px-4 py-2 border border-gray-700">
                              <p className="text-3xl font-bold text-white">
                                {match.teamA.score} - {match.teamB.score}
                              </p>
                            </div>
                          ) : (
                            <div className="text-gray-500 font-bold text-2xl">VS</div>
                          )}
                        </div>

                        <div className="flex-1 text-center lg:text-right">
                          <div className="flex items-center justify-center lg:justify-end gap-3 mb-2">
                            <div className="lg:order-2">
                              <p className="text-white font-bold text-lg lg:text-xl">{match.teamB.name}</p>
                            </div>
                            <div className="text-4xl lg:text-5xl lg:order-1">{match.teamB.flag}</div>
                          </div>
                        </div>
                      </div>

                      {/* Match Details */}
                      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          <span>{match.date}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          <span>{match.time}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          <span>{match.stadium}, {match.city}</span>
                        </div>
                      </div>

                      {/* Prediction Status */}
                      {match.hasPrediction && match.status === 'upcoming' && (
                        <div className="mt-3 bg-green-500/10 border border-green-500/20 rounded-lg p-2 flex items-center gap-2">
                          <Target className="w-4 h-4 text-green-400" />
                          <span className="text-green-400 text-sm font-medium">Ya has realizado tu predicción</span>
                        </div>
                      )}
                    </div>

                    {/* Right Section - Actions */}
                    <div className="lg:min-w-[140px] flex lg:flex-col gap-2">
                      {match.status === 'upcoming' && (
                        <>
                          {!match.hasPrediction ? (
                            <Button className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white">
                              <Target className="w-4 h-4 mr-2" />
                              Predecir
                            </Button>
                          ) : (
                            <Button 
                              variant="outline" 
                              className="flex-1 bg-gray-700/50 border-gray-600 text-gray-300 hover:bg-gray-700"
                            >
                              Editar
                            </Button>
                          )}
                        </>
                      )}
                      {match.status === 'finished' && (
                        <Button 
                          variant="outline" 
                          className="flex-1 bg-gray-700/50 border-gray-600 text-gray-300 hover:bg-gray-700"
                        >
                          Ver Resultados
                        </Button>
                      )}
                      {match.status === 'live' && (
                        <Button className="flex-1 bg-red-500/20 border-red-500/30 text-red-400 hover:bg-red-500/30">
                          <Play className="w-4 h-4 mr-2" />
                          Ver en Vivo
                        </Button>
                      )}
                      <Button 
                        variant="outline" 
                        className="flex-1 bg-gray-700/50 border-gray-600 text-gray-300 hover:bg-gray-700"
                      >
                        <TrendingUp className="w-4 h-4 mr-2" />
                        Estadísticas
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
