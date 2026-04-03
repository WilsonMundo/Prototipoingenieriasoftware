import { useState } from 'react';
import { 
  Target,
  Calendar,
  Clock,
  TrendingUp,
  CheckCircle2,
  AlertCircle,
  Search,
  Filter
} from 'lucide-react';
import { Sidebar } from './Sidebar';
import { Navbar } from './Navbar';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { cn } from './ui/utils';

type PredictionStatus = 'pending' | 'correct' | 'partial' | 'incorrect';
type MatchStatus = 'upcoming' | 'live' | 'finished';

interface Prediction {
  id: number;
  match: {
    teamA: string;
    teamB: string;
    flagA: string;
    flagB: string;
    date: string;
    time: string;
    status: MatchStatus;
  };
  prediction?: {
    scoreA: number;
    scoreB: number;
    points?: number;
    status?: PredictionStatus;
  };
  actualScore?: {
    scoreA: number;
    scoreB: number;
  };
  league: string;
}

const mockPredictions: Prediction[] = [
  {
    id: 1,
    match: {
      teamA: 'Brasil',
      teamB: 'Argentina',
      flagA: '🇧🇷',
      flagB: '🇦🇷',
      date: '2026-06-20',
      time: '16:00',
      status: 'upcoming',
    },
    league: 'Liga de Campeones',
  },
  {
    id: 2,
    match: {
      teamA: 'España',
      teamB: 'Alemania',
      flagA: '🇪🇸',
      flagB: '🇩🇪',
      date: '2026-06-21',
      time: '19:00',
      status: 'upcoming',
    },
    prediction: {
      scoreA: 2,
      scoreB: 1,
    },
    league: 'Liga de Campeones',
  },
  {
    id: 3,
    match: {
      teamA: 'Francia',
      teamB: 'Portugal',
      flagA: '🇫🇷',
      flagB: '🇵🇹',
      date: '2026-06-15',
      time: '14:00',
      status: 'finished',
    },
    prediction: {
      scoreA: 3,
      scoreB: 2,
      points: 5,
      status: 'correct',
    },
    actualScore: {
      scoreA: 3,
      scoreB: 2,
    },
    league: 'Liga de Campeones',
  },
  {
    id: 4,
    match: {
      teamA: 'Inglaterra',
      teamB: 'Italia',
      flagA: '🏴󠁧󠁢󠁥󠁮󠁧󠁿',
      flagB: '🇮🇹',
      date: '2026-06-16',
      time: '16:30',
      status: 'finished',
    },
    prediction: {
      scoreA: 2,
      scoreB: 0,
      points: 3,
      status: 'partial',
    },
    actualScore: {
      scoreA: 2,
      scoreB: 1,
    },
    league: 'Oficina Mundial',
  },
  {
    id: 5,
    match: {
      teamA: 'Países Bajos',
      teamB: 'Bélgica',
      flagA: '🇳🇱',
      flagB: '🇧🇪',
      date: '2026-06-17',
      time: '18:00',
      status: 'finished',
    },
    prediction: {
      scoreA: 1,
      scoreB: 1,
      points: 0,
      status: 'incorrect',
    },
    actualScore: {
      scoreA: 3,
      scoreB: 0,
    },
    league: 'Pro League Elite',
  },
  {
    id: 6,
    match: {
      teamA: 'México',
      teamB: 'Uruguay',
      flagA: '🇲🇽',
      flagB: '🇺🇾',
      date: '2026-06-22',
      time: '20:00',
      status: 'upcoming',
    },
    prediction: {
      scoreA: 2,
      scoreB: 2,
    },
    league: 'Liga de Campeones',
  },
  {
    id: 7,
    match: {
      teamA: 'Colombia',
      teamB: 'Chile',
      flagA: '🇨🇴',
      flagB: '🇨🇱',
      date: '2026-06-23',
      time: '15:00',
      status: 'upcoming',
    },
    league: 'Amigos del Fútbol',
  },
  {
    id: 8,
    match: {
      teamA: 'USA',
      teamB: 'Canadá',
      flagA: '🇺🇸',
      flagB: '🇨🇦',
      date: '2026-06-18',
      time: '21:00',
      status: 'live',
    },
    prediction: {
      scoreA: 1,
      scoreB: 0,
    },
    league: 'Mundial de Oficina',
  },
];

