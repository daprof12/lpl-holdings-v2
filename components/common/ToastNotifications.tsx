import { toast } from 'sonner';
import { CheckCircle, XCircle, AlertCircle, Info } from 'lucide-react';

export const showSuccessToast = (message: string, description?: string) => {
  toast.success(message, {
    description,
    icon: <CheckCircle className="w-5 h-5" />,
    duration: 4000,
  });
};

export const showErrorToast = (message: string, description?: string) => {
  toast.error(message, {
    description,
    icon: <XCircle className="w-5 h-5" />,
    duration: 5000,
  });
};

export const showWarningToast = (message: string, description?: string) => {
  toast.warning(message, {
    description,
    icon: <AlertCircle className="w-5 h-5" />,
    duration: 4000,
  });
};

export const showInfoToast = (message: string, description?: string) => {
  toast.info(message, {
    description,
    icon: <Info className="w-5 h-5" />,
    duration: 4000,
  });
};

export const showLoadingToast = (message: string) => {
  return toast.loading(message);
};

export const dismissToast = (toastId: string | number) => {
  toast.dismiss(toastId);
};

// Trading specific toasts
export const showTradeSuccessToast = (type: 'buy' | 'sell', asset: string, amount: string) => {
  showSuccessToast(
    `${type === 'buy' ? 'Buy' : 'Sell'} Order Executed`,
    `Successfully ${type === 'buy' ? 'bought' : 'sold'} ${amount} ${asset}`
  );
};

export const showDepositSuccessToast = (amount: string, currency: string) => {
  showSuccessToast(
    'Deposit Successful',
    `${amount} ${currency} has been added to your account`
  );
};

export const showWithdrawalSuccessToast = (amount: string, currency: string) => {
  showSuccessToast(
    'Withdrawal Initiated',
    `${amount} ${currency} withdrawal is being processed`
  );
};
