import { Component, type ErrorInfo, type ReactNode } from 'react';

interface ErrorBoundaryProps {
  readonly children: ReactNode;
  readonly fallback?: (error: Error) => ReactNode;
}

interface ErrorBoundaryState {
  readonly error: Error | null;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  public state: ErrorBoundaryState = { error: null };

  public static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { error };
  }

  public componentDidCatch(error: Error, info: ErrorInfo): void {
    console.error('Nieoczekiwany błąd UI:', error, info.componentStack);
  }

  private readonly handleReset = (): void => {
    this.setState({ error: null });
  };

  public render(): ReactNode {
    const { error } = this.state;
    const { children, fallback } = this.props;

    if (error !== null) {
      if (fallback !== undefined) {
        return fallback(error);
      }
      return (
        <div className="result result--error" role="alert">
          <p>Wystąpił nieoczekiwany błąd aplikacji.</p>
          <button type="button" onClick={this.handleReset}>
            Spróbuj ponownie
          </button>
        </div>
      );
    }

    return children;
  }
}
