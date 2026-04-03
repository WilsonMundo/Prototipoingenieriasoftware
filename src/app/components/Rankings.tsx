import { useState } from 'react';
import { 
  Award,
  Trophy,
  TrendingUp,
  Target,
  Search,
  Crown,
  Medal,
  ChevronRight
} from 'lucide-react';
import { Sidebar } from './Sidebar';
import { Navbar } from './Navbar';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
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

interface Player {
  rank: number;
  name: string;
  avatar: string;
  points: number;
  predictions: number;
  accuracy: number;
  leagues: number;
  trend: 'up' | 'down' | 'same';
  isCurrentUser?: boolean;
}

const globalRankings: Player[] = [
  {
    rank: 1,
    name: 'Sarah Johnson',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
    points: 2485,
    predictions: 156,
    accuracy: 82,
    leagues: 8,
    trend: 'same',
  },
  {
    rank: 2,
    name: 'Mike Chen',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mike',
    points: 2456,
    predictions: 148,
    accuracy: 80,
    leagues: 6,
    trend: 'up',
  },
  {
    rank: 3,
    name: 'Emma Wilson',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emma',
    points: 2342,
    predictions: 145,
    accuracy: 79,
    leagues: 7,
    trend: 'down',
  },
  {
    rank: 4,
    name: 'David Brown',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=David',
    points: 2318,
    predictions: 142,
    accuracy: 78,
    leagues: 5,
    trend: 'up',
  },
  {
    rank: 5,
    name: 'Laura Martínez',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Laura',
    points: 2295,
    predictions: 140,
    accuracy: 77,
    leagues: 6,
    trend: 'up',
  },
  {
    rank: 6,
    name: 'James Lee',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=James',
    points: 2156,
    predictions: 135,
    accuracy: 76,
    leagues: 4,
    trend: 'same',
  },
  {
    rank: 7,
    name: 'Sofia Rodriguez',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sofia',
    points: 2089,
    predictions: 130,
    accuracy: 75,
    leagues: 5,
    trend: 'up',
  },
  {
    rank: 8,
    name: 'Carlos Mendoza',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Carlos',
    points: 1987,
    predictions: 128,
    accuracy: 74,
    leagues: 6,
    trend: 'down',
  },
  {
    rank: 9,
    name: 'Tú',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John',
    points: 1856,
    predictions: 120,
    accuracy: 71,
    leagues: 4,
    trend: 'up',
    isCurrentUser: true,
  },
  {
    rank: 10,
    name: 'Anna Schmidt',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Anna',
    points: 1745,
    predictions: 115,
    accuracy: 70,
    leagues: 3,
    trend: 'same',
  },
];

interface LeagueRanking {
  id: number;
  name: string;
  type: 'bet' | 'fun';
  participants: number;
  yourRank: number;
  topPlayer: {
    name: string;
    points: number;
  };
}

const leagueRankings: LeagueRanking[] = [
  {
    id: 1,
    name: 'Liga de Campeones',
    type: 'bet',
    participants: 24,
    yourRank: 3,
    topPlayer: { name: 'Sarah Johnson', points: 485 },
  },
  {
    id: 2,
    name: 'Mundial de Oficina',
    type: 'fun',
    participants: 12,
    yourRank: 1,
    topPlayer: { name: 'Tú', points: 342 },
  },
  {
    id: 3,
    name: 'Pro League Elite',
    type: 'bet',
    participants: 156,
    yourRank: 42,
    topPlayer: { name: 'Mike Chen', points: 856 },
  },
  {
    id: 4,
    name: 'Amigos del Fútbol',
    type: 'fun',
    participants: 8,
    yourRank: 2,
    topPlayer: { name: 'Emma Wilson', points: 278 },
  },
];

