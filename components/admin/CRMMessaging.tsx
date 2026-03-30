import { useState } from 'react';
import { 
  Send, 
  MessageSquare, 
  Users, 
  Bell, 
  Mail, 
  MessageCircle, 
  Plus,
  Edit,
  Trash2,
  Eye,
  Calendar,
  Filter,
  Tag,
  Gift,
  Megaphone,
  Percent
} from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '../ui/dialog';
import { useNotifications, CRMMessage, NotificationChannel } from '../../contexts/NotificationContext';
import { useAuth } from '../../contexts/AuthContext';
import { toast } from 'sonner';

export default function CRMMessaging() {
  const { crmMessages, createCRMMessage, updateCRMMessage, sendCRMMessage, deleteCRMMessage } = useNotifications();
  const { users } = useAuth();
  
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [editingMessage, setEditingMessage] = useState<CRMMessage | null>(null);
  const [previewMessage, setPreviewMessage] = useState<CRMMessage | null>(null);
  
  // Form state
  const [messageType, setMessageType] = useState<'general' | 'personal' | 'promo' | 'announcement' | 'offer'>('general');
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [recipientType, setRecipientType] = useState<'all' | 'specific'>('all');
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [channels, setChannels] = useState<NotificationChannel[]>(['in-app']);
  const [promoCode, setPromoCode] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [actionUrl, setActionUrl] = useState('');
  
  // Filter state
  const [statusFilter, setStatusFilter] = useState<'all' | 'draft' | 'scheduled' | 'sent'>('all');
  const [typeFilter, setTypeFilter] = useState<'all' | 'general' | 'personal' | 'promo' | 'announcement' | 'offer'>('all');

  const filteredMessages = crmMessages.filter(msg => {
    if (statusFilter !== 'all' && msg.status !== statusFilter) return false;
    if (typeFilter !== 'all' && msg.type !== typeFilter) return false;
    return true;
  });

  const resetForm = () => {
    setMessageType('general');
    setTitle('');
    setMessage('');
    setRecipientType('all');
    setSelectedUsers([]);
    setChannels(['in-app']);
    setPromoCode('');
    setExpiryDate('');
    setActionUrl('');
    setEditingMessage(null);
  };

  const handleCreateOrUpdate = () => {
    if (!title.trim() || !message.trim()) {
      toast.error('Please fill in all required fields');
      return;
    }

    if (recipientType === 'specific' && selectedUsers.length === 0) {
      toast.error('Please select at least one recipient');
      return;
    }

    const messageData = {
      type: messageType,
      title,
      message,
      recipientType,
      recipientIds: recipientType === 'all' ? [] : selectedUsers,
      channels,
      metadata: {
        promoCode: promoCode || undefined,
        expiryDate: expiryDate || undefined,
        actionUrl: actionUrl || undefined,
      },
    };

    if (editingMessage) {
      updateCRMMessage(editingMessage.id, messageData);
    } else {
      createCRMMessage(messageData);
    }

    setShowCreateDialog(false);
    resetForm();
  };

  const handleEdit = (msg: CRMMessage) => {
    setEditingMessage(msg);
    setMessageType(msg.type);
    setTitle(msg.title);
    setMessage(msg.message);
    setRecipientType(msg.recipientType);
    setSelectedUsers(msg.recipientIds);
    setChannels(msg.channels);
    setPromoCode(msg.metadata?.promoCode || '');
    setExpiryDate(msg.metadata?.expiryDate || '');
    setActionUrl(msg.metadata?.actionUrl || '');
    setShowCreateDialog(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this message?')) {
      deleteCRMMessage(id);
    }
  };

  const handleSend = (id: string) => {
    if (confirm('Are you sure you want to send this message? This action cannot be undone.')) {
      sendCRMMessage(id);
    }
  };

  const toggleChannel = (channel: NotificationChannel) => {
    if (channels.includes(channel)) {
      setChannels(channels.filter(c => c !== channel));
    } else {
      setChannels([...channels, channel]);
    }
  };

  const toggleUser = (userId: string) => {
    if (selectedUsers.includes(userId)) {
      setSelectedUsers(selectedUsers.filter(id => id !== userId));
    } else {
      setSelectedUsers([...selectedUsers, userId]);
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'promo': return <Tag className="w-5 h-5" />;
      case 'announcement': return <Megaphone className="w-5 h-5" />;
      case 'offer': return <Gift className="w-5 h-5" />;
      case 'personal': return <MessageCircle className="w-5 h-5" />;
      default: return <MessageSquare className="w-5 h-5" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'sent': return 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400';
      case 'scheduled': return 'bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400';
      default: return 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300';
    }
  };

  const regularUsers = users.filter(u => u.role === 'user');

  return (
    <div className="p-4 lg:p-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl mb-2">CRM Messaging</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Send messages, promotions, and announcements to users
          </p>
        </div>
        <Button onClick={() => setShowCreateDialog(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Create Message
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-lg bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center">
              <MessageSquare className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Total Messages</div>
              <div className="text-2xl">{crmMessages.length}</div>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-lg bg-green-100 dark:bg-green-900/20 flex items-center justify-center">
              <Send className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Sent</div>
              <div className="text-2xl">{crmMessages.filter(m => m.status === 'sent').length}</div>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-lg bg-purple-100 dark:bg-purple-900/20 flex items-center justify-center">
              <Edit className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Drafts</div>
              <div className="text-2xl">{crmMessages.filter(m => m.status === 'draft').length}</div>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-lg bg-orange-100 dark:bg-orange-900/20 flex items-center justify-center">
              <Users className="w-6 h-6 text-orange-600 dark:text-orange-400" />
            </div>
            <div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Total Users</div>
              <div className="text-2xl">{regularUsers.length}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-slate-800 rounded-xl p-4 shadow-sm mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as any)}
            className="px-3 py-2 rounded-lg border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800"
          >
            <option value="all">All Status</option>
            <option value="draft">Draft</option>
            <option value="scheduled">Scheduled</option>
            <option value="sent">Sent</option>
          </select>

          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value as any)}
            className="px-3 py-2 rounded-lg border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800"
          >
            <option value="all">All Types</option>
            <option value="general">General</option>
            <option value="personal">Personal</option>
            <option value="promo">Promotion</option>
            <option value="announcement">Announcement</option>
            <option value="offer">Offer</option>
          </select>
        </div>
      </div>

      {/* Messages List */}
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-slate-900/50 border-b border-gray-200 dark:border-slate-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs uppercase tracking-wider text-gray-700 dark:text-gray-300">Type</th>
                <th className="px-6 py-3 text-left text-xs uppercase tracking-wider text-gray-700 dark:text-gray-300">Title</th>
                <th className="px-6 py-3 text-left text-xs uppercase tracking-wider text-gray-700 dark:text-gray-300">Recipients</th>
                <th className="px-6 py-3 text-left text-xs uppercase tracking-wider text-gray-700 dark:text-gray-300">Channels</th>
                <th className="px-6 py-3 text-left text-xs uppercase tracking-wider text-gray-700 dark:text-gray-300">Status</th>
                <th className="px-6 py-3 text-left text-xs uppercase tracking-wider text-gray-700 dark:text-gray-300">Created</th>
                <th className="px-6 py-3 text-left text-xs uppercase tracking-wider text-gray-700 dark:text-gray-300">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-slate-700">
              {filteredMessages.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-gray-500 dark:text-gray-400">
                    <MessageSquare className="w-12 h-12 mx-auto mb-3 opacity-50" />
                    <p>No messages found</p>
                    <Button onClick={() => setShowCreateDialog(true)} variant="outline" className="mt-4">
                      <Plus className="w-4 h-4 mr-2" />
                      Create First Message
                    </Button>
                  </td>
                </tr>
              ) : (
                filteredMessages.map((msg) => (
                  <tr key={msg.id} className="hover:bg-gray-50 dark:hover:bg-slate-700/50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        {getTypeIcon(msg.type)}
                        <span className="capitalize text-sm">{msg.type}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="max-w-xs truncate">{msg.title}</div>
                    </td>
                    <td className="px-6 py-4">
                      {msg.recipientType === 'all' ? (
                        <span className="text-sm text-gray-600 dark:text-gray-400">All Users</span>
                      ) : (
                        <span className="text-sm text-gray-600 dark:text-gray-400">{msg.recipientIds.length} users</span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-1">
                        {msg.channels.includes('in-app') && <Bell className="w-4 h-4 text-blue-500" title="In-App" />}
                        {msg.channels.includes('email') && <Mail className="w-4 h-4 text-green-500" title="Email" />}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-full text-xs capitalize ${getStatusColor(msg.status)}`}>
                        {msg.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                      {new Date(msg.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setPreviewMessage(msg)}
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                        {msg.status === 'draft' && (
                          <>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleEdit(msg)}
                            >
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleSend(msg.id)}
                            >
                              <Send className="w-4 h-4 text-green-600" />
                            </Button>
                          </>
                        )}
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDelete(msg.id)}
                        >
                          <Trash2 className="w-4 h-4 text-red-600" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create/Edit Dialog */}
      <Dialog open={showCreateDialog} onOpenChange={(open) => {
        setShowCreateDialog(open);
        if (!open) resetForm();
      }}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingMessage ? 'Edit Message' : 'Create New Message'}</DialogTitle>
            <DialogDescription>
              Compose and send messages to your users across multiple channels
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            {/* Message Type */}
            <div>
              <Label>Message Type</Label>
              <select
                value={messageType}
                onChange={(e) => setMessageType(e.target.value as any)}
                className="w-full mt-1 px-4 py-2 rounded-lg border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800"
              >
                <option value="general">General Message</option>
                <option value="personal">Personal Message</option>
                <option value="promo">Promotion</option>
                <option value="announcement">Announcement</option>
                <option value="offer">Special Offer</option>
              </select>
            </div>

            {/* Title */}
            <div>
              <Label htmlFor="title">Title *</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter message title"
                className="mt-1"
              />
            </div>

            {/* Message */}
            <div>
              <Label htmlFor="message">Message *</Label>
              <textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Enter your message"
                rows={4}
                className="w-full mt-1 px-4 py-2 rounded-lg border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800"
              />
            </div>

            {/* Promo Code (for promo/offer types) */}
            {(messageType === 'promo' || messageType === 'offer') && (
              <div>
                <Label htmlFor="promoCode">Promo Code</Label>
                <Input
                  id="promoCode"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  placeholder="e.g., SAVE20"
                  className="mt-1"
                />
              </div>
            )}

            {/* Expiry Date */}
            {(messageType === 'promo' || messageType === 'offer') && (
              <div>
                <Label htmlFor="expiryDate">Expiry Date</Label>
                <Input
                  id="expiryDate"
                  type="date"
                  value={expiryDate}
                  onChange={(e) => setExpiryDate(e.target.value)}
                  className="mt-1"
                />
              </div>
            )}

            {/* Action URL */}
            <div>
              <Label htmlFor="actionUrl">Action URL (Optional)</Label>
              <Input
                id="actionUrl"
                value={actionUrl}
                onChange={(e) => setActionUrl(e.target.value)}
                placeholder="https://example.com/offer"
                className="mt-1"
              />
            </div>

            {/* Recipients */}
            <div>
              <Label>Recipients</Label>
              <div className="mt-2 space-y-2">
                <div className="flex items-center gap-2">
                  <input
                    type="radio"
                    id="all-users"
                    checked={recipientType === 'all'}
                    onChange={() => setRecipientType('all')}
                    className="w-4 h-4"
                  />
                  <label htmlFor="all-users">All Users ({regularUsers.length})</label>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="radio"
                    id="specific-users"
                    checked={recipientType === 'specific'}
                    onChange={() => setRecipientType('specific')}
                    className="w-4 h-4"
                  />
                  <label htmlFor="specific-users">Specific Users</label>
                </div>
              </div>

              {recipientType === 'specific' && (
                <div className="mt-3 max-h-48 overflow-y-auto border border-gray-200 dark:border-slate-700 rounded-lg p-3">
                  {regularUsers.map(user => (
                    <div key={user.id} className="flex items-center gap-2 py-1">
                      <input
                        type="checkbox"
                        id={`user-${user.id}`}
                        checked={selectedUsers.includes(user.id)}
                        onChange={() => toggleUser(user.id)}
                        className="w-4 h-4"
                      />
                      <label htmlFor={`user-${user.id}`} className="text-sm">
                        {user.email} ({user.firstName} {user.lastName})
                      </label>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Channels */}
            <div>
              <Label>Delivery Channels</Label>
              <div className="mt-2 grid grid-cols-2 gap-3">
                <div 
                  onClick={() => toggleChannel('in-app')}
                  className={`p-4 rounded-lg border-2 cursor-pointer transition-colors ${
                    channels.includes('in-app') 
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' 
                      : 'border-gray-200 dark:border-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Bell className="w-5 h-5 text-blue-500" />
                    <div>
                      <div className="font-medium">In-App</div>
                      <div className="text-xs text-gray-600 dark:text-gray-400">Push notification</div>
                    </div>
                  </div>
                </div>

                <div 
                  onClick={() => toggleChannel('email')}
                  className={`p-4 rounded-lg border-2 cursor-pointer transition-colors ${
                    channels.includes('email') 
                      ? 'border-green-500 bg-green-50 dark:bg-green-900/20' 
                      : 'border-gray-200 dark:border-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-green-500" />
                    <div>
                      <div className="font-medium">Email</div>
                      <div className="text-xs text-gray-600 dark:text-gray-400">Email message</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => {
              setShowCreateDialog(false);
              resetForm();
            }}>
              Cancel
            </Button>
            <Button onClick={handleCreateOrUpdate}>
              {editingMessage ? 'Update' : 'Create'} Draft
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Preview Dialog */}
      <Dialog open={!!previewMessage} onOpenChange={() => setPreviewMessage(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Message Preview</DialogTitle>
            <DialogDescription>Preview of the message content</DialogDescription>
          </DialogHeader>

          {previewMessage && (
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                {getTypeIcon(previewMessage.type)}
                <span className="capitalize font-medium">{previewMessage.type}</span>
              </div>

              <div>
                <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Title</div>
                <div className="text-lg font-semibold">{previewMessage.title}</div>
              </div>

              <div>
                <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Message</div>
                <div className="p-4 bg-gray-50 dark:bg-slate-900 rounded-lg whitespace-pre-wrap">
                  {previewMessage.message}
                </div>
              </div>

              {previewMessage.metadata?.promoCode && (
                <div>
                  <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Promo Code</div>
                  <div className="px-4 py-2 bg-yellow-100 dark:bg-yellow-900/20 rounded-lg inline-block font-mono">
                    {previewMessage.metadata.promoCode}
                  </div>
                </div>
              )}

              {previewMessage.metadata?.expiryDate && (
                <div>
                  <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Expires</div>
                  <div>{new Date(previewMessage.metadata.expiryDate).toLocaleDateString()}</div>
                </div>
              )}

              <div>
                <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Recipients</div>
                <div>
                  {previewMessage.recipientType === 'all' 
                    ? `All Users (${regularUsers.length})` 
                    : `${previewMessage.recipientIds.length} specific users`}
                </div>
              </div>

              <div>
                <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">Delivery Channels</div>
                <div className="flex gap-2">
                  {previewMessage.channels.includes('in-app') && (
                    <div className="px-3 py-1 bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 rounded-full text-sm flex items-center gap-1">
                      <Bell className="w-3 h-3" /> In-App
                    </div>
                  )}
                  {previewMessage.channels.includes('email') && (
                    <div className="px-3 py-1 bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400 rounded-full text-sm flex items-center gap-1">
                      <Mail className="w-3 h-3" /> Email
                    </div>
                  )}
                </div>
              </div>

              <div className="pt-4 border-t border-gray-200 dark:border-slate-700">
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Status: <span className={`capitalize ${getStatusColor(previewMessage.status)} px-2 py-1 rounded`}>
                    {previewMessage.status}
                  </span>
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                  Created: {new Date(previewMessage.createdAt).toLocaleString()}
                </div>
                {previewMessage.sentAt && (
                  <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    Sent: {new Date(previewMessage.sentAt).toLocaleString()}
                  </div>
                )}
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setPreviewMessage(null)}>
              Close
            </Button>
            {previewMessage?.status === 'draft' && (
              <Button onClick={() => {
                if (previewMessage) {
                  handleSend(previewMessage.id);
                  setPreviewMessage(null);
                }
              }}>
                <Send className="w-4 h-4 mr-2" />
                Send Now
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}