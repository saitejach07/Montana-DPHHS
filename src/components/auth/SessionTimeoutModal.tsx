import { useState, useEffect } from 'react';
import { AlertTriangle, Clock } from 'lucide-react';
import { Button } from '../ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';

interface SessionTimeoutModalProps {
  onExtend: () => void;
  onLogout: () => void;
}

export function SessionTimeoutModal({ onExtend, onLogout }: SessionTimeoutModalProps) {
  const [countdown, setCountdown] = useState(60);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          onLogout();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [onLogout]);

  return (
    <Dialog open={true}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center">
              <AlertTriangle className="w-6 h-6 text-amber-600" />
            </div>
            <div>
              <DialogTitle>Session Timeout Warning</DialogTitle>
              <DialogDescription>
                Your session is about to expire due to inactivity
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="py-6">
          <div className="flex items-center justify-center gap-3 text-slate-700">
            <Clock className="w-5 h-5" />
            <p>
              Time remaining: <span className="text-amber-600">{countdown} seconds</span>
            </p>
          </div>
          <p className="text-center text-slate-500 mt-4">
            This is a security measure to protect patient health information (PHI)
          </p>
        </div>

        <DialogFooter className="flex gap-2 sm:gap-2">
          <Button variant="outline" onClick={onLogout} className="flex-1">
            Logout Now
          </Button>
          <Button onClick={onExtend} className="flex-1 bg-teal-600 hover:bg-teal-700">
            Stay Logged In
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
