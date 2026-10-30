'use client';

import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { QuantityTier } from '@/types/product';

interface QuantityTableProps {
  tiers: QuantityTier[];
  selectedQuantity: number;
  onSelectQuantity: (quantity: number) => void;
  priceMultiplier?: number;
  priceModifierFixed?: number;
}

export function QuantityTable({
  tiers,
  selectedQuantity,
  onSelectQuantity,
  priceMultiplier = 1,
  priceModifierFixed = 0,
}: QuantityTableProps) {
  const [expanded, setExpanded] = useState(false);
  const initialCount = 9;

  const displayedTiers = expanded ? tiers : tiers.slice(0, initialCount);
  const hasMore = tiers.length > initialCount;

  // Formatação em Real Brasileiro (BRL)
  const formatBRL = (val: number) => {
    return val.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 2,
    });
  };

  return (
    <div className="border border-gray-200 rounded overflow-hidden bg-white shadow-xs">
      {/* Cabeçalho da Tabela */}
      <div className="bg-gray-50/90 px-4 py-2.5 border-b border-gray-200 grid grid-cols-12 text-[11px] font-semibold text-gray-500 uppercase tracking-wider">
        <div className="col-span-6 text-left">Quantidade</div>
        <div className="col-span-3 text-right">Preço Unitário</div>
        <div className="col-span-3 text-right">Total</div>
      </div>

      {/* Linhas da Tabela */}
      <div className="divide-y divide-gray-100">
        {displayedTiers.map((tier) => {
          const isSelected = selectedQuantity === tier.quantity;

          // Cálculo dinâmico considerando modificadores de atributos selecionados
          const adjustedTotal = tier.totalPrice * priceMultiplier + priceModifierFixed;
          const adjustedUnit = adjustedTotal / tier.quantity;

          return (
            <button
              key={tier.quantity}
              type="button"
              onClick={() => onSelectQuantity(tier.quantity)}
              className={`w-full px-4 py-2.5 grid grid-cols-12 items-center text-xs transition-all cursor-pointer ${
                isSelected
                  ? 'bg-emerald-50/40 ring-2 ring-inset ring-emerald-600 font-semibold z-10 relative'
                  : 'hover:bg-gray-50/80 text-gray-800'
              }`}
            >
              <div className="col-span-6 text-left flex items-center gap-1.5 font-medium text-gray-900">
                <span>{tier.quantity.toLocaleString('pt-BR')} unidades</span>
                {tier.isPopular && (
                  <span className="text-[10px] bg-amber-100 text-amber-800 px-1.5 py-0.5 rounded font-bold">
                    MELHOR CUSTO
                  </span>
                )}
              </div>

              <div className="col-span-3 text-right text-sky-600 font-semibold">
                {formatBRL(adjustedUnit)}
              </div>

              <div className="col-span-3 text-right font-bold text-sky-700">
                {formatBRL(adjustedTotal)}
              </div>
            </button>
          );
        })}
      </div>

      {/* Botão Mostrar mais */}
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
