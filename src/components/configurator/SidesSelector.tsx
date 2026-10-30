'use client';

import React from 'react';
import { Copy, FileText } from 'lucide-react';
import { AttributeOption } from '@/types/product';

interface SidesSelectorProps {
  options: AttributeOption[];
  selectedId: string;
  onSelect: (optionId: string) => void;
}

export function SidesSelector({ options, selectedId, onSelect }: SidesSelectorProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {options.map((option) => {
        const isSelected = selectedId === option.id;
        const isFrenteVerso = option.id.includes('frente_verso') || option.id.includes('verso');

        return (
          <button
            key={option.id}
            type="button"
            onClick={() => onSelect(option.id)}
            className={`flex items-center justify-between px-4 py-3.5 rounded border transition-all cursor-pointer bg-white ${
              isSelected
                ? 'border-emerald-600 ring-2 ring-emerald-600/20 shadow-xs'
                : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50/50'
            }`}
          >
            <span
              className={`text-sm font-medium ${
                isSelected ? 'text-gray-900 font-semibold' : 'text-gray-700'
              }`}
            >
              {option.label}
            </span>

            {/* Ícone estilizado representando as folhas */}
            <div className="flex items-center justify-center text-gray-400">
              {isFrenteVerso ? (
                <div className="relative w-8 h-8 flex items-center justify-center">
                  <div className="absolute top-1 left-1 w-5 h-6 border border-gray-300 bg-gray-50 rounded-xs flex flex-col justify-around p-0.5">
                    <div className="w-full h-0.5 bg-gray-300 rounded-full"></div>
                    <div className="w-2/3 h-0.5 bg-gray-200 rounded-full"></div>
                  </div>
                  <div className="absolute bottom-1 right-1 w-5 h-6 border border-blue-400 bg-white rounded-xs shadow-xs flex flex-col justify-around p-0.5">
                    <div className="w-full h-0.5 bg-blue-300 rounded-full"></div>
                    <div className="w-3/4 h-0.5 bg-blue-200 rounded-full"></div>
                  </div>
                </div>
              ) : (
                <div className="w-8 h-8 flex items-center justify-center">
                  <div className="w-6 h-7 border border-blue-400 bg-white rounded-xs shadow-xs flex flex-col justify-around p-0.5">
                    <div className="w-full h-0.5 bg-blue-300 rounded-full"></div>
                    <div className="w-2/3 h-0.5 bg-blue-200 rounded-full"></div>
                    <div className="w-1/2 h-0.5 bg-blue-200 rounded-full"></div>
                  </div>
                </div>
              )}
            </div>
          </button>
        );
      })}
    </div>
  );
}
