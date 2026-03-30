import { useNavigate, Link } from 'react-router-dom';
import { CheckCircle2, TrendingUp, Zap, Shield, Gift, ArrowRight } from 'lucide-react';
import { Button } from '../ui/button';

export default function Welcome() {
  const navigate = useNavigate();
  const [showTutorial, setShowTutorial] = useState(true);
  const [tutorialStep, setTutorialStep] = useState(0);

  const tutorialSteps = [
    {
      title: 'Welcome to Gross Platform! 🎉',
      description: 'Your trading journey begins here. Let us show you around.',
      icon: <Zap className="w-12 h-12" />,
      color: 'from-blue-500 to-purple-500'
    },
    {
      title: 'Dashboard Overview',
      description: 'Monitor your portfolio, open positions, and market performance all in one place.',
      icon: <Shield className="w-12 h-12" />,
      color: 'from-green-500 to-emerald-500'
    },
    {
      title: 'Deposit Funds',
      description: 'Add funds using crypto, bank transfer, or payment providers to start trading.',
      icon: <Gift className="w-12 h-12" />,
      color: 'from-orange-500 to-yellow-500'
    },
    {
      title: 'Place Your First Trade',
      description: 'Choose from 3,000+ assets, set your volume, and place your first trade.',
      icon: <TrendingUp className="w-12 h-12" />,
      color: 'from-blue-500 to-cyan-500'
    }
  ];

  const handleNext = () => {
    if (tutorialStep < tutorialSteps.length - 1) {
      setTutorialStep(tutorialStep + 1);
    } else {
      navigate('/dashboard');
    }
  };

  const handleSkip = () => {
    setShowTutorial(false);
    navigate('/dashboard');
  };

  const currentStep = tutorialSteps[tutorialStep];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 dark:from-slate-900 dark:to-slate-800 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-400/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      {showTutorial ? (
        <motion.div
          key={tutorialStep}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-2xl"
        >
          <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-2xl p-12 relative">
            {/* Close Button */}
            <button
              onClick={handleSkip}
              className="absolute top-6 right-6 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Icon */}
            <div className={`w-24 h-24 bg-gradient-to-br ${currentStep.color} rounded-2xl flex items-center justify-center text-white mx-auto mb-8`}>
              {currentStep.icon}
            </div>

            {/* Content */}
            <h1 className="text-4xl text-center mb-4">{currentStep.title}</h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 text-center mb-12">
              {currentStep.description}
            </p>

            {/* Progress Dots */}
            <div className="flex justify-center gap-2 mb-8">
              {tutorialSteps.map((_, idx) => (
                <div
                  key={idx}
                  className={`h-2 rounded-full transition-all ${
                    idx === tutorialStep 
                      ? 'w-8 bg-blue-600' 
                      : 'w-2 bg-gray-300 dark:bg-slate-600'
                  }`}
                />
              ))}
            </div>

            {/* Actions */}
            <div className="flex gap-4">
              <Button
                variant="outline"
                size="lg"
                className="flex-1"
                onClick={handleSkip}
              >
                Skip Tutorial
              </Button>
              <Button
                size="lg"
                className="flex-1"
                onClick={handleNext}
              >
                {tutorialStep === tutorialSteps.length - 1 ? (
                  <>
                    Go to Dashboard
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </>
                ) : (
                  <>
                    Next
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </>
                )}
              </Button>
            </div>
          </div>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-4xl"
        >
          <div className="text-center mb-12">
            <Link to="/" className="inline-flex items-center gap-2 mb-8">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-400 rounded-xl flex items-center justify-center">
                <TrendingUp className="w-10 h-10 text-white" />
              </div>
              <span className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
                Gross
              </span>
            </Link>

            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring' }}
              className="w-32 h-32 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-8"
            >
              <CheckCircle2 className="w-20 h-20 text-white" />
            </motion.div>

            <h1 className="text-5xl mb-4">Account Created Successfully! </h1>
            <p className="text-2xl text-gray-600 dark:text-gray-400 mb-8">
              You're all set to start trading
            </p>

            {/* Account Summary */}
            <div className="grid md:grid-cols-3 gap-6 max-w-3xl mx-auto mb-12">
              <div className="p-6 bg-white dark:bg-slate-800 rounded-xl shadow-lg">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <CheckCircle2 className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Email</p>
                <p className="font-semibold">Verified ✓</p>
              </div>
              
              <div className="p-6 bg-white dark:bg-slate-800 rounded-xl shadow-lg">
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <CheckCircle2 className="w-6 h-6 text-green-600 dark:text-green-400" />
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Phone</p>
                <p className="font-semibold">Verified ✓</p>
              </div>
              
              <div className="p-6 bg-white dark:bg-slate-800 rounded-xl shadow-lg">
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Sparkles className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Plan</p>
                <p className="font-semibold">Starter</p>
              </div>
            </div>

            {/* CTA Button */}
            <Button size="lg" className="text-lg px-12 py-6" onClick={() => navigate('/dashboard')}>
              Go to Dashboard
              <ArrowRight className="w-6 h-6 ml-2" />
            </Button>
          </div>
        </motion.div>
      )}

      {/* Steps Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <div className="flex items-center gap-2">
          <div className="w-8 h-1 bg-blue-600 rounded-full" />
          <div className="w-8 h-1 bg-blue-600 rounded-full" />
          <div className="w-8 h-1 bg-blue-600 rounded-full" />
          <div className="w-8 h-1 bg-blue-600 rounded-full" />
          <div className="w-8 h-1 bg-blue-600 rounded-full" />
          <div className="w-8 h-1 bg-blue-600 rounded-full" />
          <div className="w-8 h-1 bg-blue-600 rounded-full" />
        </div>
        <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-2">
          Step 7 of 7 - Complete!
        </p>
      </div>
    </div>
  );
}