import { useState } from 'react';
import { ArrowLeft, Check, X, MapPin, Store, AlertTriangle, Save, Gift, Plus, Trash2 } from 'lucide-react';
import { 
  massiveInclusions, 
  massiveExclusions, 
  getPromoDetails, 
  promoDictionary, 
  productCategoryDict, 
  fabricCollectionDict, 
  hardwareDict 
} from '../data/mockData';
import { GeoModal } from './GeoModal';
import { AutocompleteInput } from './AutocompleteInput';

function ConditionRow({ isFirst, onRemove }: { isFirst: boolean, onRemove: () => void }) {
  const [attribute, setAttribute] = useState('Product Category');
  
  // Decide which dictionary to use based on attribute
  const activeDictionary = 
    attribute === 'Product Category' ? productCategoryDict :
    attribute === 'Fabric Collection' ? fabricCollectionDict :
    attribute === 'Component / Hardware' ? hardwareDict : [];

  return (
    <div className="logic-row items-center mt-2 group relative bg-surface-low rounded p-1">
       <span className="logic-badge accent" style={{ background: isFirst ? 'var(--primary-container)' : 'var(--outline)' }}>
         {isFirst ? 'IF' : 'AND'}
       </span>
       
       <select className="input-mono text-xs p-1" value={attribute} onChange={(e) => setAttribute(e.target.value)} style={{ width: '160px' }}>
         <option>Product Category</option>
         <option>Fabric Collection</option>
         <option>Component / Hardware</option>
         <option>Dimensions (Width/Drop)</option>
       </select>
       
       <select className="logic-badge border-none text-xs" style={{ background: 'var(--surface-high)' }}>
         <option>IN LIST</option>
         <option>EQUALS</option>
         <option>CONTAINS</option>
         <option>GREATER THAN</option>
         <option>LESS THAN</option>
       </select>
       
       <div className="flex-1">
         {attribute === 'Dimensions (Width/Drop)' ? (
            <input type="text" className="input-mono w-full text-sm" placeholder="e.g. 350cm" />
         ) : (
            <AutocompleteInput 
              dictionary={activeDictionary} 
              placeholder={`Search ${attribute}...`} 
              onSelect={() => {}} 
            />
         )}
       </div>

       {!isFirst && (
         <button onClick={onRemove} className="text-outline hover:text-error bg-transparent border-none cursor-pointer p-1 opacity-0 group-hover:opacity-100 transition-opacity">
           <X size={16}/>
         </button>
       )}
    </div>
  );
}

function LogicTier({ defaultAction = 'discount', tierName = 'Tier', onRemove }: { defaultAction?: string, tierName?: string, onRemove?: () => void }) {
  const [actionType, setActionType] = useState(defaultAction);
  const [conditions, setConditions] = useState([{ id: Date.now() }]);

  const addCondition = () => {
    setConditions([...conditions, { id: Date.now() }]);
  };

  const removeCondition = (idToRemove: number) => {
    setConditions(conditions.filter(c => c.id !== idToRemove));
  };

  return (
    <div className="section-block mt-6 relative group border-l-4 border-l-primary-container">
      <div className="flex justify-between items-center border-b border-surface-low pb-3 mb-2">
        <input 
          type="text" 
          defaultValue={tierName} 
          className="font-semibold text-lg bg-transparent border-none outline-none flex-1 text-on-surface" 
          style={{ padding: 0, margin: 0 }}
        />
        {onRemove && (
          <button onClick={onRemove} className="text-outline hover:text-error bg-transparent border-none cursor-pointer flex items-center gap-1 transition-colors">
            <Trash2 size={16} /> <span className="text-sm font-medium">Delete Tier</span>
          </button>
        )}
      </div>

      <div className="flex flex-col gap-1">
        {conditions.map((c, i) => (
          <ConditionRow key={c.id} isFirst={i === 0} onRemove={() => removeCondition(c.id)} />
        ))}
        <button onClick={addCondition} className="btn-secondary self-start flex items-center gap-1 mt-2 text-xs py-1 px-2 border border-outline-variant hover:bg-surface-high">
          <Plus size={14} /> Add Condition (AND)
        </button>
      </div>

      <div className="logic-row mt-4 pt-4 border-t border-surface-low" style={{ background: 'transparent', borderLeft: 'none', paddingLeft: 0 }}>
        <span className="logic-badge accent bg-primary-dark">THEN</span>
        <span className="font-medium text-sm">Action:</span>
        <select value={actionType} onChange={(e) => setActionType(e.target.value)} className="font-semibold bg-surface text-sm">
          <option value="discount">Flat Discount %</option>
          <option value="quantity">Discount on Nth Item</option>
          <option value="upgrade">Free Upgrade To</option>
        </select>
        
        {actionType === 'discount' && (
          <div className="flex items-center gap-2">
            <input type="text" defaultValue="20" className="input-mono w-16 text-sm" />
            <span className="label text-xs">%</span>
          </div>
        )}
        
        {actionType === 'quantity' && (
          <div className="flex items-center gap-2 flex-1 text-sm">
            <input type="text" defaultValue="50" className="input-mono w-16" />
            <span className="mono">% off the</span>
            <select className="input-mono w-28 text-xs">
                <option>Lower Priced</option>
                <option>Identical</option>
            </select>
            <input type="number" defaultValue="2" className="input-mono w-16" />
            <span className="mono">nd item</span>
          </div>
        )}

        {actionType === 'upgrade' && (
          <div className="flex items-center gap-2 flex-1">
             <select className="input-mono flex-1 bg-surface text-sm">
               <option>Top Down / Bottom Up (TDBU) System</option>
               <option>Motorisation</option>
               <option>Day/Night Combo Cassette</option>
             </select>
             <Gift size={16} className="text-surface-variant" />
          </div>
        )}
      </div>
    </div>
  );
}

