import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Construction } from 'lucide-react';
import { Button } from './ui/button';

interface PlaceholderPageProps {
  title: string;
  description?: string;
}

export default function PlaceholderPage({ title, description }: PlaceholderPageProps) {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center p-4">
      <div className="text-center max-w-md">
        <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
          <Construction className="w-12 h-12 text-white" />
        </div>
        
        <h1 className="text-3xl mb-4 text-gray-900 dark:text-white">{title}</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          {description || 'This page is under construction and will be available soon.'}
        </p>
        
        <Button 
          onClick={() => navigate(-1)}
          className="bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:opacity-90"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Go Back
        </Button>
      </div>
    </div>
  );
}