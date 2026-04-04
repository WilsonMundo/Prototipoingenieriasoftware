import { 
  LayoutDashboard, 
  Trophy, 
  PlusCircle, 
  Mail, 
  Target, 
  Award, 
  Calendar, 
  Settings 
} from 'lucide-react';
import { cn } from './ui/utils';
import { useState } from 'react';
import { useNavigate } from 'react-router';

interface SidebarProps {
  activeSection?: string;
}

const navItems = [
  { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
  { id: 'my-leagues', icon: Trophy, label: 'Mis Ligas', path: '/leagues' },
  { id: 'create', icon: PlusCircle, label: 'Crear Liga', path: '/leagues/create' },
  { id: 'invitations', icon: Mail, label: 'Invitaciones', path: '/invitations' },
  { id: 'predictions', icon: Target, label: 'Predicciones', path: '/predictions' },
  { id: 'rankings', icon: Award, label: 'Rankings', path: '/rankings' },
  { id: 'matches', icon: Calendar, label: 'Partidos', path: '/matches' },
  { id: 'settings', icon: Settings, label: 'Configuración', path: '/settings' },
];

export function Sidebar({ activeSection = 'dashboard' }: SidebarProps) {
  const navigate = useNavigate();
  const [active, setActive] = useState(activeSection);

  return (
    <aside className="w-64 bg-[#0f1419] border-r border-gray-800 h-screen flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-gray-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-blue-600 rounded-lg flex items-center justify-center">
            <Trophy className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-white text-lg font-bold">GolTech Solutions S.A.</h1>
            <p className="text-gray-400 text-xs">World Cup 2026</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = active === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => {
                setActive(item.id);
                navigate(item.path);
              }}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200",
                isActive 
                  ? "bg-gradient-to-r from-emerald-500/20 to-blue-600/20 text-white border border-emerald-500/30" 
                  : "text-gray-400 hover:text-white hover:bg-gray-800/50"
              )}
            >
              <Icon className={cn("w-5 h-5", isActive && "text-emerald-400")} />
              <span className="font-medium">{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-gray-800">
        <div className="bg-gradient-to-r from-emerald-500/10 to-blue-600/10 rounded-lg p-4 border border-emerald-500/20">
          <p className="text-white text-sm font-medium mb-1">World Cup 2026</p>
          <p className="text-gray-400 text-xs">USA, Canada & Mexico</p>
        </div>
      </div>
    </aside>
  );
}