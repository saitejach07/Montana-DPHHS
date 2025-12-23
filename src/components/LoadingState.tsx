import { ShieldCheck as Shield } from 'lucide-react';

interface LoadingStateProps {
  message?: string;
  variant?: 'provider' | 'state-agent' | 'default';
}

export function LoadingState({ message = 'Loading...', variant = 'default' }: LoadingStateProps) {
  const getColors = () => {
    switch (variant) {
      case 'provider':
        return {
          gradient: 'from-teal-500 to-teal-600',
          bg: 'bg-teal-100',
          text: 'text-teal-600',
        };
      case 'state-agent':
        return {
          gradient: 'from-blue-500 to-blue-600',
          bg: 'bg-blue-100',
          text: 'text-blue-600',
        };
      default:
        return {
          gradient: 'from-teal-500 to-blue-500',
          bg: 'bg-teal-100',
          text: 'text-teal-600',
        };
    }
  };

  const colors = getColors();

  return (
    <div className="flex flex-col items-center justify-center py-16">
      {/* Animated Icon */}
      <div className={`w-20 h-20 bg-gradient-to-br ${colors.gradient} rounded-2xl flex items-center justify-center mb-6 animate-pulse shadow-lg`}>
        <Shield className="w-10 h-10 text-white" />
      </div>
      
      {/* Loading Spinner */}
      <div className="relative mb-4">
        <div className={`w-12 h-12 border-4 border-slate-200 rounded-full`}></div>
        <div className={`absolute top-0 left-0 w-12 h-12 border-4 ${colors.text} border-t-transparent rounded-full animate-spin`}></div>
      </div>
      
      {/* Message */}
      <p className="text-slate-600 text-lg">{message}</p>
      <p className="text-slate-500 text-sm mt-2">AgileTech</p>
    </div>
  );
}