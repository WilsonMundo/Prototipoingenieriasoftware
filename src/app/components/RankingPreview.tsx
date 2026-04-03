import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Award, TrendingUp, TrendingDown } from 'lucide-react';

const rankings = [
  {
    id: 1,
    rank: 1,
    name: 'Sarah Johnson',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
    points: 485,
    change: 'up',
    changeValue: 2,
  },
  {
    id: 2,
    rank: 2,
    name: 'Mike Chen',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mike',
    points: 456,
    change: 'down',
    changeValue: 1,
  },
  {
    id: 3,
    rank: 3,
    name: 'Tú',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John',
    points: 342,
    change: 'up',
    changeValue: 3,
    isCurrentUser: true,
  },
  {
    id: 4,
    rank: 4,
    name: 'Emma Wilson',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emma',
    points: 318,
    change: 'up',
    changeValue: 1,
  },
  {
    id: 5,
    rank: 5,
    name: 'David Brown',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=David',
    points: 295,
    change: 'down',
    changeValue: 2,
  },
];

export function RankingPreview() {
  return (
    <Card className="bg-gray-800/50 border-gray-700">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2 text-base sm:text-lg">
          <Award className="w-5 h-5 text-emerald-400" />
          Mejores Clasificaciones
          <span className="text-xs sm:text-sm text-gray-400 font-normal ml-auto">Liga Global</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {rankings.map((player) => (
          <div
            key={player.id}
            className={`flex items-center gap-2 sm:gap-4 p-3 sm:p-4 rounded-xl transition-all ${
              player.isCurrentUser
                ? 'bg-gradient-to-r from-emerald-500/20 to-blue-600/20 border border-emerald-500/30'
                : 'bg-gray-900/50 hover:bg-gray-700/30'
            }`}
          >
            {/* Rank Badge */}
            <div
              className={`w-8 h-8 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center font-bold text-sm sm:text-base ${
                player.rank === 1
                  ? 'bg-gradient-to-br from-yellow-400 to-yellow-600 text-yellow-900'
                  : player.rank === 2
                  ? 'bg-gradient-to-br from-gray-300 to-gray-500 text-gray-900'
                  : player.rank === 3
                  ? 'bg-gradient-to-br from-orange-400 to-orange-600 text-orange-900'
                  : 'bg-gray-700 text-gray-300'
              }`}
            >
              {player.rank}
            </div>

            {/* Avatar & Info */}
            <Avatar className="w-8 h-8 sm:w-10 sm:h-10">
              <AvatarImage src={player.avatar} />
              <AvatarFallback className="bg-emerald-500 text-white">
                {player.name.charAt(0)}
              </AvatarFallback>
            </Avatar>

            <div className="flex-1 min-w-0">
              <p className={`font-semibold text-sm sm:text-base truncate ${player.isCurrentUser ? 'text-white' : 'text-gray-200'}`}>
                {player.name}
                {player.isCurrentUser && (
                  <span className="ml-2 text-xs bg-emerald-500 text-white px-2 py-0.5 rounded-full">
                    Tú
                  </span>
                )}
              </p>
              <p className="text-xs sm:text-sm text-gray-400">{player.points} puntos</p>
            </div>

            {/* Change Indicator */}
            <div className="flex items-center gap-1">
              {player.change === 'up' ? (
                <>
                  <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4 text-emerald-400" />
                  <span className="text-emerald-400 text-xs sm:text-sm font-semibold">
                    +{player.changeValue}
                  </span>
                </>
              ) : (
                <>
                  <TrendingDown className="w-3 h-3 sm:w-4 sm:h-4 text-red-400" />
                  <span className="text-red-400 text-xs sm:text-sm font-semibold">
                    -{player.changeValue}
                  </span>
                </>
              )}
            </div>
          </div>
        ))}

        {/* View All Button */}
        <button className="w-full mt-4 py-3 bg-gray-700/50 hover:bg-gray-700 text-gray-300 hover:text-white rounded-lg font-medium transition-colors text-sm sm:text-base">
          Ver Clasificación Completa
        </button>
      </CardContent>
    </Card>
  );
}