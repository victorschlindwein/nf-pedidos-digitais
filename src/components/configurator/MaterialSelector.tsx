'use client';

import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { AttributeOption } from '@/types/product';

interface MaterialSelectorProps {
  options: AttributeOption[];
  selectedId: string;
  onSelect: (optionId: string) => void;
  visibleCountInitial?: number;
}

export function MaterialSelector({
  options,
  selectedId,
  onSelect,
  visibleCountInitial = 3,
}: MaterialSelectorProps) {
  const [expanded, setExpanded] = useState(false);

  const displayedOptions = expanded ? options : options.slice(0, visibleCountInitial);
  const hasMore = options.length > visibleCountInitial;

  return (
    <div className="border border-gray-200 rounded overflow-hidden bg-white shadow-xs">
      {/* Cabeçalho sutil como na imagem */}
      <div className="bg-gray-50/80 px-4 py-2 border-b border-gray-200">
        <span className="text-[11px] font-semibold text-gray-500 tracking-wider uppercase">
          Material
        </span>
      </div>

      {/* Lista de opções empilhadas */}
      <div className="divide-y divide-gray-200">
        {displayedOptions.map((option) => {
          const isSelected = selectedId === option.id;
          return (
            <button
              key={option.id}
              type="button"
              onClick={() => onSelect(option.id)}
              className={`w-full text-left px-4 py-3 flex items-center justify-between transition-all cursor-pointer ${
                isSelected
                  ? 'bg-emerald-50/30 ring-2 ring-inset ring-emerald-600 text-gray-900 font-medium'
                  : 'hover:bg-gray-50 text-gray-700'
              }`}
            >
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">{option.label}</span>
                {option.badge && (
                  <span className="text-xs font-semibold text-gray-500">
                    | <span className="text-emerald-700 font-bold ml-1">{option.badge}</span>
                  </span>
                )}
              </div>
            </button>
          );
        })}
      </div>

      {/* Botão Mostrar mais / Mostrar menos */}
      {hasMore && (
        <button
          type="button"
          onClick={() => setExpanded(!expanded)}
          className="w-full py-2.5 px-4 text-xs font-semibold text-gray-500 hover:text-gray-800 hover:bg-gray-50 flex items-center justify-center gap-1.5 border-t border-gray-200 transition-colors cursor-pointer"
        >
          <span>{expanded ? 'Mostrar menos' : 'Mostrar mais'}</span>
          {expanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </button>
      )}
    </div>
  );
}
