import { createContext, useContext, useState, useEffect, useRef, ReactNode } from 'react';
import { toast } from 'sonner';
import { useAuth } from './AuthContext';
import { api } from '../utils/supabase/api';
import { serverUrl } from '../utils/supabase/client';

// ============================================
// TYPES
// ============================================

export interface TicketMessage {
  id: string;
  senderId: string;
  senderName: string;
  senderRole: 'user' | 'admin';
  message: string;
  timestamp: Date;
  attachments?: string[];
}

export interface Ticket {
  id: string;
  userId: string;
  userEmail: string;
  userName: string;
  subject: string;
  category: 'technical' | 'account' | 'trading' | 'deposit' | 'withdrawal' | 'kyc' | 'other';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'open' | 'pending' | 'resolved' | 'closed';
  messages: TicketMessage[];
  createdAt: Date;
  updatedAt: Date;
  assignedTo?: string;
}

interface TicketContextType {
  tickets: Ticket[];
  loading: boolean;
  createTicket: (data: {
    subject: string;
    category: Ticket['category'];
    priority: Ticket['priority'];
    message: string;
    userId: string;
    userEmail: string;
    userName: string;
  }) => void;
  addMessage: (ticketId: string, message: string, senderId: string, senderName: string, senderRole: 'user' | 'admin') => void;
  updateTicketStatus: (ticketId: string, status: Ticket['status']) => void;
  updateTicketPriority: (ticketId: string, priority: Ticket['priority']) => void;
  assignTicket: (ticketId: string, adminId: string) => void;
  deleteTicket: (ticketId: string) => void;
  getUserTickets: (userId: string) => Ticket[];
  // New database functions
  refreshTickets: () => Promise<void>;
}

const TicketContext = createContext<TicketContextType | undefined>(undefined);

export const useTickets = () => {
  const context = useContext(TicketContext);
  if (!context) {
    throw new Error('useTickets must be used within TicketProvider');
  }
  return context;
};

export const TicketProvider = ({ children }: { children: ReactNode }) => {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(false);
  const { currentUser } = useAuth();
  const syncTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Refresh tickets v2.0
  const refreshTickets = async () => {
    if (!currentUser?.id) return;
    setLoading(true);
    try {
      const dbTickets = currentUser.role === 'admin' ? await api.tickets.getAll() : await api.tickets.getByUserId(currentUser.id);
      
      if (Array.isArray(dbTickets)) {
        const ticketsWithMessages = await Promise.all(
          dbTickets.map(async (ticket: any) => {
            const dbMessages = await api.tickets.getMessages(ticket.id).catch(() => []);
            const messages = Array.isArray(dbMessages) ? dbMessages.map((msg: any) => ({
              id: msg.id,
              senderId: msg.sender_id,
              senderName: msg.sender_name || 'Unknown',
              senderRole: msg.sender_role || 'user',
              message: msg.message,
              timestamp: new Date(msg.created_at),
              attachments: msg.attachments ? JSON.parse(msg.attachments) : undefined
            })) : [];

            return {
              id: ticket.id,
              userId: ticket.user_id,
              userEmail: ticket.user_email || '',
              userName: ticket.user_name || '',
              subject: ticket.subject,
              category: ticket.category || 'other',
              priority: ticket.priority || 'medium',
              status: ticket.status,
              messages,
              createdAt: new Date(ticket.created_at),
              updatedAt: new Date(ticket.updated_at),
              assignedTo: ticket.assigned_to
            };
          })
        );
        setTickets(ticketsWithMessages);
      }
    } catch (error) {
       console.error('Failed to refresh tickets:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (currentUser?.id) refreshTickets();
  }, [currentUser?.id]);

  // Legacy sync logic and real-time listeners removed
  // All state changes are now triggered via API calls with local refresh

  const createTicket = (data: {
    subject: string;
    category: Ticket['category'];
    priority: Ticket['priority'];
    message: string;
    userId: string;
    userEmail: string;
    userName: string;
  }) => {
    api.tickets.create({
      user_id: data.userId,
      user_email: data.userEmail,
      user_name: data.userName,
      subject: data.subject,
      category: data.category,
      priority: data.priority,
      status: 'open',
      initial_message: data.message
    }).then(() => refreshTickets());
    toast.success('Support ticket created successfully');
  };

  const addMessage = (
    ticketId: string,
    message: string,
    senderId: string,
    senderName: string,
    senderRole: 'user' | 'admin'
  ) => {
    api.tickets.addMessage(ticketId, {
      sender_id: senderId,
      sender_name: senderName,
      sender_role: senderRole,
      message
    }).then(() => refreshTickets());
  };

  const updateTicketStatus = (ticketId: string, status: Ticket['status']) => {
    api.tickets.updateStatus(ticketId, status).then(() => refreshTickets());
  };

  const updateTicketPriority = (ticketId: string, priority: Ticket['priority']) => {
    api.tickets.updatePriority(ticketId, priority).then(() => refreshTickets());
  };

  const assignTicket = (ticketId: string, adminId: string) => {
    api.tickets.assign(ticketId, adminId).then(() => refreshTickets());
  };

  const deleteTicket = (ticketId: string) => {
    api.tickets.delete(ticketId).then(() => refreshTickets());
  };

  const getUserTickets = (userId: string) => {
    return tickets.filter(ticket => ticket.userId === userId);
  };

  const value: TicketContextType = {
    tickets,
    loading,
    createTicket,
    addMessage,
    updateTicketStatus,
    updateTicketPriority,
    assignTicket,
    deleteTicket,
    getUserTickets,
    refreshTickets
  };

  return <TicketContext.Provider value={value}>{children}</TicketContext.Provider>;
};