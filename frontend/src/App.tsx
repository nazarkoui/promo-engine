import { useState } from 'react';
import { Dashboard } from './components/Dashboard.tsx';
import { PromoEditor } from './components/PromoEditor.tsx';
import './index.css';

export default function App() {
  const [view, setView] = useState<'dashboard' | 'editor'>('dashboard');
  const [activeEditor, setActiveEditor] = useState<string>('');

  const openEditor = (id: string) => {
    setActiveEditor(id);
    setView('editor');
  };

  return (
    <div className="app-container">
      {view === 'dashboard' ? (
        <Dashboard onOpenEditor={openEditor} />
      ) : (
        <PromoEditor promoId={activeEditor} onBack={() => setView('dashboard')} />
      )}
    </div>
  );
}
