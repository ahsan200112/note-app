import AppRoutes from './routes';
import { ErrorBoundary } from './components';

function App() {
  return (
    <ErrorBoundary>
    <AppRoutes />
  </ErrorBoundary>
  );
}

export default App;
