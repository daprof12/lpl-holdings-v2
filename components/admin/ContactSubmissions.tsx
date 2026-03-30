import { useState, useEffect } from 'react';
import { 
  Mail, 
  MessageSquare, 
  User, 
  Calendar,
  CheckCircle2,
  XCircle,
  Eye,
  Reply,
  Trash2,
  Filter
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
import { toast } from 'sonner';
import { useTickets } from '../../contexts/TicketContext';
import { useAuth } from '../../contexts/AuthContext';

interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  message: string;
  status: 'unread' | 'read' | 'replied';
  createdAt: number;
  replied: boolean;
  repliedAt?: number;
  ticketId?: string;
}

export default function ContactSubmissions() {
  const [submissions, setSubmissions] = useState<ContactSubmission[]>([]);
  const [filteredSubmissions, setFilteredSubmissions] = useState<ContactSubmission[]>([]);
  const [statusFilter, setStatusFilter] = useState<'all' | 'unread' | 'read' | 'replied'>('all');
  const [selectedSubmission, setSelectedSubmission] = useState<ContactSubmission | null>(null);
  const [showReplyDialog, setShowReplyDialog] = useState(false);
  const [replyMessage, setReplyMessage] = useState('');
  
  const { createTicket } = useTickets();
  const { user } = useAuth();

  // Load submissions from localStorage
  useEffect(() => {
    loadSubmissions();
    
    // Listen for storage changes
    const handleStorageChange = () => {
      loadSubmissions();
    };
    
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // Filter submissions
  useEffect(() => {
    if (statusFilter === 'all') {
      setFilteredSubmissions(submissions);
    } else {
      setFilteredSubmissions(submissions.filter(s => s.status === statusFilter));
    }
  }, [submissions, statusFilter]);

  const loadSubmissions = () => {
    const stored = localStorage.getItem('gross_contact_submissions');
    if (stored) {
      const parsed = JSON.parse(stored);
      // Sort by newest first
      parsed.sort((a: ContactSubmission, b: ContactSubmission) => b.createdAt - a.createdAt);
      setSubmissions(parsed);
    }
  };

  const markAsRead = (id: string) => {
    const updated = submissions.map(s => 
      s.id === id && s.status === 'unread' ? { ...s, status: 'read' as const } : s
    );
    setSubmissions(updated);
    localStorage.setItem('gross_contact_submissions', JSON.stringify(updated));
    window.dispatchEvent(new Event('storage'));
  };

  const handleViewSubmission = (submission: ContactSubmission) => {
    setSelectedSubmission(submission);
    if (submission.status === 'unread') {
      markAsRead(submission.id);
    }
  };

  const handleReplyClick = (submission: ContactSubmission) => {
    setSelectedSubmission(submission);
    setShowReplyDialog(true);
    setReplyMessage(`Dear ${submission.name},\n\nThank you for contacting us.\n\n`);
  };

  const handleSendReply = () => {
    if (!selectedSubmission || !replyMessage.trim()) {
      toast.error('Please enter a reply message');
      return;
    }

    // Create a support ticket with the reply
    createTicket({
      subject: `Re: Contact Form - ${selectedSubmission.name}`,
      category: 'other',
      priority: 'medium',
      message: `Original Message from ${selectedSubmission.name} (${selectedSubmission.email}):\n\n${selectedSubmission.message}\n\n---\n\nAdmin Reply:\n\n${replyMessage}`,
      userId: user?.id || 'admin',
      userEmail: selectedSubmission.email,
      userName: selectedSubmission.name
    });

    // Update submission status
    const updated = submissions.map(s => 
      s.id === selectedSubmission.id 
        ? { ...s, status: 'replied' as const, replied: true, repliedAt: Date.now() } 
        : s
    );
    setSubmissions(updated);
    localStorage.setItem('gross_contact_submissions', JSON.stringify(updated));
    window.dispatchEvent(new Event('storage'));

    toast.success('Reply sent successfully! A support ticket has been created.');
    setShowReplyDialog(false);
    setReplyMessage('');
    setSelectedSubmission(null);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this submission?')) {
      const updated = submissions.filter(s => s.id !== id);
      setSubmissions(updated);
      localStorage.setItem('gross_contact_submissions', JSON.stringify(updated));
      window.dispatchEvent(new Event('storage'));
      toast.success('Submission deleted successfully');
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'unread':
        return <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400">Unread</span>;
      case 'read':
        return <span className="px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400">Read</span>;
      case 'replied':
        return <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400">Replied</span>;
      default:
        return null;
    }
  };

  const unreadCount = submissions.filter(s => s.status === 'unread').length;
  const readCount = submissions.filter(s => s.status === 'read').length;
  const repliedCount = submissions.filter(s => s.status === 'replied').length;

  return (
    <div className="p-4 lg:p-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl mb-2">Contact Submissions</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage and respond to contact form submissions
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-lg bg-purple-100 dark:bg-purple-900/20 flex items-center justify-center">
              <MessageSquare className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Total</div>
              <div className="text-2xl">{submissions.length}</div>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-lg bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center">
              <Mail className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Unread</div>
              <div className="text-2xl">{unreadCount}</div>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-lg bg-yellow-100 dark:bg-yellow-900/20 flex items-center justify-center">
              <Eye className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
            </div>
            <div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Read</div>
              <div className="text-2xl">{readCount}</div>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-lg bg-green-100 dark:bg-green-900/20 flex items-center justify-center">
              <CheckCircle2 className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Replied</div>
              <div className="text-2xl">{repliedCount}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-slate-800 rounded-xl p-4 shadow-sm mb-6">
        <div className="flex items-center gap-2">
          <Filter className="w-5 h-5 text-gray-500" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as any)}
            className="px-4 py-2 rounded-lg border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800"
          >
            <option value="all">All Submissions</option>
            <option value="unread">Unread</option>
            <option value="read">Read</option>
            <option value="replied">Replied</option>
          </select>
        </div>
      </div>

      {/* Submissions Table */}
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-slate-900/50 border-b border-gray-200 dark:border-slate-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs uppercase tracking-wider text-gray-700 dark:text-gray-300">Name</th>
                <th className="px-6 py-3 text-left text-xs uppercase tracking-wider text-gray-700 dark:text-gray-300">Email</th>
                <th className="px-6 py-3 text-left text-xs uppercase tracking-wider text-gray-700 dark:text-gray-300">Message Preview</th>
                <th className="px-6 py-3 text-left text-xs uppercase tracking-wider text-gray-700 dark:text-gray-300">Status</th>
                <th className="px-6 py-3 text-left text-xs uppercase tracking-wider text-gray-700 dark:text-gray-300">Date</th>
                <th className="px-6 py-3 text-left text-xs uppercase tracking-wider text-gray-700 dark:text-gray-300">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-slate-700">
              {filteredSubmissions.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-gray-500 dark:text-gray-400">
                    <MessageSquare className="w-12 h-12 mx-auto mb-3 opacity-50" />
                    <p>No contact submissions found</p>
                  </td>
                </tr>
              ) : (
                filteredSubmissions.map((submission) => (
                  <tr 
                    key={submission.id} 
                    className={`hover:bg-gray-50 dark:hover:bg-slate-700/50 ${
                      submission.status === 'unread' ? 'bg-blue-50/50 dark:bg-blue-900/10' : ''
                    }`}
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4 text-gray-400" />
                        <span className="font-medium">{submission.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-600 dark:text-gray-400">{submission.email}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="max-w-xs truncate text-sm text-gray-600 dark:text-gray-400">
                        {submission.message}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {getStatusBadge(submission.status)}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {new Date(submission.createdAt).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleViewSubmission(submission)}
                          title="View"
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                        {!submission.replied && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleReplyClick(submission)}
                            title="Reply"
                          >
                            <Reply className="w-4 h-4 text-blue-600" />
                          </Button>
                        )}
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDelete(submission.id)}
                          title="Delete"
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

      {/* View Submission Dialog */}
      <Dialog open={!!selectedSubmission && !showReplyDialog} onOpenChange={() => setSelectedSubmission(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Contact Submission Details</DialogTitle>
            <DialogDescription>View the full message from the contact form</DialogDescription>
          </DialogHeader>

          {selectedSubmission && (
            <div className="space-y-4">
              <div>
                <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Name</div>
                <div className="text-lg font-medium">{selectedSubmission.name}</div>
              </div>

              <div>
                <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Email</div>
                <div className="text-lg">{selectedSubmission.email}</div>
              </div>

              <div>
                <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Message</div>
                <div className="p-4 bg-gray-50 dark:bg-slate-900 rounded-lg whitespace-pre-wrap">
                  {selectedSubmission.message}
                </div>
              </div>

              <div>
                <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Status</div>
                <div>{getStatusBadge(selectedSubmission.status)}</div>
              </div>

              <div className="pt-4 border-t border-gray-200 dark:border-slate-700">
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Submitted: {new Date(selectedSubmission.createdAt).toLocaleString()}
                </div>
                {selectedSubmission.repliedAt && (
                  <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    Replied: {new Date(selectedSubmission.repliedAt).toLocaleString()}
                  </div>
                )}
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setSelectedSubmission(null)}>
              Close
            </Button>
            {selectedSubmission && !selectedSubmission.replied && (
              <Button onClick={() => {
                setShowReplyDialog(true);
                setReplyMessage(`Dear ${selectedSubmission.name},\n\nThank you for contacting us.\n\n`);
              }}>
                <Reply className="w-4 h-4 mr-2" />
                Reply
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Reply Dialog */}
      <Dialog open={showReplyDialog} onOpenChange={(open) => {
        setShowReplyDialog(open);
        if (!open) {
          setReplyMessage('');
        }
      }}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Reply to Contact Submission</DialogTitle>
            <DialogDescription>
              Send a reply via the support ticket system
            </DialogDescription>
          </DialogHeader>

          {selectedSubmission && (
            <div className="space-y-4">
              <div className="p-4 bg-gray-50 dark:bg-slate-900 rounded-lg">
                <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                  Replying to: <strong>{selectedSubmission.name}</strong> ({selectedSubmission.email})
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400 italic">
                  "{selectedSubmission.message.substring(0, 100)}..."
                </div>
              </div>

              <div>
                <Label htmlFor="reply">Your Reply</Label>
                <textarea
                  id="reply"
                  value={replyMessage}
                  onChange={(e) => setReplyMessage(e.target.value)}
                  rows={8}
                  className="w-full mt-1 px-4 py-2 rounded-lg border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800"
                  placeholder="Type your reply here..."
                />
              </div>

              <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-sm text-blue-700 dark:text-blue-400">
                <strong>Note:</strong> This will create a support ticket that allows you to continue the conversation with the user.
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => {
              setShowReplyDialog(false);
              setReplyMessage('');
            }}>
              Cancel
            </Button>
            <Button onClick={handleSendReply}>
              <Reply className="w-4 h-4 mr-2" />
              Send Reply
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
