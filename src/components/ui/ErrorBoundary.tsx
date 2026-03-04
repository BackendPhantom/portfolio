import { Component, type ErrorInfo, type ReactNode } from "react";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-[400px] flex items-center justify-center p-8">
          <div className="text-center space-y-6 max-w-md">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-red-100 dark:bg-red-900/30">
              <span className="material-icons text-4xl text-red-500">
                error_outline
              </span>
            </div>

            <div className="space-y-2">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white font-mono">
                Runtime Error
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Something went wrong while rendering this component.
              </p>
              {this.state.error && (
                <div className="mt-4 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg text-left">
                  <code className="text-xs text-red-600 dark:text-red-400 font-mono break-all">
                    {this.state.error.message}
                  </code>
                </div>
              )}
            </div>

            <button
              onClick={this.handleRetry}
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-mono font-semibold transition-all hover:scale-105 active:scale-95">
              <span className="material-icons text-lg">refresh</span>
              Try Again
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
