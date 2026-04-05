import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { toast } from 'sonner';
import { useAuth } from './AuthContext';
import { projectId, publicAnonKey } from '../utils/supabase/info';

// ============================================
// API CONFIGURATION
// ============================================

const serverUrl = `https://${projectId}.supabase.co/functions/v1/make-server-5d4be467`;

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

  // ============================================
  // API FUNCTIONS - Database Integration
  // ============================================

  /**
   * Fetch tickets from database for current user
   */
  const fetchTickets = async (userId: string) => {
    try {
      const response = await fetch(`${serverUrl}/tickets/user/${userId}`, {
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`
        }
      });

      if (!response.ok) {
        console.error('Failed to fetch tickets:', response.statusText);
        return [];
      }

      const dbTickets = await response.json();
      console.log('✅ Tickets loaded from database:', dbTickets.length);
      
      // Fetch messages for each ticket
      const ticketsWithMessages = await Promise.all(
        dbTickets.map(async (ticket: any) => {
          const messagesResponse = await fetch(`${serverUrl}/tickets/${ticket.id}/messages`, {
            headers: {
              'Authorization': `Bearer ${publicAnonKey}`
            }
          });

          let messages = [];
          if (messagesResponse.ok) {
            const dbMessages = await messagesResponse.json();
            messages = dbMessages.map((msg: any) => ({
              id: msg.id,
              senderId: msg.sender_id,
              senderName: msg.sender_name || 'Unknown',
              senderRole: msg.sender_role || 'user',
              message: msg.message,
              timestamp: new Date(msg.created_at),
              attachments: msg.attachments ? JSON.parse(msg.attachments) : undefined
            }));
          }

          return {
            id: ticket.id,
            userId: ticket.user_id,
            userEmail: ticket.user_email || '',
            userName: ticket.user_name || '',
            subject: ticket.subject,
            category: ticket.category || 'other',
            priority: ticket.priority || 'medium',
            status: ticket.status,
            messages: messages,
            createdAt: new Date(ticket.created_at),
            updatedAt: new Date(ticket.updated_at),
            assignedTo: ticket.assigned_to
          };
        })
      );
      
      return ticketsWithMessages;
    } catch (error) {
      console.error('Error fetching tickets:', error);
      return [];
    }
  };

  /**
   * Create ticket in database
   */
  const createTicketInDatabase = async (data: {
    subject: string;
    category: string;
    priority: string;
    message: string;
    userId: string;
    userEmail: string;
    userName: string;
  }) => {
    try {
      const response = await fetch(`${serverUrl}/tickets`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          user_id: data.userId,
          user_email: data.userEmail,
          user_name: data.userName,
          subject: data.subject,
          category: data.category,
          priority: data.priority,
          status: 'open'
        })
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to create ticket');
      }

      const ticket = await response.json();
      console.log('✅ Ticket created in database:', ticket.id);

      // Add initial message
      await fetch(`${serverUrl}/tickets/${ticket.id}/messages`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          sender_id: data.userId,
          sender_name: data.userName,
          sender_role: 'user',
          message: data.message
        })
      });

      return ticket;
    } catch (error) {
      console.error('Error creating ticket:', error);
      throw error;
    }
  };

  /**
   * Add message to ticket in database
   */
  const addMessageToDatabase = async (ticketId: string, data: {
    senderId: string;
    senderName: string;
    senderRole: string;
    message: string;
  }) => {
    try {
      const response = await fetch(`${serverUrl}/tickets/${ticketId}/messages`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          sender_id: data.senderId,
          sender_name: data.senderName,
          sender_role: data.senderRole,
          message: data.message
        })
      });

      if (!response.ok) {
        throw new Error('Failed to add message');
      }

      console.log('✅ Message added to ticket:', ticketId);
    } catch (error) {
      console.error('Error adding message:', error);
    }
  };

  /**
   * Update ticket status in database
   */
  const updateTicketStatusInDatabase = async (ticketId: string, status: string) => {
    try {
      const response = await fetch(`${serverUrl}/tickets/${ticketId}/status`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ status })
      });

      if (!response.ok) {
        throw new Error('Failed to update ticket status');
      }

      console.log('✅ Ticket status updated:', ticketId);
    } catch (error) {
      console.error('Error updating ticket status:', error);
    }
  };

  /**
   * Refresh tickets from database
   */
  const refreshTickets = async () => {
    if (!currentUser?.id) return;
    
    setLoading(true);
    try {
      const dbTickets = await fetchTickets(currentUser.id);
      setTickets(dbTickets);
    } catch (error) {
      console.error('Error refreshing tickets:', error);
    } finally {
      setLoading(false);
    }
  };

  // ============================================
  // LOAD DATA FROM DATABASE ON MOUNT
  // ============================================

  /**
   * Load tickets when user is authenticated
   */
  useEffect(() => {
    const loadUserTickets = async () => {
      if (currentUser && currentUser.id) {
        console.log('🔄 Loading tickets for user:', currentUser.id);
        await refreshTickets();
      }
    };

    loadUserTickets();
  }, [currentUser?.id]);

  // Load from localStorage (fallback, now per-user)
  useEffect(() => {
    const userId = currentUser?.id;
    if (!userId) return;

    const storedTickets = localStorage.getItem(`gross_tickets_${userId}`);
    if (storedTickets) {
      setTickets(JSON.parse(storedTickets));
    }
  }, [currentUser?.id]);

  // Save to localStorage (per-user)
  useEffect(() => {
    const userId = currentUser?.id;
    if (userId && tickets.length > 0) {
      localStorage.setItem(`gross_tickets_${userId}`, JSON.stringify(tickets));
    }
  }, [tickets, currentUser?.id]);

  // Cross-tab sync via storage event (per-user)
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      const userId = currentUser?.id;
      if (!userId) return;

      if (e.key === `gross_tickets_${userId}` && e.newValue) {
        try {
          setTickets(JSON.parse(e.newValue));
        } catch (error) {
          console.error('Cross-tab tickets sync failed:', error);
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const createTicket = (data: {
    subject: string;
    category: Ticket['category'];
    priority: Ticket['priority'];
    message: string;
    userId: string;
    userEmail: string;
    userName: string;
  }) => {
    const newTicket: Ticket = {
      id: `ticket-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      userId: data.userId,
      userEmail: data.userEmail,
      userName: data.userName,
      subject: data.subject,
      category: data.category,
      priority: data.priority,
      status: 'open',
      messages: [
        {
          id: `msg-${Date.now()}`,
          senderId: data.userId,
          senderName: data.userName,
          senderRole: 'user',
          message: data.message,
          timestamp: new Date(),
        },
      ],
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    setTickets(prev => [newTicket, ...prev]);
    
    // Trigger notification event for admins
    window.dispatchEvent(new CustomEvent('ticket-created', { 
      detail: { 
        ticketId: newTicket.id, 
        userId: data.userId, 
        userName: data.userName,
        subject: data.subject 
      } 
    }));
    
    toast.success('Support ticket created successfully');
  };

  const addMessage = (
    ticketId: string,
    message: string,
    senderId: string,
    senderName: string,
    senderRole: 'user' | 'admin'
  ) => {
    setTickets(prev =>
      prev.map(ticket => {
        if (ticket.id === ticketId) {
          const newMessage: TicketMessage = {
            id: `msg-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
            senderId,
            senderName,
            senderRole,
            message,
            timestamp: new Date(),
          };

          // Trigger notification event
          window.dispatchEvent(new CustomEvent('ticket-message', { 
            detail: { 
              ticketId, 
              senderRole, 
              senderName,
              userId: ticket.userId,
              message: message.substring(0, 100) 
            } 
          }));

          return {
            ...ticket,
            messages: [...ticket.messages, newMessage],
            updatedAt: new Date(),
            status: senderRole === 'admin' ? 'pending' : ticket.status,
          };
        }
        return ticket;
      })
    );
  };

  const updateTicketStatus = (ticketId: string, status: Ticket['status']) => {
    setTickets(prev =>
      prev.map(ticket => {
        if (ticket.id === ticketId) {
          // Trigger notification event when status changes
          window.dispatchEvent(new CustomEvent('ticket-status-changed', { 
            detail: { 
              ticketId, 
              status, 
              userId: ticket.userId,
              subject: ticket.subject
            } 
          }));
          
          return { ...ticket, status, updatedAt: new Date() };
        }
        return ticket;
      })
    );
  };

  const updateTicketPriority = (ticketId: string, priority: Ticket['priority']) => {
    setTickets(prev =>
      prev.map(ticket =>
        ticket.id === ticketId
          ? { ...ticket, priority, updatedAt: new Date() }
          : ticket
      )
    );
  };

  const assignTicket = (ticketId: string, adminId: string) => {
    setTickets(prev =>
      prev.map(ticket =>
        ticket.id === ticketId
          ? { ...ticket, assignedTo: adminId, updatedAt: new Date() }
          : ticket
      )
    );
  };

  const deleteTicket = (ticketId: string) => {
    setTickets(prev => prev.filter(ticket => ticket.id !== ticketId));
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