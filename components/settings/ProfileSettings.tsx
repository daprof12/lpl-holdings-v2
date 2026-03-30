import { useState, useEffect, useRef } from 'react';
import { Camera, Save, Mail, Phone, MapPin, Calendar, CheckCircle, XCircle, Clock, Upload, FileText, Eye, X, AlertCircle, Shield } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { useAuth } from '../../contexts/AuthContext';
import { toast } from 'sonner';

// ── KYC doc types stored per-user in localStorage ──────────────────────────
interface KycDoc {
  name: string;
  type: string;
  size: number;
  uploadedAt: string;
  dataUrl: string; // base64
}
interface KycDocs {
  identity?: KycDoc;
  proofOfAddress?: KycDoc;
}

function getKycDocs(userId: string): KycDocs {
  try {
    const raw = localStorage.getItem(`kyc_docs_${userId}`);
    return raw ? JSON.parse(raw) : {};
  } catch { return {}; }
}

function saveKycDocs(userId: string, docs: KycDocs) {
  localStorage.setItem(`kyc_docs_${userId}`, JSON.stringify(docs));
}

// ── Verification badge ──────────────────────────────────────────────────────
function VerificationBadge({ status }: { status: 'verified' | 'pending' | 'rejected' | 'unverified' }) {
  if (status === 'verified')   return <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-xs"><CheckCircle className="w-3 h-3" /> Verified</span>;
  if (status === 'rejected')   return <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 text-xs"><XCircle className="w-3 h-3" /> Rejected</span>;
  if (status === 'pending')    return <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400 text-xs"><Clock className="w-3 h-3" /> Pending Review</span>;
  return <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 text-xs"><XCircle className="w-3 h-3" /> Not Verified</span>;
}

