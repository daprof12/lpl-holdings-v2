import { Link } from 'react-router-dom';
import imgCtaBg from 'figma:asset/49712abe12194c268a5c9981e2bf290c369efc5f.png';

interface StartTradingCTAProps {
  /** Small uppercase text above the heading */
  subtitle?: string;
  /** Main heading text */
  heading?: string;
  /** Secondary text below the heading */
  subheading?: string;
  /** Primary (green) button label */
  primaryButtonText?: string;
  /** Primary button route */
  primaryButtonLink?: string;
  /** Secondary (outline) button label — set to null to hide */
  secondaryButtonText?: string | null;
  /** Secondary button route */
  secondaryButtonLink?: string;
}

export default function StartTradingCTA({
  subtitle,
  heading = 'global markets today!',
  subheading,
  primaryButtonText = 'Open Trading Account',
  primaryButtonLink = '/login',
  secondaryButtonText = 'View Dashboard',
  secondaryButtonLink = '/dashboard',
}: StartTradingCTAProps) {
  return (
    <section className="relative overflow-hidden py-24">
      <div className="absolute inset-0 bg-gray-100 dark:bg-black">
        <img
          src={imgCtaBg}
          alt=""
          className="absolute inset-0 w-full h-full object-cover opacity-0 dark:opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-gray-100/80 to-gray-200/90 dark:from-black/60 dark:to-black/80" />
      </div>

      <div className="relative z-10 text-center px-4">
        {subtitle && (
          <p className="text-gray-500 dark:text-white/50 text-sm uppercase tracking-widest mb-2 font-medium">
            {subtitle}
          </p>
        )}
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">{heading}</h2>
        {subheading && (
          <p className="text-gray-600 dark:text-white/70 text-base md:text-lg max-w-xl mx-auto mb-4">
            {subheading}
          </p>
        )}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-6">
          <Link
            to={primaryButtonLink}
            className="inline-block px-12 py-4 rounded-md font-bold text-black text-lg transition-opacity hover:opacity-90"
            style={{ backgroundColor: '#34e834' }}
          >
            {primaryButtonText}
          </Link>
          {secondaryButtonText !== null && (
            <Link
              to={secondaryButtonLink!}
              className="inline-block px-12 py-4 rounded-md font-bold text-gray-900 dark:text-white border border-gray-300 dark:border-white/30 hover:border-gray-500 dark:hover:border-white/60 transition-colors text-lg"
            >
              {secondaryButtonText}
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}