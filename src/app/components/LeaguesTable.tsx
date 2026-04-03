import { Users, Activity, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table';

const leagues = [
  {
    id: 1,
    name: 'Liga de Campeones',
    type: 'bet',
    participants: 24,
    status: 'activa',
    yourRank: 3,
    prize: '$500',
  },
  {
    id: 2,
    name: 'Mundial de Oficina',
    type: 'fun',
    participants: 12,
    status: 'activa',
    yourRank: 1,
    prize: null,
  },
  {
    id: 3,
    name: 'Amigos y Familia',
    type: 'fun',
    participants: 8,
    status: 'activa',
    yourRank: 5,
    prize: null,
  },
  {
    id: 4,
    name: 'Maestros Globales',
    type: 'bet',
    participants: 156,
    status: 'activa',
    yourRank: 42,
    prize: '$2000',
  },
  {
    id: 5,
    name: 'Guerreros del Fin de Semana',
    type: 'bet',
    participants: 48,
    status: 'pendiente',
    yourRank: null,
    prize: '$300',
  },
];

export function LeaguesTable() {
  const navigate = useNavigate();

  return (
    <Card className="bg-gray-800/50 border-gray-700">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Users className="w-5 h-5 text-emerald-400" />
          Mis Ligas
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* Mobile Card View */}
        <div className="lg:hidden space-y-3">
          {leagues.map((league) => (
            <div
              key={league.id}
              onClick={() => navigate(`/leagues/${league.id}`)}
              className="bg-gray-900/50 border border-gray-700 rounded-lg p-4 cursor-pointer hover:border-emerald-500/30 transition-all"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h4 className="text-white font-semibold mb-2">{league.name}</h4>
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
                      className={
                        league.status === 'activa'
                          ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
                          : 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
                      }
                    >
                      {league.status}
                    </Badge>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-500" />
              </div>
              
              <div className="grid grid-cols-3 gap-2 text-sm">
                <div className="bg-gray-800 rounded p-2">
                  <p className="text-gray-400 text-xs mb-1">Participantes</p>
                  <p className="text-white font-medium">{league.participants}</p>
                </div>
                <div className="bg-gray-800 rounded p-2">
                  <p className="text-gray-400 text-xs mb-1">Tu Rango</p>
                  <p className="text-emerald-400 font-medium">
                    {league.yourRank ? `#${league.yourRank}` : '-'}
                  </p>
                </div>
                <div className="bg-gray-800 rounded p-2">
                  <p className="text-gray-400 text-xs mb-1">Premio</p>
                  <p className="text-emerald-400 font-medium">
                    {league.prize || '-'}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop Table View */}
        <div className="hidden lg:block overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-gray-700 hover:bg-transparent">
                <TableHead className="text-gray-400">Nombre de Liga</TableHead>
                <TableHead className="text-gray-400">Tipo</TableHead>
                <TableHead className="text-gray-400">Participantes</TableHead>
                <TableHead className="text-gray-400">Tu Rango</TableHead>
                <TableHead className="text-gray-400">Premio</TableHead>
                <TableHead className="text-gray-400">Estado</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {leagues.map((league) => (
                <TableRow
                  key={league.id}
                  className="border-gray-700 hover:bg-gray-700/30 cursor-pointer"
                  onClick={() => navigate(`/leagues/${league.id}`)}
                >
                  <TableCell className="font-medium text-white">{league.name}</TableCell>
                  <TableCell>
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
                  </TableCell>
                  <TableCell className="text-gray-300">
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-gray-500" />
                      {league.participants}
                    </div>
                  </TableCell>
                  <TableCell className="text-gray-300">
                    {league.yourRank ? (
                      <span className="font-semibold text-emerald-400">#{league.yourRank}</span>
                    ) : (
                      <span className="text-gray-500">-</span>
                    )}
                  </TableCell>
                  <TableCell className="text-gray-300">
                    {league.prize ? (
                      <span className="font-semibold text-emerald-400">{league.prize}</span>
                    ) : (
                      <span className="text-gray-500">Sin premio</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Activity
                        className={`w-4 h-4 ${
                          league.status === 'activa' ? 'text-emerald-400' : 'text-yellow-400'
                        }`}
                      />
                      <span
                        className={
                          league.status === 'activa' ? 'text-emerald-400' : 'text-yellow-400'
                        }
                      >
                        {league.status}
                      </span>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}