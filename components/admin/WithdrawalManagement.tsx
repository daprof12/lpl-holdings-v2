import { useState } from 'react';
import WithdrawalMethodsManagement from './WithdrawalMethodsManagement';

export default function WithdrawalManagement() {
  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl mb-2">Withdrawal Management</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Manage user withdrawal methods and platform withdrawal settings
        </p>
      </div>

      <WithdrawalMethodsManagement />
    </div>
  );
}