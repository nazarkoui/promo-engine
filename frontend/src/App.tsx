import React, { useState } from 'react'
import './App.css'
import { Dashboard } from './components/Dashboard'
import { PromoEditor } from './components/PromoEditor'

function App() {
  const [activePromoId, setActivePromoId] = useState<string | null>(null);

  return (
    <div className="app-container">
      <header className="main-header">
        <div className="flex justify-between items-center px-8 h-full">
          <div className="flex items-center gap-4">
            <div className="logo-square">P</div>
            <div>
              <h1 className="text-xl font-bold tracking-tighter">Enterprise Promo Logic Engine</h1>
              <p className="text-xs text-outline uppercase font-semibold tracking-widest">Global Calculation Matrix v2.4</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="user-badge">NZ</div>
          </div>
        </div>
      </header>

      <main className="main-content">
        {activePromoId ? (
          <PromoEditor promoId={activePromoId} onBack={() => setActivePromoId(null)} />
        ) : (
          <Dashboard onOpenEditor={(id) => setActivePromoId(id)} />
        )}
      </main>
    </div>
  )
}

export default App
