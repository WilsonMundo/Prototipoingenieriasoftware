import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Calendar, Clock, Target } from 'lucide-react';

const matches = [
  {
    id: 1,
    team1: {
      name: 'Brazil',
      flag: '🇧🇷',
      odds: 1.8,
    },
    team2: {
      name: 'Argentina',
      flag: '🇦🇷',
      odds: 2.1,
    },
    date: 'Jun 15, 2026',
    time: '15:00 EST',
    venue: 'MetLife Stadium',
    predicted: false,
  },
  {
    id: 2,
    team1: {
      name: 'Germany',
      flag: '🇩🇪',
      odds: 1.5,
    },
    team2: {
      name: 'France',
      flag: '🇫🇷',
      odds: 2.4,
    },
    date: 'Jun 15, 2026',
    time: '18:00 EST',
    venue: 'SoFi Stadium',
    predicted: true,
  },
  {
    id: 3,
    team1: {
      name: 'Spain',
      flag: '🇪🇸',
      odds: 1.9,
    },
    team2: {
      name: 'England',
      flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿',
      odds: 2.0,
    },
    date: 'Jun 16, 2026',
    time: '12:00 EST',
    venue: 'AT&T Stadium',
    predicted: false,
  },
];

export function UpcomingMatches() {
  return (
    <Card className="bg-gray-800/50 border-gray-700">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Calendar className="w-5 h-5 text-emerald-400" />
          Próximos Partidos
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {matches.map((match) => (
          <div
            key={match.id}
            className="bg-gray-900/50 border border-gray-700 rounded-xl p-4 hover:border-emerald-500/30 transition-colors"
          >
            {/* Match Teams */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3 flex-1">
                <span className="text-3xl">{match.team1.flag}</span>
                <div>
                  <p className="text-white font-semibold">{match.team1.name}</p>
                  <p className="text-gray-500 text-xs">Odds: {match.team1.odds}</p>
                </div>
              </div>
              
              <div className="px-4">
                <div className="text-gray-500 font-bold text-lg">VS</div>
              </div>
              
              <div className="flex items-center gap-3 flex-1 justify-end">
                <div className="text-right">
                  <p className="text-white font-semibold">{match.team2.name}</p>
                  <p className="text-gray-500 text-xs">Odds: {match.team2.odds}</p>
                </div>
                <span className="text-3xl">{match.team2.flag}</span>
              </div>
            </div>

            {/* Match Info */}
            <div className="flex items-center justify-between pt-3 border-t border-gray-700">
              <div className="flex items-center gap-4 text-sm text-gray-400">
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {match.date}
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {match.time}
                </div>
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
                  Hacer Predicción
                </Button>
              )}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}