export function Rankings() {
  const [searchQuery, setSearchQuery] = useState('');
  const [view, setView] = useState<'global' | 'leagues'>('global');

  const filteredRankings = globalRankings.filter((player) =>
    player.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const currentUser = globalRankings.find(p => p.isCurrentUser);

  return (
    <div className="flex h-screen bg-[#0a0e13] dark">
      {/* Desktop Sidebar */}
      <div className="hidden lg:block">
        <Sidebar activeSection="rankings" />
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
              <div className="w-10 h-10 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-lg flex items-center justify-center">
                <Award className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">Rankings</h1>
                {currentUser && (
                  <p className="text-sm text-gray-400">Tu posición: #{currentUser.rank}</p>
                )}
              </div>
            </div>
          </div>

          {/* Mobile Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              type="text"
              placeholder="Buscar jugadores..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-500 focus:border-yellow-500/50 focus:ring-yellow-500/20"
            />
          </div>
        </div>

        {/* Desktop Header */}
        <div className="hidden lg:block p-6 pb-0">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-3xl font-bold text-white mb-2">Rankings</h1>
                <p className="text-gray-400">Compite con los mejores predictores del mundo</p>
              </div>
            </div>

            {/* Desktop Search */}
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Buscar jugadores..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-500 focus:border-yellow-500/50 focus:ring-yellow-500/20"
              />
            </div>
          </div>
        </div>

        {/* Your Stats Card */}
        {currentUser && view === 'global' && (
          <div className="p-4 lg:p-6 lg:pt-4">
            <div className="max-w-7xl mx-auto">
              <Card className="bg-gradient-to-r from-yellow-500/10 to-orange-600/10 border-yellow-500/30 overflow-hidden">
                <CardContent className="p-4 lg:p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        <Avatar className="w-16 h-16 lg:w-20 lg:h-20 border-2 border-yellow-500/50">
                          <AvatarImage src={currentUser.avatar} />
                          <AvatarFallback>{currentUser.name[0]}</AvatarFallback>
                        </Avatar>
                        <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center border-2 border-[#0a0e13]">
                          <Crown className="w-4 h-4 text-white" />
                        </div>
                      </div>
                      <div>
                        <h3 className="text-white font-bold text-xl mb-1">Tu Posición Global</h3>
                        <div className="flex items-center gap-3">
                          <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30 text-lg px-3">
                            #{currentUser.rank}
                          </Badge>
                          <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30">
                            <TrendingUp className="w-3 h-3 mr-1" />
                            Subiendo
                          </Badge>
                        </div>
                      </div>
                    </div>

                    <div className="hidden lg:grid grid-cols-4 gap-6">
                      <div className="text-center">
                        <p className="text-gray-400 text-sm mb-1">Puntos</p>
                        <p className="text-white text-2xl font-bold">{currentUser.points}</p>
                      </div>
                      <div className="text-center">
                        <p className="text-gray-400 text-sm mb-1">Predicciones</p>
                        <p className="text-white text-2xl font-bold">{currentUser.predictions}</p>
                      </div>
                      <div className="text-center">
                        <p className="text-gray-400 text-sm mb-1">Precisión</p>
                        <p className="text-emerald-400 text-2xl font-bold">{currentUser.accuracy}%</p>
                      </div>
                      <div className="text-center">
                        <p className="text-gray-400 text-sm mb-1">Ligas</p>
                        <p className="text-white text-2xl font-bold">{currentUser.leagues}</p>
                      </div>
                    </div>
                  </div>

                  {/* Mobile Stats */}
                  <div className="lg:hidden mt-4 grid grid-cols-4 gap-2">
                    <div className="text-center bg-gray-900/50 rounded-lg p-2">
                      <p className="text-gray-400 text-xs mb-1">Puntos</p>
                      <p className="text-white font-bold">{currentUser.points}</p>
                    </div>
                    <div className="text-center bg-gray-900/50 rounded-lg p-2">
                      <p className="text-gray-400 text-xs mb-1">Predicciones</p>
                      <p className="text-white font-bold">{currentUser.predictions}</p>
                    </div>
                    <div className="text-center bg-gray-900/50 rounded-lg p-2">
                      <p className="text-gray-400 text-xs mb-1">Precisión</p>
                      <p className="text-emerald-400 font-bold">{currentUser.accuracy}%</p>
                    </div>
                    <div className="text-center bg-gray-900/50 rounded-lg p-2">
                      <p className="text-gray-400 text-xs mb-1">Ligas</p>
                      <p className="text-white font-bold">{currentUser.leagues}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* View Tabs */}
        <div className="border-b border-gray-800 bg-[#0f1419] sticky top-0 z-10">
          <div className="px-4 lg:px-6 py-4 max-w-7xl lg:mx-auto">
            <div className="flex gap-2">
              <button
                onClick={() => setView('global')}
                className={cn(
                  "px-4 py-2 rounded-lg font-medium transition-all",
                  view === 'global'
                    ? "bg-gradient-to-r from-yellow-500/20 to-orange-600/20 text-white border border-yellow-500/30"
                    : "bg-gray-800/50 text-gray-400 hover:text-white hover:bg-gray-800"
                )}
              >
                <Trophy className="w-4 h-4 inline mr-2" />
                Global
              </button>
              <button
                onClick={() => setView('leagues')}
                className={cn(
                  "px-4 py-2 rounded-lg font-medium transition-all",
                  view === 'leagues'
                    ? "bg-gradient-to-r from-yellow-500/20 to-orange-600/20 text-white border border-yellow-500/30"
                    : "bg-gray-800/50 text-gray-400 hover:text-white hover:bg-gray-800"
                )}
              >
                <Award className="w-4 h-4 inline mr-2" />
                Mis Ligas
              </button>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-6">
          <div className="max-w-7xl mx-auto">
            {view === 'global' && (
              <Card className="bg-gray-800/50 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Trophy className="w-5 h-5 text-yellow-400" />
                    Ranking Global
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {/* Mobile View */}
                  <div className="lg:hidden space-y-3">
                    {filteredRankings.map((player) => (
                      <div
                        key={player.rank}
                        className={cn(
                          'p-4 rounded-lg border transition-all',
                          player.isCurrentUser
                            ? 'bg-yellow-500/10 border-yellow-500/30'
                            : 'bg-gray-900/50 border-gray-700'
                        )}
                      >
                        <div className="flex items-center gap-3 mb-3">
                          <div
                            className={cn(
                              'w-10 h-10 rounded-full flex items-center justify-center font-bold',
                              player.rank === 1
                                ? 'bg-gradient-to-br from-yellow-400 to-yellow-600 text-white'
                                : player.rank === 2
                                ? 'bg-gradient-to-br from-gray-300 to-gray-500 text-white'
                                : player.rank === 3
                                ? 'bg-gradient-to-br from-orange-400 to-orange-600 text-white'
                                : 'bg-gray-700 text-gray-300'
                            )}
                          >
                            {player.rank <= 3 ? <Medal className="w-5 h-5" /> : player.rank}
                          </div>
                          <Avatar className="w-12 h-12">
                            <AvatarImage src={player.avatar} />
                            <AvatarFallback>{player.name[0]}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <p className="font-semibold text-white flex items-center gap-2">
                              {player.name}
                              {player.isCurrentUser && (
                                <Badge className="bg-yellow-500 text-white">Tú</Badge>
                              )}
                            </p>
                            <p className="text-sm text-gray-400">{player.points} puntos</p>
                          </div>
                          {player.trend === 'up' && <TrendingUp className="w-5 h-5 text-emerald-400" />}
                        </div>
                        <div className="grid grid-cols-3 gap-2 text-sm">
                          <div className="bg-gray-800 rounded p-2 text-center">
                            <span className="text-gray-400 block">Predicciones</span>
                            <span className="text-white font-medium">{player.predictions}</span>
                          </div>
                          <div className="bg-gray-800 rounded p-2 text-center">
                            <span className="text-gray-400 block">Precisión</span>
                            <span className="text-emerald-400 font-medium">{player.accuracy}%</span>
                          </div>
                          <div className="bg-gray-800 rounded p-2 text-center">
                            <span className="text-gray-400 block">Ligas</span>
                            <span className="text-white font-medium">{player.leagues}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Desktop Table */}
                  <div className="hidden lg:block">
                    <Table>
                      <TableHeader>
                        <TableRow className="border-gray-700 hover:bg-transparent">
                          <TableHead className="text-gray-400">Posición</TableHead>
                          <TableHead className="text-gray-400">Jugador</TableHead>
                          <TableHead className="text-gray-400">Puntos</TableHead>
                          <TableHead className="text-gray-400">Predicciones</TableHead>
                          <TableHead className="text-gray-400">Precisión</TableHead>
                          <TableHead className="text-gray-400">Ligas</TableHead>
                          <TableHead className="text-gray-400">Tendencia</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredRankings.map((player) => (
                          <TableRow
                            key={player.rank}
                            className={cn(
                              'border-gray-700',
                              player.isCurrentUser
                                ? 'bg-yellow-500/10 hover:bg-yellow-500/15'
                                : 'hover:bg-gray-700/30'
                            )}
                          >
                            <TableCell>
                              <div
                                className={cn(
                                  'w-10 h-10 rounded-full flex items-center justify-center font-bold',
                                  player.rank === 1
                                    ? 'bg-gradient-to-br from-yellow-400 to-yellow-600 text-white'
                                    : player.rank === 2
                                    ? 'bg-gradient-to-br from-gray-300 to-gray-500 text-white'
                                    : player.rank === 3
                                    ? 'bg-gradient-to-br from-orange-400 to-orange-600 text-white'
                                    : 'bg-gray-700 text-gray-300'
                                )}
                              >
                                {player.rank <= 3 ? <Medal className="w-5 h-5" /> : player.rank}
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-3">
                                <Avatar className="w-10 h-10">
                                  <AvatarImage src={player.avatar} />
                                  <AvatarFallback>{player.name[0]}</AvatarFallback>
                                </Avatar>
                                <span className="font-medium text-white">
                                  {player.name}
                                  {player.isCurrentUser && (
                                    <Badge className="ml-2 bg-yellow-500 text-white">Tú</Badge>
                                  )}
                                </span>
                              </div>
                            </TableCell>
                            <TableCell className="text-white font-semibold">{player.points}</TableCell>
                            <TableCell className="text-gray-300">{player.predictions}</TableCell>
                            <TableCell className="text-emerald-400 font-semibold">{player.accuracy}%</TableCell>
                            <TableCell className="text-gray-300">{player.leagues}</TableCell>
                            <TableCell>
                              {player.trend === 'up' && <TrendingUp className="w-5 h-5 text-emerald-400" />}
                              {player.trend === 'down' && <TrendingUp className="w-5 h-5 text-red-400 rotate-180" />}
                              {player.trend === 'same' && <span className="text-gray-500">-</span>}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            )}

            {view === 'leagues' && (
              <div className="space-y-4">
                {leagueRankings.map((league) => (
                  <Card key={league.id} className="bg-gray-800/50 border-gray-700 hover:border-yellow-500/30 transition-all">
                    <CardContent className="p-4 lg:p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="text-white font-semibold text-lg">{league.name}</h3>
                            <Badge
                              className={
                                league.type === 'bet'
                                  ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
                                  : 'bg-blue-500/20 text-blue-400 border-blue-500/30'
                              }
                            >
                              {league.type === 'bet' ? 'APUESTA' : 'DIVERSIÓN'}
                            </Badge>
                          </div>
                          
                          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                            <div>
                              <p className="text-gray-400 mb-1">Tu Posición</p>
                              <p className="text-yellow-400 font-bold text-xl">#{league.yourRank}</p>
                            </div>
                            <div>
                              <p className="text-gray-400 mb-1">Participantes</p>
                              <p className="text-white font-semibold">{league.participants}</p>
                            </div>
                            <div>
                              <p className="text-gray-400 mb-1">Líder</p>
                              <p className="text-white font-semibold">{league.topPlayer.name}</p>
                            </div>
                            <div>
                              <p className="text-gray-400 mb-1">Puntaje Líder</p>
                              <p className="text-emerald-400 font-semibold">{league.topPlayer.points}</p>
                            </div>
                          </div>
                        </div>
                        
                        <Button
                          variant="ghost"
                          className="text-yellow-400 hover:text-white hover:bg-gray-700"
                        >
                          Ver Tabla
                          <ChevronRight className="w-4 h-4 ml-2" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
