import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Upload, FileText, CheckCircle2, XCircle, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '../ui/button';
import { Label } from '../ui/label';
import { useAuth } from '../../contexts/AuthContext';
import { api } from '../../utils/supabase/api';
const logoImage = "/logo.png";

export default function KYCVerification() {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [documentType, setDocumentType] = useState('');
  const [frontPhoto, setFrontPhoto] = useState<File | null>(null);
  const [backPhoto, setBackPhoto] = useState<File | null>(null);
  const [selfiePhoto, setSelfiePhoto] = useState<File | null>(null);
  const [frontPreview, setFrontPreview] = useState('');
  const [backPreview, setBackPreview] = useState('');
  const [selfiePreview, setSelfiePreview] = useState('');

  const handleFileUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: 'front' | 'back' | 'selfie'
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const preview = reader.result as string;
        if (type === 'front') {
          setFrontPhoto(file);
          setFrontPreview(preview);
        } else if (type === 'back') {
          setBackPhoto(file);
          setBackPreview(preview);
        } else {
          setSelfiePhoto(file);
          setSelfiePreview(preview);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    if (!documentType || !frontPhoto || !selfiePhoto) {
      alert('Please complete all required fields');
      return;
    }

    if (currentUser) {
      try {
        await api.kyc.create({
          userId: currentUser.id,
          documentType,
          status: 'pending',
          submittedAt: new Date().toISOString(),
        });
        // Also update the user profile status for quick access
        await api.users.update(currentUser.id, { kyc_status: 'pending' });
      } catch (err) {
        console.error('Failed to submit KYC:', err);
      }
    }

    navigate('/2fa-setup');
  };

  const handleSkip = async () => {
    if (currentUser) {
      try {
        await api.users.update(currentUser.id, { kyc_status: 'not_submitted' });
      } catch (err) {
        console.error('Failed to skip KYC:', err);
      }
    }
    navigate('/2fa-setup');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 dark:from-slate-900 dark:to-slate-800 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-2xl"
      >
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-6">
            <img src={logoImage} alt="LPL Premium" className="h-12 w-auto" />
          </Link>
          
          <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mx-auto mb-4">
            <FileText className="w-8 h-8 text-purple-600 dark:text-purple-400" />
          </div>
          
          <h1 className="text-3xl md:text-4xl mb-2">Identity Verification</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Verify your identity to unlock full trading features
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">
            You can skip this step and complete it later
          </p>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-8">
          <div className="space-y-6">
            {/* Document Type Selection */}
            <div>
              <Label>Select ID Type *</Label>
              <div className="grid grid-cols-3 gap-4 mt-2">
                {['Passport', 'Driver License', 'National ID'].map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setDocumentType(type)}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      documentType === type
                        ? 'border-blue-600 bg-blue-50 dark:bg-blue-900/20'
                        : 'border-gray-300 dark:border-slate-600 hover:border-gray-400'
                    }`}
                  >
                    <FileText className="w-6 h-6 mx-auto mb-2" />
                    <p className="text-sm">{type}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Upload Front */}
            <div>
              <Label>Front of ID *</Label>
              <div className="mt-2">
                <label
                  htmlFor="front-upload"
                  className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-gray-300 dark:border-slate-600 rounded-lg cursor-pointer hover:border-gray-400 dark:hover:border-slate-500 transition-colors"
                >
                  {frontPreview ? (
                    <div className="relative w-full h-full">
                      <img
                        src={frontPreview}
                        alt="Front"
                        className="w-full h-full object-contain rounded-lg"
                      />
                      <div className="absolute top-2 right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                        <CheckCircle2 className="w-5 h-5 text-white" />
                      </div>
                    </div>
                  ) : (
                    <>
                      <Upload className="w-10 h-10 text-gray-400 mb-2" />
                      <p className="text-sm text-gray-600 dark:text-gray-400">Click to upload front photo</p>
                    </>
                  )}
                </label>
                <input
                  id="front-upload"
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileUpload(e, 'front')}
                  className="hidden"
                />
              </div>
            </div>

            {/* Upload Back (if applicable) */}
            {(documentType === 'Driver License' || documentType === 'National ID') && (
              <div>
                <Label>Back of ID</Label>
                <div className="mt-2">
                  <label
                    htmlFor="back-upload"
                    className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-gray-300 dark:border-slate-600 rounded-lg cursor-pointer hover:border-gray-400 dark:hover:border-slate-500 transition-colors"
                  >
                    {backPreview ? (
                      <div className="relative w-full h-full">
                        <img
                          src={backPreview}
                          alt="Back"
                          className="w-full h-full object-contain rounded-lg"
                        />
                        <div className="absolute top-2 right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                          <CheckCircle2 className="w-5 h-5 text-white" />
                        </div>
                      </div>
                    ) : (
                      <>
                        <Upload className="w-10 h-10 text-gray-400 mb-2" />
                        <p className="text-sm text-gray-600 dark:text-gray-400">Click to upload back photo</p>
                      </>
                    )}
                  </label>
                  <input
                    id="back-upload"
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileUpload(e, 'back')}
                    className="hidden"
                  />
                </div>
              </div>
            )}

            {/* Upload Selfie with ID */}
            <div>
              <Label>Selfie with ID *</Label>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                Take a selfie while holding your ID next to your face
              </p>
              <div>
                <label
                  htmlFor="selfie-upload"
                  className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-gray-300 dark:border-slate-600 rounded-lg cursor-pointer hover:border-gray-400 dark:hover:border-slate-500 transition-colors"
                >
                  {selfiePreview ? (
                    <div className="relative w-full h-full">
                      <img
                        src={selfiePreview}
                        alt="Selfie"
                        className="w-full h-full object-contain rounded-lg"
                      />
                      <div className="absolute top-2 right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                        <CheckCircle2 className="w-5 h-5 text-white" />
                      </div>
                    </div>
                  ) : (
                    <>
                      <Upload className="w-10 h-10 text-gray-400 mb-2" />
                      <p className="text-sm text-gray-600 dark:text-gray-400">Click to upload selfie</p>
                    </>
                  )}
                </label>
                <input
                  id="selfie-upload"
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileUpload(e, 'selfie')}
                  className="hidden"
                />
              </div>
            </div>

            {/* Important Notice */}
            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
              <p className="text-sm text-blue-600 dark:text-blue-400">
                <strong>Important:</strong> Make sure all photos are clear and readable. Verification typically takes 24-48 hours.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <Button onClick={handleSubmit} className="flex-1" size="lg">
                Submit for Verification
              </Button>
              <Button variant="outline" size="lg" onClick={handleSkip}>
                Skip for Now
              </Button>
            </div>
          </div>
        </div>

        <div className="mt-8 flex items-center justify-center gap-2">
          <div className="w-8 h-1 bg-blue-600 rounded-full" />
          <div className="w-8 h-1 bg-blue-600 rounded-full" />
          <div className="w-8 h-1 bg-blue-600 rounded-full" />
          <div className="w-8 h-1 bg-blue-600 rounded-full" />
          <div className="w-8 h-1 bg-blue-600 rounded-full" />
        </div>
        <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-2">
          Step 5 of 7
        </p>
      </motion.div>
    </div>
  );
}