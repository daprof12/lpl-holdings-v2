import { Loader2 } from 'lucide-react';

interface LoadingScreenProps {
  message?: string;
}

export default function LoadingScreen({ message = 'Loading...' }: LoadingScreenProps) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-slate-900">
      <div className="text-center">
        <div className="relative">
          {/* Logo animation */}
          <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center animate-pulse">
            <span className="text-white text-3xl font-bold">G</span>
          </div>
          
          {/* Spinning loader */}
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2">
            <Loader2 className="w-8 h-8 text-blue-600 dark:text-blue-400 animate-spin" />
          </div>
        </div>

        <h2 className="text-xl font-semibold mb-2 mt-8">{message}</h2>
        <p className="text-gray-600 dark:text-gray-400">Please wait a moment...</p>
      </div>
    </div>
  );
}
