import { TrendingUp, Medal, Users } from 'lucide-react';
import { Card, CardContent } from './ui/card';

const stats = [
  {
    title: 'Puntos Totales',
    value: '342',
    change: '+24 esta semana',
    icon: TrendingUp,
    gradient: 'from-emerald-500 to-teal-600',
    iconBg: 'bg-emerald-500/20',
    iconColor: 'text-emerald-400',
  },
  {
    title: 'Posición Actual',
    value: '3ro',
    change: 'En Liga Global',
    icon: Medal,
    gradient: 'from-blue-500 to-indigo-600',
    iconBg: 'bg-blue-500/20',
    iconColor: 'text-blue-400',
  },
  {
    title: 'Ligas Activas',
    value: '5',
    change: '2 nuevas este mes',
    icon: Users,
    gradient: 'from-purple-500 to-pink-600',
    iconBg: 'bg-purple-500/20',
    iconColor: 'text-purple-400',
  },
];

export function OverviewCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <Card key={stat.title} className="bg-gray-800/50 border-gray-700 overflow-hidden">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <p className="text-gray-400 text-sm">{stat.title}</p>
                  <h3 className="text-3xl font-bold text-white">{stat.value}</h3>
                  <p className="text-sm text-gray-500">{stat.change}</p>
                </div>
                <div className={`${stat.iconBg} p-3 rounded-xl`}>
                  <Icon className={`w-6 h-6 ${stat.iconColor}`} />
                </div>
              </div>
              <div className={`h-1 mt-4 rounded-full bg-gradient-to-r ${stat.gradient} opacity-50`} />
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}