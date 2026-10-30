'use client';

import React from 'react';
import { AttributeOption } from '@/types/product';

interface ColorsSelectorProps {
  options: AttributeOption[];
  selectedId: string;
  onSelect: (optionId: string) => void;
}

export function ColorsSelector({ options, selectedId, onSelect }: ColorsSelectorProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {options.map((option) => {
        const isSelected = selectedId === option.id;
        const isColor = option.id.includes('cor') || option.id.includes('4x');

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

            {/* Círculo indicador de cor */}
            <div className="flex items-center">
              {isColor ? (
                <div
                  className="w-5 h-5 rounded-full shadow-inner border border-black/10"
                  style={{
                    background:
                      'conic-gradient(from 180deg, #ff0055, #ffaa00, #00d455, #00aaff, #aa00ff, #ff0055)',
                  }}
                  title="Impressão Colorida (CMYK)"
                />
              ) : (
                <div
                  className="w-5 h-5 rounded-full shadow-inner border border-black/10"
                  style={{
                    background: 'linear-gradient(135deg, #222222 50%, #e5e5e5 50%)',
                  }}
                  title="Impressão Preto e Branco (K)"
                />
              )}
            </div>
          </button>
        );
      })}
    </div>
  );
}
