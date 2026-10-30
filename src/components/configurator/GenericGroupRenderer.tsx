'use client';

import React from 'react';
import { AttributeGroup } from '@/types/product';
import { SizeSelector } from './SizeSelector';
import { MaterialSelector } from './MaterialSelector';
import { SidesSelector } from './SidesSelector';
import { ColorsSelector } from './ColorsSelector';
import { FinishingSelector } from './FinishingSelector';

interface GenericGroupRendererProps {
  group: AttributeGroup;
  selectedOptionId: string;
  onSelectOption: (groupId: string, optionId: string) => void;
}

export function GenericGroupRenderer({
  group,
  selectedOptionId,
  onSelectOption,
}: GenericGroupRendererProps) {
  const handleSelect = (optionId: string) => {
    onSelectOption(group.id, optionId);
  };

  return (
    <section className="mb-6">
      <h3 className="text-base font-bold text-gray-900 mb-2.5 flex items-center justify-between">
        <span>{group.title}</span>
      </h3>

      {/* Roteamento de acordo com o displayType configurado pelo Administrador */}
      {(() => {
        switch (group.displayType) {
          case 'size_grid':
            return (
              <SizeSelector
                options={group.options}
                selectedId={selectedOptionId}
                onSelect={handleSelect}
              />
            );

          case 'material_list':
            return (
              <MaterialSelector
                options={group.options}
                selectedId={selectedOptionId}
                onSelect={handleSelect}
                visibleCountInitial={group.visibleCountInitial || 3}
              />
            );

          case 'sides_cards':
            return (
              <SidesSelector
                options={group.options}
                selectedId={selectedOptionId}
                onSelect={handleSelect}
              />
            );

          case 'color_cards':
            return (
              <ColorsSelector
                options={group.options}
                selectedId={selectedOptionId}
                onSelect={handleSelect}
              />
            );

          case 'finishing_cards':
            return (
              <FinishingSelector
                options={group.options}
                selectedId={selectedOptionId}
                onSelect={handleSelect}
              />
            );

          case 'select_box':
            return (
              <div className="relative">
                <select
                  value={selectedOptionId}
                  onChange={(e) => handleSelect(e.target.value)}
                  className="w-full bg-white border border-gray-300 rounded px-3 py-2.5 text-sm font-medium text-gray-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                >
                  {group.options.map((opt) => (
                    <option key={opt.id} value={opt.id}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>
            );

          case 'radio_cards':
          default:
            return (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
                {group.options.map((option) => {
                  const isSelected = selectedOptionId === option.id;
                  return (
                    <button
                      key={option.id}
                      type="button"
                      onClick={() => handleSelect(option.id)}
                      className={`flex flex-col text-left p-3 rounded border transition-all cursor-pointer bg-white ${
                        isSelected
                          ? 'border-emerald-600 ring-2 ring-emerald-600/20 shadow-xs bg-emerald-50/20'
                          : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50/50'
                      }`}
                    >
                      <span
                        className={`text-xs font-semibold ${
                          isSelected ? 'text-gray-900' : 'text-gray-700'
                        }`}
                      >
                        {option.label}
                      </span>
                      {option.subtitle && (
                        <span className="text-[11px] text-gray-500 mt-0.5">{option.subtitle}</span>
                      )}
                    </button>
                  );
                })}
              </div>
            );
        }
      })()}
    </section>
  );
}
