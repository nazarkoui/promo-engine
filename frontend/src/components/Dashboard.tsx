
import { Settings, AlertTriangle } from 'lucide-react';
import { massivePromoList } from '../data/mockData';

export function Dashboard({ onOpenEditor }: { onOpenEditor: (id: string) => void }) {
  return (
    <>
      <div className="flex justify-between items-center bg-transparent">
        <div>
          <h1 className="text-2xl font-semibold">Promotions Engine</h1>
          <p className="text-surface-variant">Manage enterprise promo rules and stacking constraints for Window Furnishings.</p>
        </div>
        <Settings className="text-outline" />
      </div>

      <div className="section-block">
        <div className="section-header-row">
          <h2 className="text-xl font-semibold">Active Rulesets ({massivePromoList.length})</h2>
          <div className="flex gap-3">
            <input type="text" placeholder="Search Promo ID or Name..." className="w-64" />
            <button className="btn-primary">+ New Rule</button>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          {massivePromoList.map(promo => (
            <div 
              key={promo.id}
              onClick={() => onOpenEditor(promo.id)}
              className="list-item clickable bg-surface"
            >
              <div>
                <div className="label">{promo.id} • {promo.type}</div>
                <div className="font-medium mt-1">{promo.name}</div>
              </div>
              <div className="flex items-center gap-6">
                <span className="mono">{promo.rules} Rules</span>
                {promo.conflicts > 0 && (
                  <span className="mono text-error flex items-center gap-1">
                    <AlertTriangle size={14} /> {promo.conflicts} Conflict
                  </span>
                )}
                <span className="badge">{promo.status}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
