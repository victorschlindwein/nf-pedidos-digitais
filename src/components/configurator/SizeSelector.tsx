'use client';

import React from 'react';
import { AttributeOption } from '@/types/product';

interface SizeSelectorProps {
  options: AttributeOption[];
  selectedId: string;
  onSelect: (optionId: string) => void;
}

export function SizeSelector({ options, selectedId, onSelect }: SizeSelectorProps) {
  // Renderiza mini-diagrama proporcional do papel
  const renderSizeThumbnail = (meta?: AttributeOption['meta'], isSelected?: boolean) => {
    const ratio = meta?.proportionRatio || 'A5';

    // Proporções visuais relativas dentro do quadro de 64x50px
    let rectStyle = 'w-7 h-10'; // vertical padrão
    if (ratio === 'A6' || ratio === 'A7') {
      rectStyle = 'w-6 h-8';
    } else if (ratio === 'DL') {
      rectStyle = 'w-5 h-11';
    } else if (ratio === 'A5') {
      rectStyle = 'w-8 h-11';
    } else if (ratio === 'A4') {
      rectStyle = 'w-9 h-12';
    } else if (ratio === 'Horizontal') {
      rectStyle = 'w-11 h-5';
    }

    return (
      <div className="w-full h-16 flex items-center justify-center bg-gray-50/60 rounded-t-sm border-b border-gray-100">
        <div className="relative w-14 h-13 border border-gray-200 bg-white flex items-center justify-center shadow-[0_1px_2px_rgba(0,0,0,0.03)]">
          {/* Folha proporcional com preenchimento azul característico */}
          <div
            className={`${rectStyle} ${
              isSelected ? 'bg-blue-400/80 border border-blue-500' : 'bg-blue-200/70 border border-blue-300'
            } transition-colors flex items-center justify-center text-[7px] font-semibold text-blue-900/60`}
          >
            {ratio}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
      {options.map((option) => {
        const isSelected = selectedId === option.id;
        return (
          <button
            key={option.id}
            type="button"
            onClick={() => onSelect(option.id)}
            className={`flex flex-col items-center justify-between rounded border text-center transition-all cursor-pointer group bg-white ${
              isSelected
                ? 'border-emerald-600 ring-2 ring-emerald-600/20 shadow-sm'
                : 'border-gray-200 hover:border-gray-300 hover:shadow-xs'
            }`}
          >
            {renderSizeThumbnail(option.meta, isSelected)}
            <div className="py-2.5 px-2 w-full">
              <span
                className={`text-xs block font-medium leading-tight ${
                  isSelected ? 'text-gray-900 font-semibold' : 'text-gray-700'
                }`}
              >
                {option.label}
              </span>
            </div>
          </button>
        );
      })}
    </div>
  );
}
