import React, { useState } from 'react';
import { AlertTriangle, Plus } from 'lucide-react';
import { massivePromoList } from '../data/mockData';

export function Dashboard({ onOpenEditor }: { onOpenEditor: (id: string) => void }) {
  return (
    <>
      <div className="flex justify-between items-end mb-8">
        <div>
          <h2 className="text-3xl font-black tracking-tighter">Promotional Assets</h2>
          <p className="text-sm text-outline font-medium">Managing 248 active campaigns across 12 markets</p>
        </div>
        <button className="btn-primary flex items-center gap-2 px-6 py-3 font-bold shadow-lg shadow-primary/20">
          <Plus size={18} strokeWidth={3} /> Create New Campaign
        </button>
      </div>

      <div className="section-block">
        <div className="flex justify-between items-center mb-6">
          <div className="section-title">Global Performance Index</div>
        </div>
        <div className="flex flex-col gap-2">
          {massivePromoList.map(promo => (
            <div 
              key={promo.id}
              onClick={() => onOpenEditor(promo.id)}
              className="list-item clickable bg-surface p-4 border border-outline-variant rounded flex justify-between items-center hover:bg-surface-high transition-colors cursor-pointer"
            >
              <div>
                <div className="label text-xs uppercase font-bold text-outline">{promo.id} • {promo.type}</div>
                <div className="font-bold text-lg mt-1">{promo.name}</div>
              </div>
              <div className="flex items-center gap-6">
                <span className="mono text-sm">{promo.rules} Rules</span>
                {promo.conflicts > 0 && (
                  <span className="mono text-error flex items-center gap-1 font-bold">
                    <AlertTriangle size={14} /> {promo.conflicts} Conflict
                  </span>
                )}
                <span className="badge bg-primary-container text-primary font-bold px-3 py-1 rounded text-xs">{promo.status}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
