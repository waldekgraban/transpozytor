import { ErrorBoundary } from './components/ErrorBoundary';
import { TransposerApp } from './components/TransposerApp';

export function App(): JSX.Element {
  return (
    <ErrorBoundary>
      <TransposerApp />
    </ErrorBoundary>
  );
}
