import React, { useState } from 'react';
import { X, Save, MapPin } from 'lucide-react';
import { geoTreeDB } from '../data/mockData';

export function GeoModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="modal-overlay fixed inset-0 bg-black/50 z-[1000] flex items-center justify-center p-8">
      <div className="modal-drawer bg-surface w-full max-w-5xl h-[80vh] rounded-2xl shadow-2xl flex flex-col overflow-hidden">
        <div className="modal-header p-6 border-b border-outline-variant flex justify-between items-center">
          <h2 className="text-xl font-black tracking-tight">Interactive 10k+ Eligibility Matrix</h2>
          <button onClick={onClose} className="p-2 hover:bg-surface-high rounded-full transition-colors border-none bg-transparent cursor-pointer">
             <X size={20} />
          </button>
        </div>
        
        <div className="flex-1 p-8 overflow-y-auto">
          <p className="text-outline mb-4">Select regions to include or exclude from this promotion.</p>
          {/* Simplified version for public repo */}
          <div className="grid grid-cols-2 gap-8">
             <div className="p-6 bg-surface-low border border-outline-variant rounded-xl h-96 overflow-y-auto">
               <h3 className="font-bold mb-4">Region Selector</h3>
               {geoTreeDB.map(node => (
                 <div key={node.id} className="py-2 border-b border-outline-variant/10">{node.name}</div>
               ))}
             </div>
             <div className="p-6 bg-surface-low border border-outline-variant rounded-xl flex flex-col gap-4">
                <div className="p-4 bg-success-bg/10 border border-success text-success rounded-lg font-bold">Netherlands Market</div>
                <div className="p-4 bg-error-bg/10 border border-error text-error rounded-lg font-bold">B2B Tenders</div>
             </div>
          </div>
        </div>

        <div className="modal-footer p-6 border-t border-outline-variant flex justify-end gap-4">
          <button className="btn-secondary px-6 py-2" onClick={onClose}>Discard</button>
          <button className="btn-primary px-8 py-2 font-bold" onClick={onClose}>Lock In Assignments</button>
        </div>
      </div>
    </div>
  );
}
