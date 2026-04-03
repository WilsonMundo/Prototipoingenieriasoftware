import { useState } from 'react';
import { 
  Mail, 
  Check, 
  X, 
  Users, 
  Trophy,
  Calendar,
  DollarSign,
  Clock,
  Search
} from 'lucide-react';
import { Sidebar } from './Sidebar';
import { Navbar } from './Navbar';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { cn } from './ui/utils';

interface Invitation {
  id: number;
  leagueName: string;
  leagueType: 'bet' | 'fun';
  invitedBy: {
    name: string;
    avatar: string;
  };
  participants: number;
  maxParticipants: number;
  prize?: string;
  startDate: string;
  status: 'pending' | 'accepted' | 'rejected';
  message?: string;
}

const mockInvitations: Invitation[] = [
  {
    id: 1,
    leagueName: 'Liga de Campeones',
    leagueType: 'bet',
    invitedBy: {
      name: 'Carlos Mendoza',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Carlos',
    },
    participants: 18,
    maxParticipants: 24,
    prize: '$500',
    startDate: '2026-06-15',
    status: 'pending',
    message: '¡Únete a nuestra liga premium! Los mejores predictores compiten aquí.',
  },
  {
    id: 2,
    leagueName: 'Oficina Mundial 2026',
    leagueType: 'fun',
    invitedBy: {
      name: 'María García',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Maria',
    },
    participants: 8,
    maxParticipants: 15,
    startDate: '2026-06-16',
    status: 'pending',
  },
  {
    id: 3,
    leagueName: 'Pro League Elite',
    leagueType: 'bet',
    invitedBy: {
      name: 'David Chen',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=David',
    },
    participants: 45,
    maxParticipants: 50,
    prize: '$1000',
    startDate: '2026-06-14',
    status: 'pending',
    message: 'Liga competitiva para expertos. ¿Te atreves?',
  },
  {
    id: 4,
    leagueName: 'Amigos del Fútbol',
    leagueType: 'fun',
    invitedBy: {
      name: 'Laura Martínez',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Laura',
    },
    participants: 12,
    maxParticipants: 20,
    startDate: '2026-06-17',
    status: 'pending',
  },
  {
    id: 5,
    leagueName: 'Mega Liga Mundial',
    leagueType: 'bet',
    invitedBy: {
      name: 'Roberto Silva',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Roberto',
    },
    participants: 150,
    maxParticipants: 200,
    prize: '$2000',
    startDate: '2026-06-13',
    status: 'pending',
  },
];

