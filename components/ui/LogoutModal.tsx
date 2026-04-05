import { motion, AnimatePresence } from 'framer-motion';
import { LogOut, X, AlertTriangle } from 'lucide-react';
import { Button } from './button';

interface LogoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isLoading?: boolean;
}

export function LogoutModal({ isOpen, onClose, onConfirm, isLoading }: LogoutModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-md bg-white dark:bg-slate-800 rounded-2xl shadow-2xl overflow-hidden border border-gray-200 dark:border-slate-700"
          >
            <div className="p-6">
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
                disabled={isLoading}
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mb-4">
                  <AlertTriangle className="w-8 h-8 text-red-600 dark:text-red-500" />
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  Confirm Logout
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-8">
                  Are you sure you want to log out of your account? Your current session will be ended.
                </p>

                <div className="grid grid-cols-2 gap-3 w-full">
                  <Button
                    variant="outline"
                    onClick={onClose}
                    disabled={isLoading}
                    className="w-full py-6 text-base"
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={onConfirm}
                    disabled={isLoading}
                    className="w-full py-6 text-base gap-2"
                  >
                    {isLoading ? (
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <>
                        <LogOut className="w-4 h-4" />
                        Log out
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