export function Predictions() {
  const [predictions] = useState(mockPredictions);
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState<'all' | 'pending' | 'predicted' | 'finished'>('all');

  const filteredPredictions = predictions.filter((pred) => {
    const matchesSearch = 
      pred.match.teamA.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pred.match.teamB.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pred.league.toLowerCase().includes(searchQuery.toLowerCase());
    
    let matchesFilter = true;
    if (filter === 'pending') matchesFilter = !pred.prediction;
    if (filter === 'predicted') matchesFilter = !!pred.prediction && pred.match.status === 'upcoming';
    if (filter === 'finished') matchesFilter = pred.match.status === 'finished';
    
    return matchesSearch && matchesFilter;
  });

  const stats = {
    total: predictions.length,
    pending: predictions.filter(p => !p.prediction).length,
    correct: predictions.filter(p => p.prediction?.status === 'correct').length,
    accuracy: Math.round((predictions.filter(p => p.prediction?.status === 'correct').length / predictions.filter(p => p.match.status === 'finished').length) * 100) || 0,
  };

  const getStatusBadge = (status?: PredictionStatus) => {
    if (!status) return null;
    
    const config = {
      correct: { color: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30', icon: CheckCircle2, label: 'Correcto' },
      partial: { color: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30', icon: TrendingUp, label: 'Parcial' },
      incorrect: { color: 'bg-red-500/20 text-red-400 border-red-500/30', icon: AlertCircle, label: 'Incorrecto' },
      pending: { color: 'bg-blue-500/20 text-blue-400 border-blue-500/30', icon: Clock, label: 'Pendiente' },
    };
    
    const { color, icon: Icon, label } = config[status];
    return (
      <Badge className={color}>
        <Icon className="w-3 h-3 mr-1" />
        {label}
      </Badge>
    );
  };

  return (
    <div className="flex h-screen bg-[#0a0e13] dark">
      {/* Desktop Sidebar */}
      <div className="hidden lg:block">
        <Sidebar activeSection="predictions" />
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
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg flex items-center justify-center">
                <Target className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">Predicciones</h1>
                <p className="text-sm text-gray-400">{stats.pending} pendientes</p>
              </div>
            </div>
            <button className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors">
              <Filter className="w-5 h-5" />
            </button>
          </div>

          {/* Mobile Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              type="text"
              placeholder="Buscar partidos..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-500 focus:border-purple-500/50 focus:ring-purple-500/20"
            />
          </div>
        </div>

        {/* Desktop Header */}
        <div className="hidden lg:block p-6 pb-0">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-3xl font-bold text-white mb-2">Mis Predicciones</h1>
                <p className="text-gray-400">Realiza y gestiona tus predicciones para el Mundial 2026</p>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-4 gap-4 mb-6">
              <Card className="bg-gray-800/50 border-gray-700">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
                      <Target className="w-5 h-5 text-blue-400" />
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Total</p>
                      <p className="text-white text-xl font-bold">{stats.total}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-gray-800/50 border-gray-700">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-yellow-500/20 rounded-lg flex items-center justify-center">
                      <Clock className="w-5 h-5 text-yellow-400" />
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Pendientes</p>
                      <p className="text-white text-xl font-bold">{stats.pending}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-gray-800/50 border-gray-700">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-emerald-500/20 rounded-lg flex items-center justify-center">
                      <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Correctas</p>
                      <p className="text-white text-xl font-bold">{stats.correct}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-gray-800/50 border-gray-700">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center">
                      <TrendingUp className="w-5 h-5 text-purple-400" />
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Precisión</p>
                      <p className="text-white text-xl font-bold">{stats.accuracy}%</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Desktop Search */}
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Buscar partidos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-500 focus:border-purple-500/50 focus:ring-purple-500/20"
              />
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="border-b border-gray-800 bg-[#0f1419] sticky top-0 z-10">
          <div className="px-4 lg:px-6 py-4 max-w-7xl lg:mx-auto">
            <div className="flex gap-2 overflow-x-auto scrollbar-hide">
              <button
                onClick={() => setFilter('all')}
                className={cn(
                  "px-4 py-2 rounded-lg font-medium transition-all whitespace-nowrap",
                  filter === 'all'
                    ? "bg-gradient-to-r from-purple-500/20 to-pink-600/20 text-white border border-purple-500/30"
                    : "bg-gray-800/50 text-gray-400 hover:text-white hover:bg-gray-800"
                )}
              >
                Todas
              </button>
              <button
                onClick={() => setFilter('pending')}
                className={cn(
                  "px-4 py-2 rounded-lg font-medium transition-all whitespace-nowrap",
                  filter === 'pending'
                    ? "bg-gradient-to-r from-purple-500/20 to-pink-600/20 text-white border border-purple-500/30"
                    : "bg-gray-800/50 text-gray-400 hover:text-white hover:bg-gray-800"
                )}
              >
                Sin Predecir
              </button>
              <button
                onClick={() => setFilter('predicted')}
                className={cn(
                  "px-4 py-2 rounded-lg font-medium transition-all whitespace-nowrap",
                  filter === 'predicted'
                    ? "bg-gradient-to-r from-purple-500/20 to-pink-600/20 text-white border border-purple-500/30"
                    : "bg-gray-800/50 text-gray-400 hover:text-white hover:bg-gray-800"
                )}
              >
                Predichas
              </button>
              <button
                onClick={() => setFilter('finished')}
                className={cn(
                  "px-4 py-2 rounded-lg font-medium transition-all whitespace-nowrap",
                  filter === 'finished'
                    ? "bg-gradient-to-r from-purple-500/20 to-pink-600/20 text-white border border-purple-500/30"
                    : "bg-gray-800/50 text-gray-400 hover:text-white hover:bg-gray-800"
                )}
              >
                Finalizadas
              </button>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-6">
          <div className="max-w-7xl mx-auto space-y-4">
            {filteredPredictions.length === 0 && (
              <div className="flex flex-col items-center justify-center py-16 px-4">
                <div className="w-20 h-20 bg-gray-800/50 rounded-full flex items-center justify-center mb-4">
                  <Target className="w-10 h-10 text-gray-600" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">No hay predicciones</h3>
                <p className="text-gray-400 text-center max-w-sm">
                  {searchQuery ? 'No se encontraron predicciones' : 'Empieza a predecir resultados'}
                </p>
              </div>
            )}

            {filteredPredictions.map((pred) => (
              <Card key={pred.id} className="bg-gray-800/50 border-gray-700 overflow-hidden hover:border-purple-500/30 transition-all">
                <CardContent className="p-4 lg:p-6">
                  <div className="flex flex-col lg:flex-row gap-4">
                    {/* Match Info */}
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-4">
                        <Badge className="bg-gray-700 text-gray-300 border-gray-600">
                          {pred.league}
                        </Badge>
                        {pred.match.status === 'live' && (
                          <Badge className="bg-red-500/20 text-red-400 border-red-500/30 animate-pulse">
                            EN VIVO
                          </Badge>
                        )}
                      </div>

                      {/* Teams */}
                      <div className="flex items-center gap-4 mb-4">
                        <div className="flex-1 text-center">
                          <div className="text-5xl mb-2">{pred.match.flagA}</div>
                          <p className="text-white font-semibold">{pred.match.teamA}</p>
                          {pred.actualScore && (
                            <p className="text-3xl font-bold text-emerald-400 mt-2">{pred.actualScore.scoreA}</p>
                          )}
                        </div>

                        <div className="text-center">
                          <p className="text-gray-500 font-bold text-xl mb-2">VS</p>
                          {pred.prediction && !pred.actualScore && (
                            <div className="bg-purple-500/20 border border-purple-500/30 rounded-lg px-3 py-1">
                              <p className="text-purple-400 font-bold text-lg">
                                {pred.prediction.scoreA} - {pred.prediction.scoreB}
                              </p>
                              <p className="text-xs text-purple-300">Tu predicción</p>
                            </div>
                          )}
                        </div>

                        <div className="flex-1 text-center">
                          <div className="text-5xl mb-2">{pred.match.flagB}</div>
                          <p className="text-white font-semibold">{pred.match.teamB}</p>
                          {pred.actualScore && (
                            <p className="text-3xl font-bold text-emerald-400 mt-2">{pred.actualScore.scoreB}</p>
                          )}
                        </div>
                      </div>

                      {/* Match Details */}
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-4 text-gray-400">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            <span>{pred.match.date}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            <span>{pred.match.time}</span>
                          </div>
                        </div>

                        {pred.prediction?.status && getStatusBadge(pred.prediction.status)}
                      </div>

                      {/* Points */}
                      {pred.prediction?.points !== undefined && (
                        <div className="mt-3 bg-gradient-to-r from-emerald-500/10 to-blue-600/10 border border-emerald-500/20 rounded-lg p-3">
                          <p className="text-emerald-400 font-semibold">
                            +{pred.prediction.points} puntos ganados
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="lg:min-w-[140px] flex lg:flex-col gap-2">
                      {!pred.prediction && pred.match.status === 'upcoming' && (
                        <Button className="flex-1 bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white">
                          <Target className="w-4 h-4 mr-2" />
                          Predecir
                        </Button>
                      )}
                      {pred.prediction && pred.match.status === 'upcoming' && (
                        <Button variant="outline" className="flex-1 bg-gray-700/50 border-gray-600 text-gray-300 hover:bg-gray-700">
                          Editar
                        </Button>
                      )}
                      {pred.match.status === 'finished' && (
                        <Button variant="outline" className="flex-1 bg-gray-700/50 border-gray-600 text-gray-300 hover:bg-gray-700">
                          Ver Detalles
                        </Button>
                      )}
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