export function Invitations() {
  const [invitations, setInvitations] = useState(mockInvitations);
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState<'all' | 'pending' | 'accepted' | 'rejected'>('all');

  const handleAccept = (id: number) => {
    setInvitations(invitations.map(inv => 
      inv.id === id ? { ...inv, status: 'accepted' as const } : inv
    ));
  };

  const handleReject = (id: number) => {
    setInvitations(invitations.map(inv => 
      inv.id === id ? { ...inv, status: 'rejected' as const } : inv
    ));
  };

  const filteredInvitations = invitations.filter((inv) => {
    const matchesSearch = inv.leagueName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         inv.invitedBy.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filter === 'all' || inv.status === filter;
    return matchesSearch && matchesFilter;
  });

  const pendingCount = invitations.filter(inv => inv.status === 'pending').length;

  return (
    <div className="flex h-screen bg-[#0a0e13] dark">
      {/* Desktop Sidebar */}
      <div className="hidden lg:block">
        <Sidebar activeSection="invitations" />
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
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Mail className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">Invitaciones</h1>
                {pendingCount > 0 && (
                  <p className="text-sm text-gray-400">{pendingCount} pendientes</p>
                )}
              </div>
            </div>
            <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">
              {pendingCount}
            </Badge>
          </div>

          {/* Mobile Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              type="text"
              placeholder="Buscar invitaciones..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-500 focus:border-blue-500/50 focus:ring-blue-500/20"
            />
          </div>
        </div>

        {/* Desktop Header */}
        <div className="hidden lg:block p-6 pb-0">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-6">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-3xl font-bold text-white">Invitaciones</h1>
                  {pendingCount > 0 && (
                    <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30 text-lg px-3 py-1">
                      {pendingCount} pendientes
                    </Badge>
                  )}
                </div>
                <p className="text-gray-400">Gestiona tus invitaciones a ligas</p>
              </div>
            </div>

            {/* Desktop Search */}
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Buscar invitaciones..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-500 focus:border-blue-500/50 focus:ring-blue-500/20"
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
                    ? "bg-gradient-to-r from-blue-500/20 to-purple-600/20 text-white border border-blue-500/30"
                    : "bg-gray-800/50 text-gray-400 hover:text-white hover:bg-gray-800"
                )}
              >
                Todas ({invitations.length})
              </button>
              <button
                onClick={() => setFilter('pending')}
                className={cn(
                  "px-4 py-2 rounded-lg font-medium transition-all whitespace-nowrap",
                  filter === 'pending'
                    ? "bg-gradient-to-r from-blue-500/20 to-purple-600/20 text-white border border-blue-500/30"
                    : "bg-gray-800/50 text-gray-400 hover:text-white hover:bg-gray-800"
                )}
              >
                Pendientes ({pendingCount})
              </button>
              <button
                onClick={() => setFilter('accepted')}
                className={cn(
                  "px-4 py-2 rounded-lg font-medium transition-all whitespace-nowrap",
                  filter === 'accepted'
                    ? "bg-gradient-to-r from-blue-500/20 to-purple-600/20 text-white border border-blue-500/30"
                    : "bg-gray-800/50 text-gray-400 hover:text-white hover:bg-gray-800"
                )}
              >
                Aceptadas
              </button>
              <button
                onClick={() => setFilter('rejected')}
                className={cn(
                  "px-4 py-2 rounded-lg font-medium transition-all whitespace-nowrap",
                  filter === 'rejected'
                    ? "bg-gradient-to-r from-blue-500/20 to-purple-600/20 text-white border border-blue-500/30"
                    : "bg-gray-800/50 text-gray-400 hover:text-white hover:bg-gray-800"
                )}
              >
                Rechazadas
              </button>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-6">
          <div className="max-w-7xl mx-auto space-y-4">
            {/* Empty State */}
            {filteredInvitations.length === 0 && (
              <div className="flex flex-col items-center justify-center py-16 px-4">
                <div className="w-20 h-20 bg-gray-800/50 rounded-full flex items-center justify-center mb-4">
                  <Mail className="w-10 h-10 text-gray-600" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">No hay invitaciones</h3>
                <p className="text-gray-400 text-center max-w-sm">
                  {searchQuery ? 'No se encontraron invitaciones con ese criterio' : 'No tienes invitaciones en este momento'}
                </p>
              </div>
            )}

            {/* Invitations List */}
            {filteredInvitations.map((invitation) => (
              <Card key={invitation.id} className="bg-gray-800/50 border-gray-700 overflow-hidden">
                <CardContent className="p-4 lg:p-6">
                  <div className="flex flex-col lg:flex-row gap-4">
                    {/* Left Section - Invitation Info */}
                    <div className="flex-1">
                      <div className="flex items-start gap-3 mb-3">
                        <Avatar className="w-12 h-12">
                          <AvatarImage src={invitation.invitedBy.avatar} />
                          <AvatarFallback>{invitation.invitedBy.name[0]}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 flex-wrap mb-1">
                            <h3 className="font-semibold text-white text-lg">{invitation.leagueName}</h3>
                            <Badge
                              className={
                                invitation.leagueType === 'bet'
                                  ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
                                  : 'bg-blue-500/20 text-blue-400 border-blue-500/30'
                              }
                            >
                              {invitation.leagueType === 'bet' ? 'APUESTA' : 'DIVERSIÓN'}
                            </Badge>
                            {invitation.status !== 'pending' && (
                              <Badge
                                className={cn(
                                  invitation.status === 'accepted'
                                    ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
                                    : 'bg-red-500/20 text-red-400 border-red-500/30'
                                )}
                              >
                                {invitation.status === 'accepted' ? 'Aceptada' : 'Rechazada'}
                              </Badge>
                            )}
                          </div>
                          <p className="text-gray-400 text-sm">
                            Invitado por <span className="text-white font-medium">{invitation.invitedBy.name}</span>
                          </p>
                        </div>
                      </div>

                      {/* Message */}
                      {invitation.message && (
                        <p className="text-gray-300 text-sm mb-4 italic bg-gray-900/50 p-3 rounded-lg border border-gray-700">
                          "{invitation.message}"
                        </p>
                      )}

                      {/* Stats Grid */}
                      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                        <div className="flex items-center gap-2 text-sm">
                          <Users className="w-4 h-4 text-blue-400" />
                          <span className="text-gray-400">
                            <span className="text-white font-medium">{invitation.participants}</span>/{invitation.maxParticipants}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Calendar className="w-4 h-4 text-purple-400" />
                          <span className="text-gray-400">
                            <span className="text-white font-medium">{invitation.startDate}</span>
                          </span>
                        </div>
                        {invitation.prize && (
                          <div className="flex items-center gap-2 text-sm">
                            <DollarSign className="w-4 h-4 text-emerald-400" />
                            <span className="text-emerald-400 font-medium">{invitation.prize}</span>
                          </div>
                        )}
                        {invitation.status === 'pending' && (
                          <div className="flex items-center gap-2 text-sm">
                            <Clock className="w-4 h-4 text-yellow-400" />
                            <span className="text-yellow-400 font-medium">Pendiente</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Right Section - Actions */}
                    {invitation.status === 'pending' && (
                      <div className="flex lg:flex-col gap-2 lg:min-w-[120px]">
                        <Button
                          onClick={() => handleAccept(invitation.id)}
                          className="flex-1 lg:flex-none bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white"
                        >
                          <Check className="w-4 h-4 mr-2" />
                          Aceptar
                        </Button>
                        <Button
                          onClick={() => handleReject(invitation.id)}
                          variant="outline"
                          className="flex-1 lg:flex-none bg-gray-700/50 border-gray-600 text-gray-300 hover:bg-red-500/20 hover:border-red-500/30 hover:text-red-400"
                        >
                          <X className="w-4 h-4 mr-2" />
                          Rechazar
                        </Button>
                      </div>
                    )}
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
