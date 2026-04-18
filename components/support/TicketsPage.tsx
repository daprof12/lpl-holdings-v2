import { useState, useEffect, useMemo } from 'react';
import {
  Plus,
  Search,
  MessageSquare,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Filter,
  Mail,
  Send
} from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import DashboardLayout from '../layouts/DashboardLayout';
import { toast } from 'sonner';
import { useAuth } from '../../contexts/AuthContext';
import { useTickets, Ticket } from '../../contexts/TicketContext';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';

export default function TicketsPage() {
  const { currentUser } = useAuth();
  const { createTicket, getUserTickets, addMessage, markTicketAsRead } = useTickets();
  const location = useLocation();
  const navigate = useNavigate();
  const [showNewTicket, setShowNewTicket] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [newMessage, setNewMessage] = useState('');

  // Mark as read when selected
  useEffect(() => {
    if (selectedTicket && currentUser) {
      markTicketAsRead(selectedTicket.id);
    }
  }, [selectedTicket?.id, currentUser?.id]);

  const [newTicketData, setNewTicketData] = useState({
    subject: '',
    category: 'technical' as Ticket['category'],
    priority: 'medium' as Ticket['priority'],
    message: '',
  });

  // Check for pre-fill parameters from URL
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const autoOpen = searchParams.get('autoOpen');
    const subject = searchParams.get('subject');
    const category = searchParams.get('category');
    const priority = searchParams.get('priority');
    const message = searchParams.get('message');

    if (autoOpen === 'true') {
      setShowNewTicket(true);
      setNewTicketData({
        subject: subject || '',
        category: (category as Ticket['category']) || 'technical',
        priority: (priority as Ticket['priority']) || 'medium',
        message: message || '',
      });
      
      // Clean up URL parameters
      navigate('/support', { replace: true });
    }
  }, [location.search, navigate]);

  const userTickets = currentUser ? getUserTickets(currentUser.id) : [];

  const handleCreateTicket = () => {
    if (!currentUser) return;
    
    if (!newTicketData.subject || !newTicketData.message) {
      toast.error('Please fill in all required fields');
      return;
    }

    createTicket({
      ...newTicketData,
      userId: currentUser.id,
      userEmail: currentUser.email,
      userName: `${currentUser.firstName} ${currentUser.lastName}`,
    });

    setShowNewTicket(false);
    setNewTicketData({
      subject: '',
      category: 'technical',
      priority: 'medium',
      message: '',
    });
  };

  const handleSendMessage = () => {
    if (!currentUser || !selectedTicket || !newMessage.trim()) return;

    addMessage(
      selectedTicket.id,
      newMessage,
      currentUser.id,
      `${currentUser.firstName} ${currentUser.lastName}`,
      'user'
    );

    toast.success('Message sent');
    setNewMessage('');
  };

  const getStatusColor = (status: Ticket['status']) => {
    switch (status) {
      case 'open': return 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400';
      case 'pending': return 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400';
      case 'resolved': return 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400';
      case 'closed': return 'bg-gray-100 dark:bg-gray-900/30 text-gray-700 dark:text-gray-400';
      default: return '';
    }
  };

  const getPriorityColor = (priority: Ticket['priority']) => {
    switch (priority) {
      case 'low': return 'text-gray-600 dark:text-gray-400';
      case 'medium': return 'text-yellow-600 dark:text-yellow-400';
      case 'high': return 'text-orange-600 dark:text-orange-400';
      case 'urgent': return 'text-red-600 dark:text-red-400';
      default: return '';
    }
  };

  if (!currentUser) {
    return (
      <DashboardLayout>
        <div className="text-center py-12">
          <p>Please log in to view your tickets.</p>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl mb-2">Support Tickets</h1>
            <p className="text-gray-600 dark:text-gray-400">Manage your support requests</p>
          </div>
          <Button onClick={() => setShowNewTicket(true)}>
            <Plus className="w-4 h-4 mr-2" />
            New Ticket
          </Button>
        </div>

        {/* New Ticket Modal */}
        {showNewTicket && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-white dark:bg-slate-800 rounded-xl max-w-2xl w-full p-6">
              <h2 className="text-2xl mb-6">Create New Ticket</h2>
              
              <div className="space-y-4">
                <div>
                  <Label>Subject *</Label>
                  <Input
                    value={newTicketData.subject}
                    onChange={(e) => setNewTicketData({ ...newTicketData, subject: e.target.value })}
                    placeholder="Brief description of your issue"
                    className="mt-2"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label>Category</Label>
                    <select
                      value={newTicketData.category}
                      onChange={(e) => setNewTicketData({ ...newTicketData, category: e.target.value as Ticket['category'] })}
                      className="w-full mt-2 px-3 py-2 rounded-lg border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700"
                    >
                      <option value="technical">Technical Issue</option>
                      <option value="account">Account</option>
                      <option value="trading">Trading</option>
                      <option value="deposit">Deposit</option>
                      <option value="withdrawal">Withdrawal</option>
                      <option value="kyc">KYC Verification</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <Label>Priority</Label>
                    <select
                      value={newTicketData.priority}
                      onChange={(e) => setNewTicketData({ ...newTicketData, priority: e.target.value as Ticket['priority'] })}
                      className="w-full mt-2 px-3 py-2 rounded-lg border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700"
                    >
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                      <option value="urgent">Urgent</option>
                    </select>
                  </div>
                </div>

                <div>
                  <Label>Message *</Label>
                  <textarea
                    value={newTicketData.message}
                    onChange={(e) => setNewTicketData({ ...newTicketData, message: e.target.value })}
                    placeholder="Describe your issue in detail..."
                    rows={6}
                    className="w-full mt-2 px-3 py-2 rounded-lg border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700"
                  />
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <Button onClick={handleCreateTicket} className="flex-1">
                  Create Ticket
                </Button>
                <Button variant="outline" onClick={() => setShowNewTicket(false)} className="flex-1">
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Ticket View Modal */}
        {selectedTicket && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-white dark:bg-slate-800 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
              {/* Header */}
              <div className="p-6 border-b border-gray-200 dark:border-slate-700">
                <div className="flex items-start justify-between">
                  <div>
                    <h2 className="text-2xl mb-2">{selectedTicket.subject}</h2>
                    <div className="flex items-center gap-3 text-sm">
                      <span className={`px-2 py-1 rounded ${getStatusColor(selectedTicket.status)}`}>
                        {selectedTicket.status}
                      </span>
                      <span className={`px-2 py-1 rounded bg-gray-100 dark:bg-slate-700 ${getPriorityColor(selectedTicket.priority)}`}>
                        {selectedTicket.priority} priority
                      </span>
                      <span className="text-gray-600 dark:text-gray-400">
                        {selectedTicket.category}
                      </span>
                    </div>
                  </div>
                  <Button variant="outline" onClick={() => setSelectedTicket(null)}>
                    Close
                  </Button>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {selectedTicket.messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${msg.senderRole === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-[70%] ${msg.senderRole === 'user' ? 'bg-blue-600 text-white' : 'bg-gray-100 dark:bg-slate-700'} rounded-lg p-4`}>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-sm">{msg.senderName}</span>
                        <span className="text-xs opacity-70">
                          {new Date(msg.timestamp).toLocaleString()}
                        </span>
                      </div>
                      <p className="text-sm whitespace-pre-wrap">{msg.message}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Reply Box */}
              <div className="p-6 border-t border-gray-200 dark:border-slate-700">
                <div className="flex gap-3">
                  <Input
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type your message..."
                    onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                  />
                  <Button onClick={handleSendMessage}>
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tickets List */}
        <div className="grid gap-4">
          {userTickets.length === 0 ? (
            <div className="text-center py-12 bg-white dark:bg-slate-800 rounded-xl">
              <MessageSquare className="w-12 h-12 mx-auto text-gray-400 mb-4" />
              <p className="text-gray-600 dark:text-gray-400 mb-4">No tickets yet</p>
              <Button onClick={() => setShowNewTicket(true)}>
                Create Your First Ticket
              </Button>
            </div>
          ) : (
            userTickets.map((ticket) => (
              <div
                key={ticket.id}
                onClick={() => setSelectedTicket(ticket)}
                className="bg-white dark:bg-slate-800 rounded-xl p-6 cursor-pointer hover:shadow-lg transition-shadow"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="text-lg mb-2">{ticket.subject}</h3>
                    <div className="flex items-center gap-3 text-sm">
                      <span className={`px-2 py-1 rounded ${getStatusColor(ticket.status)}`}>
                        {ticket.status}
                      </span>
                      <span className={getPriorityColor(ticket.priority)}>
                        {ticket.priority}
                      </span>
                      <span className="text-gray-600 dark:text-gray-400">
                        {ticket.category}
                      </span>
                    </div>
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {new Date(ticket.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                </div>
                
                <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                  {ticket.messages[0]?.message}
                </p>

                <div className="mt-3 pt-3 border-t border-gray-200 dark:border-slate-700 flex items-center justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">
                    {ticket.messages.length} {ticket.messages.length === 1 ? 'message' : 'messages'}
                  </span>
                  <span className="text-blue-600 dark:text-blue-400">
                    View details →
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}