'use client';

import React, { useState } from 'react';
import { Plus, Trash2, X, Sparkles, Layers, SlidersHorizontal } from 'lucide-react';
import { AttributeGroup, AttributeOption, DisplayType } from '@/types/product';

interface ModularAttributeBuilderModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddGroup: (newGroup: AttributeGroup) => void;
}

export function ModularAttributeBuilderModal({
  isOpen,
  onClose,
  onAddGroup,
}: ModularAttributeBuilderModalProps) {
  const [title, setTitle] = useState('');
  const [displayType, setDisplayType] = useState<DisplayType>('radio_cards');
  const [options, setOptions] = useState<Array<{ label: string; subtitle: string; price: number }>>([
    { label: 'Opção 1', subtitle: 'Descrição breve', price: 0 },
    { label: 'Opção 2', subtitle: 'Ex: Premium', price: 15 },
  ]);

  if (!isOpen) return null;

  const handleAddOptionRow = () => {
    setOptions([
      ...options,
      { label: `Opção ${options.length + 1}`, subtitle: '', price: 0 },
    ]);
  };

  const handleRemoveOptionRow = (index: number) => {
    if (options.length <= 1) return;
    setOptions(options.filter((_, idx) => idx !== index));
  };

  const handleOptionChange = (
    index: number,
    field: 'label' | 'subtitle' | 'price',
    value: string | number
  ) => {
    const updated = [...options];
    updated[index] = { ...updated[index], [field]: value };
    setOptions(updated);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const generatedId = `custom_${Date.now()}`;
    const builtOptions: AttributeOption[] = options.map((opt, idx) => ({
      id: `${generatedId}_opt_${idx}`,
      label: opt.label,
      subtitle: opt.subtitle || undefined,
      priceModifierFixed: Number(opt.price) || 0,
    }));

    const newGroup: AttributeGroup = {
      id: generatedId,
      title: title.trim(),
      displayType: displayType,
      defaultOptionId: builtOptions[0]?.id,
      options: builtOptions,
    };

    onAddGroup(newGroup);
    setTitle('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto border border-gray-100">
        <div className="p-5 border-b border-gray-100 flex items-center justify-between bg-slate-900 text-white rounded-t-xl">
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-5 h-5 text-emerald-400" />
            <div>
              <h3 className="font-bold text-sm">Criar Novo Bloco de Customização</h3>
              <p className="text-xs text-slate-300">
                Adicione um novo quadro modular ao produto em tempo real
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1">
              Título do Bloco
            </label>
            <input
              type="text"
              required
              placeholder="Ex: Tipo de Dobra, Furo, Laminação, Tipo de Alça..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full text-sm border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1">
              Tipo de Exibição Visual
            </label>
            <select
              value={displayType}
              onChange={(e) => setDisplayType(e.target.value as DisplayType)}
              className="w-full text-sm border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
            >
              <option value="radio_cards">Cards de Seleção (Estilo Botões/Rádio)</option>
              <option value="select_box">Caixa Suspensa (Select Dropdown)</option>
            </select>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-bold text-gray-700 uppercase tracking-wide">
                Opções de Escolha do Cliente
              </label>
              <button
                type="button"
                onClick={handleAddOptionRow}
                className="text-xs text-emerald-700 hover:text-emerald-800 font-bold flex items-center gap-1 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" /> Adicionar Opção
              </button>
            </div>

            <div className="space-y-2">
              {options.map((opt, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2 bg-gray-50 p-2 rounded border border-gray-200 text-xs"
                >
                  <input
                    type="text"
                    required
                    placeholder="Nome da Opção (ex: 1 Dobra ao meio)"
                    value={opt.label}
                    onChange={(e) => handleOptionChange(idx, 'label', e.target.value)}
                    className="flex-1 bg-white border border-gray-300 rounded px-2 py-1.5 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  />
                  <input
                    type="text"
                    placeholder="Subtítulo opcional"
                    value={opt.subtitle}
                    onChange={(e) => handleOptionChange(idx, 'subtitle', e.target.value)}
                    className="w-28 bg-white border border-gray-300 rounded px-2 py-1.5 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  />
                  <div className="flex items-center gap-1">
                    <span className="text-gray-500 text-[11px]">+R$</span>
                    <input
                      type="number"
                      step="0.01"
                      placeholder="0"
                      value={opt.price}
                      onChange={(e) => handleOptionChange(idx, 'price', Number(e.target.value))}
                      className="w-16 bg-white border border-gray-300 rounded px-2 py-1.5 text-right focus:outline-none focus:ring-1 focus:ring-emerald-500"
                    />
                  </div>
                  {options.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveOptionRow(idx)}
                      className="text-red-500 hover:text-red-700 p-1 cursor-pointer"
                      title="Excluir Opção"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-gray-200 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-gray-600 hover:bg-gray-100 rounded-md transition-colors cursor-pointer"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white rounded-md shadow-xs transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Adicionar Bloco ao Produto</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
