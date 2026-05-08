import { useState, useEffect } from 'react';
import { 
  AlertTriangle,
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
  Percent,
  Settings,
  FileCode,
  Save,
  ChevronRight,
  ChevronDown,
  Layout,
  Code,
  Info,
  Type,
  ListChecks,
  Square,
  Copy,
  Image as ImageIcon
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
import { api } from '../../utils/supabase/api';
import { supabase } from '../../utils/supabase/client';
import { useNotifications, CRMMessage, NotificationChannel } from '../../contexts/NotificationContext';
import { useAuth } from '../../contexts/AuthContext';
import { toast } from 'sonner';

export default function CRMMessaging() {
  const { 
    crmMessages, createCRMMessage, updateCRMMessage, sendCRMMessage, deleteCRMMessage,
    emailTemplates, saveEmailTemplate, deleteEmailTemplate,
    smtpConfig, saveSMTPConfig
  } = useNotifications();
  const { users } = useAuth();
  
  const [activeTab, setActiveTab] = useState<'messages' | 'templates' | 'smtp'>('messages');
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [showTemplateDialog, setShowTemplateDialog] = useState(false);
  const [showTemplatePreview, setShowTemplatePreview] = useState(false);
  const [editingTemplate, setEditingTemplate] = useState<any>(null);
  const [editingMessage, setEditingMessage] = useState<CRMMessage | null>(null);
  const [previewMessage, setPreviewMessage] = useState<CRMMessage | null>(null);
  const [confirmSendId, setConfirmSendId] = useState<string | null>(null);
  
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
  const [selectedTemplateId, setSelectedTemplateId] = useState('');
  
  // SMTP settings form
  const [smtpForm, setSmtpForm] = useState(smtpConfig || {
    host: '',
    port: 587,
    secure: false,
    auth: { user: '', pass: '' },
    fromEmail: '',
    fromName: '',
  });

  useEffect(() => {
    if (smtpConfig) {
      setSmtpForm(smtpConfig);
    }
  }, [smtpConfig]);

  // Template form
  const [templateForm, setTemplateForm] = useState({
    name: '',
    category: 'general' as any,
    subject: '',
    header: '',
    body: '',
    footer: '',
    htmlContent: '',
    logoUrl: '',
    heroImage: '',
    heroTitle: '',
    accentColor: '#E50914',
    blocks: [] as any[],
  });
  
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
    setSelectedTemplateId('');
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

    const messageData: any = {
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

    if (selectedTemplateId) {
      messageData.metadata.emailTemplateId = selectedTemplateId;
      const template = emailTemplates.find(t => t.id === selectedTemplateId);
      if (template) {
        messageData.metadata.htmlContent = renderEmailHTML(template);
      }
    }

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
    setConfirmSendId(id);
  };

  const confirmAndSend = () => {
    if (confirmSendId) {
      sendCRMMessage(confirmSendId);
      setConfirmSendId(null);
    }
  };

  const handleSaveTemplate = async () => {
    // Trim values to ensure we don't save whitespace-only names/subjects
    const templateName = templateForm.name?.trim();
    const templateSubject = templateForm.subject?.trim();

    if (!templateName || !templateSubject) {
      toast.error('Template name and subject are required');
      return;
    }

    try {
      const payload = {
        ...templateForm,
        name: templateName,
        subject: templateSubject,
        htmlContent: renderEmailHTML(templateForm),
        html_content: renderEmailHTML(templateForm)
      };

      // If editing, use the existing ID; if cloning/creating, let the API/Supabase handle ID generation
      if (editingTemplate?.id) {
        payload.id = editingTemplate.id;
      } else {
        delete payload.id;
      }

      await saveEmailTemplate(payload);
      
      setShowTemplateDialog(false);
      setEditingTemplate(null);
    } catch (err: any) {
      console.error('CRMMessaging: Save template failed:', err);
    }
  };

  const handleFileUpload = async (file: File, callback: (url: string) => void) => {
    try {
      // Create a unique file name
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}.${fileExt}`;
      const filePath = `${fileName}`;

      toast.loading('Uploading image...', { id: 'upload' });

      // Upload the file to 'crm-images' bucket
      const { error: uploadError, data } = await supabase.storage
        .from('crm-images')
        .upload(filePath, file);

      if (uploadError) {
        throw uploadError;
      }

      // Get the public URL
      const { data: publicUrlData } = supabase.storage
        .from('crm-images')
        .getPublicUrl(filePath);

      callback(publicUrlData.publicUrl);
      toast.success('Image uploaded successfully', { id: 'upload' });
    } catch (err: any) {
      console.error('Image upload failed:', err);
      toast.error(`Upload failed: ${err.message}. Make sure 'crm-images' bucket exists and is public.`, { id: 'upload' });
    }
  };

  const addBlock = (type: string) => {
    const newBlock = {
      id: `block-${Date.now()}`,
      type,
      content: type === 'feature_list' ? [] : type === 'button' ? { label: '', url: '' } : '',
    };
    setTemplateForm({ ...templateForm, blocks: [...templateForm.blocks, newBlock] });
  };

  const removeBlock = (id: string) => {
    setTemplateForm({ ...templateForm, blocks: templateForm.blocks.filter(b => b.id !== id) });
  };

  const updateBlock = (id: string, content: any) => {
    setTemplateForm({
      ...templateForm,
      blocks: templateForm.blocks.map(b => b.id === id ? { ...b, content } : b)
    });
  };

  const getAbsoluteUrl = (url: string) => {
    if (!url) return '';
    if (url.startsWith('data:')) return url; // Base64 will break in email, but we pass it as-is
    if (url.startsWith('/')) return `${window.location.origin}${url}`;
    return url;
  };

  const renderEmailHTML = (template: any) => {
    const accent = template.accentColor || '#E50914';
    let contentHtml = template.blocks.map((block: any) => {
      switch (block.type) {
        case 'text':
          return `<p style="margin-bottom: 20px; color: #333; line-height: 1.6;">${block.content.replace(/\n/g, '<br>')}</p>`;
        case 'button':
          return `<div style="text-align: center; margin: 30px 0;">
                    <a href="${getAbsoluteUrl(block.content.url)}" style="background-color: ${accent}; color: #fff; padding: 14px 40px; border-radius: 4px; text-decoration: none; font-weight: bold; display: inline-block;">${block.content.label}</a>
                  </div>`;
        case 'feature_list':
          return `<div style="margin: 30px 0; border-top: 1px solid #eee; padding-top: 20px;">
                    ${block.content.map((f: any) => `
                      <div style="display: flex; gap: 15px; margin-bottom: 15px; align-items: flex-start;">
                        <div style="font-size: 18px; line-height: 1;">✓</div>
                        <div>
                          <div style="font-weight: bold; color: #111;">${f.title}</div>
                          <div style="font-size: 13px; color: #666;">${f.text}</div>
                        </div>
                      </div>
                    `).join('')}
                  </div>`;
        case 'image':
          return `<img src="${getAbsoluteUrl(block.content)}" style="width: 100%; border-radius: 8px; margin: 20px 0;" />`;
        case 'footer':
          return `<p style="font-size: 13px; color: #666; margin-top: 30px;">${block.content}</p>`;
        default: return '';
      }
    }).join('');

    const logoUrlStr = template.logoUrl || '/logo.png';

    return `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px; background-color: #fff; border: 1px solid #eee;">
        <div style="margin-bottom: 40px;">
          <img src="${getAbsoluteUrl(logoUrlStr)}" style="height: 48px;" alt="Logo" />
        </div>
        <h1 style="font-size: 32px; font-weight: 800; color: #000; margin-bottom: 24px;">${template.heroTitle || ''}</h1>
        ${template.heroImage ? `<img src="${getAbsoluteUrl(template.heroImage)}" style="width: 100%; border-radius: 4px; margin-bottom: 24px;" />` : ''}
        ${contentHtml}
        <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #000; font-size: 12px; color: #888;">
          <div style="margin-bottom: 15px;">
            Questions? Visit the <a href="#" style="color: #888; text-decoration: underline;">Help Center</a>
          </div>
          <div style="margin-bottom: 15px; color: #999;">
            <a href="#" style="color: #999; text-decoration: underline; margin-right: 15px;">Terms of Use</a>
            <a href="#" style="color: #999; text-decoration: underline; margin-right: 15px;">Privacy</a>
            <a href="#" style="color: #999; text-decoration: underline;">Help Center</a>
          </div>
          <p>This message was mailed to you. If you no longer wish to receive these emails, you can <a href="#" style="color: #E50914; text-decoration: underline;">unsubscribe here</a>.</p>
        </div>
      </div>
    `;
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
        <div className="flex gap-2 bg-gray-100 dark:bg-slate-800 p-1 rounded-xl">
          <button
            onClick={() => setActiveTab('messages')}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-semibold transition-all ${
              activeTab === 'messages' 
                ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-sm' 
                : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
            }`}
          >
            <MessageSquare className="w-4 h-4" />
            Messages
          </button>
          <button
            onClick={() => setActiveTab('templates')}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-semibold transition-all ${
              activeTab === 'templates' 
                ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-sm' 
                : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
            }`}
          >
            <FileCode className="w-4 h-4" />
            Template Gallery
          </button>
          <button
            onClick={() => setActiveTab('smtp')}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-semibold transition-all ${
              activeTab === 'smtp' 
                ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-sm' 
                : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
            }`}
          >
            <Settings className="w-4 h-4" />
            SMTP Config
          </button>
        </div>
        <Button onClick={() => setShowCreateDialog(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Create Message
        </Button>
      </div>

      {activeTab === 'messages' && (
        <>

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
    </>
  )}

  {activeTab === 'templates' && (
    <div className="space-y-6">
      <div className="flex justify-between items-center px-4 md:px-0">
        <h2 className="text-xl font-bold flex items-center gap-2">
          <Layout className="w-5 h-5 text-blue-600" />
          Email Template Gallery
        </h2>
        <Button onClick={() => {
          setEditingTemplate(null);
          setTemplateForm({ name: '', category: 'general', subject: '', logoUrl: '', heroImage: '', heroTitle: '', accentColor: '#E50914', blocks: [] as any[], header: '', body: '', footer: '', htmlContent: '' });
          setShowTemplateDialog(true);
        }}>
          <Plus className="w-4 h-4 mr-2" />
          New Template
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {emailTemplates.map(template => (
          <div key={template.id} className="bg-white dark:bg-slate-800 rounded-xl overflow-hidden shadow-sm border border-gray-200 dark:border-slate-700 group hover:border-blue-500/50 transition-all">
            <div 
              className="h-48 bg-gray-100 dark:bg-slate-900 overflow-hidden relative cursor-pointer"
              onClick={() => setPreviewMessage({ id: 'preview', title: template.subject, message: 'Previewing template layout...', type: template.category, status: 'sent', createdAt: Date.now(), channels: ['email'], recipientType: 'all', recipientIds: [], metadata: { emailTemplateId: template.id } } as any)}
            >
              <div className="absolute inset-x-0 top-0 h-1 z-10" style={{ backgroundColor: template.accentColor || '#E50914' }} />
              <div className="p-4 transform scale-[0.4] origin-top overflow-hidden opacity-80 group-hover:opacity-100 transition-opacity">
                <div dangerouslySetInnerHTML={{ __html: renderEmailHTML(template) }} />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-white/95 dark:from-slate-800/95 via-white/40 dark:via-slate-800/40 to-transparent flex items-end p-4">
                <div className="w-full h-full flex flex-col justify-end">
                  <h3 className="font-bold text-sm truncate">{template.name}</h3>
                  <div className="flex justify-between items-center mt-1">
                    <span className="text-[10px] uppercase tracking-wider bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 px-2 py-0.5 rounded">
                      {template.category}
                    </span>
                    <span className="text-[10px] text-gray-500">Last edited: {new Date(template.lastModified).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-3 border-t border-gray-100 dark:border-slate-700 flex justify-between items-center bg-gray-50/50 dark:bg-slate-800/50">
              <span className="text-[10px] text-gray-600 dark:text-gray-400 font-medium truncate max-w-[150px]">{template.subject}</span>
              <div className="flex gap-1.5">
                <button onClick={() => {
                  setEditingTemplate(null);
                  setTemplateForm({ ...template, name: `${template.name} (Copy)` });
                  setShowTemplateDialog(true);
                }} className="p-1.5 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 rounded text-emerald-600 transition-colors" title="Clone Template">
                  <Copy className="w-3.5 h-3.5" />
                </button>
                <button onClick={() => {
                  setEditingTemplate(template);
                  setTemplateForm({ ...template });
                  setShowTemplateDialog(true);
                }} className="p-1.5 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded text-blue-600 transition-colors" title="Edit Template">
                  <Edit className="w-3.5 h-3.5" />
                </button>
                <button onClick={() => deleteEmailTemplate(template.id)} className="p-1.5 hover:bg-red-50 dark:hover:bg-red-900/20 rounded text-red-600 transition-colors" title="Delete Template">
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )}

  {activeTab === 'smtp' && (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="bg-white dark:bg-slate-800 rounded-xl p-8 shadow-sm">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
            <Settings className="w-6 h-6 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <h2 className="text-xl font-bold">SMTP Configuration</h2>
            <p className="text-sm text-gray-500">Configure your outgoing email server settings</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>SMTP Host</Label>
              <Input 
                placeholder="smtp.example.com"
                value={smtpForm.host}
                onChange={e => setSmtpForm({...smtpForm, host: e.target.value})}
              />
            </div>
            <div>
              <Label>Port</Label>
              <Input 
                type="number"
                placeholder="587"
                value={smtpForm.port}
                onChange={e => setSmtpForm({...smtpForm, port: parseInt(e.target.value)})}
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <input 
              type="checkbox" 
              id="smtp-secure"
              checked={smtpForm.secure}
              onChange={e => setSmtpForm({...smtpForm, secure: e.target.checked})}
            />
            <Label htmlFor="smtp-secure">Use SSL/TLS Secure Connection</Label>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Auth User</Label>
              <Input 
                placeholder="user@example.com"
                value={smtpForm.auth.user}
                onChange={e => setSmtpForm({...smtpForm, auth: {...smtpForm.auth, user: e.target.value}})}
              />
            </div>
            <div>
              <Label>Auth Password</Label>
              <Input 
                type="password"
                placeholder="••••••••"
                value={smtpForm.auth.pass}
                onChange={e => setSmtpForm({...smtpForm, auth: {...smtpForm.auth, pass: e.target.value}})}
              />
            </div>
          </div>

          <hr className="my-6 border-gray-100 dark:border-slate-700" />

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Sender Name</Label>
              <Input 
                placeholder="Premium Broker"
                value={smtpForm.fromName}
                onChange={e => setSmtpForm({...smtpForm, fromName: e.target.value})}
              />
            </div>
            <div>
              <Label>Sender Email</Label>
              <Input 
                placeholder="noreply@example.com"
                value={smtpForm.fromEmail}
                onChange={e => setSmtpForm({...smtpForm, fromEmail: e.target.value})}
              />
            </div>
          </div>

          <div className="pt-4">
            <Button onClick={() => {
              saveSMTPConfig(smtpForm);
              toast.success('SMTP configuration saved successfully');
            }} className="w-full gap-2">
              <Save className="w-4 h-4" />
              Save Configuration
            </Button>
          </div>
        </div>
      </div>
      
      <div className="p-4 bg-blue-50 dark:bg-blue-900/10 rounded-lg border border-blue-100 dark:border-blue-900/30 flex items-start gap-3">
        <Info className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
        <p className="text-xs text-blue-700 dark:text-blue-300">
          Note: This configuration is used for transactional emails and CRM broadcasts sent via the Email channel. Ensure your credentials are correct to avoid delivery failures.
        </p>
      </div>
    </div>
  )}

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

            {/* Template Selection (Only for Email) */}
            {channels.includes('email') && (
              <div className="p-4 bg-gray-50 dark:bg-slate-900/50 rounded-xl border border-gray-100 dark:border-slate-800 animate-in fade-in slide-in-from-top-2">
                <div className="flex items-center gap-2 mb-3">
                  <Layout className="w-4 h-4 text-blue-600" />
                  <Label className="text-sm font-bold text-blue-700 dark:text-blue-400">Apply Email Template</Label>
                </div>
                <select
                  value={selectedTemplateId}
                  onChange={(e) => {
                    const id = e.target.value;
                    setSelectedTemplateId(id);
                    const template = emailTemplates.find(t => t.id === id);
                    if (template) {
                      setTitle(template.subject);
                      setMessage(`[Templated Content: ${template.name}]`);
                      // Auto-apply promo details if category matches
                      if (template.category === 'promotion') setMessageType('promo');
                    }
                  }}
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm"
                >
                  <option value="">Choose a template...</option>
                  {emailTemplates.map(template => (
                    <option key={template.id} value={template.id}>
                      [{template.category.toUpperCase()}] {template.name}
                    </option>
                  ))}
                </select>
                <p className="mt-2 text-[10px] text-gray-500 italic">
                  Tip: Selecting a template will overwrite your current title and message content.
                </p>
              </div>
            )}
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
        <DialogContent className="sm:max-w-4xl max-h-[90vh] overflow-y-auto">
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
                <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Message Content</div>
                {previewMessage.metadata?.emailTemplateId ? (
                  <div className="border border-gray-200 dark:border-slate-700 rounded-lg overflow-hidden bg-white dark:bg-slate-900">
                    <div className="p-2 bg-gray-50 dark:bg-slate-800 text-[10px] uppercase font-bold text-gray-500 border-b border-gray-200 dark:border-slate-700">Rich Email Preview</div>
                    <div className="max-h-[400px] overflow-y-auto p-4 transform scale-90 origin-top">
                      {(() => {
                        const tpl = emailTemplates.find(t => t.id === previewMessage.metadata?.emailTemplateId);
                        return tpl ? <div dangerouslySetInnerHTML={{ __html: renderEmailHTML(tpl) }} /> : previewMessage.message;
                      })()}
                    </div>
                  </div>
                ) : (
                  <div className="p-4 bg-gray-50 dark:bg-slate-900 rounded-lg whitespace-pre-wrap">
                    {previewMessage.message}
                  </div>
                )}
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
                    : `${previewMessage.recipientIds?.length || 0} specific users`}
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
      {/* Template Create/Edit Dialog */}
      <Dialog open={showTemplateDialog} onOpenChange={setShowTemplateDialog}>
        <DialogContent className="sm:max-w-6xl max-h-[90vh] overflow-y-auto">
          <DialogHeader className="flex flex-row items-center justify-between border-b border-gray-100 dark:border-slate-800 pb-4 mb-6">
            <div>
              <DialogTitle>{editingTemplate ? 'Edit Template' : 'Create New Template'}</DialogTitle>
              <DialogDescription>Design a reusable email template for your CRM messages</DialogDescription>
            </div>
            <div className="flex items-center gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                className="gap-2"
                onClick={() => setShowTemplatePreview(true)}
              >
                <Eye className="w-4 h-4" />
                Preview
              </Button>
            </div>
          </DialogHeader>

          <div className="space-y-8">
            {/* Header & Style (Top Row) */}
            <div className="bg-gray-50/50 dark:bg-slate-900/50 p-6 rounded-2xl border border-gray-100 dark:border-slate-800">
              <h4 className="font-bold text-xs uppercase tracking-widest text-gray-400 mb-6 flex items-center gap-2">
                <Settings className="w-3 h-3" />
                Brand Identity & Structure
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="space-y-2">
                  <Label className="text-[10px] uppercase text-gray-500">Subject Line</Label>
                  <Input 
                    value={templateForm.subject}
                    onChange={e => setTemplateForm({...templateForm, subject: e.target.value})}
                    placeholder="Email subject..."
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-[10px] uppercase text-gray-500">Logo & Accent</Label>
                  <div className="flex gap-2">
                    {templateForm.logoUrl ? (
                      <div className="relative w-10 h-10 rounded overflow-hidden border border-gray-200 dark:border-slate-700 bg-white flex items-center justify-center shrink-0">
                        <img src={templateForm.logoUrl} className="max-w-full max-h-full object-contain p-1" alt="Logo" />
                        <button 
                          onClick={() => setTemplateForm({...templateForm, logoUrl: ''})}
                          className="absolute inset-0 bg-black/60 text-white flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity text-[8px] font-bold"
                        >
                          Clear
                        </button>
                      </div>
                    ) : (
                      <label className="flex flex-col items-center justify-center w-10 h-10 border-2 border-dashed border-gray-200 dark:border-slate-700 rounded cursor-pointer hover:bg-gray-50 dark:hover:bg-slate-900 transition-colors shrink-0" title="Upload Logo">
                        <Plus className="w-4 h-4 text-gray-400" />
                        <input 
                          type="file" 
                          className="hidden" 
                          accept="image/*"
                          onChange={e => e.target.files?.[0] && handleFileUpload(e.target.files[0], (url) => setTemplateForm({...templateForm, logoUrl: url}))}
                        />
                      </label>
                    )}
                    <Input value={templateForm.logoUrl} onChange={e => setTemplateForm({...templateForm, logoUrl: e.target.value})} placeholder="Or paste Logo URL..." className="flex-1 h-10 text-xs" />
                    <input 
                      type="color" 
                      value={templateForm.accentColor}
                      onChange={e => setTemplateForm({...templateForm, accentColor: e.target.value})}
                      className="w-10 h-10 rounded cursor-pointer border-2 border-white dark:border-slate-800 shadow-sm shrink-0"
                      title="Accent Color"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="text-[10px] uppercase text-gray-500">Metadata</Label>
                  <div className="grid grid-cols-2 gap-2">
                    <Input placeholder="Name" value={templateForm.name} onChange={e => setTemplateForm({...templateForm, name: e.target.value})} />
                    <select
                      value={templateForm.category}
                      onChange={e => setTemplateForm({...templateForm, category: e.target.value as any})}
                      className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm"
                    >
                      <option value="general">General</option>
                      <option value="deposit">Deposit</option>
                      <option value="withdrawal">Withdrawal</option>
                      <option value="promotion">Promotion</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Hero Section Row */}
            <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-gray-100 dark:border-slate-800 shadow-sm">
              <h4 className="font-bold text-xs uppercase tracking-widest text-gray-400 mb-6 flex items-center gap-2">
                <Layout className="w-3 h-3 text-blue-600" />
                Hero Section
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div className="space-y-5">
                  <div className="space-y-2">
                    <Label className="text-xs font-semibold">Hero Heading</Label>
                    <Input 
                      value={templateForm.heroTitle} 
                      onChange={e => setTemplateForm({...templateForm, heroTitle: e.target.value})} 
                      placeholder="e.g., Funds Added Successfully" 
                      className="text-xl font-bold"
                    />
                  </div>
                  <div className="space-y-4">
                    <Label className="text-xs font-semibold">Hero Banner Image</Label>
                    <div className="flex items-center gap-4">
                      {templateForm.heroImage ? (
                        <div className="relative w-32 h-20 rounded-lg overflow-hidden border border-gray-200 dark:border-slate-700">
                          <img src={templateForm.heroImage} className="w-full h-full object-cover" alt="Hero" />
                          <button 
                            onClick={() => setTemplateForm({...templateForm, heroImage: ''})}
                            className="absolute inset-0 bg-black/50 text-white flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity text-[10px] font-bold"
                          >
                            Remove
                          </button>
                        </div>
                      ) : (
                        <label className="flex flex-col items-center justify-center w-32 h-20 border-2 border-dashed border-gray-200 dark:border-slate-700 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-slate-900 transition-colors">
                          <Plus className="w-4 h-4 text-gray-400" />
                          <span className="text-[10px] text-gray-400 mt-1">Upload</span>
                          <input 
                            type="file" 
                            className="hidden" 
                            accept="image/*"
                            onChange={e => e.target.files?.[0] && handleFileUpload(e.target.files[0], (url) => setTemplateForm({...templateForm, heroImage: url}))}
                          />
                        </label>
                      )}
                      <div className="flex-1">
                        <Input 
                          value={templateForm.heroImage} 
                          onChange={e => setTemplateForm({...templateForm, heroImage: e.target.value})} 
                          placeholder="Or paste image URL..." 
                          className="text-xs"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-6 bg-blue-50/50 dark:bg-blue-900/10 rounded-2xl border border-blue-100/50 dark:border-blue-900/30 flex flex-col gap-2">
                  <h5 className="text-xs font-bold text-blue-700 dark:text-blue-300">Visual Impact</h5>
                  <p className="text-[11px] text-blue-600 dark:text-blue-400 leading-relaxed italic">
                    The Hero section defines the first impression. Upload a bold banner (recommended: 1200x400px) that represents your message category.
                  </p>
                </div>
              </div>
            </div>

            {/* Content Blocks Row */}
            <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-gray-100 dark:border-slate-800 shadow-sm">
              <div className="flex justify-between items-center mb-6">
                <h4 className="font-bold text-xs uppercase tracking-widest text-gray-400 flex items-center gap-2">
                  <Code className="w-3 h-3 text-purple-600" />
                  Content Blocks
                </h4>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" onClick={() => addBlock('text')} className="h-8 text-[10px] uppercase font-bold tracking-wider gap-2"><Type className="w-3.5 h-3.5" /> Text Area</Button>
                  <Button size="sm" variant="outline" onClick={() => addBlock('button')} className="h-8 text-[10px] uppercase font-bold tracking-wider gap-2"><Square className="w-3.5 h-3.5" /> Action Button</Button>
                  <Button size="sm" variant="outline" onClick={() => addBlock('feature_list')} className="h-8 text-[10px] uppercase font-bold tracking-wider gap-2"><ListChecks className="w-3.5 h-3.5" /> Feature List</Button>
                  <Button size="sm" variant="outline" onClick={() => addBlock('image')} className="h-8 text-[10px] uppercase font-bold tracking-wider gap-2"><ImageIcon className="w-3.5 h-3.5" /> Image Block</Button>
                </div>
              </div>

                <div className="space-y-4">
                  {templateForm.blocks.map((block: any, idx) => (
                    <div key={block.id} className="p-4 bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-xl relative group">
                      <button 
                        onClick={() => removeBlock(block.id)}
                        className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>

                      <div className="flex items-center gap-2 mb-2 text-[10px] font-bold uppercase text-gray-400">
                        {block.type === 'text' && <Type className="w-3 h-3" />}
                        {block.type === 'button' && <Square className="w-3 h-3" />}
                        {block.type === 'feature_list' && <ListChecks className="w-3 h-3" />}
                        {block.type === 'image' && <ImageIcon className="w-3 h-3" />}
                        {block.type} Block
                      </div>

                      {block.type === 'text' && (
                        <textarea
                          className="w-full p-4 rounded-lg border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm min-h-[100px]"
                          rows={4}
                          value={block.content}
                          onChange={e => updateBlock(block.id, e.target.value)}
                          placeholder="Compose your structured message content here..."
                        />
                      )}

                      {block.type === 'button' && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white dark:bg-slate-800 p-4 rounded-lg">
                          <div className="space-y-1">
                            <Label className="text-[10px]">Button Label</Label>
                            <Input placeholder="e.g., Get Started" value={block.content.label} onChange={e => updateBlock(block.id, { ...block.content, label: e.target.value })} />
                          </div>
                          <div className="space-y-1">
                            <Label className="text-[10px]">Action URL</Label>
                            <Input placeholder="https://..." value={block.content.url} onChange={e => updateBlock(block.id, { ...block.content, url: e.target.value })} />
                          </div>
                        </div>
                      )}

                      {block.type === 'image' && (
                        <div className="space-y-3 bg-white dark:bg-slate-800 p-4 rounded-lg">
                          <Label className="text-[10px]">Image Content</Label>
                          <div className="flex items-center gap-4">
                            {block.content ? (
                              <div className="relative w-24 h-24 rounded-lg overflow-hidden border border-gray-100 dark:border-slate-700 group/img">
                                <img src={block.content} className="w-full h-full object-cover" alt="Block" />
                                <button 
                                  onClick={() => updateBlock(block.id, '')}
                                  className="absolute inset-0 bg-black/60 text-white flex items-center justify-center opacity-0 group-hover/img:opacity-100 transition-opacity text-[10px] font-bold"
                                >
                                  Clear
                                </button>
                              </div>
                            ) : (
                              <label className="flex flex-col items-center justify-center w-24 h-24 border-2 border-dashed border-gray-100 dark:border-slate-700 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-slate-900 transition-colors group/upload">
                                <Plus className="w-4 h-4 text-gray-400 group-hover/upload:text-blue-500 transition-colors" />
                                <span className="text-[10px] text-gray-400 mt-1">Upload Image</span>
                                <input 
                                  type="file" 
                                  className="hidden" 
                                  accept="image/*"
                                  onChange={e => e.target.files?.[0] && handleFileUpload(e.target.files[0], (url) => updateBlock(block.id, url))}
                                />
                              </label>
                            )}
                            <div className="flex-1">
                              <Input placeholder="Or paste URL..." value={block.content} onChange={e => updateBlock(block.id, e.target.value)} className="text-xs" />
                            </div>
                          </div>
                        </div>
                      )}

                      {block.type === 'feature_list' && (
                        <div className="space-y-3 bg-white dark:bg-slate-800 p-4 rounded-lg">
                          {block.content.map((feat: any, fIdx: number) => (
                            <div key={fIdx} className="grid grid-cols-1 md:grid-cols-2 gap-3 pb-3 border-b border-gray-100 dark:border-slate-700 last:border-0 last:pb-0">
                              <div className="space-y-1">
                                <Label className="text-[10px]">Feature Title</Label>
                                <Input value={feat.title} onChange={e => {
                                  const newContent = [...block.content];
                                  newContent[fIdx] = { ...feat, title: e.target.value };
                                  updateBlock(block.id, newContent);
                                }} />
                              </div>
                              <div className="space-y-1">
                                <Label className="text-[10px]">Feature Description</Label>
                                <Input value={feat.text} onChange={e => {
                                  const newContent = [...block.content];
                                  newContent[fIdx] = { ...feat, text: e.target.value };
                                  updateBlock(block.id, newContent);
                                }} />
                              </div>
                            </div>
                          ))}
                          <Button size="sm" variant="ghost" className="w-full text-xs font-semibold hover:bg-gray-100 dark:hover:bg-slate-700" onClick={() => {
                            updateBlock(block.id, [...block.content, { icon: 'check', title: '', text: '' }]);
                          }}>
                            <Plus className="w-3 h-3 mr-2" />
                            Add Feature Item
                          </Button>
                        </div>
                      )}
                    </div>
                  ))}
                  {templateForm.blocks.length === 0 && (
                    <div className="text-center py-16 border-2 border-dashed border-gray-200 dark:border-slate-800 rounded-2xl text-gray-500">
                      <Layout className="w-12 h-12 mx-auto mb-4 opacity-20" />
                      <p className="text-xs opacity-60">Use the buttons above to add Text, Buttons, Lists, or Images</p>
                  </div>
                )}
              </div>
            </div>
          </div>

            <DialogFooter className="mt-8 border-t border-gray-100 dark:border-slate-800 pt-6">
              <Button variant="outline" onClick={() => setShowTemplateDialog(false)}>Discard</Button>
              <Button onClick={handleSaveTemplate} className="gap-2 px-8">
                <Save className="w-4 h-4" />
                Save Template
              </Button>
            </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Separate Template Preview Dialog */}
      <Dialog open={showTemplatePreview} onOpenChange={setShowTemplatePreview}>
        <DialogContent className="max-w-[650px] max-h-[90vh] overflow-y-auto p-0 border-0 bg-transparent shadow-none">
          <div className="bg-white dark:bg-slate-900 rounded-2xl overflow-hidden shadow-2xl scale-[0.98]">
            <div className="p-4 bg-gray-50 dark:bg-slate-800 border-b border-gray-100 dark:border-slate-700 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Eye className="w-4 h-4 text-blue-600" />
                <span className="text-xs font-bold uppercase tracking-widest text-gray-500">Template Preview</span>
              </div>
              <Button variant="ghost" size="sm" onClick={() => setShowTemplatePreview(false)}>Close</Button>
            </div>
            <div className="bg-white p-4 md:p-8">
              <div dangerouslySetInnerHTML={{ __html: renderEmailHTML(templateForm) }} />
            </div>
          </div>
        </DialogContent>
      </Dialog>
      {/* ── Send Confirmation Modal ──────────────────────────────── */}
      <Dialog open={!!confirmSendId} onOpenChange={(open) => { if (!open) setConfirmSendId(null); }}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-lg">
              <div className="p-2 bg-amber-100 dark:bg-amber-900/30 rounded-lg">
                <AlertTriangle className="w-5 h-5 text-amber-600" />
              </div>
              Confirm Send Message
            </DialogTitle>
            <DialogDescription className="pt-2">
              Are you sure you want to send this message? This action cannot be undone. The message will be delivered to the selected recipients via the chosen channels.
            </DialogDescription>
          </DialogHeader>
          {confirmSendId && (() => {
            const msg = crmMessages.find(m => m.id === confirmSendId);
            return msg ? (
              <div className="my-2 p-4 bg-gray-50 dark:bg-slate-900 rounded-xl border border-gray-200 dark:border-slate-700 space-y-2">
                <div className="flex items-center gap-2">
                  {getTypeIcon(msg.type)}
                  <span className="font-semibold text-sm">{msg.title}</span>
                </div>
                <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-2">{msg.message}</p>
                <div className="flex items-center gap-3 text-xs text-gray-500">
                  <span className="flex items-center gap-1">
                    <Users className="w-3 h-3" />
                    {msg.recipientType === 'all' ? 'All Users' : `${msg.recipientIds.length} user(s)`}
                  </span>
                  <span className="flex items-center gap-1">
                    {msg.channels.includes('in-app') && <Bell className="w-3 h-3" />}
                    {msg.channels.includes('email') && <Mail className="w-3 h-3" />}
                    {msg.channels.join(', ')}
                  </span>
                </div>
              </div>
            ) : null;
          })()}
          <DialogFooter className="gap-2 sm:gap-0">
            <Button variant="outline" onClick={() => setConfirmSendId(null)}>
              Cancel
            </Button>
            <Button
              onClick={confirmAndSend}
              className="bg-green-600 hover:bg-green-700 text-white gap-2"
            >
              <Send className="w-4 h-4" />
              Send Now
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}