// src/App.tsx
import { AuthProvider } from './components/authProvider';
import Page from './pages/page';

export default function App() {
  return (
    <AuthProvider>
      <Page />
    </AuthProvider>
  );
}