export default function ProfileSettings() {
  const { currentUser, updateProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '', lastName: '', email: '', phone: '',
    country: '', city: '', address: '', postalCode: '', dateOfBirth: ''
  });

  // KYC
  const [kycDocs, setKycDocs]           = useState<KycDocs>({});
  const [showKycModal, setShowKycModal] = useState(false);
  const [kycStep, setKycStep]           = useState<'identity' | 'address' | 'review'>('identity');
  const [uploadingId, setUploadingId]   = useState(false);
  const [uploadingAddr, setUploadingAddr] = useState(false);
  const [viewDoc, setViewDoc]           = useState<KycDoc | null>(null);
  const idInputRef   = useRef<HTMLInputElement>(null);
  const addrInputRef = useRef<HTMLInputElement>(null);

  // Sync form with user
  useEffect(() => {
    if (currentUser && !isEditing) {
      setFormData({
        firstName: currentUser.firstName || '',
        lastName: currentUser.lastName || '',
        email: currentUser.email || '',
        phone: currentUser.phone || '',
        country: currentUser.country || '',
        city: '', address: '', postalCode: '', dateOfBirth: ''
      });
    }
  }, [currentUser, isEditing]);

  // Load KYC docs
  useEffect(() => {
    if (currentUser) setKycDocs(getKycDocs(currentUser.id));
  }, [currentUser?.id]);

  const handleSave = async () => {
    if (!currentUser) return;
    if (!formData.firstName.trim() || !formData.lastName.trim()) {
      toast.error('First name and last name are required'); return;
    }
    try {
      updateProfile(currentUser.id, {
        firstName: formData.firstName.trim(),
        lastName: formData.lastName.trim(),
        phone: formData.phone.trim(),
        country: formData.country,
      });
      toast.success('Profile updated successfully');
      setIsEditing(false);
    } catch {
      toast.error('Failed to update profile');
    }
  };

  const handleCancel = () => {
    if (currentUser) {
      setFormData({
        firstName: currentUser.firstName || '',
        lastName: currentUser.lastName || '',
        email: currentUser.email || '',
        phone: currentUser.phone || '',
        country: currentUser.country || '',
        city: '', address: '', postalCode: '', dateOfBirth: ''
      });
    }
    setIsEditing(false);
  };

  // ── File upload helper ──
  const readFile = (file: File): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });

  const handleUpload = async (field: 'identity' | 'proofOfAddress', file: File) => {
    if (!currentUser) return;
    if (file.size > 5 * 1024 * 1024) { toast.error('File must be under 5 MB'); return; }
    field === 'identity' ? setUploadingId(true) : setUploadingAddr(true);
    try {
      const dataUrl = await readFile(file);
      const doc: KycDoc = { name: file.name, type: file.type, size: file.size, uploadedAt: new Date().toISOString(), dataUrl };
      const updated = { ...kycDocs, [field]: doc };
      setKycDocs(updated);
      saveKycDocs(currentUser.id, updated);
      toast.success(`${field === 'identity' ? 'Identity document' : 'Proof of address'} uploaded`);
    } catch {
      toast.error('Upload failed');
    } finally {
      field === 'identity' ? setUploadingId(false) : setUploadingAddr(false);
    }
  };

  const handleSubmitKyc = () => {
    if (!currentUser) return;
    if (!kycDocs.identity || !kycDocs.proofOfAddress) {
      toast.error('Please upload both documents'); return;
    }
    // Mark KYC as pending review
    updateProfile(currentUser.id, { kycStatus: 'pending' });
    toast.success('KYC documents submitted for admin review');
    setShowKycModal(false);
  };

  if (!currentUser) {
    return <div className="text-center py-12"><p className="text-gray-500 dark:text-gray-400">Please log in to view your profile</p></div>;
  }

  const initials = `${currentUser.firstName.charAt(0)}${currentUser.lastName.charAt(0)}`.toUpperCase();

  // Verification statuses
  const emailStatus   = currentUser.isVerified   ? 'verified' : 'unverified';
  const phoneStatus   = (currentUser as any).phoneVerified ? 'verified' : 'unverified';
  const kycStatus     = currentUser.kycStatus as string;
  const kycVerifStat  = kycStatus === 'verified' ? 'verified' : kycStatus === 'rejected' ? 'rejected' : (kycDocs.identity || kycDocs.proofOfAddress) ? 'pending' : 'unverified';

  const docsSubmitted = !!(kycDocs.identity || kycDocs.proofOfAddress);

  return (
    <div className="space-y-6">
      {/* Profile Picture */}
      <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm">
        <h3 className="text-lg font-semibold mb-6">Profile Picture</h3>
        <div className="flex items-center gap-6">
          <div className="relative">
            <div className="w-24 h-24 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
              <span className="text-white text-3xl font-bold">{initials}</span>
            </div>
            <button className="absolute bottom-0 right-0 w-8 h-8 bg-blue-600 hover:bg-blue-700 rounded-full flex items-center justify-center text-white">
              <Camera className="w-4 h-4" />
            </button>
          </div>
          <div>
            <Button variant="outline">Upload Photo</Button>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">JPG, PNG or GIF. Max size 2MB</p>
          </div>
        </div>
      </div>

      {/* Personal Information */}
      <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold">Personal Information</h3>
          {!isEditing && <Button variant="outline" onClick={() => setIsEditing(true)}>Edit Profile</Button>}
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <Label htmlFor="firstName">First Name</Label>
            <Input id="firstName" value={formData.firstName} onChange={e => setFormData({ ...formData, firstName: e.target.value })} disabled={!isEditing} className="mt-2" />
          </div>
          <div>
            <Label htmlFor="lastName">Last Name</Label>
            <Input id="lastName" value={formData.lastName} onChange={e => setFormData({ ...formData, lastName: e.target.value })} disabled={!isEditing} className="mt-2" />
          </div>
          <div>
            <Label htmlFor="email">Email Address</Label>
            <div className="relative mt-2">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input id="email" type="email" value={formData.email} disabled className="pl-10" />
            </div>
            {isEditing && <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Email cannot be changed. Contact support.</p>}
          </div>
          <div>
            <Label htmlFor="phone">Phone Number</Label>
            <div className="relative mt-2">
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input id="phone" type="tel" value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })} disabled={!isEditing} className="pl-10" />
            </div>
          </div>
          <div>
            <Label htmlFor="dateOfBirth">Date of Birth</Label>
            <div className="relative mt-2">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input id="dateOfBirth" type="date" value={formData.dateOfBirth} onChange={e => setFormData({ ...formData, dateOfBirth: e.target.value })} disabled={!isEditing} className="pl-10" />
            </div>
          </div>
          <div>
            <Label htmlFor="country">Country</Label>
            <select id="country" value={formData.country} onChange={e => setFormData({ ...formData, country: e.target.value })} disabled={!isEditing}
              className="w-full mt-2 px-4 py-2 rounded-lg border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 disabled:opacity-50">
              <option value="">Select a country</option>
              {[
                'Afghanistan','Albania','Algeria','Andorra','Angola','Antigua and Barbuda','Argentina','Armenia','Australia','Austria',
                'Azerbaijan','Bahamas','Bahrain','Bangladesh','Barbados','Belarus','Belgium','Belize','Benin','Bhutan',
                'Bolivia','Bosnia and Herzegovina','Botswana','Brazil','Brunei','Bulgaria','Burkina Faso','Burundi','Cabo Verde','Cambodia',
                'Cameroon','Canada','Central African Republic','Chad','Chile','China','Colombia','Comoros','Congo (Congo-Brazzaville)','Costa Rica',
                'Croatia','Cuba','Cyprus','Czechia','Denmark','Djibouti','Dominica','Dominican Republic','Ecuador','Egypt',
                'El Salvador','Equatorial Guinea','Eritrea','Estonia','Eswatini','Ethiopia','Fiji','Finland','France','Gabon',
                'Gambia','Georgia','Germany','Ghana','Greece','Grenada','Guatemala','Guinea','Guinea-Bissau','Guyana',
                'Haiti','Honduras','Hungary','Iceland','India','Indonesia','Iran','Iraq','Ireland','Israel',
                'Italy','Jamaica','Japan','Jordan','Kazakhstan','Kenya','Kiribati','Kuwait','Kyrgyzstan','Laos',
                'Latvia','Lebanon','Lesotho','Liberia','Libya','Liechtenstein','Lithuania','Luxembourg','Madagascar','Malawi',
                'Malaysia','Maldives','Mali','Malta','Marshall Islands','Mauritania','Mauritius','Mexico','Micronesia','Moldova',
                'Monaco','Mongolia','Montenegro','Morocco','Mozambique','Myanmar','Namibia','Nauru','Nepal','Netherlands',
                'New Zealand','Nicaragua','Niger','Nigeria','North Korea','North Macedonia','Norway','Oman','Pakistan','Palau',
                'Palestine','Panama','Papua New Guinea','Paraguay','Peru','Philippines','Poland','Portugal','Qatar','Romania',
                'Russia','Rwanda','Saint Kitts and Nevis','Saint Lucia','Saint Vincent and the Grenadines','Samoa','San Marino','Sao Tome and Principe','Saudi Arabia','Senegal',
                'Serbia','Seychelles','Sierra Leone','Singapore','Slovakia','Slovenia','Solomon Islands','Somalia','South Africa','South Korea',
                'South Sudan','Spain','Sri Lanka','Sudan','Suriname','Sweden','Switzerland','Syria','Taiwan','Tajikistan',
                'Tanzania','Thailand','Timor-Leste','Togo','Tonga','Trinidad and Tobago','Tunisia','Turkey','Turkmenistan','Tuvalu',
                'Uganda','Ukraine','United Arab Emirates','United Kingdom','United States','Uruguay','Uzbekistan','Vanuatu','Vatican City','Venezuela',
                'Vietnam','Yemen','Zambia','Zimbabwe'
              ].map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <Label htmlFor="city">City</Label>
            <Input id="city" value={formData.city} onChange={e => setFormData({ ...formData, city: e.target.value })} disabled={!isEditing} className="mt-2" />
          </div>
          <div>
            <Label htmlFor="address">Street Address</Label>
            <div className="relative mt-2">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input id="address" value={formData.address} onChange={e => setFormData({ ...formData, address: e.target.value })} disabled={!isEditing} className="pl-10" />
            </div>
          </div>
          <div>
            <Label htmlFor="postalCode">Postal Code</Label>
            <Input id="postalCode" value={formData.postalCode} onChange={e => setFormData({ ...formData, postalCode: e.target.value })} disabled={!isEditing} className="mt-2" />
          </div>
        </div>

        {isEditing && (
          <div className="flex gap-3 mt-6">
            <Button onClick={handleSave}><Save className="w-4 h-4 mr-2" />Save Changes</Button>
            <Button variant="outline" onClick={handleCancel}>Cancel</Button>
          </div>
        )}
      </div>

      {/* ── Verification Status ──────────────────────────────────────────── */}
      <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm">
        <div className="flex items-center gap-2 mb-2">
          <Shield className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          <h3 className="text-lg font-semibold">Verification Status</h3>
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
          All verifications are reviewed and confirmed by our compliance team.
        </p>

        <div className="space-y-4">
          {/* ── Email ── */}
          <div className={`flex items-center justify-between p-4 rounded-xl border ${
            emailStatus === 'verified'
              ? 'bg-green-50 dark:bg-green-900/10 border-green-200 dark:border-green-800'
              : 'bg-gray-50 dark:bg-slate-700/30 border-gray-200 dark:border-slate-600'
          }`}>
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                emailStatus === 'verified' ? 'bg-green-600' : 'bg-gray-300 dark:bg-slate-600'
              }`}>
                <Mail className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="font-semibold text-sm">Email Verification</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">{formData.email}</div>
              </div>
            </div>
            <VerificationBadge status={emailStatus as any} />
          </div>

          {/* ── Phone ── */}
          <div className={`flex items-center justify-between p-4 rounded-xl border ${
            phoneStatus === 'verified'
              ? 'bg-green-50 dark:bg-green-900/10 border-green-200 dark:border-green-800'
              : 'bg-gray-50 dark:bg-slate-700/30 border-gray-200 dark:border-slate-600'
          }`}>
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                phoneStatus === 'verified' ? 'bg-green-600' : 'bg-gray-300 dark:bg-slate-600'
              }`}>
                <Phone className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="font-semibold text-sm">Phone Verification</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">{formData.phone || 'No phone number added'}</div>
              </div>
            </div>
            <VerificationBadge status={phoneStatus as any} />
          </div>

          {/* ── KYC ── */}
          <div className={`rounded-xl border overflow-hidden ${
            kycVerifStat === 'verified'
              ? 'border-green-200 dark:border-green-800'
              : kycVerifStat === 'rejected'
              ? 'border-red-200 dark:border-red-800'
              : kycVerifStat === 'pending'
              ? 'border-yellow-200 dark:border-yellow-800'
              : 'border-gray-200 dark:border-slate-600'
          }`}>
            {/* KYC header row */}
            <div className={`flex items-center justify-between p-4 ${
              kycVerifStat === 'verified'
                ? 'bg-green-50 dark:bg-green-900/10'
                : kycVerifStat === 'rejected'
                ? 'bg-red-50 dark:bg-red-900/10'
                : kycVerifStat === 'pending'
                ? 'bg-yellow-50 dark:bg-yellow-900/10'
                : 'bg-gray-50 dark:bg-slate-700/30'
            }`}>
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  kycVerifStat === 'verified' ? 'bg-green-600' :
                  kycVerifStat === 'rejected' ? 'bg-red-600' :
                  kycVerifStat === 'pending'  ? 'bg-yellow-500' : 'bg-gray-300 dark:bg-slate-600'
                }`}>
                  <FileText className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="font-semibold text-sm">KYC Verification</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    {kycVerifStat === 'verified' ? 'Identity confirmed by compliance team' :
                     kycVerifStat === 'rejected' ? 'Documents were rejected — please resubmit' :
                     kycVerifStat === 'pending'  ? 'Under review by compliance team' :
                     'Submit your identity documents to get verified'}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <VerificationBadge status={kycVerifStat as any} />
                {docsSubmitted && (
                  <Button variant="outline" size="sm" onClick={() => setShowKycModal(true)}>
                    <Eye className="w-3.5 h-3.5 mr-1" />
                    View Documents
                  </Button>
                )}
                {(kycVerifStat === 'unverified' || kycVerifStat === 'rejected') && (
                  <Button size="sm" onClick={() => { setKycStep('identity'); setShowKycModal(true); }}>
                    <Upload className="w-3.5 h-3.5 mr-1" />
                    {docsSubmitted ? 'Update Docs' : 'Start KYC'}
                  </Button>
                )}
              </div>
            </div>

            {/* KYC step progress (always visible once docs exist or flow opened) */}
            {(docsSubmitted || kycVerifStat === 'pending') && (
              <div className="px-4 py-3 border-t border-gray-100 dark:border-slate-700 bg-white dark:bg-slate-800">
                <div className="flex items-center gap-3">
                  {/* Step 1 */}
                  <div className="flex items-center gap-2">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
                      kycDocs.identity ? 'bg-green-600 text-white' : 'bg-gray-200 dark:bg-slate-600 text-gray-500'
                    }`}>
                      {kycDocs.identity ? <CheckCircle className="w-4 h-4" /> : '1'}
                    </div>
                    <span className="text-xs text-gray-600 dark:text-gray-400">Identity Document</span>
                  </div>
                  <div className="flex-1 h-px bg-gray-200 dark:bg-slate-700" />
                  {/* Step 2 */}
                  <div className="flex items-center gap-2">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
                      kycDocs.proofOfAddress ? 'bg-green-600 text-white' : 'bg-gray-200 dark:bg-slate-600 text-gray-500'
                    }`}>
                      {kycDocs.proofOfAddress ? <CheckCircle className="w-4 h-4" /> : '2'}
                    </div>
                    <span className="text-xs text-gray-600 dark:text-gray-400">Proof of Address</span>
                  </div>
                  <div className="flex-1 h-px bg-gray-200 dark:bg-slate-700" />
                  {/* Step 3 */}
                  <div className="flex items-center gap-2">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
                      kycVerifStat === 'verified' ? 'bg-green-600 text-white' :
                      kycVerifStat === 'pending'  ? 'bg-yellow-500 text-white' :
                      'bg-gray-200 dark:bg-slate-600 text-gray-500'
                    }`}>
                      {kycVerifStat === 'verified' ? <CheckCircle className="w-4 h-4" /> : kycVerifStat === 'pending' ? <Clock className="w-4 h-4" /> : '3'}
                    </div>
                    <span className="text-xs text-gray-600 dark:text-gray-400">Admin Review</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Info note */}
        {(emailStatus !== 'verified' || phoneStatus !== 'verified') && (
          <div className="mt-4 flex items-start gap-2 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
            <AlertCircle className="w-4 h-4 text-blue-600 dark:text-blue-400 mt-0.5 shrink-0" />
            <p className="text-xs text-blue-700 dark:text-blue-300">
              Email and phone verification are confirmed by our admin team. Please contact support if you need to verify your contact details.
            </p>
          </div>
        )}
      </div>

      {/* Danger Zone */}
      <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border-2 border-red-200 dark:border-red-800">
        <h3 className="text-lg font-semibold text-red-600 dark:text-red-400 mb-6">Danger Zone</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="font-semibold">Deactivate Account</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Temporarily disable your account</div>
            </div>
            <Button variant="outline">Deactivate</Button>
          </div>
          <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-slate-700">
            <div>
              <div className="font-semibold text-red-600 dark:text-red-400">Delete Account</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Permanently delete your account and all data</div>
            </div>
            <Button variant="outline" className="text-red-600 hover:text-red-700 border-red-600">Delete Account</Button>
          </div>
        </div>
      </div>

      {/* ── KYC Submission Modal ─────────────────────────────────────────── */}
      {showKycModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-slate-800 rounded-2xl w-full max-w-lg shadow-2xl">
            {/* Modal header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-slate-700">
              <div>
                <h2 className="text-lg font-semibold">KYC Verification</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">Upload your verification documents</p>
              </div>
              <button onClick={() => setShowKycModal(false)} className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Step tabs */}
            <div className="flex border-b border-gray-200 dark:border-slate-700">
              {(['identity', 'address', 'review'] as const).map((step, i) => (
                <button
                  key={step}
                  onClick={() => setKycStep(step)}
                  className={`flex-1 py-3 text-sm transition-colors ${
                    kycStep === step
                      ? 'border-b-2 border-blue-600 text-blue-600 dark:text-blue-400'
                      : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
                  }`}
                >
                  <span className={`inline-flex items-center justify-center w-5 h-5 rounded-full text-xs mr-1.5 ${
                    (step === 'identity' && kycDocs.identity) || (step === 'address' && kycDocs.proofOfAddress)
                      ? 'bg-green-600 text-white'
                      : kycStep === step
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 dark:bg-slate-600 text-gray-500'
                  }`}>{i + 1}</span>
                  {step === 'identity' ? 'Identity' : step === 'address' ? 'Address' : 'Review'}
                </button>
              ))}
            </div>

            <div className="p-6 space-y-4">
              {/* ── Step: Identity ── */}
              {kycStep === 'identity' && (
                <div>
                  <h3 className="font-semibold mb-1">Identity Document</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                    Upload a clear photo or scan of your government-issued ID (passport, national ID card, or driver's licence).
                  </p>

                  {kycDocs.identity ? (
                    <div className="flex items-center justify-between p-4 bg-green-50 dark:bg-green-900/20 rounded-xl border border-green-200 dark:border-green-800">
                      <div className="flex items-center gap-3">
                        <CheckCircle className="w-8 h-8 text-green-600" />
                        <div>
                          <p className="font-semibold text-sm">{kycDocs.identity.name}</p>
                          <p className="text-xs text-gray-500">{(kycDocs.identity.size / 1024).toFixed(1)} KB · {new Date(kycDocs.identity.uploadedAt).toLocaleDateString()}</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" onClick={() => setViewDoc(kycDocs.identity!)}>
                          <Eye className="w-3.5 h-3.5 mr-1" /> View
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => idInputRef.current?.click()}>
                          Replace
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <button
                      onClick={() => idInputRef.current?.click()}
                      className="w-full border-2 border-dashed border-gray-300 dark:border-slate-600 rounded-xl p-8 text-center hover:border-blue-400 dark:hover:border-blue-500 transition-colors"
                    >
                      <Upload className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                      <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">Click to upload identity document</p>
                      <p className="text-xs text-gray-400 mt-1">JPG, PNG, PDF — max 5 MB</p>
                    </button>
                  )}

                  <input ref={idInputRef} type="file" accept="image/*,.pdf" className="hidden"
                    onChange={e => { if (e.target.files?.[0]) handleUpload('identity', e.target.files[0]); e.target.value = ''; }} />

                  {uploadingId && <p className="text-sm text-blue-600 text-center mt-2">Uploading…</p>}

                  <div className="flex justify-end mt-4">
                    <Button onClick={() => setKycStep('address')} disabled={!kycDocs.identity}>
                      Next: Proof of Address →
                    </Button>
                  </div>
                </div>
              )}

              {/* ── Step: Address ── */}
              {kycStep === 'address' && (
                <div>
                  <h3 className="font-semibold mb-1">Proof of Address</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                    Upload a utility bill, bank statement, or government letter dated within the last 3 months, clearly showing your name and address.
                  </p>

                  {kycDocs.proofOfAddress ? (
                    <div className="flex items-center justify-between p-4 bg-green-50 dark:bg-green-900/20 rounded-xl border border-green-200 dark:border-green-800">
                      <div className="flex items-center gap-3">
                        <CheckCircle className="w-8 h-8 text-green-600" />
                        <div>
                          <p className="font-semibold text-sm">{kycDocs.proofOfAddress.name}</p>
                          <p className="text-xs text-gray-500">{(kycDocs.proofOfAddress.size / 1024).toFixed(1)} KB · {new Date(kycDocs.proofOfAddress.uploadedAt).toLocaleDateString()}</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" onClick={() => setViewDoc(kycDocs.proofOfAddress!)}>
                          <Eye className="w-3.5 h-3.5 mr-1" /> View
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => addrInputRef.current?.click()}>
                          Replace
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <button
                      onClick={() => addrInputRef.current?.click()}
                      className="w-full border-2 border-dashed border-gray-300 dark:border-slate-600 rounded-xl p-8 text-center hover:border-blue-400 dark:hover:border-blue-500 transition-colors"
                    >
                      <Upload className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                      <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">Click to upload proof of address</p>
                      <p className="text-xs text-gray-400 mt-1">JPG, PNG, PDF — max 5 MB</p>
                    </button>
                  )}

                  <input ref={addrInputRef} type="file" accept="image/*,.pdf" className="hidden"
                    onChange={e => { if (e.target.files?.[0]) handleUpload('proofOfAddress', e.target.files[0]); e.target.value = ''; }} />

                  {uploadingAddr && <p className="text-sm text-blue-600 text-center mt-2">Uploading…</p>}

                  <div className="flex justify-between mt-4">
                    <Button variant="outline" onClick={() => setKycStep('identity')}>← Back</Button>
                    <Button onClick={() => setKycStep('review')} disabled={!kycDocs.proofOfAddress}>
                      Next: Review →
                    </Button>
                  </div>
                </div>
              )}

              {/* ── Step: Review ── */}
              {kycStep === 'review' && (
                <div>
                  <h3 className="font-semibold mb-4">Review & Submit</h3>

                  <div className="space-y-3 mb-6">
                    <div className={`flex items-center gap-3 p-3 rounded-lg ${kycDocs.identity ? 'bg-green-50 dark:bg-green-900/20' : 'bg-red-50 dark:bg-red-900/20'}`}>
                      {kycDocs.identity ? <CheckCircle className="w-5 h-5 text-green-600" /> : <XCircle className="w-5 h-5 text-red-600" />}
                      <div className="flex-1">
                        <p className="text-sm font-semibold">Identity Document</p>
                        <p className="text-xs text-gray-500">{kycDocs.identity ? kycDocs.identity.name : 'Not uploaded'}</p>
                      </div>
                      {kycDocs.identity && (
                        <button onClick={() => setViewDoc(kycDocs.identity!)} className="text-xs text-blue-600 hover:underline">View</button>
                      )}
                    </div>
                    <div className={`flex items-center gap-3 p-3 rounded-lg ${kycDocs.proofOfAddress ? 'bg-green-50 dark:bg-green-900/20' : 'bg-red-50 dark:bg-red-900/20'}`}>
                      {kycDocs.proofOfAddress ? <CheckCircle className="w-5 h-5 text-green-600" /> : <XCircle className="w-5 h-5 text-red-600" />}
                      <div className="flex-1">
                        <p className="text-sm font-semibold">Proof of Address</p>
                        <p className="text-xs text-gray-500">{kycDocs.proofOfAddress ? kycDocs.proofOfAddress.name : 'Not uploaded'}</p>
                      </div>
                      {kycDocs.proofOfAddress && (
                        <button onClick={() => setViewDoc(kycDocs.proofOfAddress!)} className="text-xs text-blue-600 hover:underline">View</button>
                      )}
                    </div>
                  </div>

                  <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800 mb-4">
                    <p className="text-xs text-blue-700 dark:text-blue-300">
                      By submitting, you confirm that all uploaded documents are genuine and belong to you. Our compliance team will review within 1–3 business days.
                    </p>
                  </div>

                  <div className="flex justify-between">
                    <Button variant="outline" onClick={() => setKycStep('address')}>← Back</Button>
                    <Button
                      onClick={handleSubmitKyc}
                      disabled={!kycDocs.identity || !kycDocs.proofOfAddress}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      <Shield className="w-4 h-4 mr-2" />
                      Submit for Review
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ── Document Viewer ── */}
      {viewDoc && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-[60] p-4">
          <div className="bg-white dark:bg-slate-800 rounded-xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
            <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-slate-700">
              <div>
                <p className="font-semibold text-sm">{viewDoc.name}</p>
                <p className="text-xs text-gray-500">{(viewDoc.size / 1024).toFixed(1)} KB · Uploaded {new Date(viewDoc.uploadedAt).toLocaleDateString()}</p>
              </div>
              <button onClick={() => setViewDoc(null)} className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="flex-1 overflow-auto p-4 flex items-center justify-center bg-gray-50 dark:bg-slate-900">
              {viewDoc.type.startsWith('image/') ? (
                <img src={viewDoc.dataUrl} alt={viewDoc.name} className="max-w-full max-h-full rounded-lg object-contain" />
              ) : (
                <div className="text-center">
                  <FileText className="w-16 h-16 mx-auto mb-3 text-gray-400" />
                  <p className="text-sm text-gray-500">PDF document: {viewDoc.name}</p>
                  <a href={viewDoc.dataUrl} download={viewDoc.name} className="mt-3 inline-block text-blue-600 text-sm hover:underline">Download to view</a>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}