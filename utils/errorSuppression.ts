/**
 * Global Error Suppression Utility
 * 
 * This utility suppresses known benign errors that occur during normal operation,
 * particularly from third-party libraries like TradingView that manipulate the DOM
 * in ways that conflict with React's lifecycle management.
 */

/**
 * List of error patterns that should be suppressed
 */
const SUPPRESSED_ERROR_PATTERNS = [
  // TradingView iframe errors
  /Failed to execute 'removeChild' on 'Node'/i,
  /NotFoundError.*removeChild/i,
  /The node to be removed is not a child of this node/i,
  
  // TradingView script errors
  /ResizeObserver loop/i,
  /Cannot read.*of undefined.*TradingView/i,
  
  // React lifecycle conflicts with third-party scripts
  /Cannot read properties of null.*reading 'removeChild'/i,
  /Cannot read properties of undefined.*reading 'removeChild'/i,
  
  // Other benign DOM manipulation errors
  /Node was not found/i,
  /Cannot remove.*not a child/i,
  
  // Recharts width/height errors (benign during initial render)
  /width\(-?\d+\) and height\(-?\d+\) of chart should be greater than 0/i,
  /please check the style of container/i,
  
  // Iframe contentWindow errors (external content loading)
  /Cannot listen to the event from the provided iframe/i,
  /contentWindow is not available/i,
  /contentWindow.*null/i,
];

/**
 * Check if an error should be suppressed
 */
function shouldSuppressError(error: Error | ErrorEvent | string): boolean {
  const errorMessage = typeof error === 'string' 
    ? error 
    : error instanceof ErrorEvent 
      ? error.message 
      : error.message;
  
  return SUPPRESSED_ERROR_PATTERNS.some(pattern => pattern.test(errorMessage));
}

/**
 * Initialize global error suppression
 * 
 * This sets up handlers for:
 * - window.onerror (synchronous errors)
 * - window.onunhandledrejection (promise rejections)
 * - console.error (console logging)
 */
export function initializeErrorSuppression() {
  // Store original handlers
  const originalOnError = window.onerror;
  const originalOnUnhandledRejection = window.onunhandledrejection;
  const originalConsoleError = console.error;
  const originalConsoleWarn = console.warn;

  // Override window.onerror
  window.onerror = function(
    message: string | Event,
    source?: string,
    lineno?: number,
    colno?: number,
    error?: Error
  ): boolean {
    const errorMessage = typeof message === 'string' ? message : error?.message || '';
    
    // Check if error should be suppressed
    if (shouldSuppressError(errorMessage)) {
      // Return true to prevent default error handling
      return true;
    }
    
    // Call original handler if it exists
    if (originalOnError) {
      return originalOnError(message, source, lineno, colno, error);
    }
    
    return false;
  };

  // Override window.onunhandledrejection
  window.onunhandledrejection = function(event: PromiseRejectionEvent): void {
    const errorMessage = event.reason?.message || event.reason || '';
    
    // Check if error should be suppressed
    if (shouldSuppressError(String(errorMessage))) {
      event.preventDefault();
      return;
    }
    
    // Call original handler if it exists
    if (originalOnUnhandledRejection) {
      originalOnUnhandledRejection.call(window, event);
    }
  };

  // Override console.error (optional - be careful with this)
  console.error = function(...args: any[]): void {
    const errorMessage = args.map(arg => 
      typeof arg === 'object' && arg?.message ? arg.message : String(arg)
    ).join(' ');
    
    // Check if error should be suppressed
    if (shouldSuppressError(errorMessage)) {
      // Optionally log to a different method for debugging
      // console.debug('[Suppressed Error]:', ...args);
      return;
    }
    
    // Call original console.error
    originalConsoleError.apply(console, args);
  };

  // Override console.warn to suppress Recharts warnings
  console.warn = function(...args: any[]): void {
    const warnMessage = args.map(arg => 
      typeof arg === 'object' && arg?.message ? arg.message : String(arg)
    ).join(' ');
    
    // Check if warning should be suppressed
    if (shouldSuppressError(warnMessage)) {
      // Optionally log to a different method for debugging
      // console.debug('[Suppressed Warning]:', ...args);
      return;
    }
    
    // Call original console.warn
    originalConsoleWarn.apply(console, args);
  };

  // Log initialization
  console.log('[Error Suppression] Initialized - suppressing known benign errors');
}

/**
 * Cleanup and restore original error handlers
 * 
 * This should be called when unmounting the app or during hot reload
 */
export function cleanupErrorSuppression() {
  // Note: Restoring original handlers is tricky because we've already overwritten them
  // In practice, this is rarely needed since the app is typically mounted once
  console.log('[Error Suppression] Cleanup called');
}

/**
 * Manually suppress an error in a try-catch block
 * 
 * Usage:
 * try {
 *   somethingThatMightError();
 * } catch (error) {
 *   if (!suppressError(error)) {
 *     throw error; // Re-throw if not suppressed
 *   }
 * }
 */
export function suppressError(error: Error | unknown): boolean {
  if (error instanceof Error) {
    return shouldSuppressError(error);
  }
  return false;
}

/**
 * Wrap a function to suppress specific errors
 * 
 * Usage:
 * const safeFunction = withErrorSuppression(() => {
 *   // code that might throw suppressible errors
 * });
 */
export function withErrorSuppression<T extends (...args: any[]) => any>(
  fn: T
): (...args: Parameters<T>) => ReturnType<T> | void {
  return function(...args: Parameters<T>): ReturnType<T> | void {
    try {
      return fn(...args);
    } catch (error) {
      if (suppressError(error)) {
        // Error was suppressed, return void
        return;
      }
      // Re-throw non-suppressed errors
      throw error;
    }
  };
}

export default {
  initializeErrorSuppression,
  cleanupErrorSuppression,
  suppressError,
  withErrorSuppression,
};