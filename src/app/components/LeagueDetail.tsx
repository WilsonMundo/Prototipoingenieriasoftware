import { useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import {
  ArrowLeft,
  Users,
  Trophy,
  DollarSign,
  Share2,
  Settings,
  TrendingUp,
  Calendar,
  Target,
  Award,
  ChevronRight,
} from 'lucide-react';
import { Sidebar } from './Sidebar';
import { Navbar } from './Navbar';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { cn } from './ui/utils';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table';

export function LeagueDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState<'rankings' | 'matches' | 'rules'>('rankings');

  // Mock data - in real app would fetch based on ID
  const league = {
    id: parseInt(id || '1'),
    name: 'Liga de Campeones',
    type: 'bet' as const,
    status: 'activa' as const,
    participants: 24,
    totalPlayers: 24,
    yourRank: 3,
    prize: '$500',
    progress: 75,
    description: 'Liga competitiva para los mejores predictores del Mundial 2026',
    startDate: '2026-06-15',
    endDate: '2026-07-19',
    createdBy: 'Carlos Mendoza',
  };

  const rankings = [
    {
      rank: 1,
      name: 'Sarah Johnson',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
      points: 485,
      predictions: 32,
      accuracy: 78,
    },
    {
      rank: 2,
      name: 'Mike Chen',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mike',
      points: 456,
      predictions: 30,
      accuracy: 75,
    },
    {
      rank: 3,
      name: 'Tú',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John',
      points: 342,
      predictions: 28,
      accuracy: 71,
      isCurrentUser: true,
    },
    {
      rank: 4,
      name: 'Emma Wilson',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emma',
      points: 318,
      predictions: 28,
      accuracy: 69,
    },
    {
      rank: 5,
      name: 'David Brown',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=David',
      points: 295,
      predictions: 27,
      accuracy: 68,
    },
  ];

  const upcomingMatches = [
    {
      id: 1,
      teamA: 'Brasil',
      teamB: 'Argentina',
      flagA: '🇧🇷',
      flagB: '🇦🇷',
      date: '2026-06-20',
      time: '16:00',
      predicted: false,
    },
    {
      id: 2,
      teamA: 'España',
      teamB: 'Alemania',
      flagA: '🇪🇸',
      flagB: '🇩🇪',
      date: '2026-06-21',
      time: '19:00',
      predicted: true,
    },
    {
      id: 3,
      teamA: 'Francia',
      teamB: 'Portugal',
      flagA: '🇫🇷',
      flagB: '🇵🇹',
      date: '2026-06-22',
      time: '14:00',
      predicted: false,
    },
  ];

  const stats = [
    {
      label: 'Participantes',
      value: `${league.participants}/${league.totalPlayers}`,
      icon: Users,
      color: 'text-blue-400',
      bg: 'bg-blue-500/20',
    },
    {
      label: 'Tu Posición',
      value: `#${league.yourRank}`,
      icon: Trophy,
      color: 'text-emerald-400',
      bg: 'bg-emerald-500/20',
    },
    {
      label: 'Premio',
      value: league.prize,
      icon: DollarSign,
      color: 'text-purple-400',
      bg: 'bg-purple-500/20',
    },
    {
      label: 'Progreso',
      value: `${league.progress}%`,
      icon: TrendingUp,
      color: 'text-yellow-400',
      bg: 'bg-yellow-500/20',
    },
  ];

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
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigate('/leagues')}
              className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
            <h1 className="text-lg font-bold text-white truncate flex-1 mx-4">
              {league.name}
            </h1>
            <button className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors">
              <Share2 className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto">
          <div className="max-w-7xl mx-auto p-4 lg:p-6 space-y-6">
            {/* Desktop Header */}
            <div className="hidden lg:block">
              <Button
                variant="ghost"
                onClick={() => navigate('/leagues')}
                className="text-gray-400 hover:text-white mb-4"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Volver a Mis Ligas
              </Button>

              <div className="flex items-start justify-between mb-6">
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <h1 className="text-3xl font-bold text-white">{league.name}</h1>
                    <Badge
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
                          : 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
                      )}
                    >
                      {league.status}
                    </Badge>
                  </div>
                  <p className="text-gray-400">{league.description}</p>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    className="bg-gray-800/50 border-gray-700 text-gray-300 hover:bg-gray-700 hover:text-white"
                  >
                    <Share2 className="w-4 h-4 mr-2" />
                    Compartir
                  </Button>
                  <Button
                    variant="outline"
                    className="bg-gray-800/50 border-gray-700 text-gray-300 hover:bg-gray-700 hover:text-white"
                  >
                    <Settings className="w-4 h-4 mr-2" />
                    Configurar
                  </Button>
                </div>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <Card key={index} className="bg-gray-800/50 border-gray-700">
                    <CardContent className="p-4 lg:p-6">
                      <div className={cn('w-10 h-10 rounded-lg flex items-center justify-center mb-3', stat.bg)}>
                        <Icon className={cn('w-5 h-5', stat.color)} />
                      </div>
                      <p className="text-gray-400 text-sm mb-1">{stat.label}</p>
                      <p className="text-white text-2xl font-bold">{stat.value}</p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* Tabs */}
            <div className="border-b border-gray-800">
              <div className="flex gap-1 overflow-x-auto scrollbar-hide">
                <button
                  onClick={() => setActiveTab('rankings')}
                  className={cn(
                    'px-6 py-3 font-medium transition-all whitespace-nowrap border-b-2',
                    activeTab === 'rankings'
                      ? 'text-emerald-400 border-emerald-400'
                      : 'text-gray-400 border-transparent hover:text-white'
                  )}
                >
                  <Award className="w-4 h-4 inline mr-2" />
                  Rankings
                </button>
                <button
                  onClick={() => setActiveTab('matches')}
                  className={cn(
                    'px-6 py-3 font-medium transition-all whitespace-nowrap border-b-2',
                    activeTab === 'matches'
                      ? 'text-emerald-400 border-emerald-400'
                      : 'text-gray-400 border-transparent hover:text-white'
                  )}
                >
                  <Calendar className="w-4 h-4 inline mr-2" />
                  Partidos
                </button>
                <button
                  onClick={() => setActiveTab('rules')}
                  className={cn(
                    'px-6 py-3 font-medium transition-all whitespace-nowrap border-b-2',
                    activeTab === 'rules'
                      ? 'text-emerald-400 border-emerald-400'
                      : 'text-gray-400 border-transparent hover:text-white'
                  )}
                >
                  <Target className="w-4 h-4 inline mr-2" />
                  Reglas
                </button>
              </div>
            </div>

            {/* Tab Content */}
            {activeTab === 'rankings' && (
              <Card className="bg-gray-800/50 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">Tabla de Posiciones</CardTitle>
                </CardHeader>
                <CardContent>
                  {/* Mobile View */}
                  <div className="lg:hidden space-y-3">
                    {rankings.map((player) => (
                      <div
                        key={player.rank}
                        className={cn(
                          'p-4 rounded-lg border transition-all',
                          player.isCurrentUser
                            ? 'bg-emerald-500/10 border-emerald-500/30'
                            : 'bg-gray-900/50 border-gray-700'
                        )}
                      >
                        <div className="flex items-center gap-3 mb-3">
                          <div
                            className={cn(
                              'w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm',
                              player.rank === 1
                                ? 'bg-yellow-500/20 text-yellow-400'
                                : player.rank === 2
                                ? 'bg-gray-400/20 text-gray-300'
                                : player.rank === 3
                                ? 'bg-orange-500/20 text-orange-400'
                                : 'bg-gray-700 text-gray-400'
                            )}
                          >
                            {player.rank}
                          </div>
                          <Avatar className="w-10 h-10">
                            <AvatarImage src={player.avatar} />
                            <AvatarFallback>{player.name[0]}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <p className="font-semibold text-white">
                              {player.name}
                              {player.isCurrentUser && (
                                <span className="ml-2 text-xs bg-emerald-500 text-white px-2 py-0.5 rounded-full">
                                  Tú
                                </span>
                              )}
                            </p>
                            <p className="text-sm text-gray-400">{player.points} puntos</p>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div className="bg-gray-800 rounded p-2">
                            <span className="text-gray-400">Predicciones: </span>
                            <span className="text-white font-medium">{player.predictions}</span>
                          </div>
                          <div className="bg-gray-800 rounded p-2">
                            <span className="text-gray-400">Precisión: </span>
                            <span className="text-emerald-400 font-medium">{player.accuracy}%</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Desktop Table View */}
                  <div className="hidden lg:block">
                    <Table>
                      <TableHeader>
                        <TableRow className="border-gray-700 hover:bg-transparent">
                          <TableHead className="text-gray-400">Posición</TableHead>
                          <TableHead className="text-gray-400">Jugador</TableHead>
                          <TableHead className="text-gray-400">Puntos</TableHead>
                          <TableHead className="text-gray-400">Predicciones</TableHead>
                          <TableHead className="text-gray-400">Precisión</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {rankings.map((player) => (
                          <TableRow
                            key={player.rank}
                            className={cn(
                              'border-gray-700',
                              player.isCurrentUser
                                ? 'bg-emerald-500/10 hover:bg-emerald-500/15'
                                : 'hover:bg-gray-700/30'
                            )}
                          >
                            <TableCell>
                              <div
                                className={cn(
                                  'w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm',
                                  player.rank === 1
                                    ? 'bg-yellow-500/20 text-yellow-400'
                                    : player.rank === 2
                                    ? 'bg-gray-400/20 text-gray-300'
                                    : player.rank === 3
                                    ? 'bg-orange-500/20 text-orange-400'
                                    : 'bg-gray-700 text-gray-400'
                                )}
                              >
                                {player.rank}
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-3">
                                <Avatar className="w-8 h-8">
                                  <AvatarImage src={player.avatar} />
                                  <AvatarFallback>{player.name[0]}</AvatarFallback>
                                </Avatar>
                                <span className="font-medium text-white">
                                  {player.name}
                                  {player.isCurrentUser && (
                                    <span className="ml-2 text-xs bg-emerald-500 text-white px-2 py-0.5 rounded-full">
                                      Tú
                                    </span>
                                  )}
                                </span>
                              </div>
                            </TableCell>
                            <TableCell className="text-white font-semibold">{player.points}</TableCell>
                            <TableCell className="text-gray-300">{player.predictions}</TableCell>
                            <TableCell className="text-emerald-400 font-semibold">{player.accuracy}%</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            )}

            {activeTab === 'matches' && (
              <Card className="bg-gray-800/50 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">Próximos Partidos</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {upcomingMatches.map((match) => (
                    <div
                      key={match.id}
                      className="bg-gray-900/50 border border-gray-700 rounded-lg p-4 hover:border-emerald-500/30 transition-all"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-4 flex-1">
                          <div className="text-center flex-1">
                            <div className="text-4xl mb-2">{match.flagA}</div>
                            <p className="text-white font-medium">{match.teamA}</p>
                          </div>
                          <div className="text-gray-500 font-bold text-xl">VS</div>
                          <div className="text-center flex-1">
                            <div className="text-4xl mb-2">{match.flagB}</div>
                            <p className="text-white font-medium">{match.teamB}</p>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="text-sm text-gray-400">
                          <Calendar className="w-4 h-4 inline mr-1" />
                          {match.date} • {match.time}
                        </div>
                        {match.predicted ? (
                          <Button
                            size="sm"
                            variant="outline"
                            className="bg-emerald-500/20 border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/30"
                          >
                            <Target className="w-4 h-4 mr-2" />
                            Predicho
                          </Button>
                        ) : (
                          <Button
                            size="sm"
                            className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white"
                          >
                            <Target className="w-4 h-4 mr-2" />
                            Predecir
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}

            {activeTab === 'rules' && (
              <Card className="bg-gray-800/50 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">Reglas de la Liga</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-gray-300">
                  <div>
                    <h3 className="text-white font-semibold mb-2 flex items-center gap-2">
                      <Trophy className="w-5 h-5 text-emerald-400" />
                      Sistema de Puntos
                    </h3>
                    <ul className="list-disc list-inside space-y-1 ml-6 text-sm">
                      <li>Resultado exacto: 5 puntos</li>
                      <li>Ganador correcto: 3 puntos</li>
                      <li>Empate correcto: 2 puntos</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-white font-semibold mb-2 flex items-center gap-2">
                      <Calendar className="w-5 h-5 text-blue-400" />
                      Fechas Importantes
                    </h3>
                    <ul className="list-disc list-inside space-y-1 ml-6 text-sm">
                      <li>Inicio de la liga: {league.startDate}</li>
                      <li>Finalización: {league.endDate}</li>
                      <li>Las predicciones cierran 1 hora antes de cada partido</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-white font-semibold mb-2 flex items-center gap-2">
                      <DollarSign className="w-5 h-5 text-purple-400" />
                      Premios
                    </h3>
                    <ul className="list-disc list-inside space-y-1 ml-6 text-sm">
                      <li>1er lugar: {league.prize}</li>
                      <li>2do lugar: 30% del premio total</li>
                      <li>3er lugar: 20% del premio total</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
