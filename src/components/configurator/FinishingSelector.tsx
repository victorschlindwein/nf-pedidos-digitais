'use client';

import React from 'react';
import { AttributeOption } from '@/types/product';

interface FinishingSelectorProps {
  options: AttributeOption[];
  selectedId: string;
  onSelect: (optionId: string) => void;
}

export function FinishingSelector({ options, selectedId, onSelect }: FinishingSelectorProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
      {options.map((option) => {
        const isSelected = selectedId === option.id;

        return (
          <button
            key={option.id}
            type="button"
            onClick={() => onSelect(option.id)}
            className={`flex flex-col items-center justify-between p-3 rounded border text-center transition-all cursor-pointer bg-white ${
              isSelected
                ? 'border-emerald-600 ring-2 ring-emerald-600/20 shadow-xs'
                : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50/50'
            }`}
          >
            {/* Visual preview do acabamento */}
            <div className="w-16 h-12 mb-2 rounded-xs border border-gray-200 bg-gray-100 flex items-center justify-center relative overflow-hidden">
              {option.id.includes('verniz') ? (
                <div className="w-full h-full bg-linear-to-tr from-amber-100/40 via-white to-amber-200/50 flex items-center justify-center">
                  <span className="text-[9px] font-bold text-amber-700 tracking-wider">BRILHO</span>
                </div>
              ) : option.id.includes('laminacao') ? (
                <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                  <span className="text-[9px] font-bold text-gray-600 tracking-wider">FOSCO</span>
                </div>
              ) : (
                <div className="w-8 h-8 border border-dashed border-gray-300 bg-white" />
              )}
            </div>

            <span
              className={`text-xs font-medium leading-tight ${
                isSelected ? 'text-gray-900 font-semibold' : 'text-gray-700'
              }`}
            >
              {option.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