export function PromoEditor({ promoId, onBack }: { promoId: string, onBack: () => void }) {
  const [isGeoOpen, setGeoOpen] = useState(false);
  const [stackType, setStackType] = useState('custom');

  // Load deep data based on Context Click
  const detail = getPromoDetails(promoId);

  // Mutable State for Dynamic Tiers and Constraints
  const [tiers, setTiers] = useState<any[]>(detail.tiers || []);
  const [constraints, setConstraints] = useState<any[]>([
    { id: 1, type: 'EXCLUDE', attribute: 'Dimensions (Width/Drop)', field: 'Dimensions', operator: 'GREATER THAN', value: '350cm' }
  ]);

  const addTier = () => {
    setTiers([...tiers, { name: `Tier ${tiers.length + 1}: Custom Block`, defaultAction: 'discount', defaultProducts: '' }]);
  };

  const addConstraint = () => {
    setConstraints([...constraints, { id: Date.now(), type: 'EXCLUDE', attribute: 'Product Category', field: '', operator: 'EQUALS', value: '' }]);
  };

  const removeConstraint = (idToRemove: number) => {
    setConstraints(constraints.filter(c => c.id !== idToRemove));
  };

  return (
    <div className="flex flex-col gap-6">
      <button className="btn-secondary self-start flex items-center gap-2" onClick={onBack}>
        <ArrowLeft size={16} /> Back to Dashboard
      </button>

      {/* 1. General Info */}
      <div className="section-block">
        <div className="section-title">General Information</div>
        <div className="input-row flex-wrap">
          <div className="input-group flex-1 min-w-[300px]">
            <label className="label">Promo Name</label>
            <input type="text" defaultValue={detail.name} key={`name-${promoId}`} className="font-bold text-lg text-primary" />
          </div>
          <div className="input-group">
            <label className="label">Start Date</label>
            <input type="text" className="input-mono" defaultValue={detail.start} key={`sd-${promoId}`} />
          </div>
          <div className="input-group">
            <label className="label">End Date</label>
            <input type="text" className="input-mono" defaultValue={detail.end} key={`ed-${promoId}`} />
          </div>
        </div>
        <div className="input-group">
          <label className="label">Terms & Description</label>
          <textarea defaultValue={detail.description} key={`desc-${promoId}`} className="h-20" />
        </div>
      </div>

      {/* 2. Compatibility with Autocomplete */}
      <div className="section-block">
        <div className="section-title">Cross-Promo Stacking</div>
        <div className="radio-group">
          <label className="radio-item">
            <input type="radio" checked={stackType === 'all'} onChange={() => setStackType('all')} />
            <span className="font-medium">Stacks with Everything</span>
          </label>
          <label className="radio-item">
            <input type="radio" checked={stackType === 'custom'} onChange={() => setStackType('custom')} />
            <div className="radio-content">
              <span className="font-medium">Custom Boundaries</span>
              {stackType === 'custom' && (
                <div className="flex gap-4 mt-2">
                  <div className="input-group flex-1" style={{ zIndex: 10 }}>
                    <label className="label text-success">+ Include List</label>
                    <AutocompleteInput dictionary={promoDictionary} placeholder="Search promo..." onSelect={() => {}} />
                  </div>
                  <div className="input-group flex-1" style={{ zIndex: 9 }}>
                    <label className="label text-error">- Exclude List</label>
                    <AutocompleteInput dictionary={promoDictionary} placeholder="Search promo..." onSelect={() => {}} />
                  </div>
                </div>
              )}
            </div>
          </label>
        </div>
      </div>

      {/* 3. Geographic Engine */}
      <div className="section-block">
        <div className="flex justify-between items-center mb-4">
          <div className="section-title m-0 p-0 border-none">Global Eligibility Matrix</div>
          <button className="btn-secondary border border-outline-variant" onClick={() => setGeoOpen(true)}>Open Matrix Drawer</button>
        </div>
        
        <div className="bg-surface-low p-4 rounded flex flex-col gap-4 border border-surface-high">
          <div className="flex items-start gap-3">
            <span className="label w-24 text-success flex items-center gap-1 font-bold pt-1">
               <Check size={16} strokeWidth={3} /> INCLUDES
            </span>
            <div className="flex gap-2 flex-wrap flex-1">
              {massiveInclusions.slice(0, 4).map(loc => (
                <span className="pill included bg-surface border border-success" key={loc}><MapPin size={12}/> {loc}</span>
              ))}
            </div>
          </div>
          <div className="flex items-start gap-3 border-t border-surface-high pt-4">
            <span className="label w-24 text-error flex items-center gap-1 font-bold pt-1">
               <X size={16} strokeWidth={3} /> EXCLUDES
            </span>
            <div className="flex gap-2 flex-wrap flex-1">
              {massiveExclusions.map(loc => (
                <span className="pill excluded bg-surface border border-error" key={loc}><Store size={12}/> {loc}</span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 4. Logic Tiers */}
      <div className="flex flex-col gap-2">
        <h3 className="text-xl font-bold flex items-center gap-2">Calculation Rulesets</h3>
        <p className="text-sm text-on-surface-variant">Tiers are evaluated sequentially. Complex stacking is managed via the boundaries above.</p>
        
        {tiers.map((t: any, i: number) => (
          <LogicTier 
            key={`tier-${promoId}-${i}`} 
            defaultAction={t.defaultAction} 
            tierName={t.name} 
            onRemove={tiers.length > 1 ? () => { const newTiers = [...tiers]; newTiers.splice(i, 1); setTiers(newTiers); } : undefined}
          />
        ))}
        
        <button onClick={addTier} className="btn-secondary self-center flex items-center gap-2 mt-4 px-8 py-3 border-primary text-primary font-bold shadow-sm">
          <Plus size={20} /> Add Calculation Tier
        </button>
      </div>

      {/* 5. Master Constraints */}
      <div className="section-block border-error border-2 bg-error-bg/20">
        <div className="flex flex-col border-b border-error/20 pb-4 mb-4">
           <h3 className="text-xl font-bold text-error flex items-center gap-2"><AlertTriangle /> Master Product Exclusions</h3>
           <p className="text-xs mt-1 text-on-surface-variant">
             <strong>Priority Zero:</strong> Rules defined here strip products from the promotion <i>before</i> tiers are calculated.
           </p>
        </div>
        
        {constraints.map((c) => (
          <div key={`constraint-${c.id}`} className="logic-row items-center mt-2 pr-10 relative bg-surface border border-outline-variant p-2 rounded group">
             <button onClick={() => removeConstraint(c.id)} className="absolute right-2 text-outline hover:text-error opacity-0 group-hover:opacity-100 transition-opacity">
               <Trash2 size={18}/>
             </button>
             
             <select defaultValue={c.type} className="logic-badge accent font-bold text-white border-none py-1 px-3" style={{ background: c.type === 'EXCLUDE' ? 'var(--error)' : 'var(--success)' }}>
                 <option value="EXCLUDE">EXCLUDE IF</option>
                 <option value="INCLUDE">REQUIRED IF</option>
             </select>

             <select className="input-mono text-sm border-none bg-surface-low" style={{ width: '180px' }}>
               <option>Product Category</option>
               <option>Fabric Collection</option>
               <option selected={c.attribute === 'Dimensions (Width/Drop)'}>Dimensions (Width/Drop)</option>
             </select>

             <select className="logic-badge border-none text-xs">
                <option>GREATER THAN</option>
                <option>CONTAINS</option>
                <option>EQUALS</option>
             </select>
             
             <input type="text" className="input-mono flex-1 text-sm bg-surface-low px-2" placeholder="Value..." defaultValue={c.value} />
          </div>
        ))}

        <button onClick={addConstraint} className="btn-secondary self-start flex items-center gap-2 mt-4 text-error font-bold border-error border bg-error-bg/40 px-4 py-2 text-xs">
          <Plus size={14} /> Add Master Constraint
        </button>

        {promoId === 'PR-9999' && (
          <div className="mt-6 p-4 bg-error text-white rounded-lg flex items-center gap-4">
            <AlertTriangle size={32} />
            <div>
              <div className="font-bold uppercase tracking-wider">Enterprise Conflict Detected</div>
              <div className="text-xs">This logic configuration triggers a recursive overlap with 'PR-1033 (Australia Launch)'. Multiple-tier discounts on Wooden Venetians will be capped at 40% globally.</div>
            </div>
          </div>
        )}
      </div>

      <div className="h-24"></div>

      <div className="bottom-bar">
        <div className="flex gap-8 items-center">
          <span className="label text-outline">State: Draft</span>
          <span className="mono font-bold text-primary">{promoId}: Logic Compilation Ready</span>
        </div>
        <button className="btn-primary px-10 py-4 font-bold tracking-tight text-lg shadow-lg active:scale-95 transition-all">
          <Save size={20} /> Publish Active Promo
        </button>
      </div>

      {isGeoOpen && <GeoModal onClose={() => setGeoOpen(false)} />}
    </div>
  );
}
