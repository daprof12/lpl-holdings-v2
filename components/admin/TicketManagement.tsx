import { useState } from 'react';
import { Search, MessageSquare, Clock, CheckCircle, XCircle, Send, AlertCircle } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { useTickets } from '../../contexts/TicketContext';
import { useAuth } from '../../contexts/AuthContext';
import { toast } from 'sonner';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '../ui/dialog';

export default function TicketManagement() {
  const { tickets, updateTicketStatus, updateTicketPriority, assignTicket, addMessage, deleteTicket } = useTickets();
  const { currentUser } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [priorityFilter, setPriorityFilter] = useState<string>('all');
  const [showDialog, setShowDialog] = useState(false);
  const [selectedTicketId, setSelectedTicketId] = useState<string | null>(null);
  const [replyMessage, setReplyMessage] = useState('');

  const selectedTicket = tickets.find(t => t.id === selectedTicketId);

  const filteredTickets = tickets.filter(ticket => {
    const matchesSearch = 
      ticket.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ticket.userEmail.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ticket.userName.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || ticket.status === statusFilter;
    const matchesPriority = priorityFilter === 'all' || ticket.priority === priorityFilter;
    
    return matchesSearch && matchesStatus && matchesPriority;
  });

  const handleViewTicket = (ticketId: string) => {
    setSelectedTicketId(ticketId);
    setShowDialog(true);
    setReplyMessage('');
  };

  const handleSendReply = () => {
    if (!selectedTicketId || !replyMessage.trim() || !currentUser) return;

    addMessage(
      selectedTicketId,
      replyMessage,
      currentUser.id,
      `${currentUser.firstName} ${currentUser.lastName}`,
      'admin'
    );

    toast.success('Reply sent');
    setReplyMessage('');
  };

  const handleStatusChange = (ticketId: string, newStatus: string) => {
    updateTicketStatus(ticketId, newStatus as any);
    toast.success('Status updated');
  };

  const handlePriorityChange = (ticketId: string, newPriority: string) => {
    updateTicketPriority(ticketId, newPriority as any);
    toast.success('Priority updated');
  };

  const handleDeleteTicket = (ticketId: string) => {
    if (confirm('Are you sure you want to delete this ticket?')) {
      deleteTicket(ticketId);
      toast.success('Ticket deleted');
      setShowDialog(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open': return 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400';
      case 'pending': return 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400';
      case 'resolved': return 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400';
      case 'closed': return 'bg-gray-100 dark:bg-gray-900/30 text-gray-700 dark:text-gray-400';
      default: return '';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'low': return 'text-gray-600 dark:text-gray-400';
      case 'medium': return 'text-yellow-600 dark:text-yellow-400';
      case 'high': return 'text-orange-600 dark:text-orange-400';
      case 'urgent': return 'text-red-600 dark:text-red-400';
      default: return '';
    }
  };

  const stats = {
    total: tickets.length,
    open: tickets.filter(t => t.status === 'open').length,
    pending: tickets.filter(t => t.status === 'pending').length,
    resolved: tickets.filter(t => t.status === 'resolved').length,
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl mb-2">Ticket Management</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Manage customer support tickets
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white dark:bg-slate-800 p-4 rounded-xl">
          <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 mb-2">
            <MessageSquare className="w-4 h-4" />
            <span className="text-sm">Total Tickets</span>
          </div>
          <p className="text-2xl">{stats.total}</p>
        </div>
        <div className="bg-white dark:bg-slate-800 p-4 rounded-xl">
          <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 mb-2">
            <AlertCircle className="w-4 h-4" />
            <span className="text-sm">Open</span>
          </div>
          <p className="text-2xl">{stats.open}</p>
        </div>
        <div className="bg-white dark:bg-slate-800 p-4 rounded-xl">
          <div className="flex items-center gap-2 text-yellow-600 dark:text-yellow-400 mb-2">
            <Clock className="w-4 h-4" />
            <span className="text-sm">Pending</span>
          </div>
          <p className="text-2xl">{stats.pending}</p>
        </div>
        <div className="bg-white dark:bg-slate-800 p-4 rounded-xl">
          <div className="flex items-center gap-2 text-green-600 dark:text-green-400 mb-2">
            <CheckCircle className="w-4 h-4" />
            <span className="text-sm">Resolved</span>
          </div>
          <p className="text-2xl">{stats.resolved}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-slate-800 rounded-xl p-6 mb-6">
        <div className="grid md:grid-cols-3 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              placeholder="Search tickets..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 rounded-lg border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700"
          >
            <option value="all">All Statuses</option>
            <option value="open">Open</option>
            <option value="pending">Pending</option>
            <option value="resolved">Resolved</option>
            <option value="closed">Closed</option>
          </select>
          <select
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
            className="px-3 py-2 rounded-lg border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700"
          >
            <option value="all">All Priorities</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
            <option value="urgent">Urgent</option>
          </select>
        </div>
      </div>

      {/* Tickets Table */}
      <div className="bg-white dark:bg-slate-800 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-slate-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs uppercase tracking-wider">
                  Ticket ID
                </th>
                <th className="px-6 py-3 text-left text-xs uppercase tracking-wider">
                  User
                </th>
                <th className="px-6 py-3 text-left text-xs uppercase tracking-wider">
                  Subject
                </th>
                <th className="px-6 py-3 text-left text-xs uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs uppercase tracking-wider">
                  Priority
                </th>
                <th className="px-6 py-3 text-left text-xs uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs uppercase tracking-wider">
                  Created
                </th>
                <th className="px-6 py-3 text-left text-xs uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-slate-700">
              {filteredTickets.map((ticket) => (
                <tr key={ticket.id} className="hover:bg-gray-50 dark:hover:bg-slate-700/50">
                  <td className="px-6 py-4 text-sm">
                    #{ticket.id.slice(-8)}
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <div>{ticket.userName}</div>
                      <div className="text-sm text-gray-500">{ticket.userEmail}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="max-w-xs truncate">{ticket.subject}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 bg-gray-100 dark:bg-slate-700 rounded text-xs capitalize">
                      {ticket.category}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`capitalize ${getPriorityColor(ticket.priority)}`}>
                      {ticket.priority}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded text-xs capitalize ${getStatusColor(ticket.status)}`}>
                      {ticket.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                    {new Date(ticket.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleViewTicket(ticket.id)}
                    >
                      View
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredTickets.length === 0 && (
            <div className="text-center py-12">
              <MessageSquare className="w-12 h-12 mx-auto text-gray-400 mb-4" />
              <p className="text-gray-600 dark:text-gray-400">No tickets found</p>
            </div>
          )}
        </div>
      </div>

      {/* Ticket Detail Dialog */}
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
          <DialogHeader>
            <DialogTitle>Ticket Details</DialogTitle>
            <DialogDescription>
              View and manage ticket details and conversation.
            </DialogDescription>
          </DialogHeader>

          {selectedTicket && (
            <div className="flex-1 overflow-y-auto">
              {/* Ticket Info */}
              <div className="mb-6 p-4 bg-gray-50 dark:bg-slate-700 rounded-lg">
                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <Label>Subject</Label>
                    <p className="mt-1">{selectedTicket.subject}</p>
                  </div>
                  <div>
                    <Label>User</Label>
                    <p className="mt-1">{selectedTicket.userName}</p>
                    <p className="text-sm text-gray-500">{selectedTicket.userEmail}</p>
                  </div>
                  <div>
                    <Label>Category</Label>
                    <p className="mt-1 capitalize">{selectedTicket.category}</p>
                  </div>
                  <div>
                    <Label>Created</Label>
                    <p className="mt-1">{new Date(selectedTicket.createdAt).toLocaleString()}</p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label>Status</Label>
                    <select
                      value={selectedTicket.status}
                      onChange={(e) => handleStatusChange(selectedTicket.id, e.target.value)}
                      className="w-full mt-2 px-3 py-2 rounded-lg border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-800"
                    >
                      <option value="open">Open</option>
                      <option value="pending">Pending</option>
                      <option value="resolved">Resolved</option>
                      <option value="closed">Closed</option>
                    </select>
                  </div>
                  <div>
                    <Label>Priority</Label>
                    <select
                      value={selectedTicket.priority}
                      onChange={(e) => handlePriorityChange(selectedTicket.id, e.target.value)}
                      className="w-full mt-2 px-3 py-2 rounded-lg border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-800"
                    >
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                      <option value="urgent">Urgent</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Messages */}
              <div className="mb-6">
                <Label className="mb-3 block">Conversation</Label>
                <div className="space-y-4 max-h-96 overflow-y-auto p-4 bg-gray-50 dark:bg-slate-700 rounded-lg">
                  {selectedTicket.messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex ${msg.senderRole === 'admin' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`max-w-[70%] ${msg.senderRole === 'admin' ? 'bg-blue-600 text-white' : 'bg-white dark:bg-slate-800'} rounded-lg p-4`}>
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-sm">{msg.senderName}</span>
                          {msg.senderRole === 'admin' && (
                            <span className="text-xs bg-white/20 px-2 py-0.5 rounded">Admin</span>
                          )}
                          <span className="text-xs opacity-70">
                            {new Date(msg.timestamp).toLocaleString()}
                          </span>
                        </div>
                        <p className="text-sm whitespace-pre-wrap">{msg.message}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Reply */}
              <div>
                <Label>Reply</Label>
                <div className="flex gap-3 mt-2">
                  <textarea
                    value={replyMessage}
                    onChange={(e) => setReplyMessage(e.target.value)}
                    placeholder="Type your reply..."
                    rows={3}
                    className="flex-1 px-3 py-2 rounded-lg border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700"
                  />
                </div>
                <div className="flex gap-3 mt-4">
                  <Button onClick={handleSendReply} className="flex-1">
                    <Send className="w-4 h-4 mr-2" />
                    Send Reply
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => handleDeleteTicket(selectedTicket.id)}
                    className="text-red-600"
                  >
                    Delete Ticket
                  </Button>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}