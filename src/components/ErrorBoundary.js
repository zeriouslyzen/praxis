import React from 'react';
import { ThemeContext } from '../contexts/AppContext';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo
    });
    
    // Log error to console in development
    if (process.env.NODE_ENV === 'development') {
      console.error('ErrorBoundary caught an error:', error, errorInfo);
    }
  }

  render() {
    if (this.state.hasError) {
      return <ErrorFallback error={this.state.error} errorInfo={this.state.errorInfo} />;
    }

    return this.props.children;
  }
}

const ErrorFallback = ({ error, errorInfo }) => {
  const { isDarkMode } = React.useContext(ThemeContext);
  const bgColor = isDarkMode ? 'bg-black' : 'bg-white';
  const textColor = isDarkMode ? 'text-white' : 'text-black';
  const mutedTextColor = isDarkMode ? 'text-gray-400' : 'text-gray-600';
  const borderColor = isDarkMode ? 'border-white/20' : 'border-black/20';
  const cardBg = isDarkMode ? 'bg-white/5' : 'bg-black/5';

  const handleReload = () => {
    window.location.reload();
  };

  const handleGoHome = () => {
    window.location.href = '/';
  };

  return (
    <div className={`min-h-screen ${bgColor} flex items-center justify-center p-4`}>
      <div className={`max-w-md w-full ${cardBg} backdrop-blur-sm border ${borderColor} rounded-xl p-8 text-center`}>
        <div className="mb-6">
          <div className={`w-16 h-16 mx-auto mb-4 ${isDarkMode ? 'text-red-400' : 'text-red-600'}`}>
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h1 className={`text-2xl font-bold ${textColor} font-mono mb-2`}>
            Something went wrong
          </h1>
          <p className={`${mutedTextColor} font-mono text-sm leading-relaxed`}>
            We encountered an unexpected error. Our systems are working to resolve this issue.
          </p>
        </div>

        {process.env.NODE_ENV === 'development' && error && (
          <details className={`mb-6 text-left ${mutedTextColor} font-mono text-xs`}>
            <summary className="cursor-pointer mb-2">Error Details (Development)</summary>
            <div className={`${cardBg} p-3 rounded border ${borderColor} overflow-auto max-h-32`}>
              <pre className="whitespace-pre-wrap">{error.toString()}</pre>
              {errorInfo && (
                <pre className="whitespace-pre-wrap mt-2">{errorInfo.componentStack}</pre>
              )}
            </div>
          </details>
        )}

        <div className="space-y-3">
          <button
            onClick={handleReload}
            className={`w-full ${isDarkMode ? 'bg-white/10 hover:bg-white/20' : 'bg-black/10 hover:bg-black/20'} ${textColor} px-4 py-2 rounded-lg font-mono text-sm font-semibold transition-all duration-300 transform hover:scale-105`}
          >
            Reload Page
          </button>
          <button
            onClick={handleGoHome}
            className={`w-full bg-transparent border ${borderColor} ${textColor} px-4 py-2 rounded-lg font-mono text-sm font-semibold transition-all duration-300 transform hover:scale-105 hover:bg-opacity-5`}
          >
            Go to Home
          </button>
        </div>

        <div className={`mt-6 pt-6 border-t ${borderColor}`}>
          <p className={`${mutedTextColor} font-mono text-xs`}>
            If this problem persists, please contact our support team.
          </p>
        </div>
      </div>
    </div>
  );
};

// Higher-order component for error boundaries
export const withErrorBoundary = (Component, fallback = null) => {
  return function WrappedComponent(props) {
    return (
      <ErrorBoundary fallback={fallback}>
        <Component {...props} />
      </ErrorBoundary>
    );
  };
};

// Network Error Component
export const NetworkError = ({ onRetry, message = "Network connection failed" }) => {
  const { isDarkMode } = React.useContext(ThemeContext);
  const textColor = isDarkMode ? 'text-white' : 'text-black';
  const mutedTextColor = isDarkMode ? 'text-gray-400' : 'text-gray-600';
  const borderColor = isDarkMode ? 'border-white/20' : 'border-black/20';
  const cardBg = isDarkMode ? 'bg-white/5' : 'bg-black/5';

  return (
    <div className={`${cardBg} backdrop-blur-sm border ${borderColor} rounded-xl p-6 text-center`}>
      <div className={`w-12 h-12 mx-auto mb-4 ${isDarkMode ? 'text-yellow-400' : 'text-yellow-600'}`}>
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
      <h3 className={`text-lg font-bold ${textColor} font-mono mb-2`}>
        Connection Error
      </h3>
      <p className={`${mutedTextColor} font-mono text-sm mb-4`}>
        {message}
      </p>
      {onRetry && (
        <button
          onClick={onRetry}
          className={`${isDarkMode ? 'bg-white/10 hover:bg-white/20' : 'bg-black/10 hover:bg-black/20'} ${textColor} px-4 py-2 rounded-lg font-mono text-sm font-semibold transition-all duration-300`}
        >
          Try Again
        </button>
      )}
    </div>
  );
};

export default ErrorBoundary;
