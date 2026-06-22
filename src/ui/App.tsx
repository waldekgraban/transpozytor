import { ErrorBoundary } from './components/ErrorBoundary';
import { TransposerApp } from './components/TransposerApp';

export const App = () => {
  return (
    <ErrorBoundary>
      <TransposerApp />
    </ErrorBoundary>
  );
};
