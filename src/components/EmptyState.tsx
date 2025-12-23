import { LucideIcon } from 'lucide-react';
import { Button } from './ui/button';
import { ImageWithFallback } from './Fallback_Img/ImageWithFallback';

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
  imageSrc?: string;
  variant?: 'provider' | 'state-agent' | 'default';
}

export function EmptyState({ 
  icon: Icon, 
  title, 
  description, 
  actionLabel, 
  onAction,
  imageSrc,
  variant = 'default'
}: EmptyStateProps) {
  const getColors = () => {
    switch (variant) {
      case 'provider':
        return {
          iconBg: 'bg-teal-100',
          iconText: 'text-teal-600',
          button: 'bg-teal-600 hover:bg-teal-700',
        };
      case 'state-agent':
        return {
          iconBg: 'bg-blue-100',
          iconText: 'text-blue-600',
          button: 'bg-blue-600 hover:bg-blue-700',
        };
      default:
        return {
          iconBg: 'bg-slate-100',
          iconText: 'text-slate-600',
          button: 'bg-teal-600 hover:bg-teal-700',
        };
    }
  };

  const colors = getColors();

  return (
    <div className="text-center py-12 px-4">
      {/* Optional Background Image */}
      {imageSrc && (
        <div className="relative w-80 h-64 mx-auto mb-8 opacity-10">
          <ImageWithFallback 
            src={imageSrc}
            alt="Empty state illustration"
            className="w-full h-full object-cover rounded-2xl"
          />
        </div>
      )}
      
      {/* Icon */}
      <div className={`w-20 h-20 ${colors.iconBg} rounded-2xl flex items-center justify-center mx-auto mb-6`}>
        <Icon className={`w-10 h-10 ${colors.iconText}`} />
      </div>
      
      {/* Title */}
      <h3 className="text-2xl text-slate-900 mb-3">{title}</h3>
      
      {/* Description */}
      <p className="text-slate-600 mb-8 max-w-md mx-auto">{description}</p>
      
      {/* Action Button */}
      {actionLabel && onAction && (
        <Button 
          onClick={onAction}
          className={colors.button}
        >
          {actionLabel}
        </Button>
      )}
    </div>
  );
}
