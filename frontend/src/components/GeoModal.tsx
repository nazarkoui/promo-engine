import { useState } from 'react';
import { X } from 'lucide-react';
import { geoTreeDB } from '../data/mockData';

export function GeoModal({ onClose }: { onClose: () => void }) {
  const [tab, setTab] = useState('tree');
  const [search, setSearch] = useState('');
  
  // Interactive state lists
  const [includes, setIncludes] = useState<string[]>(['EU Baseline (EMEA)']);
  const [excludes, setExcludes] = useState<string[]>(['B2B Tenders']);

  interface GeoNode { id: string; name: string; children?: GeoNode[] }

  // Recursive Tree Component
  const TreeNode = ({ node, level = 0 }: { node: GeoNode, level?: number }) => {
    const isLeaf = !node.children || node.children.length === 0;
    
    // Hide node if it doesn't match search (and none of its children do)
    const matchesSearch = (n: GeoNode): boolean => {
      if (n.name.toLowerCase().includes(search.toLowerCase())) return true;
      if (n.children) return n.children.some(matchesSearch);
      return false;
    };

    if (search && !matchesSearch(node)) return null;

    return (
      <div className="flex-col w-full">
        <div className="flex justify-between items-center p-2 hover:bg-surface-high border-b border-surface-high group" style={{ paddingLeft: `${ level * 16 + 8 }px` }}>
          <span className={`text-sm ${isLeaf ? 'mono' : 'font-medium'}`}>{!isLeaf && '▾ '}{node.name}</span>
          <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <button onClick={() => setIncludes([...includes, node.name])} className="btn-secondary py-1 px-2 text-success text-xs">+ INCL</button>
            <button onClick={() => setExcludes([...excludes, node.name])} className="btn-secondary py-1 px-2 text-error text-xs">- EXCL</button>
          </div>
        </div>
        {node.children && node.children.length > 0 && (
          <div className="flex-col w-full">
            {node.children.map((child: GeoNode) => (
              <TreeNode key={child.id} node={child} level={level + 1} />
            ))}
          </div>
        )}
      </div>
    );
  };

  const removeAssigned = (idx: number, type: 'include' | 'exclude') => {
    if (type === 'include') {
      const arr = [...includes];
      arr.splice(idx, 1);
      setIncludes(arr);
    } else {
      const arr = [...excludes];
      arr.splice(idx, 1);
      setExcludes(arr);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-drawer">
        <div className="modal-header">
          <h2 className="text-xl font-semibold">Interactive 10k+ Eligibility Matrix</h2>
          <button onClick={onClose} className="bg-transparent border-none cursor-pointer">
             <X size={20} />
          </button>
        </div>
        
        <div className="flex border-b border-surface-high">
          <button onClick={() => setTab('tree')} className={`flex-1 p-3 font-medium border-none cursor-pointer ${tab === 'tree' ? 'bg-surface-low border-b-2 border-b-primary' : 'bg-transparent'}`}>Category Tree & Pool</button>
          <button onClick={() => setTab('bulk')} className={`flex-1 p-3 font-medium border-none cursor-pointer ${tab === 'bulk' ? 'bg-surface-low border-b-2 border-b-primary' : 'bg-transparent'}`}>Mass Upload</button>
        </div>

        <div className="modal-body p-4 bg-surface-low">
          {tab === 'tree' ? (
            <div className="flex gap-4 w-full h-full">
              {/* Left Tree/Pool list */}
              <div className="flex-1 bg-surface p-4 border border-outline-variant rounded flex flex-col gap-2">
                <input 
                  type="text" 
                  placeholder="Search countries, regions, stores..." 
                  className="w-full mb-2" 
                  value={search} 
                  onChange={e => setSearch(e.target.value)} 
                />
                <div className="overflow-y-auto flex-col flex-1 border border-surface-high rounded">
                  {geoTreeDB.map(node => (
                    <TreeNode key={node.id} node={node} />
                  ))}
                  {search && geoTreeDB.every(n => !n.name.toLowerCase().includes(search.toLowerCase()) && !n.children?.some((c: GeoNode) => c.name.toLowerCase().includes(search.toLowerCase()))) && (
                     <div className="p-4 text-center text-outline text-sm">No regions match "{search}"</div>
                  )}
                </div>
              </div>

              {/* Right Applied List */}
              <div className="flex-1 flex flex-col gap-4">
                <div className="bg-surface p-4 border border-success-bg rounded flex-1 flex flex-col">
                   <div className="label text-success mb-2">INCLUDED ({includes.length})</div>
                   <div className="flex flex-col gap-2 overflow-y-auto flex-1">
                     {includes.map((inc, i) => (
                       <div key={i} className="flex justify-between items-center p-2 bg-success-bg rounded text-success text-sm">
                         <span className="flex items-center gap-1">{inc}</span>
                         <button onClick={() => removeAssigned(i, 'include')} className="bg-transparent border-none cursor-pointer text-success"><X size={14}/></button>
                       </div>
                     ))}
                   </div>
                </div>

                <div className="bg-surface p-4 border border-error-bg rounded flex-1 flex flex-col">
                   <div className="label text-error mb-2">EXCLUDED ({excludes.length})</div>
                   <div className="flex flex-col gap-2 overflow-y-auto flex-1">
                     {excludes.map((exc, i) => (
                       <div key={i} className="flex justify-between items-center p-2 bg-error-bg rounded text-error text-sm">
                         <span>{exc}</span>
                         <button onClick={() => removeAssigned(i, 'exclude')} className="bg-transparent border-none cursor-pointer text-error"><X size={14}/></button>
                       </div>
                     ))}
                   </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-surface p-6 flex flex-col gap-4 h-full border border-outline-variant rounded">
              <div className="flex justify-between items-start">
                  <div className="label flex-1">Paste Massive Database Extract</div>
                  <button className="btn-secondary flex items-center gap-1">CSV Parse</button>
              </div>
              <textarea className="flex-1 min-h-[300px] font-mono text-xs leading-relaxed p-4 bg-surface-low border border-outline-variant" 
                defaultValue="NL-STORE-08000, NL-STORE-08001..."
              />
            </div>
          )}
        </div>

        <div className="modal-footer">
          <button className="btn-secondary" onClick={onClose}>Discard</button>
          <button className="btn-primary" onClick={onClose}>Lock In Assignments</button>
        </div>
      </div>
    </div>
  );
}
