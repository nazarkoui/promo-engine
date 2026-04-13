import React, { useState, useRef, useEffect } from 'react';

interface AutocompleteProps {
  dictionary: string[];
  placeholder?: string;
  defaultValue?: string;
  onSelect: (value: string) => void;
  className?: string;
}

export function AutocompleteInput({ dictionary, placeholder, defaultValue, onSelect, className }: AutocompleteProps) {
  const [query, setQuery] = useState(defaultValue || '');
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const filtered = dictionary.filter(item => item.toLowerCase().includes(query.toLowerCase()));

  // Close dropdown if clicked outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className={`relative ${className || ''}`} ref={wrapperRef} style={{ position: 'relative', width: '100%' }}>
      <input
        type="text"
        className="input-mono"
        style={{ width: '100%', boxSizing: 'border-box' }}
        placeholder={placeholder}
        value={query}
        onFocus={() => setIsOpen(true)}
        onChange={(e) => {
          setQuery(e.target.value);
          setIsOpen(true);
        }}
      />
      {isOpen && filtered.length > 0 && (
        <ul style={{ 
          position: 'absolute', top: '100%', left: 0, right: 0, zIndex: 50, 
          background: 'var(--surface)', border: '1px solid var(--outline-variant)', 
          maxHeight: '200px', overflowY: 'auto', listStyle: 'none', margin: 0, padding: 0,
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)', borderTop: 'none'
        }}>
          {filtered.map((item, idx) => (
            <li 
              key={idx} 
              style={{ padding: '8px 12px', cursor: 'pointer', fontFamily: 'var(--font-mono)', fontSize: '0.875rem' }}
              onMouseDown={() => {
                setQuery(item);
                onSelect(item);
                setIsOpen(false);
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--surface-high)')}
              onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
            >
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
